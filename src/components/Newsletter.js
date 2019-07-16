import axios from "axios";
import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

export default class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      submitting: false,
      submitted: false,

      error: false,
      completeMessage: this.props.newsletter
    };
  }

  onEntered = (node, isAppearing) => {
    let c = "Thank You! See you real soon.";
    if (this.state.error) {
      c = "Uh oh! Something went wrong - please try again.";
    }
    this.setState({ submitted: true, completeMessage: c });
  };

  onChange = e => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // get our form data out of state
    const { email } = this.state;

    axios
      .post(
        "/.netlify/functions/sendgrid",
        { email },
        { headers: { "content-type": "application/json" } }
      )
      .then(result => {
        this.setState({ submitting: true });
      })
      .catch(err => {
        this.setState({ submitting: true, error: true });
      });
  };

  render() {
    const { email, completeMessage, submitting, submitted } = this.state;
    return (
      <CSSTransition
        appear={true}
        enter={false}
        exit={false}
        classNames="fade-in"
        in
        timeout={2000}
        style={{
          transitionDelay: "2s"
        }}
      >
        <div>
          <CSSTransition
            enter={true}
            exit={false}
            classNames="fade-refresh"
            in={submitting}
            onEntered={this.onEntered}
            timeout={2000}
            style={{
              transitionDelay: "0"
            }}
          >
            <div>
              <div
                className="newsletter"
                style={{
                  fontFamily: this.props.messageFont,
                  color: this.props.color
                }}
              >
                <p dangerouslySetInnerHTML={{ __html: completeMessage }} />
                <form
                  style={{
                    visibility: submitted ? "hidden" : "visible"
                  }}
                  onSubmit={this.onSubmit}
                  name="mailinglist"
                >
                  <div className="input-group">
                    <input
                      className="input-group-field"
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                    />
                    <div className="input-group-button">
                      <input type="submit" className="button" value="Join" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    );
  }
}

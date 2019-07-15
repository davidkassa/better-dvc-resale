import axios from "axios";
import React, { Component } from "react";
import { Transition } from "react-transition-group";

import { defaultStyle, transitionStyles } from "../transitions";

export default class Newsletter extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      completeMessage: null
    };
  }

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
        this.setState({ completeMessage: "Thank You! See you real soon." });
      })
      .catch(err => {
        this.setState({
          completeMessage: "Uh oh! Something went wrong - please try again."
        });
      });
  };

  render() {
    const { email, completeMessage } = this.state;
    if (completeMessage) {
      return (
        <p
          style={{
            fontFamily: this.props.messageFont,
            color: this.props.color,
            textAlign: "center",
            fontSize: "0.8em",
            marginBottom: "0.5em"
          }}
        >
          {completeMessage}
        </p>
      );
    }
    return (
      <Transition in appear={true} timeout={2000}>
        {state => (
          <div
            class="newsletter"
            style={{
              fontFamily: this.props.messageFont,
              color: this.props.color,
              textAlign: "center",
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <p dangerouslySetInnerHTML={{ __html: this.props.newsletter }} />
            <form onSubmit={this.onSubmit} name="mailinglist">
              <div class="input-group">
                {/* style={{
                  minWidth: "15em",
                  WebkitTransition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  transition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  WebkitAppearance: "none",
                }} */}

                <input
                  class="input-group-field"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
                <div class="input-group-button">
                  <input type="submit" class="button" value="Join" />
                </div>
              </div>
              {/* <button
                type="submit"
                style={{
                  WebkitTransition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  transition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  WebkitAppearance: "none",
                }}
              > */}
            </form>
          </div>
        )}
      </Transition>
    );
  }
}

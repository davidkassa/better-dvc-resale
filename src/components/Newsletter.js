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
            style={{
              fontFamily: this.props.messageFont,
              color: this.props.color,
              textAlign: "center",
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            <p
              style={{
                fontSize: "0.8em",
                textAlign: "center",
                marginBottom: "0.5em"
              }}
              dangerouslySetInnerHTML={{ __html: this.props.newsletter }}
            />
            <form onSubmit={this.onSubmit} name="mailinglist">
              <input
                type="email"
                style={{
                  minWidth: "15em",
                  display: "inline-block",
                  verticalAlign: "middle",
                  margin: "0 0 1rem 0",
                  padding: "0.85em 1em",
                  border: "1px solid transparent",
                  borderRadius: "0",
                  WebkitTransition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  transition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  fontFamily: "inherit",
                  WebkitAppearance: "none",
                  lineHeight: "1"
                }}
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={this.onChange}
              />
              <button
                type="submit"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  margin: "0 0 1rem 0",
                  padding: "0.85em 1em",
                  border: "1px solid transparent",
                  borderRadius: "0",
                  WebkitTransition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  transition:
                    "background-color 0.25s ease-out, color 0.25s ease-out",
                  fontFamily: "inherit",
                  WebkitAppearance: "none",
                  lineHeight: "1",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "#1779ba",
                  color: "#fefefe" // :hover #14679e
                }}
              >
                Join
              </button>
            </form>
          </div>
        )}
      </Transition>
    );
  }
}

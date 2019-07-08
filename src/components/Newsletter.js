import React from "react";
import { Transition } from "react-transition-group";

import { defaultStyle, transitionStyles } from "../transitions";

const Newsletter = props => (
  <Transition in appear={true} timeout={2000}>
    {state => (
      <div
        style={{
          fontFamily: props.messageFont,
          color: props.color,
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
          dangerouslySetInnerHTML={{ __html: props.newsletter }}
        />
        <form
          action="/.netlify/functions/sendgrid?welcome_email=true"
          name="mailinglist"
        >
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

export default Newsletter;

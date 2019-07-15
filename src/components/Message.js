import React from "react";
import { Transition } from "react-transition-group";

import { defaultStyle, transitionStyles } from "../transitions";

const Message = props => (
  <Transition in appear={true} timeout={1200}>
    {state => (
      <div
        style={{
          padding: "0 1em",
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        <h2
          style={{
            fontFamily: props.messageFont,
            color: props.color,
            textAlign: "center"
          }}
          dangerouslySetInnerHTML={{ __html: props.message }}
        />
      </div>
    )}
  </Transition>
);

export default Message;

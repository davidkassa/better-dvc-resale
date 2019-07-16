import React from "react";
import { CSSTransition } from "react-transition-group";

const Message = props => (
  <CSSTransition in appear={true} classNames="fade-in" timeout={1200}>
    <div
      style={{
        padding: "0 1em",
        transitionDelay: "1.2s"
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
  </CSSTransition>
);

export default Message;

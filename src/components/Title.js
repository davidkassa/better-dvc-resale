import React from "react";
import { CSSTransition } from "react-transition-group";

const Title = props => (
  <CSSTransition in appear={true} classNames="fade-in" timeout={400}>
    <div
      style={{
        padding: "1em",
        transitionDelay: "0.4s"
      }}
    >
      <h1
        style={{
          fontFamily: props.titleFont,
          color: props.color,
          fontWeight: "normal",
          margin: "0",
          textAlign: "center"
        }}
      >
        {props.title}
      </h1>
    </div>
  </CSSTransition>
);

export default Title;

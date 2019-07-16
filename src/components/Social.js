import React from "react";
import { SocialIcon } from "react-social-icons";
import { CSSTransition } from "react-transition-group";

const Social = props => (
  <CSSTransition in appear={true} timeout={2000} classNames="fade-in">
    <ul
      style={{
        listStyleType: "none",
        display: "flex",
        transitionDelay: "2.0s"
      }}
    >
      {props.social.map(icon => (
        <li
          key={icon}
          style={{
            padding: "0.5rem"
          }}
        >
          <SocialIcon url={icon} bgColor={props.color} />
        </li>
      ))}
    </ul>
  </CSSTransition>
);

export default Social;

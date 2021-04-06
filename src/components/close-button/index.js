import PropTypes from "prop-types";
import React from "react";
import "./close-button.scss";
import closeIcon from "./icon--close.svg";
import closeIconOrange from "./icon--close-orange.svg";
import backIcon from "./icon--back.svg";

let closeIcons = {};

const CloseButton = props => (
  <div
    aria-label="Close"
    className={`close-button ${props.className || ""} ${
      props.size === CloseButton.SIZE_SMALL ? "small" : ""
    } ${props.size === CloseButton.SIZE_LARGE ? "large" : ""}    
    ${props.color === CloseButton.COLOR_ORANGE ? "orange" : ""} `}
    role="button"
    tabIndex="0"
    onClick={props.onClick}
  >
    {props.buttonType === "back" ? (
      <img className="back-icon" src={backIcon} />
    ) : (
      <img
        className={`close-icon ${
          props.color !== CloseButton.COLOR_NEUTRAL ? props.color : ""
        }`}
        src={
          props.color && closeIcons[props.color]
            ? closeIcons[props.color]
            : closeIcon
        }
      />
    )}
  </div>
);

CloseButton.SIZE_SMALL = "small";
CloseButton.SIZE_LARGE = "large";

CloseButton.COLOR_NEUTRAL = "neutral";
CloseButton.COLOR_GREEN = "green";
CloseButton.COLOR_ORANGE = "orange";
closeIcons = {
  [CloseButton.COLOR_NEUTRAL]: closeIcon,
  [CloseButton.COLOR_GREEN]: closeIcon, // TODO: temporary, need green icon
  [CloseButton.COLOR_ORANGE]: closeIconOrange
};

CloseButton.propTypes = {
  buttonType: PropTypes.oneOf(["back", "close"]),
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf([CloseButton.SIZE_SMALL, CloseButton.SIZE_LARGE])
};

CloseButton.defaultProps = {
  color: CloseButton.COLOR_NEUTRAL,
  size: CloseButton.SIZE_LARGE,
  buttonType: "close"
};

export default CloseButton;

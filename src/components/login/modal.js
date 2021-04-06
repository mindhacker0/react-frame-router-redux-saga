import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";
import "./modal.scss";
import CloseButton from "../close-button";
const ModalComponent = (props) => (
  <ReactModal
    isOpen
    className={`modal-content ${props.className} ${
      props.fullScreen ? "full-screen" : ""
    }`}
    contentLabel={props.contentLabel}
    overlayClassName="modal-overlay"
    onRequestClose={props.onRequestClose}
    shouldCloseOnOverlayClick={props.CloseOnOverlay}
  >
    <div
      style={{
        width: "100%",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <div className={`header ${props.headerClassName || ""}`}>
        <div className=" header-item header-item-title">
          {props.headerImage ? (
            <img className="header-image" src={props.headerImage} />
          ) : null}
          {props.contentLabel}
        </div>
        <div className="header-item  header-item-close">
          {props.fullScreen ? null : (
            <CloseButton
              size={CloseButton.SIZE_LARGE}
              onClick={props.onRequestClose}
            />
          )}
        </div>
        {props.renderChildren}
      </div>
      {props.children}
    </div>
  </ReactModal>
);

ModalComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  contentLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  headerClassName: PropTypes.string,
  fullScreen: PropTypes.bool,
  headerImage: PropTypes.string,
  CloseOnOverlay: PropTypes.bool,
  onRequestClose: PropTypes.func,
  renderChildren: PropTypes.node,
};
ModalComponent.defaultProps = {
  CloseOnOverlay: true,
};
export default ModalComponent;
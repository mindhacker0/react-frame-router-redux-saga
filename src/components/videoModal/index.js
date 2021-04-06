import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import styles from "./video-modal.css";
import {closeModal} from "../../reducers/frame/constant";
const closeIcon = require("./img/close-icon.png");
const VideoModal=({isOpen,closeModal,title,videoSrc,name,describe})=>{
    function onClose(){
        closeModal("videoModal");
    }
    return (<ReactModal
        isOpen={isOpen}
        className={styles.videoModal}
        contentLabel=""
        overlayClassName="modal-overlay"
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        >
            <div className={styles.videoModalWrap}>
                <div className={styles.videoModalHead}>
                    <div className={styles.videoModalTitle}><span>{title}</span></div>
                    <div className={styles.videoModalCloseBtn}><img src={closeIcon}/></div>
                </div>
                <div className={styles.videoModalContent}>
                    <div className={styles.videoWrap}><video src={videoSrc}/></div>
                    <div className={styles.videoInfo}>
                        <div className={styles.videoName}><span>{name}</span></div>
                        <div className={styles.videoDes}><span>{describe}</span></div>
                    </div>
                </div>
            </div>
        </ReactModal>)
}
const mapStateToProps = (state) => {
    const {videoModal}=state.frame;
    const {title,videoSrc,name,describe}=state.frame.videoInfo;
    return {
        isOpen:videoModal,
        title:title,
        videoSrc:videoSrc,
        name:name,
        describe:describe,
    }
};

const mapDispatchToProps = (dispatch) => ({
    closeModal:(modalName)=>dispatch(closeModal({modalName}))
});

VideoModal.propTypes = {};

export default connect(mapStateToProps,mapDispatchToProps)(VideoModal);
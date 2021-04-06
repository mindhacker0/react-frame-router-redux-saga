import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import styles from "./notice-modal.css";
import {closeModal} from "../../reducers/frame/constant";
const headIcon = require("./img/notice-head.png");
const closeIcon = require("./img/close-icon.png");
const NoticeModal=({isOpen,closeModal,noticeList,noticeTitle})=>{
    function onClose(){
        closeModal("noticeModal");
    }
    return (<ReactModal
        isOpen={isOpen}
        className={styles.noticeModal}
        contentLabel=""
        overlayClassName="modal-overlay"
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        >
            <div className={styles.noticeModalWrap}>
                <div className={styles.noticeModalHead}>
                  <div><img src={headIcon}/></div>
                  <div className={styles.noticeModalTitle}><span>{noticeTitle}</span></div>
                  <div className={styles.noticeModalCloseBtn} onClick={onClose}><img src={closeIcon}/></div>
                </div>
                <div className={styles.noticeModalContent}>
                {noticeList.map((val,key)=>{
                    return <div key={`notice-item-${key}`} className={styles.noticeItem}>
                        {val.title?<div className={styles.noticeItemTitle}><span>{val.title}</span></div>:null}
                        <div className={styles.noticeItemContent}><span>{val.content}</span></div>
                    </div>
                })}
                </div>
            </div>
        </ReactModal>)
}
const mapStateToProps = (state) => {
    const {noticeModal,noticeList,noticeTitle}=state.frame;
    return {
        isOpen:noticeModal,
        noticeList:noticeList,
        noticeTitle:noticeTitle
    }
};

const mapDispatchToProps = (dispatch) => ({
    closeModal:(modalName)=>dispatch(closeModal({modalName}))
});

NoticeModal.propTypes = {};

export default connect(mapStateToProps,mapDispatchToProps)(NoticeModal);
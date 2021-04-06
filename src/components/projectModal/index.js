import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import styles from "./project-modal.css";
import Banner from "./banner";
import {closeModal} from "../../reducers/frame/constant";
const closeIcon = require("./img/close-icon.png");
const ProjectModal=({isOpen,closeModal,title,userName,describe,projectList})=>{
    function onClose(){
        closeModal("projectModal");
    }
    return (<ReactModal
        isOpen={isOpen}
        className={styles.projectModal}
        contentLabel=""
        overlayClassName="modal-overlay"
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        >
            <div className={styles.projectModalWrap}>
                <div className={styles.projectModalHead}>
                    <div className={styles.projectModalCloseBtn} onClick={onClose}><img src={closeIcon}/></div>
                </div>
                <div className={styles.projectModalContent}>
                    <div className={styles.projectWrap}><Banner list={projectList.filter((val)=>val.thumbnailUrl)}/></div>
                    <div className={styles.projectInfo}>
                        <div className={styles.projectTitle}><span>作品名称：</span><span>{title}</span></div>
                        <div className={styles.projectName}><span>用户名称：</span><span>{userName}</span></div>
                        <div className={styles.projectDes}><span>作品介绍：</span><span>{describe}</span></div>
                    </div>
                </div>
            </div>
        </ReactModal>)
}
const mapStateToProps = (state) => {
    const {projectModal}=state.frame;
    const {makerProjectDetails,userName,describe,title}=state.frame.projectInfo;
    return {
        isOpen:projectModal,
        projectList:makerProjectDetails,
        userName:userName,
        describe:describe,
        title:title
    }
};

const mapDispatchToProps = (dispatch) => ({
    closeModal:(modalName)=>dispatch(closeModal({modalName}))
});

ProjectModal.propTypes = {};

export default connect(mapStateToProps,mapDispatchToProps)(ProjectModal);
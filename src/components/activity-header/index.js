import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "./activity-header.css";
import {getParticipant} from "../../reducers/user/constant";
import {openModal} from "../../reducers/frame/constant";
import {withRouter} from "react-router-dom";
const defaultAvatar = require("./img/default-avatar.png");
const ActivityHeader = function(props){
    const {banner,parms,history,openModal,setNotice,participantInfo:{schoolName,className},getParticipant,name,headUrl} = props;
    console.log(props);
    useEffect(()=>{
        getParticipant();
    },[getParticipant]);
    function openNotice(){
        setNotice();
        openModal("noticeModal");
    }
    function onSubmit(){
        console.log(parms);
        history.push(`/submitproject?from=${parms}`);
    }
    return <div className={styles.componentWrap}>
        <div className={styles.componentBanner}>
            <img src={banner}/>
        </div>
        <div className={styles.componentUser}>
            <div className={styles.componentUserInfo}>
                <div className={styles.componentAvatar}><img src={headUrl || defaultAvatar}/></div>
                <div className={styles.componentLine}><span>姓名：</span><span>{name || "***"}</span></div>
                <div className={styles.componentLine}><span>学校：</span><span>{schoolName || "未知"}</span></div>
                <div className={styles.componentLine}><span>班级：</span><span>{className || "未知"}</span></div>
            </div>
            <div className={styles.btnWrap}>
                <div className={classNames(styles.btn,styles.blueBtn)} onClick={openNotice}><span>创作须知</span></div>
                <div className={classNames(styles.btn,styles.yellowBtn)} onClick={onSubmit}><span>参加比赛</span></div>
            </div>
        </div>
    </div>
}
 
ActivityHeader.propTypes = {
 
};

const mapStateToProps = (state) => {
    const {participantInfo,session:{name,headUrl}} = state.user;
    return {
        participantInfo:participantInfo,
        name:name,
        headUrl:headUrl
    }
};

const mapDispatchToProps = (dispatch) => ({
    getParticipant:()=>dispatch(getParticipant()),
    openModal:(modalName)=>dispatch(openModal({modalName})),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ActivityHeader));

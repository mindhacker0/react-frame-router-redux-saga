import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./program-class.css";
import {openModal,getVideoDetail} from "../../reducers/frame/constant";
const playIcon = require("./img/play-icon.png");
const VideoItem = function(props){
    const {openModal,getVideoDetail,coverUrl,name,describe,id} = props;
    function showVideoInfo(){
        getVideoDetail(id);
        openModal("videoModal");
    }
    return <div className={styles.videoItemWrap} onClick={showVideoInfo}>
        <div className={styles.videoItemCover}>
            <img src={coverUrl} alt=""/>
            <div className={styles.videoItemPlayIcon}><img src={playIcon} alt=""/></div>
        </div>
        <div className={styles.videoItemContent}>
            <div className={styles.videoItemName}><span>{name}</span></div>
            <div className={styles.videoItemDes}><span>{describe}</span></div>
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => ({
    openModal:(modalName)=>dispatch(openModal({modalName})),
    getVideoDetail:(id)=>dispatch(getVideoDetail({id})),
});

VideoItem.propTypes = {
 
};
export default connect(mapStateToProps,mapDispatchToProps)(VideoItem);

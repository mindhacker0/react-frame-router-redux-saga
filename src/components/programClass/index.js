import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./program-class.css";
import VideoItem from "./videoItem";
const titleIcon = require("./img/titleIcon.png");
const coverImg = require("./img/video-cover.png");
const ProgramClass = function({dataList}){
    console.log(dataList);
    return <div className={styles.programClassWrap}>
        <div className={classNames("middle-wrap",styles.programClassContainer)}>
            <div className={styles.programClassTitle}><img src={titleIcon}/></div>
            <div className={styles.programClassTable}>
                {dataList.map((val,key)=>{
                    return <VideoItem key={`video-item-${key}`} {...val}/>
                })}
            </div>
        </div>
    </div>
}
 
ProgramClass.propTypes = {
 
};
export default ProgramClass;

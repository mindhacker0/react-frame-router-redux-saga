import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./project-table.css";
import {TimeFormate} from "../../lib/utils";
const ProjectItem = function(props){
    const {coverUrl,title,createTime,score} = props;
    return <div className={styles.projectItemWrap}>
        <div className={styles.projectItemCover}><img src={coverUrl}/></div>
        <div className={styles.projectItemContent}>
            <div className={styles.projectItemName}><span>{title}</span></div>
            <div className={styles.projectItemViewer}>
                <div><span>{TimeFormate(createTime,"yyyy-MM-dd HH:mm:ss")}</span></div>
                <div className={styles.projectScore}><span>{score}</span></div>
            </div>
        </div>
    </div>
}
 
ProjectItem.propTypes = {
 
};
export default ProjectItem;

import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./project-table.css";
import {openModal,getProjectInfo} from "../../reducers/frame/constant";
const viewIcon = require("./img/view.png");
const praiseIcon = require("./img/praise.png");
const ProjectItem = function(props){
    const {id,coverUrl,title,viewsNum,praisenhNum,ownerUrl,userName,openModal,getProjectInfo} = props;
    function showItemInfo(){
        getProjectInfo(id);
        openModal("projectModal");
    }
    return <div className={styles.projectItemWrap} onClick={showItemInfo}>
        <div className={styles.projectItemCover}><img src={coverUrl}/></div>
        <div className={styles.projectItemContent}>
            <div className={styles.projectItemName}><span>{title}</span></div>
            <div className={styles.projectItemViewer}>
                <div className={styles.view}><img src={viewIcon} alt="浏览"/><span>{viewsNum}</span></div>
                <div className={styles.praise}><img src={praiseIcon} alt="点赞"/><span>{praisenhNum}</span></div>
            </div>
            <div className={styles.projectItemAuthor}>
                <div className={styles.projectAuthorAvatar}><img src={ownerUrl}/></div>
                <div className={styles.projectAuthorName}><span>{userName}</span></div>
            </div>
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => ({
    openModal:(modalName)=>dispatch(openModal({modalName})),
    getProjectInfo:(id)=>dispatch(getProjectInfo({id})),
});

ProjectItem.propTypes = {
 
};
export default connect(mapStateToProps,mapDispatchToProps)(ProjectItem);

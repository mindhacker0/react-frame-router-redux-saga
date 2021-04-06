import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./entity-design.css";
import ActivityHeader from "../activity-header";
import ProjectTable from "../projectTable";
import NewProjectTable from "../newProjectTable";
const bannerBg = require("./img/banner.png");
const EntityDesign = function({sideList,setNotice,...others}){
    return <div className={styles.entityDesignWrap}>
        <div className={classNames("middle-wrap",styles.entityDesignContainer)}>
            <ActivityHeader banner={bannerBg} setNotice={setNotice} parms={"0"}/>
            <div className={styles.tableWrap}>
                <div className={styles.leftTable}><ProjectTable {...others}/></div>
                <div className={styles.rightTable}><NewProjectTable dataList={sideList}/></div>
            </div>
        </div> 
    </div>
}
 
EntityDesign.propTypes = {
 
};
export default EntityDesign;

import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./child-science.css";
import ActivityHeader from "../activity-header";
import ProjectTable from "../projectTable";
import NewProjectTable from "../newProjectTable";
const bannerBg = require("./img/banner.png");
const ChildScience = function({sideList,setNotice,...others}){
    return <div className={styles.childScienceWrap}>
        <div className={classNames("middle-wrap",styles.childScienceContainer)}>
            <ActivityHeader banner={bannerBg} setNotice={setNotice} parms={"2"}/>
            <div className={styles.tableWrap}>
                <div className={styles.leftTable}><ProjectTable {...others}/></div>
                <div className={styles.rightTable}><NewProjectTable dataList={sideList}/></div>
            </div>
        </div> 
    </div>
}
 
ChildScience.propTypes = {
 
};
export default ChildScience;

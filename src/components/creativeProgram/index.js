import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./creative-program.css";
import ActivityHeader from "../activity-header";
import ProjectTable from "../projectTable";
import NewProjectTable from "../newProjectTable";
const bannerBg = require("./img/banner.png");
const CreativeProgram = function({sideList,setNotice,...others}){
    return <div className={styles.creativeProgramWrap}>
        <div className={classNames("middle-wrap",styles.creativeProgramContainer)}>
            <ActivityHeader banner={bannerBg} setNotice={setNotice} parms={"1"}/>
            <div className={styles.tableWrap}>
                <div className={styles.leftTable}><ProjectTable {...others}/></div>
                <div className={styles.rightTable}><NewProjectTable dataList={sideList}/></div>
            </div>
        </div> 
    </div>
}
 
CreativeProgram.propTypes = {
 
};
export default CreativeProgram;

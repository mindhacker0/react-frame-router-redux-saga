import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./project-table.css";
import ProjectItem from "./projectItem";
import ReactPage from "../reactPage";
const titleIcon = require("./img/titleIcon.png");
const ProjectTable = function(props){
    const {datalist,pageInfo,onPageChange} = props;
    return <div className={styles.projectTableWrap}>
        <div>
            <div className={styles.projectTableTitle}><img src={titleIcon}/></div>
            <div className={styles.projectTableWrap}>
            {datalist.map((val,key)=>{
                return <ProjectItem {...val} key={`project-item-${key}`}/>
            })} 
            </div>
            <div>
                {datalist.length < 16 ?null:<ReactPage total={datalist.length} current={pageInfo.current} pageSize={pageInfo.PageSize}/>}
            </div>
        </div>
    </div>
}
 
ProjectTable.propTypes = {
 
};
export default ProjectTable;

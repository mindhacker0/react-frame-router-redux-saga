import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./project-table.css";
import ProjectItem from "./projectItem";
const titleIcon = require("./img/titleIcon.png");
const NewProjectTable = function(props){
    const {dataList} = props;
    return <div className={styles.projectTableWrap}>
        <div>
            <div className={styles.projectTableTitle}><img src={titleIcon}/></div>
            <div className={styles.projectTableWrap}>
            {dataList.map((val,key)=>{
                return <ProjectItem {...val} key={`project-item-${key}`}/>
            })} 
            </div>
        </div>
    </div>
}
 
NewProjectTable.propTypes = {
 
};
export default NewProjectTable;

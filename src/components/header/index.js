import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./header.css";
const Header = function(props){
    const {history} = props;
    const menuList = [{
        name:"首页",
        path:"/",
        active:true
    },{
        name:"模型设计",
        path:"/entitydesign",
        active:false
    },{
        name:"科创绘画",
        path:"/creativeprogram",
        active:false
    },{
        name:"竞赛答题",
        path:"/answerrace",
        active:false
    },{
        name:"亲子科普",
        path:"/childscience",
        active:false
    },{
        name:"编程课堂",
        path:"/programclass",
        active:false
    },];
    function pushHistory(path){
        history.push(path);
    }
    return <div className={styles.headWrap}>
        <div className={classNames("middle-wrap",styles.headContent)}>
            <div className={styles.leftSpan}>
                <div><img alt="logo" src={null}/></div>
                <div className={styles.menuWrap}>
                    {menuList.map((val,key)=>{
                        return <div 
                        onClick={pushHistory.bind(null,val.path)}
                        className={classNames(styles.menuItem,val.active && styles.menuItemActive)} 
                        key={`menu-item-${key}`}>
                        <span>{val.name}</span></div>
                    })}
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
}
 
Header.propTypes = {
 
};
export default Header;

import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from "./header.css";
import Login from "../loginBar";
const logoIcon= require("./img/logo.png");
const Header = function(props){
    const {history,location} = props;
    const [pathnow,upadatePath] = useState(location.pathname);
    const menuList = [{
        name:"首页",
        path:"/",
    },{
        name:"模型设计",
        path:"/entitydesign",
    },{
        name:"科创绘画",
        path:"/creativeprogram",
    },{
        name:"竞赛答题",
        path:"/answerrace",
    },{
        name:"亲子科普",
        path:"/childscience",
    },{
        name:"编程课堂",
        path:"/programclass",
    },];
    function pushHistory(path){
        history.push(path);
    }
    useEffect(()=>{
        upadatePath(location.pathname);
    },[location]);
    return <div className={styles.headWrap}>
        <div className={classNames("middle-wrap",styles.headContent)}>
            <div className={styles.leftSpan}>
                <div className={styles.logoWrap}><img alt="logo" src={logoIcon}/></div>
                <div className={styles.menuWrap}>
                    {menuList.map((val,key)=>{
                        return <div 
                        onClick={pushHistory.bind(null,val.path)}
                        className={classNames(styles.menuItem,val.path === pathnow && styles.menuItemActive)} 
                        key={`menu-item-${key}`}>
                        <span>{val.name}</span></div>
                    })}
                </div>
            </div>
            <div className={styles.loginWrap}>
                <Login />
            </div>
        </div>
    </div>
}
 
Header.propTypes = {
 
};
export default Header;

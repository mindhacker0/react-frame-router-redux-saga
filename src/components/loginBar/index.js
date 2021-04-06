import React from "react";
import PropTypes from "prop-types";
import {cloneDeep} from "lodash";
import classNames from "classnames";
import { connect } from "react-redux";
import styles from "./login-bar.css";
import Menu from "../menu";
import {openModal} from "../../reducers/frame/constant";
import {setUserMenuPath} from "../../reducers/user/constant";
const defaultIcon=require("./img/defuser@2x.png");
const LoginBar=({setUserMenuPath,isLogin,openModal,userName,userMenuPath,userIcon,setUserLogin})=>{
    let configMenu=[
        {
        DefineDom:(props)=><div {...props} className={classNames(styles.loginBtn,styles.userInfo)}>
        <div className={styles.userIcon}><img alt="" src={userIcon||defaultIcon}/></div>
        <div className={styles.userName}><span>{userName}</span></div></div>,
        bindEvent:null,
        childrens:[
            {
                title:"我的课程",
                icon:"",
                bindEvent: () => {
                    handleRedirectUrl("personal?type=mycourse");
                },
                childrens:[]
            },{
                title:"作品管理",
                icon:"",
                bindEvent: () => {
                    handleRedirectUrl("personal?type=workmanage");
                },
                childrens:[]
            },{
                title:"个人中心",
                icon:"",
                bindEvent:() => {
                    handleRedirectUrl("personal?type=personcenter");
                },
                childrens:[]
            },{
                title:"账户设置",
                icon:"",
                bindEvent:() => {
                    handleRedirectUrl("personal?type=accountSet");
                },
                childrens:[]
            },{
                title:"退出登录",
                icon:"",
                bindEvent:loginOut,
                childrens:[]
            },]
        }
    ];
    function loginOut() {
        window.remoteStorage.clearValue(() => {});
        // closeAllMenuPath();
        // setUserSession(null);
        // setUserLogin(false);
    }
    function  handleRedirectUrl(url) {
        window.location = `https://shequ.mimadao.com/${url}`;
    }
    function menuClick(LV,IND){
        let newArr=cloneDeep(userMenuPath);
        newArr[LV]=IND;
        console.log(LV,IND,newArr);
        setUserMenuPath(newArr); 
    }
    return (<div className={styles.loginBar}>
        {isLogin?<Menu menuConfig={configMenu} menuPath={userMenuPath} onOpemMenu={menuClick} onClose={()=>{{/*closeAllMenuPath();*/}}}/>:<div className={classNames(styles.loginBtn,styles.userInfo)} onClick={()=>{{openModal("loginModal")}}}>
            <div className={styles.userIcon}><img alt="" src={defaultIcon}/></div>
            <div className={styles.userName}><span>登录/注册</span></div>
        </div>}
    </div>)
}
const mapStateToProps = (state) => {
    const {isLogin,userMenuPath} =state.user;
    const {name,headUrl} =state.user.session;
    return {
        isLogin:isLogin,
        userName:name,
        userIcon:headUrl,
        userMenuPath:userMenuPath
    };
};

const mapDispatchToProps = (dispatch) => ({
    openModal:(modalName)=>dispatch(openModal({modalName})),
    setUserMenuPath:(arr)=>dispatch(setUserMenuPath(arr)),
    // closeAllMenuPath:()=>dispatch(closeAllMenuPath()),
    // setUserLogin:(isLogin)=>dispatch(setUserLogin(isLogin)),
    // setUserSession:(session)=>dispatch(setUserSession(session)),
});

LoginBar.propTypes = {};

export default connect(mapStateToProps,mapDispatchToProps)(LoginBar);
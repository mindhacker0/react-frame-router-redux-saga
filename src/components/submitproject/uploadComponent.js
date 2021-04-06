import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./submit-project.css";
import {openFile} from "../../lib/utils";
import * as qiniu from "qiniu-js";
import { getTokem } from "../../lib/user-server-api";
const uploadIcon = require("./img/upload-icon.png");
const UploadComponent = function(props){
    const {indicator,onuploadFile} = props;
    let token = useRef(null),uploadFileName="";
    const observer={//上传文件监视
        next(res){
            console.log(res);
        },
        error(err){
            console.log(err);
        }, 
        complete(res){
            console.log(res);
            onuploadFile(`https://imgcdn.mimadao.com/${res.key}`)
        }
    },uploadConfig={
        useCdnDomain:true,//使用CDN加速
        concurrentRequestLimit:3,//分片并发请求个数
    };
    function uploadFile(){
        openFile("video/*,image/*",(event)=>{
            let file = event.path[0].files[0];
            let resolveFileName=new RegExp(`([^.\/]+)\.([a-z0-9]+)$`,"i").exec(file.name);
            uploadFileName="byck/"+new Date().getTime()+"."+resolveFileName[2];
            console.log(resolveFileName,token);
            let observable = qiniu.upload(file,uploadFileName,token.current,{},uploadConfig);
            observable.subscribe(observer); // 上传开始
        });
    }
    useEffect(()=>{
        getTokem().then(res=>{
            if(res.isSuccess){
                token.current=res.result.token;
            }
        });
    },[]);
    return <div className={styles.uploadComponentWrap}>
        <div className={styles.uploadBtn} onClick={uploadFile}>
            <div style={{width:"155px"}}>
                <div className={styles.uploadIcon}><img src={uploadIcon}/></div>
                <div className={styles.uploadRemind}><span>{indicator}</span></div>
            </div>
        </div>
    </div>
}
 
UploadComponent.propTypes = {
 
};
export default UploadComponent;

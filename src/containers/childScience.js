import React,{useEffect,useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ChildScience from "../components/childScience";
import {getProjectList} from "../reducers/user/constant";
import {setNoticeList} from "../reducers/frame/constant";
const ChildScienceWrap = ({getProjectList,projects,setNoticeList,sideList}) =>{
    const [pageInfo,setPageInfo] = useState({
        current:1,
        PageSize:16
      });
      useEffect(()=>{
        getProjectList({
          ProjectType:2,
          PageIndex:pageInfo.current,
          PageSize:pageInfo.PageSize,
        });
        getProjectList({
          ProjectType:2,
          PageIndex:1,
          PageSize:10,
          OrderColumn:"createTime",
          IsAsc:false
        });
    },[getProjectList,pageInfo]);
    function setNotice(){
        setNoticeList([{
            title:"作品主题",
            content:"围绕趣味生活现象、AI人工机器人、生活科技小实验、创客制作、编程作品等赛事创作。"
        },{
            title:"视频长度和格式要求",
            content:"视频长度控制在1分钟之内，共分两组。15秒～30秒为微视频组，30秒～1分钟为短视频组。视频格式为可兼容的主流视频格式（包括MP4、MOV、MPEG等），横竖屏皆可。"
        },{
            title:"作品要求：",
            content:"提交的作品要求声音和画面同步，画面清晰，声音无失真、噪声杂音干扰、音量忽大忽小现象。视频要含有个人介绍、创作背景介绍及科普内容操作展示。同时提交学校、班级、学生姓名、性别、年龄等信息。"
        }]);
    }
    return <ChildScience  
        datalist ={projects} 
        sideList = {sideList}
        pageInfo = {pageInfo}
        setNotice = {setNotice}
        onPageChange={()=>{console.log("pagechange")}}
    />
}

ChildScienceWrap.propTypes = {
  
};

const mapStateToProps = (state) => {
    const {projects,orderProject} = state.user;
    return {
      projects:projects,
      sideList:orderProject
    }
};

const mapDispatchToProps = (dispatch) => ({
    getProjectList:(params)=>dispatch(getProjectList({params})),
    setNoticeList:(noticeList)=>dispatch(setNoticeList({noticeList})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildScienceWrap);

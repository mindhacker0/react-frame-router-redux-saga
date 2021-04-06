import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EntityDesign from "../components/entityDesign";
import {getProjectList} from "../reducers/user/constant";
import {setNoticeList} from "../reducers/frame/constant";
const EntityDesignWrap = ({getProjectList,projects,setNoticeList,sideList}) =>{
    const [pageInfo,setPageInfo] = useState({
      current:1,
      PageSize:16
    });
    useEffect(()=>{
      getProjectList({
        ProjectType:0,
        PageIndex:pageInfo.current,
        PageSize:pageInfo.PageSize,
      });
      getProjectList({
        ProjectType:0,
        PageIndex:1,
        PageSize:10,
        OrderColumn:"createTime",
        IsAsc:false
      });
    },[getProjectList,pageInfo]);
    function setNotice(){
      setNoticeList([{
          title:"作品主题",
          content:"《展开科技翅膀，放飞科技梦想》"
      },{
          title:"作品种类",
          content:"采用生活中常见材料，如塑料瓶、纸筒等可回收材料，制作与活动主题相关的模型，如机器人、火箭、飞机模型等。"
      },{
          title:"作品要求：",
          content:"完成模型设计制作，用高7cm、宽10cm的白色纸，注明作品名称、指导老师、学生姓名、班级、联系方式，同时从作品正面、侧面与学生手持作品的三个角度拍照，上传“科学城小学·云上科技嘉年华”线上平台的模型设计栏。"
      }]);
    }
    return <EntityDesign
    datalist ={projects} 
    sideList = {sideList}
    pageInfo = {pageInfo}
    setNotice = {setNotice}
    onPageChange={()=>{console.log("pagechange")}}
    />
}

EntityDesignWrap.propTypes = {
  
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

export default connect(mapStateToProps, mapDispatchToProps)(EntityDesignWrap);

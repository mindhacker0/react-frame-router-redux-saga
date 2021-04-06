import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreativeProgram from "../components/creativeProgram";
import {getProjectList} from "../reducers/user/constant";
import {setNoticeList} from "../reducers/frame/constant";
const CreativeProgramWrap = ({getProjectList,projects,setNoticeList,sideList}) =>{
    const [pageInfo,setPageInfo] = useState({
      current:1,
      PageSize:16
    });
    useEffect(()=>{
      getProjectList({
        ProjectType:1,
        PageIndex:pageInfo.current,
        PageSize:pageInfo.PageSize,
      });
      getProjectList({
        ProjectType:1,
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
          title:"视频长度和格式要求",
          content:"参赛作品的画种、绘画风格及使用材料不限"
      },{
          title:"作品要求：",
          content:"4k画纸、无需装裱，在绘面反面右下角处粘贴高7cm、宽10cm的白色纸标明作品名称、学校、班级、学生姓名、性别、年龄、辅导老师等信息或直接把以上信息用铅笔写在作品背面右下角。"
      }]);
    }
    return <CreativeProgram 
      datalist ={projects} 
      sideList = {sideList}
      pageInfo = {pageInfo}
      setNotice = {setNotice}
      onPageChange={()=>{console.log("pagechange")}}
    />
}

CreativeProgramWrap.propTypes = {
  
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

export default connect(mapStateToProps, mapDispatchToProps)(CreativeProgramWrap);

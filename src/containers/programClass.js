import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProgramClass from "../components/programClass";
import {getVideoClass} from "../reducers/user/constant";
const ProgramClassWrap = ({getVideoClass,videoClassList}) =>{
    useEffect(()=>{
        getVideoClass({
            PageIndex:1,
            PageSize:50
        })
    },[getVideoClass])
    return <ProgramClass dataList={videoClassList}/>
}

ProgramClassWrap.propTypes = {
  
};

const mapStateToProps = (state) => {
    const {videoClassList} = state.user;
    return {
        videoClassList:videoClassList
    }
};

const mapDispatchToProps = (dispatch) => ({
    getVideoClass:(params)=>dispatch(getVideoClass(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramClassWrap);

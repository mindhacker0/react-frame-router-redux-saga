import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SubmitProject from "../components/submitproject";
import {getsearchParams} from "../lib/utils";
import {getParticipant,addUserReportForm,submitUserProject,getSaveProject} from "../reducers/user/constant";
const SubmitProjectWrap = ({getParticipant,
    participantInfo,
    saveProjectInfo,
    addUserReportForm,
    getSaveProject,
    submitUserProject}) =>{
    const defaultProjectType = getsearchParams()?.from || 0;//获取参赛类型
    useEffect(()=>{
        getParticipant();
        getSaveProject(defaultProjectType);
    },[getParticipant,getSaveProject]);
    return <SubmitProject 
        participantInfo={participantInfo} 
        saveProjectInfo={saveProjectInfo}
        addUserReportForm={addUserReportForm}
        submitUserProject={submitUserProject}
        getSaveProject={getSaveProject}
        defaultProjectType={defaultProjectType}
    />
}

SubmitProjectWrap.propTypes = {
  
};

const mapStateToProps = (state) => {
    const {participantInfo,saveProject} = state.user;
    return {
        participantInfo:participantInfo,
        saveProjectInfo:saveProject
    }
};

const mapDispatchToProps = (dispatch) => ({
    getParticipant:()=>dispatch(getParticipant()),
    addUserReportForm:(params)=>dispatch(addUserReportForm({params})),
    submitUserProject:(params)=>dispatch(submitUserProject({params})),
    getSaveProject:(projectType)=>dispatch(getSaveProject({projectType})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProjectWrap);

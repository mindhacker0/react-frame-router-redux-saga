import PropTypes from "prop-types";
import classNames from "classnames";
import {cloneDeep} from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import styles from "./submit-project.css";
import Select from 'react-select';
import UploadComponent from "./uploadComponent";
import {getSchoolList,getGradeList,getClassList} from "../../lib/user-server-api";
const initState = {
    "id": 0,
    "name": "",
    "sex": null,
    "schoolId": null,
    "gradeId": null,
    "classId": null,
    "patriarchName": "",
    "patriarchPhone": "",
    "adviserName": "",
    "adviserPhone": ""
};
const reducer = (state = initialState, { type, payload }) => {
	switch(type) {
		case 'replaceOne':
			return {
				...state,
				[payload.key]: payload.value
			};
        case 'replaceAll':
            console.log(payload)
            let newState = cloneDeep(state);
            for(let i in payload.newState){
                if(i in initState){
                    newState[i] = payload.newState[i];
                }
            }
            return newState;
		default:
			return state;
	}
};
const action = (type, payload) => ({ type, payload });
const SubmitProject = function(props){
    const {participantInfo,saveProjectInfo,addUserReportForm,submitUserProject,defaultProjectType} = props;
    useState(()=>{
        getSchoolList().then(res=>{
            if(res.isSuccess){
                setSchoolOptions(res.result.items.map((val)=>({value:val.id,label:val.name})));
            }
        });
        getGradeList().then(res=>{
            if(res.isSuccess){
                setGradeOptions(res.result.items.map((val)=>({value:val.id,label:val.name})));
            }
        });
        getClassList().then(res=>{
            if(res.isSuccess){
                setClassesOptions(res.result.items.map((val)=>({value:val.id,label:val.name})));
            }
        });
    },[addUserReportForm,submitUserProject]);
    useEffect(()=>{//还原数据
        if(participantInfo.id && schoolOptions.length && gradeOptions.length && classesOptions.length){//用户已填写
            const {sex,schoolId,gradeId,classId} = participantInfo;
            participantInfo.sex = [{value:0,label:'男'},{value:1,label:'女'}].filter((val)=>(val.value === sex))[0];
            participantInfo.schoolId = schoolOptions.filter((val)=>(val.value === schoolId))[0];
            participantInfo.gradeId = gradeOptions.filter((val)=>(val.value === gradeId))[0];
            participantInfo.classId = classesOptions.filter((val)=>(val.value === classId))[0];
            console.log(schoolOptions,participantInfo);
            dispatch(action('replaceAll',{newState:participantInfo}));
        }
    },[participantInfo,schoolOptions,gradeOptions,classesOptions]);
    useEffect(()=>{
        if(saveProjectInfo?.id){
            const {title,describe,coverUrl,makerProjectDetails} =saveProjectInfo;
            setProjectTitle(title);
            setProjectDes(describe);
            setCoverImage(coverUrl);
            setImageList(makerProjectDetails.filter(val=>val.thumbnailUrl).map(val=>val.thumbnailUrl));
            setVideoList(makerProjectDetails.filter(val=>val.videoSrc).map(val=>val.videoSrc));
        }
    },[saveProjectInfo]);
    const [state,dispatch] = useReducer(reducer,initState);
    const [schoolOptions,setSchoolOptions] = useState([]);
    const [gradeOptions,setGradeOptions] = useState([]);
    const [classesOptions,setClassesOptions] = useState([]);
    const groupOptions = [ 
        {value:0,label:'模型设计'},
        {value:1,label:'科创绘画'},
        {value:2,label:'亲子科普'},
    ];
    function saveParticipant(){//提交用户信息
        const {id,name,sex,schoolId,gradeId,classId,patriarchName,patriarchPhone,adviserName,adviserPhone} = state;
        addUserReportForm({
            "id":id,
            "name":name,
            "sex":typeof sex === "object" ?sex.value:sex,
            "schoolId":typeof schoolId === "object" ?schoolId.value:schoolId,
            "gradeId":typeof gradeId === "object"?gradeId.value:gradeId,
            "classId":typeof classId === "object"?classId.value:classId ,
            "patriarchName":patriarchName,
            "patriarchPhone":patriarchPhone,
            "adviserName":adviserName,
            "adviserPhone":adviserPhone
        });
    }
    const [projectTitle,setProjectTitle] = useState("");
    const [projectDes,setProjectDes] = useState("");
    const [projectType,setProjectType] = useState(groupOptions.filter((val)=>(val.value == defaultProjectType))[0]);
    const [coverImage,setCoverImage] = useState(null);
    const [imageList,setImageList] = useState([]);
    const [videoList,setVideoList] = useState([]);
    function saveProject(){//保存草稿
        const {id}=state;
        let allProject = imageList.map((val)=>({thumbnailUrl:val})).concat(videoList.map((val)=>({videoSrc:val})))
        let params = {
            id:saveProjectInfo.id || 0,
            title:projectTitle,
            coverUrl:coverImage,
            participantId:id,
            status:0,
            describe:projectDes,
            projectType:projectType.value,
            makerProjectDetails:allProject
        };
        submitUserProject(params);
    }
    function submitProject(){//提交
        const {id}=state;
        let allProject = imageList.map((val)=>({thumbnailUrl:val})).concat(videoList.map((val)=>({videoSrc:val})))
        let params = {
            id:saveProjectInfo.id || 0,
            title:projectTitle,
            coverUrl:coverImage,
            participantId:id,
            status:1,
            describe:projectDes,
            projectType:projectType.value,
            makerProjectDetails:allProject
        };
        submitUserProject(params);
    }
    function cencel(){//取消
        
    }
    function addImage(url){
        let list = cloneDeep(imageList);
        list.push(url);
        setImageList(list);
    }
    function addVideo(url){
        let list = cloneDeep(videoList);
        list.push(url);
        setVideoList(list);
    }
    return <div className={styles.submitProjectWrap}>
       <div className={classNames(styles.submitProjectContainer,"middle-wrap")}>
        <div className={styles.submitProjectForm}>
            <div className={styles.formIndex}><span>1</span></div>
            <div className={styles.formContent}>
                <div className={styles.formInstruct}>
                    <h4>核对参赛信息</h4>
                    <p>*请核对下方参赛信息，若有误可修改</p>
                </div>
                <div className={styles.formWrap}>
                    <div className={styles.formItem}>
                        <label>*选手姓名</label>
                        <div>
                            <input value={state.name||""} onChange={(e)=>{dispatch(action("replaceOne",{key:"name",value:e.target.value}))}} placeholder="请输入" />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>*性别</label>
                        <div>
                            <Select
                            placeholder="请选择"
                            value={state.sex}
                            onChange={(select)=>{dispatch(action("replaceOne",{key:"sex",value:select}))}}
                            options={[{value:0,label:'男'},{value:1,label:'女'}]}
                            />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>*学校</label>
                        <div>
                            <Select
                            placeholder="请选择"
                            value={state.schoolId}
                            onChange={(select)=>{dispatch(action("replaceOne",{key:"schoolId",value:select}))}}
                            options={schoolOptions}
                            />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>*年级</label>
                        <div>
                            <Select
                            placeholder="请选择"
                            value={state.gradeId}
                            onChange={(select)=>{dispatch(action("replaceOne",{key:"gradeId",value:select}))}}
                            options={gradeOptions}
                            />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>*班级</label>
                        <div>
                            <Select
                            placeholder="请选择"
                            value={state.classId}
                            onChange={(select)=>{dispatch(action("replaceOne",{key:"classId",value:select}))}}
                            options={classesOptions}
                            />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>*家长姓名</label>
                        <div>
                            <input value={state.patriarchName} onChange={(e)=>{dispatch(action("replaceOne",{key:"patriarchName",value:e.target.value}))}} placeholder="请输入家长姓名" />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>*家长电话</label>
                        <div>
                            <input value={state.patriarchPhone} onChange={(e)=>{dispatch(action("replaceOne",{key:"patriarchPhone",value:e.target.value}))}} placeholder="请输入家长电话" />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>指导老师</label>
                        <div>
                            <input value={state.adviserName} onChange={(e)=>{dispatch(action("replaceOne",{key:"adviserName",value:e.target.value}))}} placeholder="请输入指导老师姓名" />
                        </div>
                    </div>
                    <div className={styles.formItem}>
                        <label>指导老师电话</label>
                        <div>
                            <input value={state.adviserPhone} onChange={(e)=>{dispatch(action("replaceOne",{key:"adviserPhone",value:e.target.value}))}} placeholder="请输入指导老师电话" />
                        </div>
                    </div>
                </div>
                <div className={styles.submitBtnGroup}>
                    <div className={styles.submitBtn} onClick={saveParticipant}><span>保存</span></div>
                </div>
            </div>
        </div>
        <div className={styles.submitProjectForm}>
            <div className={styles.formIndex}><span>2</span></div>
            <div className={styles.formContent}>
                <div className={styles.formInstruct}>
                    <h4>上传参赛作品</h4>
                    <p>*请保留原文件，用于作品相关文件提交</p>
                </div>
                <div className={styles.formWrap}>
                    <div className={styles.matchGroup}>
                        <label>参赛组别:</label>
                        <div className={styles.inlineForm}>
                            <Select
                            height="34px"
                            placeholder="请选择"
                            value={projectType}
                            onChange={(val)=>{setProjectType(val)}}
                            options={groupOptions}
                            />
                        </div>
                    </div>
                    <div className={styles.formCol}>
                        <div className={styles.projectName}>
                            <input value={projectTitle} onChange={(e)=>setProjectTitle(e.target.value)}  placeholder="请输入作品名称"/>
                        </div>
                    </div>
                    <div className={styles.formCol}>
                        <div className={styles.projectDes}>
                            <textarea value={projectDes} onChange={(e)=>setProjectDes(e.target.value)} placeholder="请输入作品描述"/>
                        </div>
                    </div>
                    <div className={styles.uploadWrap}>
                        <div className={styles.uploadTitle}><span>上传封面</span></div>
                        <div className={styles.uploadContent}>
                            <UploadComponent onuploadFile={(url)=>{setCoverImage(url)}} indicator={"上传封面"}/>
                            <div className={styles.displayItem}><img src={coverImage}/></div>
                        </div>
                    </div>
                    <div className={styles.uploadWrap}>
                        <div className={styles.uploadTitle}><span>上传图片</span><span className={styles.uploadRestric}>注：最多上传3张图片</span></div>
                        <div className={styles.uploadContent}>
                            <UploadComponent onuploadFile={addImage} indicator={"支持jpg/gif/png格式RGB模式，不超过10M拖拽图片可调整排序"}/>
                            {imageList.map((val,key)=>{
                                return <div className={styles.displayItem} key={`image-item-${key}`}><img src={val}/></div>
                            })}
                        </div>
                    </div>
                    <div className={styles.uploadWrap}>
                        <div className={styles.uploadTitle}><span>上传视频</span><span className={styles.uploadRestric}>注：视频不超过500M</span></div>
                        <div className={styles.uploadContent}>
                            <UploadComponent onuploadFile={addVideo} indicator={"上传视频"}/>
                            {videoList.map((val,key)=>{
                                return <div className={styles.displayItem} key={`video-item-${key}`}><video src={val} controls/></div>
                            })}
                        </div>
                    </div>
                </div>
                <div className={styles.submitBtnGroup}>
                    <div style={{width:"190px"}} className={styles.submitBtn} onClick={saveProject}><span>保存草稿</span></div>
                    <div style={{width:"190px"}} className={styles.submitBtn} onClick={submitProject}><span>提交参赛</span></div>
                    <div className={styles.disableBtn} onClick={cencel}><span>取消</span></div>
                </div>
            </div>
        </div>
       </div>
    </div>
}
 
SubmitProject.propTypes = {
 
};
export default SubmitProject;

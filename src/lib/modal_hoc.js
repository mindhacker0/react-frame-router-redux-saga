import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../reducers/frame/constant";
import UserLogin from "../containers/login";
import NoticeModal from "../components/noticeModal";
import VideoModal from "../components/videoModal";
import ProjectModal from "../components/projectModal";
const ModalHoc=(WrappedComponent)=>{
    class AppWapper extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            const {loginModal,noticeModal,videoModal,projectModal,closeModal,...componentProps} = this.props;
            return  <div className="modals-wear">
            {loginModal ? <UserLogin onRequestClose={()=>{closeModal("loginModal")}} /> : null}
            <NoticeModal isOpen={noticeModal} onClose={()=>{closeModal("noticeModal")}}/>
            <ProjectModal isOpen={projectModal} onClose={()=>{closeModal("projectModal")}}/>
            <VideoModal isOpen={videoModal} onClose={()=>{closeModal("videoModal")}}/>
            <WrappedComponent { ...componentProps }/>
        </div>
        }
    }
    const mapStateToProps = (state) => {
        const {loginModal,noticeModal,videoModal,projectModal}=state.frame;
        return {
            loginModal:loginModal,
            noticeModal:noticeModal,
            videoModal:videoModal,
            projectModal:projectModal
        }
    };
    const mapDispatchToProps = (dispatch) => ({
        closeModal:(modalName)=>dispatch(closeModal({modalName}))
    });
    return connect(mapStateToProps, mapDispatchToProps)(AppWapper);
}

export default ModalHoc;
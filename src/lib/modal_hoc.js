import React from "react";
import { connect } from "react-redux";
// import { closeModal } from "../store/GUI/actions";
// import ColorSelectModalWrap from "../container/colorSelectModal";
const ModalHoc=(WrappedComponent)=>{
    class AppWapper extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            const { colorSelectModal,closeModal,...componentProps} = this.props;
            return  <div className="modals-wear">
            {/* <ColorSelectModalWrap isOpen={colorSelectModal} onClose={()=>{closeModal("colorSelectModal")}}/> */}
            <WrappedComponent { ...componentProps }/>
        </div>
        }
    }
    const mapStateToProps = (state) => {
        // const {colorSelectModal}=state.GUIConfig;
        return {
            // colorSelectModal:colorSelectModal,
        }
    };
    const mapDispatchToProps = (dispatch) => ({
        // closeModal:(modalName)=>dispatch(closeModal(modalName))
    });
    return connect(mapStateToProps, mapDispatchToProps)(AppWapper);
}

export default ModalHoc;
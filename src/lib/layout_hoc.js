import React from "react";
import { connect } from "react-redux";
import Header from "../containers/header";
import Footer from "../containers/footer";
import * as browserHistory from 'react-router';
const LayoutHoc=(WrappedComponent)=>{
    class AppWapper extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            const {...componentProps} = this.props;
            console.log(browserHistory,this.props);
            return  <div className='app-layout'>
                    <Header />
                    <div className='content'><WrappedComponent { ...componentProps }/></div>
                    <Footer />
                </div>
        }
    }
    const mapStateToProps = (state) => {
        return {
           
        }
    };
    const mapDispatchToProps = (dispatch) => ({
        
    });
    return connect(mapStateToProps, mapDispatchToProps)(AppWapper);
}

export default LayoutHoc;
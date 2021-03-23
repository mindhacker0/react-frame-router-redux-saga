import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../components/header";
const HeaderWrap = (props) => (
  <Header  {...props}/>
);

HeaderWrap.propTypes = {
  
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrap);

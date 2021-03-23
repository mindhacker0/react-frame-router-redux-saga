import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Footer from "../components/footer";
const FooterWrap = (props) => (
  <Footer  {...props}/>
);

FooterWrap.propTypes = {
  
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(FooterWrap);

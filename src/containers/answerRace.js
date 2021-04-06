import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AnswerRace from "../components/answerRace";
const AnswerRaceWrap = (props) => (
  <AnswerRace  {...props}/>
);

AnswerRaceWrap.propTypes = {
  
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerRaceWrap);

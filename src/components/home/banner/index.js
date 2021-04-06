import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./banner.css";
const Banner = (props) => {
    return <div>
        <div className={styles.imgWrap}>
            <img src={require("./img/banner.png")}/>
        </div>
    </div>
}

Banner.propTypes = {
  
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);

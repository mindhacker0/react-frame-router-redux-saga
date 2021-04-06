import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./banner.css";
import Swiper from "swiper";
const prevIcon = require("./img/prev-icon.png");
const nextIcon = require("./img/next-icon.png");
const Banner = ({list}) => {
    let bannerDom = React.createRef();
    useEffect(()=>{
        new Swiper(bannerDom.current, {
            loop:true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            speed: 300,
            autoplay: {
              delay: 3000,
            },
            observer: true,
            observeParents: true,
            disableOnInteraction: false,
        });
    },[list]);
    return <div className="swiper-container" ref={bannerDom}>
        <div className={classNames(styles.imgWrap,"swiper-wrapper")}>
        {list.map((val,key)=>{
            return <div className={classNames(styles.imgItem,"swiper-slide")} key={`preject-item-${key}`}><img src={val.thumbnailUrl} alt=""/></div>
        })}
        </div>
        <div className={classNames(styles.projectPrev,"swiper-button-prev")}><img src={prevIcon}/></div>
        <div className={classNames(styles.projectNext,"swiper-button-next")}><img src={nextIcon}/></div>
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

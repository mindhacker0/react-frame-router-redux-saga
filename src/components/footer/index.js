import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./footer.css";
// const footerBg = require("./img/footer_bg.png");
const Footer = function(props){
    const {} = props;
    return <div className={styles.footerWrap}>
       <div className={classNames(styles.footerContainer,"middle-wrap")}>
            <div className={styles.footerRightLayout}>
                <div className={styles.anchorList}><span>关于活动</span><i>|</i><span>关于大赛</span><i>|</i><span>下载中心</span><i>|</i><span>联系我们</span></div>
                <div className={styles.policPower}>
                    <p>
                    广州密码营地教育科技有限公司 | <a target="blank" style={{color:"#fff"}} href="https://beian.miit.gov.cn">粤ICP备18122827号@MIMADAO.COM</a> | <i className={styles.iconPolic}></i>粤公安网备 44010402002272
                    </p>
                </div>
            </div>
       </div>
    </div>
}
 
Footer.propTypes = {
 
};
export default Footer;

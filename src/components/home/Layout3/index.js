import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import styles from "./layout3.css";
import Swiper from "swiper";
const Layout3 = (props) => {
    const dataList=[{
        title:"科技绘画",
        banner:require("./img/banner2.png"),
        content:["科技、科学幻想画是引导学生接触科学、探索科学、热爱科学的好方法，也是培养少年学生的想象思维能力的一种途径。为更好的引导学生接触科学、探索科学、热爱科学，培养少年儿童的科学想象力、创新意识和探究性学习的能力，科学城小学北校区举办《展开科技翅膀，放飞科技梦想》作品征集活动。",
        "本次活动共评出特等奖1名、一等奖1名、二等奖3名、三等奖6名、优秀奖若干名。所有获奖学生均有获奖证书。",],
        des:["参加对象：二年级学生 ","作品征集：2021年3月31日-4月9日（拟定）","作品评审：4月12日（拟定）","作品颁奖：4月14日（拟定）"]
    },{
        title:"科普知识",
        banner:require("./img/banner3.png"),
        content:["为进一步在学生中推广和普及科学知识，培养学生“爱科学、学科学、用科学”的好习惯，以积分排名模式在线开展科普知识闯关竞答活动，每位学生有三次竞答机会，排名以最高分为准。 ",
        "本次活动按参与人数比例共评出“最乐学之星”3名、一等奖3名、二等奖5名、三等奖9名、优秀奖若干名。闯关成功并获得排名前20名者平台将自动发放电子证书。",],
        des:["参加对象：全校学生 ","作品征集：2021年3月31日-4月9日（拟定）","作品评审：4月12日（拟定）","作品颁奖：4月14日（拟定）"]
    },{
        title:"亲子科普",
        banner:require("./img/banner4.png"),
        content:["学生结合生活、学习中了解到的科技科普知识或科技编程应用，与家长共同完成拍摄亲子科普解说短视频。",
        "本次活动共评出特等奖3名、一等奖1名、二等奖3名、三等奖6名、优秀奖若干名。所有获奖学生均有获奖证书。",],
        des:["参加对象：一年级学生（15秒～30秒为微视频组，30秒～1分钟为短视频组）","作品征集：2021年3月31日-4月9日（拟定）","作品评审：4月12日（拟定）","作品颁奖：4月14日（拟定）"]
    },];
    let bannerDom = React.createRef();
    useEffect(()=>{
        console.log(bannerDom)
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
    },[])
    return <div className={styles.homeLayout}>
        <div className={styles.homeTitle}><img src={require("../img/home-title3.png")}/></div>
        <div className="swiper-container" ref={bannerDom}>
            <div className="swiper-wrapper">
                {dataList.map((val,key)=>{
                    return   <div className={classNames(styles.flexOneLine,"swiper-slide")} key={`layout3-item-${key}`}>
                    <div className={styles.leftSpan}>
                        <img src={val.banner}/>
                    </div>
                    <div className={styles.rightSpan}>
                        <div>
                            <div className={styles.boxContentTitle}><span>{val.title}</span></div>
                            <div className={styles.boxContentText}>
                                {val.content.map((cval,keys)=>{
                                    return <p key={`text-${key}-${keys}`} style={{textIndent:keys===0?"2em":"0em"}}>{cval}</p>
                                })}
                            </div>
                            <div className={styles.boxContentRules}>
                                <p>*活动说明</p>
                                {val.des.map((cval,keys)=>{
                                    return <p key={`rule-${key}-${keys}`}>{cval}</p>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                })}
            </div>
        </div>
    </div>
}

Layout3.propTypes = {
  
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout3);

import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useState } from "react";
import styles from "./home.css";
import Banner from "./banner";
import Layout3 from "./Layout3";
import Layout4 from "./Layout4";
const prizeIcon = require("./img/prizeIcon.png");
const LayoutImg = require("./img/layout2.png");
const Home = function(props){
    const {} = props;
    return <div className={styles.homeWrap}>
        <Banner />
        <div className={classNames(styles.homeContainer,"middle-wrap")}>
            <div className={styles.homeLayout1}>
                <div className={styles.homeTitle}><img src={require("./img/home-title1.png")}/></div>
                <div className={styles.textContent}>
                    <p>为了引导学生关注现代科技新发展和新成果，积极参与科技创新实践和体验活动，积极倡导学生开展以动手探究为主题的科技活动，培养创新思维、创新精神以及实践探究能力，提高学生爱科学、学科学和用科学的意识、兴趣和能力，科学城小学北校区为进一步着力打造学校“科技教育”特色，突出科技创新亮点，特举办“展开科技翅膀，放飞科技梦想”科技嘉年华活动。</p>
                </div>
                <div style={{marginTop:"40px"}}>
                    <div className={styles.subTitle}>
                        <div className={styles.subTitleName}><img src={prizeIcon}/><span>学校简介</span></div>
                        <div className={styles.subTitleContent}>
                            <p style={{textIndent:"2em"}}>科学城小学北校区位于广州市黄埔区广汕公路与天鹿南路交汇处，地铁6号线黄陂站北侧，峰湖御景楼盘境内。学校于2018年9月1日正式开办。学校坚持以习近平新时代中国特色社会主义思想，全面贯彻党的教育方针，牢牢把握育人根本任务。学校希望把孩子们培养成为热爱生命、热爱自然、热爱生活、热爱学习、积极进取的阳光少年。 </p>
                            <p>科学城小学北校区将成为孩子们学习成长的生态校园、智能校园、智慧校园、诗意校园。</p>
                        </div>
                    </div>
                    <div className={styles.subTitle}>
                        <div className={styles.subTitleName}><img src={prizeIcon}/><span>比赛主题</span></div>
                        <div className={styles.subTitleContent}>
                            <p style={{textIndent:"2em"}}>创意编程比赛主题：<span className={styles.strength}>展开科技翅膀 放飞科技梦想</span></p>
                        </div>
                    </div>
                    <div className={styles.subTitle}>
                        <div className={styles.subTitleName}><img src={prizeIcon}/><span>组织机构</span></div>
                        <div className={styles.subTitleContent}>
                            <p style={{textIndent:"2em"}}><span className={styles.weight}>主办单位：</span>广州市黄埔区科学城小学北校区</p>
                            <p style={{textIndent:"2em"}}><span className={styles.weight}>承办单位：</span>广州密码营地教育科技有限公司</p>
                            <p style={{textIndent:"2em"}}><span className={styles.weight}>协办单位：</span>广州市黄埔区青少年宫、广州市黄埔区科学技术协会、蚁米公司、思而创机器人</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.homeLayout2}>
                <div className={styles.homeTitle}><img src={require("./img/home-title2.png")}/></div>
                <div className={styles.flexOneLine}>
                    <div className={styles.leftSpan}>
                        <div className={styles.subTitle}>
                            <div className={styles.subTitleName}><img src={null}/><span>活动说明</span></div>
                            <div className={styles.subTitleContent}>
                                <p style={{textIndent:"2em"}}>本次活动由云上科技嘉年华和校园科创活动两部分组成。</p>
                                <p style={{textIndent:"2em",marginTop:"20px"}} ><span className={styles.weight}>云上科技嘉年华：</span></p>
                                <p> ① 科技项目：科技教育·编程微课堂、快问快答科普知识、科技科幻绘画等科技项目专栏赛事。</p>
                                <p> ② 科学活动：科技编程小制作、亲子科普解说短视频等科学活动栏目。</p>
                                <p style={{textIndent:"2em",marginTop:"20px"}} ><span className={styles.weight}>校园科普科创活动：</span></p>
                                <p> ① 开幕式当天，举行智能科创展游园活动，设立编程运算达人、趣味图形化编程、3D打印、智能循迹小车、果汁乐器、智能无人机、掌上小电脑、Python体验等科普科创体验摊位。</p>
                            </div>
                        </div>
                        <div className={styles.subTitle}>
                            <div className={styles.subTitleName}><img src={null}/><span>人员范围</span></div>
                            <div className={styles.subTitleContent}>
                                <p>科学城小学北校区全体老师、学生、家长</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightSpan}>
                        <img src={LayoutImg}/>
                    </div>
                </div>
            </div>
            <Layout3 />
            <Layout4 />
            <div className={styles.rightDeclear}>
                <div><span>参赛作品的著作权归作者所有，使用权由作者与主办单位共享，主办单位有权出版、展示、宣传参赛作品。</span></div>
            </div>
        </div>
    </div>
}
 
Home.propTypes = {
 
};
export default Home;

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./layout4.css";
const Layout4 = (props) => {
    const plateList =[{
       title:"模型设计",
       image:require("./img/plate1.png"),
       des:"引入绘画、录音、摄影等多媒体手段，用新媒体互动手法实现音乐、美术方面的创意展示。"
    },{
        title:"科创绘画",
        image:require("./img/plate2.png"),
        des:"各种竞技类、探险类、角色扮演类、球类、棋牌类游戏等等。"
     },{
        title:"科普知识",
        image:require("./img/plate3.png"),
        des:"针对实用价值、解决学习与生活中的知识。"
     },{
        title:"亲子科普",
        image:require("./img/plate4.png"),
        des:"显示生活趣味现象、科学研究试验等各学科的趣味性展示。"
     },];
    const featureList =[{
        title:"作品原创",
        image:require("./img/feature1.png"),
        des:"作品必须为作者原创，无版权争议。若发现涉嫌抄袭或侵犯他人著作权的行为，一律取消评奖资格。如涉及作品原创问题的版权纠纷，由申报者承担责任。"
     },{
        title:"创新创造",
        image:require("./img/feature2.png"),
        des:"作品主题鲜明，创意独特，表达形式新颖，构思巧妙，充分发挥想象力。"
     },{
        title:"构思设计",
        image:require("./img/feature3.png"),
        des:"作品构思完整，内容主题清晰，有始有终；创意来源于学习生活，积极健康，反应青少年的年龄心智特点和玩乐思维。"
     },{
        title:"用户体验",
        image:require("./img/feature4.png"),
        des:"观看或操作流程简易，无复杂、多余步骤；人机交互顺畅，用户体验良好。"
     },{
        title:"艺术审美",
        image:require("./img/feature5.png"),
        des:"作品必须为作者原创，无版权争议。若发现涉嫌抄袭或侵犯他人著作权的行为，一律取消评奖资格。如涉及作品原创问题的版权纠纷，由申报者承担责任。"
     },{
        title:"程序技术",
        image:require("./img/feature6.png"),
        des:"合理正确地使用编程技术，程序运行稳定、流畅、高效，无明显错误；程序结构划分合理，代码编写规范，清晰易读；通过多元、合理的算法解决复杂的计算问题，实现程序的丰富效果。"
     },];
    return <div>
            <div className={styles.plateWrap}>
                <div className={styles.homeTitle}><img src={require("../img/home-title4.png")}/></div>
                <div style={{paddingTop:"50px"}}>
                    {plateList.map((val,key)=>{
                        return   <div key={`plate-item-${key}`} className={styles.plateItem}>
                            <div className={styles.icon}><img src={val.image}/></div>
                            <div className={styles.title}><span>{val.title}</span></div>
                            <div className={styles.describe}><span>{val.des}</span></div>
                        </div>
                    })}
                </div>
            </div>
            <div className={styles.featureWrap}>
            {featureList.map((val,key)=>{
                return   <div key={`feature-item-${key}`} className={styles.featureItem}>
                    <div className={styles.icon}><img src={val.image}/></div>
                    <div>
                        <div className={styles.title}><span>{val.title}</span></div>
                        <div className={styles.describe}><span>{val.des}</span></div>
                    </div>
                </div>
            })}
            </div>
        </div>
}

Layout4.propTypes = {
  
};

const mapStateToProps = (state) => {
  return {
  
  }
};

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout4);

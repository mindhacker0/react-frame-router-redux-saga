import classNames from "classnames";
import bindAll from "lodash.bindall";
import PropTypes from "prop-types";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import tabStyles from "react-tabs/style/react-tabs.css";
import Modal from "./modal";
//import Modal from "react-modal";
import styles from "./login.css";
import MobileLogin from "./mobilelogin";
import UserPassWord from "./userPassLogin";
import UserRegister from "./UserRegister";
import ThirdLogin from "./thirdLodin";
import {
  getWeChatAuthorize,
  getQQAuthorize,
  wechatLogin,
  qqLogin,
  getUserInfo,
} from "../../lib/user-server-api";

import { store } from "react-notifications-component";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      "handleClose",
      "onActivateTab",
      "handleregister",
      "handlelogin",
      "handleChangeLogin",
      "handleweChatLogin",
      "handleQQLogin",
      "handleHashChange",
    ]);
    this.state = { activeTabIndex: 0, type: "login" };
    this.hostname = `${window.location.protocol}//${window.location.host}/static`;
  }
  componentDidMount() {
    window.addEventListener("hashchange", this.handleHashChange);
  }
  componentWillUnmount() {
    window.removeEventListener("hashchange", this.handleHashChange);
  }
  handleClose() {
    this.props.onRequestClose();
  }
  onActivateTab(tab) {
    this.setState({ activeTabIndex: tab });
  }
  handleregister() {
    this.setState({ type: "register" });
  }
  handlelogin() {
    this.setState({ type: "login" });
  }
  handleChangeLogin() {
    this.setState({ type: "login", activeTabIndex: 1 });
  }
  handleweChatLogin() {
    getWeChatAuthorize({ redirect: `${this.hostname}/wechat.html` }).then(
      (res) => {
        const reslut = res.result.authorizeUrl;
        let targetUrl = reslut,
          left = (document.body.offsetWidth - 600) / 2;
        let handleWnd = window.open(
          "about:blank",
          "微信登录",
          `height=520, width=720,toolbar=0,left=${
            left > 100 ? left : 100
          },top=200`
        );
        handleWnd.location.href = targetUrl;
      }
    );
  }
  handleQQLogin() {
    getQQAuthorize({ redirect: `${this.hostname}/qq.html` }).then((res) => {
      const reslut = res.result.authorizeUrl;
      let targetUrl = reslut,
        left = (document.body.offsetWidth - 600) / 2;
      let handleWnd = window.open(
        "about:blank",
        "QQ登录",
        `height=520, width=720,toolbar=0,left=${
          left > 100 ? left : 100
        },top=200`
      );
      handleWnd.location.href = targetUrl;
    });
  }

  handleHashChange() {
    const getHashValue = (key) => {
      var matches = location.hash.match(new RegExp(key + "=([^&]*)"));
      return matches ? matches[1] : null;
    };

    const code = getHashValue("code");
    const state = getHashValue("state");
    const logintype = getHashValue("logintype");
    window.history.pushState(
      {},
      document.title,
      window.location.href.toString().replace(window.location.hash, "")
    );

    if (logintype === "wechat") {
      wechatLogin({ params: { code: code, state: state, redirect: "" } }).then(
        (res) => {
          if (res.status === "ok") {
            const { access_token, user } = res.data;
            const { fingerId, userid } = user;
            if (access_token) {
              window.remoteStorage.setValue(
                "access_token",
                access_token,
                () => {}
              );
            }
            if (userid) {
              window.remoteStorage.setValue("userId", userid, () => {});
            }
            if (fingerId) {
              window.remoteStorage.setValue("fingerId", fingerId, () => {});
            }

            getUserInfo().then((res) => {
              //登录成功
              if (res.isSuccess) {
                this.props.onSetUserSession({ ...res.result });
                this.props.onSetUserLogin(true);
              } else {
                this.props.onSetUserLogin(false);
              }
            });
            this.handleClose();
          }

          if (res.status === "fail") {
            const notification = {
              title: "登录失败",
              message: res.messsage,
              type: "warning",
              container: "top-center",
              insert: "top",
            };
            store.addNotification({
              ...notification,
              dismiss: {
                duration: 200,
                showIcon: true,
              },
            });
          }
        }
      );
    }

    if (logintype === "qq") {
      qqLogin({
        params: { code: code, state: state, redirect: "" },
      }).then((res) => {
        if (res.status === "ok") {
          const { access_token, user } = res.data;
          const { fingerId, userid } = user;
          if (access_token) {
            window.remoteStorage.setValue(
              "access_token",
              access_token,
              () => {}
            );
          }
          if (userid) {
            window.remoteStorage.setValue("userId", userid, () => {});
          }
          if (fingerId) {
            window.remoteStorage.setValue("fingerId", fingerId, () => {});
          }

          getUserInfo().then((res) => {
            //登录成功
            if (res.isSuccess) {
              this.props.onSetUserSession({ ...res.result });
              this.props.onSetUserLogin(true);
            } else {
              this.props.onSetUserLogin(false);
            }
          });
          this.handleClose();
        }
        if (res.status === "fail") {
          const notification = {
            title: "登录失败",
            message: res.messsage,
            type: "warning",
            container: "top-center",
            insert: "top",
          };
          store.addNotification({
            ...notification,
            dismiss: {
              duration: 200,
              showIcon: true,
            },
          });
        }
      });
    }
  }
  render() {
    const tabClassNames = {
      tabs: styles.tabs,
      tab: classNames(tabStyles.reactTabsTab, styles.tab),
      tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
      tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
      tabPanelSelected: classNames(
        tabStyles.reactTabsTabPanelSelected,
        styles.isSelected
      ),
      tabSelected: classNames(
        tabStyles.reactTabsTabSelected,
        styles.isSelected
      ),
    };

    const childnone = (
      <>
        <i className={styles.lefteye}> </i>
        <i className={styles.righteye}> </i>
      </>
    );

    return (
      <Modal
        className={styles.modalContent}
        id={this.props.id}
        contentLabel={""}
        onRequestClose={this.handleClose}
        headerClassName={styles.header}
        renderChildren={childnone}
      >
        {this.state.type === "login" ? (
          <div className={styles.loginWarp}>
            <Tabs
              forceRenderTabPanel
              className={tabClassNames.tabs}
              selectedIndex={this.state.activeTabIndex}
              selectedTabClassName={tabClassNames.tabSelected}
              selectedTabPanelClassName={tabClassNames.tabPanelSelected}
              onSelect={this.onActivateTab}
            >
              <TabList className={tabClassNames.tabList}>
                <Tab className={tabClassNames.tab}>
                  <i />
                  手机登录
                </Tab>
                <Tab className={tabClassNames.tab}>
                  <i />
                  密码登录
                </Tab>
                <span className={styles.glider}></span>
              </TabList>
              <TabPanel className={tabClassNames.tabPanel}>
                <div className={styles.verCodeForm}>
                  <MobileLogin
                    Onverify={this.props.Onverify}
                    counterText={this.props.counterText}
                    counterdisabled={this.props.counterdisabled}
                    onRequestClose={this.handleClose}
                    onSetUserLogin={this.props.onSetUserLogin}
                    onSetUserSession={this.props.onSetUserSession}
                  ></MobileLogin>
                  <div className={styles.tip}>
                    <div className={styles.toRegist}>
                      <div>
                        <span>首次登录默认注册该账号</span>
                      </div>
                      <div
                        style={{ color: "#77828C", cursor: "pointer" }}
                        className={styles.gotoRegist}
                        onClick={this.handleregister}
                      >
                        <span>账号注册</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel className={tabClassNames.tabPanel}>
                <div className={styles.verCodeForm}>
                  <UserPassWord
                    onRequestClose={this.handleClose}
                    onSetUserLogin={this.props.onSetUserLogin}
                    onSetUserSession={this.props.onSetUserSession}
                  ></UserPassWord>
                  <div className={styles.tip}>
                    <div className={styles.toRegist}>
                      <div></div>
                      <div
                        style={{ color: "#77828C", cursor: "pointer" }}
                        className={styles.gotoRegist}
                        onClick={this.handleregister}
                      >
                        <span>账号注册</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
            <ThirdLogin
              Text="第三方登录"
              // onRequestClose={this.handleClose}
              // onSetUserLogin={this.props.onSetUserLogin}
              // onSetUserSession={this.props.onSetUserSession}
            >
              <span className={styles.qq} onClick={this.handleQQLogin}>
                <i className={classNames(styles.icon, styles.iconQq)}></i>
              </span>
              <span className={styles.weixin} onClick={this.handleweChatLogin}>
                <i className={classNames(styles.icon, styles.iconWeixin)}></i>
              </span>
            </ThirdLogin>
          </div>
        ) : (
          <div className={styles.registerWarp}>
            <Tabs
              forceRenderTabPanel
              className={tabClassNames.tabs}
              selectedIndex={0}
              selectedTabClassName={tabClassNames.tabSelected}
              selectedTabPanelClassName={tabClassNames.tabPanelSelected}
              onSelect={this.onActivateTab}
            >
              <TabList
                className={classNames(
                  tabClassNames.tabList,
                  styles.registerTab
                )}
              >
                <Tab className={tabClassNames.tab}>
                  <i />
                  注册账号
                </Tab>
                <span className={styles.glider}></span>
              </TabList>
              <TabPanel className={tabClassNames.tabPanel}>
                <div className={styles.verCodeForm}>
                  <UserRegister
                    OnChangelogin={this.handleChangeLogin}
                  ></UserRegister>
                  <div className={styles.tip}>
                    <div className={styles.toRegist}>
                      <div></div>
                      <div
                        style={{ color: "#77828C", cursor: "pointer" }}
                        className={styles.gotoLogin}
                      >
                        <span>
                          已有账号,
                          <span onClick={this.handlelogin}>立即登录</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        )}
      </Modal>
    );
  }
}

LoginComponent.propTypes = {
  id: PropTypes.string.isRequired,
  Onverify: PropTypes.func,
  onHandSendMsg: PropTypes.func,
  counterText: PropTypes.string,
  counterdisabled: PropTypes.bool,
  onSetUserLogin: PropTypes.func.isRequired,
  onSetUserSession: PropTypes.func.isRequired,
};

export default LoginComponent;

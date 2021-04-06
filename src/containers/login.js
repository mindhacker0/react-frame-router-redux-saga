import bindAll from "lodash.bindall";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React from "react";
import { store } from "react-notifications-component";
import UserLoginComponent from "../components/login";
import { setUserLogin, setUserSession } from "../reducers/user/constant";
import {
  GetGeetestcaptchaObj,
  fakevalidateSlide,
  fakeSendSms,
} from "./../lib/user-server-api";
let handleInterval = null,
  counter = 60,
  handleUnique = false;
class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, ["initGeetest", "handeverify", "handleSendMsm"]);
    this.state = {
      getcaptchaObj: false,
      GeetestObj: null,
      isSuccess: false,
      number: null,
      codeText: "获取验证码",
    };
  }
  componentDidMount() {
    this.initGeetest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.getcaptchaObj !== this.state.getcaptchaObj &&
      this.state.getcaptchaObj
    ) {
      this.initGeetest();
    }
    if (prevState.isSuccess !== this.state.isSuccess && this.state.isSuccess) {
      this.handleSendMsm();
    }
  }

  initGeetest() {
    GetGeetestcaptchaObj().then((res) => {
      const captchaObj = Object.assign(JSON.parse(res.result.responseStr), {
        gtServerStatus: res.result.gtServerStatus,
      });

      window.initGeetest &&
        window.initGeetest(
          {
            // 以下 4 个配置参数为必须，不能缺少
            gt: captchaObj.gt,
            challenge: captchaObj.challenge,
            offline: !captchaObj.success, // 表示用户后台检测极验服务器是否宕机
            new_captcha: captchaObj.new_captcha, // 用于宕机时表示是新验证码的宕机
            product: "bind", // 产品形式，包括：float，popup
            width: "300px",
            https: true,
          },
          (captchaObj) => {
            const _that = this;
            this.setState({
              GeetestObj: captchaObj,
            });
            captchaObj
              .onReady(function () {
                //console.info("geetest is ready");
              })
              .onClose(function () {
                //console.info("放弃操作");
              })
              .onSuccess(function () {
                const { GeetestObj } = _that.state;
                var result = GeetestObj.getValidate();
                if (!result) {
                  return;
                }
                fakevalidateSlide({
                  params: {
                    gtServerStatus: 1,
                    geetest_challenge: result.geetest_challenge,
                    geetest_validate: result.geetest_validate,
                    geetest_seccode: result.geetest_seccode,
                  },
                }).then((res) => {
                  _that.setState({ isSuccess: res.isSuccess });
                });
              });
          }
        );
    });
  }

  handeverify(number) {
    this.setState({ number: number }, () => {
      this.state.GeetestObj.verify();
    });
  }

  handleSendMsm() {
    const { number } = this.state;
    if (handleInterval || handleUnique) {
      return;
    }
    handleUnique = true;
    if (number) {
      fakeSendSms(number).then((res) => {
        if (res.isSuccess) {
          const notification = {
            title: "提示",
            message: "短信已发送成功",
            type: "info",
            container: "top-center",
          };
          store.addNotification({
            ...notification,
            dismiss: {
              duration: 200,
              showIcon: true,
            },
          });
          handleInterval = setInterval(() => {
            if (counter > 0) {
              counter--;
              this.setState({ codeText: counter + "s" });
            } else {
              handleUnique = false;
              clearInterval(handleInterval);
              this.setState({ codeText: "获取验证码", isSuccess: false });
              counter = 60;
            }
          }, 1000);
        }
      });
    }
  }
  //组件将被卸载
  componentWillUnmount() {
    //重写组件的setState方法，直接返回空
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <UserLoginComponent
        id="userlogin"
        title={"用户登录注册"}
        onRequestClose={this.props.onRequestClose}
        Onverify={this.handeverify}
        counterText={this.state.codeText}
        counterdisabled={this.state.isSuccess}
        onSetUserLogin={this.props.onSetUserLogin}
        onSetUserSession={this.props.onSetUserSession}
      />
    );
  }
}

UserLogin.propTypes = {
  onRequestClose: PropTypes.func,
  onSetUserSession: PropTypes.func,
  onSetUserLogin: PropTypes.func,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onSetUserLogin: (isLogin) => dispatch(setUserLogin(isLogin)),
  onSetUserSession: (session) =>{dispatch(setUserSession({session}));},
});
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

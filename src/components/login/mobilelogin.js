import React from "react";
import bindAll from "lodash.bindall";

import { connect } from "react-redux";
import Formsy from "formsy-react";
import PhoneInput from "./PhoneInput";
import CodeInput from "./vilidCodeinput";
import CheckBoxInput from "./checkBox";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./login.css";
import { moblieLogin, getUserInfo } from "../../lib/user-server-api";
import { store } from "react-notifications-component";
class MobileLogin extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      "disableButton",
      "enableButton",
      "handlegetcode",
      "onsubmit",
      "setRef",
      "onremove",
    ]);
    this.state = { canSubmit: false };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }
  handlegetcode() {
    const value = this.form.inputs[0].getValue();
    if (this.form.inputs[0].isValidValue(value)) this.props.Onverify(value);
  }

  onsubmit(model) {
    const { onRequestClose, onSetUserLogin, onSetUserSession } = this.props;
    moblieLogin({ params: { ...model } }).then((res) => {
      if (res.status === "ok") {
        const { access_token, user } = res.data;
        const { fingerId, userid } = user;
        if (access_token) {
          window.remoteStorage.setValue("access_token", access_token, () => {});
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
            onSetUserSession({ ...res.result });
            onSetUserLogin(true);
          } else {
            onSetUserLogin(false);
          }
        });
        onRequestClose();
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
  setRef(ref) {
    this.form = ref;
  }
  onremove() {
    store.removeNotification("1");
  }
  render() {
    return (
      <Formsy
        ref={this.setRef}
        onValidSubmit={this.onsubmit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        className={classNames(styles.form, styles.formHorizontal)}
      >
        <PhoneInput
          name="moblieNumber"
          validations={{
            matchRegexp: /^1(3|4|5|6|7|8|9)\d{9}$/,
          }}
          validationError="请输入正确手机号码!"
          required
        />
        <CodeInput
          name="valcode"
          validations={{
            matchRegexp: /^\d{6}$/,
          }}
          validationError="请输入6位验证码!"
          required
          counterText={this.props.counterText}
          OnGetCode={this.handlegetcode}
          counterdisabled={this.props.counterdisabled}
        />
        <CheckBoxInput name="sureprotocol" required="isFalse" value={true}>
          <span>
            我已阅读并同意
            <span style={{ color: "rgb(87, 175, 253)" }}>《用户注册协议》</span>
          </span>
        </CheckBoxInput>
        <div className={styles.butWarp}>
          <button
            type={"submit"}
            disabled={!this.state.canSubmit}
            className={styles.submit}
          >
            <span>登录/注册</span>
          </button>
        </div>
      </Formsy>
    );
  }
}

MobileLogin.propTypes = {
  Onverify: PropTypes.func,
  counterText: PropTypes.string,
  counterdisabled: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onSetUserLogin: PropTypes.func.isRequired,
  onSetUserSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MobileLogin);

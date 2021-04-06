import React from "react";
import bindAll from "lodash.bindall";
import Formsy from "formsy-react";
import UserCodeInput from "./UserCodeInput";
import PassWordInput from "./passwordInput";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./login.css";
import { UserAccountLogin, getUserInfo } from "../../lib/user-server-api";
import { store } from "react-notifications-component";
class UserPassLogin extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, [
      "disableButton",
      "enableButton",
      "handlegetcode",
      "onsubmit",
      "setRef",
      "handleforgetPwd",
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
    if (this.form.inputs[0].isValidValue(value)) alert("getcode");
  }
  handleforgetPwd() {}

  onsubmit(model) {
    const { onRequestClose, onSetUserLogin, onSetUserSession } = this.props;

    UserAccountLogin({
      params: { ...model, scopes: "Shequ" },
    }).then((res) => {
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
  render() {
    return (
      <Formsy
        ref={this.setRef}
        onValidSubmit={this.onsubmit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        className={classNames(styles.form, styles.formHorizontal)}
      >
        <UserCodeInput
          name="username"
          validationError="请输入合法账户!"
          required
        />
        <PassWordInput
          name="password"
          validationError="请输入正确的密码!"
          placeholder={"请输入密码"}
          inputGroupAddon={true}
          required
          onforgetPwd={this.handleforgetPwd}
        />

        <div className={styles.butWarp}>
          <button
            type="submit"
            disabled={!this.state.canSubmit}
            className={styles.submit}
          >
            <span>登录</span>
          </button>
        </div>
      </Formsy>
    );
  }
}

UserPassLogin.propTypes = {
  onRequestClose: PropTypes.func,
  onSetUserLogin: PropTypes.func.isRequired,
  onSetUserSession: PropTypes.func.isRequired,
};

export default UserPassLogin;

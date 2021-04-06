import React from "react";
import bindAll from "lodash.bindall";
import Formsy from "formsy-react";
import UserCodeInput from "./UserCodeInput";
import PassWordInput from "./passwordInput";
import CheckBoxInput from "./checkBox";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./login.css";
import { store } from "react-notifications-component";
import { registrationAccount } from "../../lib/user-server-api";
class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, ["disableButton", "enableButton", "onsubmit", "setRef"]);
    this.state = { canSubmit: false };
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  onsubmit(model) {
    const { OnChangelogin } = this.props;
    registrationAccount({ params: { ...model } }).then((res) => {
      if (res.isSuccess === true) {
        const notification = {
          title: "注册",
          message: "注册成功!",
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
        OnChangelogin();
      } else {
        const notification = {
          title: "注册",
          message: `注册失败${res.errors}`,
          type: "warning",
          container: "top-center",
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
          name="account"
          // validationError="请输入合法账户!"
          // validations={{
          //   matchRegexp: /^(?!(?:\d+)$)[\da-zA-Z]{6,20}$/,
          // }}
          placeholder={"请输入账号长度6~20个字符包含数字和字母"}
          required
        />
        <PassWordInput
          name="password"
          validationError="请输入合法的密码!"
          placeholder={"请输入密码"}
          // validations={{
          //   matchRegexp: /^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/,
          // }}
          inputGroupAddon={false}
          required
        />
        <PassWordInput
          name="rePassword"
          validationError="两次密码输入不一致!"
          validations={"equalsField:password"}
          placeholder={"确认密码"}
          inputGroupAddon={false}
          required
        />
        <CheckBoxInput name="sureprotocol" required="isFalse" value={true}>
          <span>
            我已阅读并同意
            <span style={{ color: "rgb(87, 175, 253)" }}>《用户注册协议》</span>
          </span>
        </CheckBoxInput>
        <div className={styles.butWarp}>
          <button
            type="submit"
            disabled={!this.state.canSubmit}
            className={styles.submit}
          >
            <span>注册</span>
          </button>
        </div>
      </Formsy>
    );
  }
}

UserRegister.propTypes = {
  host: PropTypes.string,
  token: PropTypes.string,
  OnChangelogin: PropTypes.func.isRequired,
};

export default UserRegister;

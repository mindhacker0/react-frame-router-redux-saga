import { withFormsy } from "formsy-react";
import React from "react";
import bindAll from "lodash.bindall";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./login.css";
class PassWordInput extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, ["changeValue", "handleforgetPwd"]);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }
  handleforgetPwd() {
    this.props.onforgetPwd();
  }
  render() {
    // An error message is passed only if the component is invalid
    const errorMessage = this.props.errorMessage;
    return (
      <div className={classNames(styles.rows, styles.formItem)}>
        <div className={classNames(styles.col, styles.formItemControl)}>
          <div className={styles.formItemControlInput}>
            <div className={styles.formItemControlInputContent}>
              <span className={styles.inputGroupWrapper}>
                <span
                  className={classNames(styles.inputWrapper, styles.inputGroup)}
                >
                  <input
                    onChange={this.changeValue}
                    type="password"
                    value={this.props.value || ""}
                    placeholder={this.props.placeholder}
                    className={styles.input}
                  />
                  {this.props.inputGroupAddon ? (
                    <span
                      className={classNames(styles.inputGroupAddon)}
                      onClick={this.handleforgetPwd}
                    >
                      <span className={styles.getCode}>忘记密码</span>
                    </span>
                  ) : null}
                </span>
              </span>
            </div>
          </div>
          {this.props.showError ? (
            <span className={styles.error}>{errorMessage}</span>
          ) : null}
        </div>
      </div>
    );
  }
}

PassWordInput.propTypes = {
  placeholder: PropTypes.string,
  inputGroupAddon: PropTypes.bool,
  onforgetPwd: PropTypes.func,
};
export default withFormsy(PassWordInput);

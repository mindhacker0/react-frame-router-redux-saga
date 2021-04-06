import { withFormsy } from "formsy-react";
import React from "react";
import bindAll from "lodash.bindall";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./login.css";
class UserCodeInput extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, ["changeValue"]);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
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
                    type="text"
                    value={this.props.value || ""}
                    placeholder={this.props.placeholder || "请输入账号"}
                    className={styles.input}
                  />
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

UserCodeInput.propTypes = {
  placeholder: PropTypes.string,
};
export default withFormsy(UserCodeInput);

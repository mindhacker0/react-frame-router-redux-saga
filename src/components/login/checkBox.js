import { withFormsy } from "formsy-react";
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./login.css";
class CheckBoxInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    const value = event.currentTarget.checked;
    this.props.setValue(value);
  }

  render() {
    return (
      <div className={classNames(styles.rows, styles.formItem)}>
        <div className={classNames(styles.col, styles.formItemControl)}>
          <div className={styles.formItemControlInput}>
            <div className={styles.formItemControlInputContent}>
              <label
                className={classNames(
                  styles.checkboxWrapper,
                  styles.wrapperChecked
                )}
              >
                <span
                  className={classNames(styles.checkbox, {
                    [styles.checked]: this.props.value,
                  })}
                >
                  <input
                    onChange={this.changeValue}
                    type="checkbox"
                    checked={this.props.value}
                    className={styles.checkBoxInput}
                  />
                  <span className={styles.checkboxInner}></span>
                </span>
                {this.props.children}
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CheckBoxInput.propTypes = {
  children: PropTypes.node,
};
export default withFormsy(CheckBoxInput);

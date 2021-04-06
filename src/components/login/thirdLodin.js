import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./login.css";
class thirdLodin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div
          className={classNames(
            styles.divider,
            styles.dividerHorizontal,
            styles.dividerWithText,
            styles.dividerWithTextCenter,
            styles.dividerPlain
          )}
          role="separator"
        >
          <span className={styles.dividerInnerText}>{this.props.Text}</span>
        </div>
        <div className={styles.thirdPlat}>
          {React.Children.map(this.props.children, (child) => {
            if (!child) return null;

            return child;
          })}
        </div>
      </>
    );
  }
}

thirdLodin.propTypes = {
  Text: PropTypes.string,
  children: PropTypes.node,
  // host: PropTypes.string,
  // token: PropTypes.string,
  // onRequestClose: PropTypes.func,
  // onSetUserLogin: PropTypes.func.isRequired,
  // onSetUserSession: PropTypes.func.isRequired,
};

export default thirdLodin;

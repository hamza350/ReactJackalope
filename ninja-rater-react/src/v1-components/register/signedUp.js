import React, { Component } from "react";
import styles from "./register.module.scss";
import logo from "../../assets/images/jackalope_logo.jpg";
import { Customisedbutton } from "../../shared/inputFields";
import { Newbutton } from "../../shared/inputFields";
import { withRouter } from "react-router";
import "../../../src/App.css";
class SignedUp extends Component {
  redirectToLogin = () => {
    this.props.history.push("/sign-in");
  };
  render() {
    return (
      <React.Fragment>
        <div className={styles.signedup}>
          <p className={styles.signedup_text}>
            You are now signed up to Jackalope!
          </p>
          <p className={styles.signedup_text}>
            A confirmation email has been sent to your inbox.
          </p>
          <p>
            <img src={logo} alt="Jack Logo" />{" "}
          </p>
          <p>
            {" "}
            <Customisedbutton
              name="Login"
              //className={styles.signedup_button}
              className={"commonButtonClass"}
              onClick={this.redirectToLogin.bind(this)}
            />{" "}
          </p>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(SignedUp);

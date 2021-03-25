import React, { useState, Component, useEffect, useRef } from "react";
import {
  Customisedbutton,
  CustomisedTextfield,
  PasswordTextfield,
} from "../../shared/inputFields";
import logo from "../../assets/images/jackalope_logo.jpg";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
import {
  displayForValidationErrors,
  resetFormValidations,
  updateFormValidations,
} from "../../shared/components/commonValidations";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../../state/ducks/createAccount/createAccountActions";
import UserHelper from "../../components/shared/UserHelper.js";
import ErrorDiv from "../../components/shared/ErrorDiv.js";
import NinjaProgressSpinnerSmall from "../../components/shared/NinjaProgressSpinnerSmall.js";
import styles1 from "../../shared/components/sharedcss.module.scss";
import "../../../src/App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
// import * as auth from "../_redux/authRedux";
import { login } from "../../app/modules/Auth/_redux/authCrud";
import "../../_metronic/_assets/sass/pages/login/classic/login-1.scss";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { size } from "lodash";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const textInputRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    let validFileds = null;
    if (userInfo.username.length > 2 && userInfo.password.length > 4) {
      validFileds = true;
    } else {
      validFileds = false;
    }
    if (validFileds) {
      let userName = userInfo.username;
      let password = userInfo.password;
      textInputRef.current.loginUser(userName, password);
    } else {
      setShowError(true);
      setErrorMessage("username or password is too short");
    }
  };

  const customStyle = {
    position: "relative",
    left: "0px",
  };

  const loginInProgress = (inProgress, errorMessage) => {
    // if (inProgress) {
    //   this.setState({ display: "none" });
    //   this.refs.NinjaProgressSpinnerSmall.setState({ display: "block" });
    //   this.disableButtons();
    // } else {
    //   this.refs.NinjaProgressSpinnerSmall.setState({ display: "none" });
    //   this.setState({ display: "block" });
    // }
    if (errorMessage) {
      setShowError(true);
      setErrorMessage(errorMessage);
      // this.refs.errorDiv.showError(errorMessage);
    }
  };

  const onChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setUserInfo((state) => ({ ...state, [name]: value }));
  };

  const mystyle = {
    background: "linear-gradient(135deg, #8426b0 3%, #bd0283 47%, #ec4b3c 98%)",
  };
  const buttonStyle = {
    background: "linear-gradient(135deg, #8426b0 3%, #bd0283 47%, #ec4b3c 98%)",
    marginRight: "85px",
  };

  return (
    <>
      <UserHelper ref={textInputRef} parentComponent={loginInProgress} />
      <div className="container-fluid p-5" id="main1">
        <div class="row no-gutter" style={{marginTop: "80px"}}>
          <div class="col-sm-7 d-none d-sm-flex bg-image">
            <div
              className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
              style={mystyle}
            >
              {/*begin: Aside Container*/}
              <div className="d-flex flex-row-fluid flex-column justify-content-between">
                <div className="flex-column-fluid d-flex flex-column justify-content-center">
                  {/*custom size font-size-h1 */}
                  <h3 className="mb-5 text-white" style={{ fontSize: "48px" }}>
                    Welcome to Jackalope!
                  </h3>
                  <p
                    className="font-weight-lighter text-white opacity-80"
                    style={{ fontSize: "20px" }}
                  >
                    The best Insurance carrier providers in your area.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-5 bg-light">
            <div>
              <Link to="/" className="mt-5" style={{ marginLeft: "130px" }}>
                <img
                  alt="Logo"
                  className="max-h-200px mb-10"
                  src={toAbsoluteUrl("/media/logos/jlop.png")}
                />
              </Link>
              <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                  {/* <FormattedMessage id="AUTH.LOGIN.TITLE" /> */}

                  <h3 className="font-size-h1" style={{ fontWeight: "600" }}>
                    Log in
                  </h3>
                </h3>
              </div>

              <form
                onSubmit={submit}
                className="form fv-plugins-bootstrap fv-plugins-framework"
                style={{ paddingLeft: "60px" }}
              >
                <div className="form-group fv-plugins-icon-container">
                  <input
                    placeholder="Email"
                    className={`form-control form-control-solid py-5 px-6`}
                    name="username"
                    required={true}
                    value={userInfo.username}
                    onChange={(e) => onChangeHandler(e)}
                    style={{ width: "100%", height: "63px" }}
                  />
                </div>
                <div className="form-group fv-plugins-icon-container">
                  <input
                    placeholder="Password"
                    type="password"
                    className={`form-control form-control-solid h-auto py-5 px-6`}
                    name="password"
                    required={true}
                    onChange={(e) => onChangeHandler(e)}
                    value={userInfo.password}
                    style={{ width: "100%" }}
                  />
                  {showError && (
                    <div className={styles1.error_message}>
                      <div>*{errorMessage}</div>
                    </div>
                  )}
                </div>
                <span className="font-weight-bold text-dark-50 mt-5">
                  Don't have an account yet?
                  <Link
                    to="/sign-up"
                    className="font-weight-bold ml-2 p-2 mt-5"
                    id="kt_login_signup"
                  >
                    Sign Up!
                  </Link>
                </span>
                <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                  <Link
                    to="/auth/forgot-password"
                    className="text-dark-50 text-hover-primary my-3 mr-2"
                    id="kt_login_forgot"
                  >
                    {/* <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" /> */}
                  </Link>
                  <button
                    id="kt_login_signin_submit"
                    type="submit"
                    className="btn btn-primary font-weight-bold px-9 py-4 my-3  border border-left-0 "
                    style={{ bordercolor: "none", marginRight: "50px" }}
                    style={buttonStyle}
                  >
                    <span>Sign In</span>
                    {loading && (
                      <span className="ml-3 spinner spinner-white"></span>
                    )}
                  </button>
                </div>
              </form>
              {/*end::Form*/}

              {/*end::Content header*/}

              {/* begin::Content body */}
              <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <div style={{background:'red'}}><h3>
          Welcome to Jackalope!</h3>
          <p>The best Insurance carrier providers in your area.</p></div>
        <div style={{}}>uzair</div>
      </div> */}
    </>
    // <section className={styles.main_sec_1}>
    //   <UserHelper ref="userHelper" parentComponent={this} />
    //   <ErrorDiv ref="errorDiv" clssName="no-padding" />
    //   <NinjaProgressSpinnerSmall
    //     ref="NinjaProgressSpinnerSmall"
    //     maxWidth="150px"
    //     maxHeight="150px"
    //     marginTop="0px"
    //     display="none"
    //     divHeight="250px"
    //   />
  );
}
const mapStateToProps = (state) => {
  return {
    // createAccountObject: state.createAccountReducer
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createAccount: bindActionCreators(createAccountActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

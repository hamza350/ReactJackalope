import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import $ from "jquery";
import logo from "../assets/images/jackalope_logo.jpg";
import { CustomisedTextfield, PasswordTextfield } from "../shared/inputFields";
import FooterSimple from "../components/FooterSimple";
import CreateAccountPage from "./CreateAccountPage";
import NinjaLogoMedium from "../components/logos/NinjaLogoMedium";
import * as Constants from "../Constants";
import "../App.css";

import "../assets/ninja/theme/theme-indigo.css";
import "../assets/ninja/layout/css/layout-indigo.css";
import "primereact/resources/primereact.min.css";
import "../ripple.js";
import BrowserBackArrowForPage from "../components/navigation/BrowserBackArrowForPage";
import { Panel } from "primereact/components/panel/Panel";
import { InputText } from "primereact/components/inputtext/InputText";
import { Button } from "primereact/components/button/Button";
import Utils from "../components/shared/Utils.js";
import NinjaProgressSpinnerSmall from "../components/shared/NinjaProgressSpinnerSmall.js";
import styles from "../v1-components/login/login.module.scss";
import "../../src/App.css";

const utils = new Utils();

export default class ResetPasswordLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: "static",
      profileMode: "inline",
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      rotateMenuButton: false,
      topbarMenuActive: false,
      activeTopbarItem: null,
      darkMenu: false,
      rightPanelActive: false,
      menuActive: false,
      display: "block",
    };
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.InProgress = this.InProgress.bind(this);
    this.passwordInputKeyPressed = this.passwordInputKeyPressed.bind(this);
    this.isPasswordResetFormValid = this.isPasswordResetFormValid.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.fetchResetLinkData = this.fetchResetLinkData.bind(this);
    this.fetchResetLinkDataSuccess = this.fetchResetLinkDataSuccess.bind(this);
    this.fetchResetLinkDataError = this.fetchResetLinkDataError.bind(this);
    this.passwordChangeSuccess = this.passwordChangeSuccess.bind(this);
    this.passwordChangeError = this.passwordChangeError.bind(this);
    this.processRequest = this.processRequest.bind(this);
  }

  componentDidMount() {
    //jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
    var inputs = document.getElementsByTagName("input");

    var addClass = function (element, className) {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
      },
      removeClass = function (element, className) {
        if (element.classList) element.classList.remove(className);
        else
          element.className = element.className.replace(
            new RegExp(
              "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
              "gi"
            ),
            " "
          );
      };

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      input.addEventListener("blur", function (event) {
        if (this.value != "") {
          addClass(this, "ui-state-filled");
        } else {
          removeClass(this, "ui-state-filled");
        }
      });
    }
    this.fetchResetLinkData();
  }

  fetchResetLinkData() {
    let a1 = utils.getUrlParameter("a1");
    let a2 = utils.getUrlParameter("a2");
    this.setState({ user_id: a2 });
    if (a1 && a2) {
      let url =
        utils.getServicesUrl() +
        "/get.pswdreset?a1=" +
        encodeURIComponent(a1) +
        "&a2=" +
        encodeURIComponent(a2);
      utils.ajaxRequest(
        "GET",
        url,
        this.fetchResetLinkDataSuccess,
        this.fetchResetLinkDataError
      );
      this.setState({ pageErrorMessage: null });
      this.InProgress(true);
    }
  }

  fetchResetLinkDataSuccess(data, status, response) {
    this.InProgress(false);
    if (data && data.error) {
      let msg = data.error;
      this.setState({ display: "none" });
      this.setState({ fetchResetLinkError: msg });
      return;
    }

    // this.setState({remainingSeconds: data.remainingSeconds});
    this.setState({ remainingSeconds: 700 });
    this.setState({ expiryString: data.expiryString });
    if (this.state.remainingSeconds > 0) {
      $("#ID_PSWD_NEW").focus();
    }
    //this.startCountDown();
  }

  fetchResetLinkDataError(jqXHR, exception) {
    this.InProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({ pageErrorMessage: errorResponse });
  }

  isTablet() {
    let width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isOverlay() {
    return this.state.layoutMode === "overlay";
  }

  isHorizontal() {
    return this.state.layoutMode === "horizontal";
  }

  isSlim() {
    return this.state.layoutMode === "slim";
  }

  onValueChange(e, elementId) {
    try {
      e.preventDefault();
    } catch (e) {}
    // let value = $('#' + elementId).val();
    let value = e.target.value;
    this.setState({ [elementId]: value });
  }

  handleResetPassword(e) {
    this.setState({ pageErrorMessage: null });
    let user_id = this.state.user_id;
    let additionalHeaderParams = {
      user_id: user_id,
      Authorization: user_id,
      token: user_id,
    };
    let isResetFormValid = this.isPasswordResetFormValid();
    if (isResetFormValid) {
      let newPswd = utils.base64(this.state.ID_ninjaNewPassword.trim());
      this.InProgress(true);
      this.processRequest(
        this.passwordChangeSuccess,
        this.passwordChangeError,
        newPswd,
        user_id
      );
    }
  }

  processRequest(successCallBack, errorCallBack, newPswd, user_id) {
    let headers = {
      user_id: user_id,
      Authorization: user_id,
      "Content-Type": "application/json",
    };
    let data = { cp: newPswd, np: newPswd, a: "forgotPswd" };
    let ajaxRequest = {
      url: utils.getServicesUrl() + "/changePassword",
      type: "POST",
      headers: headers,
      success: successCallBack,
      error: errorCallBack,
      data: JSON.stringify(data),
    };
    $.ajax(ajaxRequest);
  }

  passwordChangeSuccess(data, status, response) {
    this.InProgress(false);
    this.setState({ pageErrorMessage: null });
    this.setState({
      passwordChangedMessage: "Success! Your password has been changed.",
    });
    this.setState({ display: "none" });
  }

  passwordChangeError(jqXHR, exception) {
    this.InProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({ pageErrorMessage: errorResponse });
    this.setState({ passwordChangedMessage: null });
  }

  InProgress(inProgress) {
    if (inProgress) {
      this.setState({ display: "none" });
      this.refs.NinjaProgressSpinnerSmall.setState({ display: "block" });
    } else {
      this.refs.NinjaProgressSpinnerSmall.setState({ display: "none" });
      this.setState({ display: "block" });
    }
  }

  isPasswordResetFormValid() {
    let newPasswd = this.state.ID_ninjaNewPassword;
    let confirmNewPasswd = this.state.ID_ninjaConfirmNewPassword;
    if (!newPasswd || newPasswd.trim().length < Constants.PASSWORD_MIN_LENGTH) {
      this.setState({
        pageErrorMessage:
          "New Password must be at least " +
          Constants.PASSWORD_MIN_LENGTH +
          " characters.",
      });
      $("#ID_ninjaNewPassword").select();
      return false;
    }
    if (
      !confirmNewPasswd ||
      confirmNewPasswd.trim().length < Constants.PASSWORD_MIN_LENGTH
    ) {
      this.setState({
        pageErrorMessage:
          "Confirmed Password must be at least " +
          Constants.PASSWORD_MIN_LENGTH +
          " characters.",
      });
      $("#ID_ninjaConfirmNewPassword").select();
      return false;
    }

    if (newPasswd.trim() !== confirmNewPasswd.trim()) {
      this.setState({ pageErrorMessage: "Passwords do not match." });
      // this.setState({ID_ninjaNewPassword: null});
      // this.setState({ID_ninjaConfirmNewPassword: null});
      // $('#ID_ninjaConfirmNewPassword').val('');
      // $('#ID_ninjaNewPassword').val('');
      $("#ID_ninjaNewPassword").focus();
      return false;
    }

    return true;
  }

  passwordInputKeyPressed(e) {
    e = e || window.event;
    if (e.key === "Enter") {
      //enter key pressed
      this.handleResetPassword(e);
    }
  }

  render() {
    return (
      <div
        style={{
          position: "relative",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <center>
          <img src={logo} />
        </center>
        <NinjaProgressSpinnerSmall
          ref="NinjaProgressSpinnerSmall"
          maxWidth="150px"
          maxHeight="150px"
          marginTop="10px"
          display="none"
          divHeight="250px"
          maxWidth="200px"
          maxHeight="200px"
          opacity="0.5"
          background="rgba(0, 0, 0, 0.4)"
        />
        <div className="login-panel login-panel-reset-link" style={{}}>
          <div className="">
            <div
              style={{
                display: this.state.fetchResetLinkError ? "block" : "none",
                backgroundColor: "white",
                opacity: 0.9,
                opacity: 0.9,
                color: "#b00020",
                fontSize: "1.5em",
                textAlign: "center",
                marginBottom: "15px",
                borderRadius: "5px",
              }}
            >
              {this.state.fetchResetLinkError} <br />
              <center style={{ margin: "10px" }}>
                <Link
                  to={Constants.ACTION_RESET_PASSWORD.url}
                  // style={{backgroundColor: '#9aaaf4'}}
                  style={{
                    color: "#fff",
                    background: "#8426b0",
                    background:
                      "-webkit-linear-gradient(135deg,#8426b0 3%,#bd0283 47%,#ec4b3c 98%)",
                    border: "0 solid #8426b0",
                    height: "50px",
                    width: "150px",
                    fontSize: "16px",
                    marginBottom: "30px",
                    lineHeight: "30px",
                    display: "inline-block",
                    padding: "0.5em .5em",
                    fontFamily:
                      '"ProximaNova-Regular", "Helvetia", "Arial","sans-serif"',
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                  className=""
                >
                  {/* <i style={{float: 'left'}} className="ui-button-icon-left ui-c fa fa-fw ui-icon-vpn-key"></i> */}
                  <span className="ui-button-text ui-c">
                    {Constants.ACTION_RESET_PASSWORD.linkLabel}
                  </span>
                </Link>
              </center>
            </div>

            <div
              style={{
                display:
                  !this.state.fetchResetLinkError &&
                  this.state.remainingSeconds > 0 &&
                  !this.state.passwordChangedMessage
                    ? "block"
                    : "none",
                backgroundColor: "white",
                opacity: 0.9,
                opacity: 0.9,
                color: "green",
                fontSize: "1.5em",
                textAlign: "center",
                marginBottom: "15px",
                borderRadius: "5px",
              }}
            >
              Expires In {this.state.expiryString}
            </div>

            <div
              style={{
                display: this.state.passwordChangedMessage ? "block" : "none",
                backgroundColor: "white",
                opacity: 0.9,
                opacity: 0.9,
                color: "green",
                fontSize: "1.5em",
                textAlign: "center",
                marginBottom: "15px",
                borderRadius: "5px",
              }}
            >
              {this.state.passwordChangedMessage}
              <center style={{ margin: "10px" }}>
                <Link
                  to={Constants.ACTION_SIGN_IN.url}
                  // style={{backgroundColor: '#9aaaf4'}}
                  className={"commonButtonClass"}
                  style={{
                    borderRadius: "3px 3px",
                    display: "inline-block",
                    padding: "0.5em .5em",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                  // className=""
                >
                  {/* <i style={{float: 'left'}} className="ui-button-icon-left ui-c fa fa-fw ui-icon-vpn-key"></i> */}
                  <span className="ui-button-text ui-c">Login</span>
                </Link>
              </center>
            </div>
            <div
              style={{
                display:
                  !this.state.fetchResetLinkError &&
                  !this.state.passwordChangedMessage
                    ? "block"
                    : "none",
              }}
            >
              <center>
                <div className="each_label_sec">
                  <p className="login_label">New Password</p>
                  <PasswordTextfield
                    // <CustomisedTextfield
                    id="ID_ninjaNewPassword"
                    type="password"
                    onKeyPress={this.passwordInputKeyPressed}
                    onChange={(e) => {
                      this.onValueChange(e, "ID_ninjaNewPassword");
                    }}
                    className="text-box"
                    required
                  />
                  <label htmlFor="password"></label>
                </div>
              </center>

              <center>
                <div className="each_label_sec">
                  <p className="login_label">Confirm Password</p>
                  <PasswordTextfield
                    // <CustomisedTextfield
                    onKeyPress={this.passwordInputKeyPressed}
                    onChange={(e) => {
                      this.onValueChange(e, "ID_ninjaConfirmNewPassword");
                    }}
                    id="ID_ninjaConfirmNewPassword"
                    type="password"
                    className="text-box"
                    required
                  />
                  <label htmlFor="password"></label>
                </div>
              </center>
              <div
                style={{
                  display: this.state.pageErrorMessage ? "block" : "none",
                  backgroundColor: "white",
                  opacity: 0.9,
                  opacity: 0.9,
                  color: "#b00020",
                  fontSize: "16px",
                  textAlign: "center",
                  marginBottom: "15px",
                  borderRadius: "5px",
                }}
              >
                {this.state.pageErrorMessage}
              </div>
              <center>
                <Button
                  id="ID_CHANGE_PSWD_BTN"
                  className={"commonButtonClass"}
                  onClick={this.handleResetPassword}
                  // style={{
                  //   color: "#fff",
                  //   background: "#8426b0",
                  //   background:
                  //     "-webkit-linear-gradient(135deg,#8426b0 3%,#bd0283 47%,#ec4b3c 98%)",
                  //   border: "0 solid #8426b0",
                  //   height: "50px",
                  //   width: "150px",
                  //   marginBottom: "30px",
                  //   fontSize: "16px",
                  //   lineHeight: "30px",
                  //   fontFamily:
                  //     '"ProximaNova-Regular", "Helvetia", "Arial","sans-serif"',
                  //   fontWeight: "600",
                  //   textDecoration: "none",
                  // }}
                >
                  {/* <i style={{float: 'left'}} className="ui-button-icon-left ui-c fa fa-fw ui-icon-vpn-key"></i> */}
                  <span className="ui-button-text ui-c" style={{}}>
                    {Constants.ACTION_RESET_PASSWORD.linkLabel}
                  </span>
                </Button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

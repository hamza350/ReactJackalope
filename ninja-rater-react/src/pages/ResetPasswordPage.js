import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import $ from "jquery";
import logo from "../assets/images/jackalope_logo.jpg";
import { CustomisedTextfield, Customisedbutton } from "../shared/inputFields";
import ErrorDiv from "./ErrorDiv";
import FooterSimple from "../components/FooterSimple";
import BrowserBackArrowForPage from "../components/navigation/BrowserBackArrowForPage";
import NinjaLogoMedium from "../components/logos/NinjaLogoMedium";
import * as Constants from "../Constants";
import "../assets/ninja/theme/theme-indigo.css";
import "../assets/ninja/layout/css/layout-indigo.css";
import "primereact/resources/primereact.min.css";
import "../ripple.js";

import { Panel } from "primereact/components/panel/Panel";
import { InputText } from "primereact/components/inputtext/InputText";
import { Button } from "primereact/components/button/Button";
import Utils from "../components/shared/Utils";
import NinjaProgressSpinner from "../components/shared/NinjaProgressSpinner";
import styles from "../v1-components/login/login.module.scss";
import "../../src/App.css";
const utils = new Utils();

export default class ResetPasswordPage extends React.Component {
  constructor() {
    super();
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
      resetPassword: { email: null },
    };

    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.updateResetPasswordValue = this.updateResetPasswordValue.bind(this);
    this.validateResetPasswordInput = this.validateResetPasswordInput.bind(
      this
    );
    this.emailInputKeyPressed = this.emailInputKeyPressed.bind(this);
    this.inProgress = this.inProgress.bind(this);
    this.resetPasswordSuccess = this.resetPasswordSuccess.bind(this);
    this.resetPasswordError = this.resetPasswordError.bind(this);
  }

  //componentWillMount() { }

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

    //alert('Done Loading');
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

  handleResetPassword(e) {
    if (console) {
      console.log(this.state.resetPassword);
    }
    e.preventDefault();
    let isValid = this.validateResetPasswordInput();
    if (!isValid) {
      return;
    }
    $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    let url =
      utils.getServicesUrl() +
      "/submitPasswordReset?email=" +
      encodeURIComponent(this.state.resetPassword.email);
    utils.ajaxRequest(
      "GET",
      url,
      this.resetPasswordSuccess,
      this.resetPasswordError
    );
    this.setState({ pageErrorMessage: null });

    this.inProgress(true);
  }

  resetPasswordSuccess(data, status, response) {
    this.inProgress(false);
    let msg =
      "Message with a link to reset password will arrive at " +
      this.state.resetPassword.email +
      " within 5 minutes or so. Please check your email.";
    this.setState({ pageSuccessMessage: msg });
  }

  resetPasswordError(jqXHR, exception) {
    this.inProgress(false);
    if (jqXHR.status && jqXHR.status == 200) {
      //sometimes success arrives as error. TODO: Investigate why.
      let msg =
        "Message with a link to reset password will arrive at " +
        this.state.resetPassword.email +
        " within 5 minutes or so. Please check your email.";
      this.setState({ pageSuccessMessage: msg });
    } else {
      let errorResponse = utils.parseResponseError(jqXHR, exception);
      let msg =
        "Sorry, " + this.state.resetPassword.email + " is NOT a valid user.";
      this.setState({ pageErrorMessage: msg });
    }
  }

  inProgress(inProgress) {
    if (inProgress) {
      // $('#ID_RESET_PASSWORD_DIV').hide();
      $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    } else {
      $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
      // $('#ID_RESET_PASSWORD_DIV').show();
    }
  }

  validateResetPasswordInput() {
    let isValid = true;
    let ninjaEmailInvalid = $("#ninjaEmailInvalid");
    let ninjaEmail = $("#ninjaEmail");
    let email = this.state.resetPassword.email;
    if (email == null || email.trim() == "" || !utils.isEmail(email)) {
      console.log("utils.isEmail(email)", utils.isEmail(email));
      // ninjaEmail.get(0).scrollIntoView();
      $(ninjaEmailInvalid).css({ display: "block" });
      let validationMsg =
        email == null || email.trim() == ""
          ? "* Please Enter Email ID "
          : "* Please Enter Valid Email";
      $(ninjaEmailInvalid)
        .find("span:first")
        .html(`<font color="#b00020">${validationMsg}</font>`);
      $(ninjaEmail).select();
      //$(ninjaEmail).focus();
      isValid = false;
    } else {
      $(ninjaEmailInvalid).find("span:first").css({ display: "none" });
    }
    console.log("isvalid", isValid);
    return isValid;
  }

  emailInputKeyPressed(e) {
    e = e || window.event;
    if (e.key === "Enter") {
      //enter key pressed
      this.handleResetPassword(e);
    }
  }

  updateResetPasswordValue(e) {
    this.state.resetPassword.email = e.target.value;
  }

  render() {
    const errors = ["Yo! Error!", "Again Error"];

    return (
      <div
        className="reset-password-body"
        style={{
          position: "relative",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div className="" style={{}}>
          <NinjaProgressSpinner
            maxWidth="200px"
            maxHeight="200px"
            marginTop="0px"
          />

          <div id="ID_RESET_PASSWORD_DIV" className="">
            <center>
              <img src={logo} />
            </center>
            <div
              className={["login-panel", "reset-panel "].join(" ")}
              style={{}}
            >
              <center>
                <div
                  style={{
                    width: "350px",
                  }}
                >
                  <div className={"each_label_sec"}>
                    <p className="login_label">Email</p>
                    <CustomisedTextfield
                      id="ninjaEmail"
                      onChange={this.updateResetPasswordValue}
                      required
                      className="text-box"
                    />
                    <label
                      htmlFor="ninjaEmail"
                      style={({ fontWeight: "Bold" }, { fontSize: 20 + "px" })}
                    ></label>
                  </div>
                </div>
              </center>
              <div
                className="ui-g-12 no-padding"
                id="ID_RESET_PASSWORD_ERROR"
                style={{
                  display: this.state.pageErrorMessage ? "block" : "none",
                  backgroundColor: "white",
                  opacity: 0.9,
                  color: "#b00020",
                  fontSize: "16px",
                  textAlign: "center",
                  marginBottom: "15px",
                  borderRadius: "5px",
                  width: "66%",
                }}
              >
                {this.state.pageErrorMessage}
              </div>
              <div
                className="ui-g-12 no-padding"
                id="ID_RESET_PASSWORD_SUCCESS"
                style={{
                  display: this.state.pageSuccessMessage ? "block" : "none",
                  backgroundColor: "white",
                  opacity: 0.9,
                  color: "green",
                  fontSize: "16px",
                  textAlign: "center",
                  marginBottom: "15px",
                  borderRadius: "5px",
                  width: "66%",
                }}
              >
                {this.state.pageSuccessMessage}
              </div>
              <div
                id="ninjaEmailInvalid"
                style={{ display: "none", paddingBottom: "15px" }}
              >
                <span></span>
              </div>
              <div>
                <Customisedbutton
                  name="Reset Password"
                  // className={styles.login_button}
                  className={"commonButtonClass"}
                  onClick={this.handleResetPassword}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

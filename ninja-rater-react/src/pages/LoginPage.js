import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import $ from "jquery";

import FooterSimple from "../components/FooterSimple";
import CreateAccountPage from "./CreateAccountPage";
import NinjaLogoMedium from "../components/logos/NinjaLogoMedium";
import * as Constants from "../Constants";
import "../App.css";

import "../assets/ninja/theme/theme-indigo.css";
import "../assets/ninja/layout/css/layout-indigo.css";
import "primereact/resources/primereact.min.css";
import "../ripple.js";

import { Panel } from "primereact/components/panel/Panel";
import { InputText } from "primereact/components/inputtext/InputText";
import { Button } from "primereact/components/button/Button";
import Utils from "../components/shared/Utils.js";
import UserHelper from "../components/shared/UserHelper.js";
import ErrorDiv from "../components/shared/ErrorDiv.js";
import NinjaProgressSpinnerSmall from "../components/shared/NinjaProgressSpinnerSmall.js";
import Help from "./Help";

export default class LoginPage extends React.Component {
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
    this.handleLogin = this.handleLogin.bind(this);
    this.loginInProgress = this.loginInProgress.bind(this);
    this.passwordInputKeyPressed = this.passwordInputKeyPressed.bind(this);
  }

  componentDidMount() {
    //temporary workaround to break out of frame
    //www.ninjarater.com has a frame for www.workcompninja.com so after successful login, break out of frame from www.ninjarater.com
    window.top.location.replace(window.location);

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

  handleLogin(e) {
    this.loginInProgress(true);
    let isLoginFormValid = this.refs.userHelper.isLoginFormValid();
    if (isLoginFormValid) {
      let userName = $("#ninjaSignInEmail").val().trim();
      let password = $("#ninjaSignInPassword").val().trim();
      this.refs.userHelper.loginUser(userName, password);
    } else {
      this.loginInProgress(false);
    }
  }

  loginInProgress(inProgress, errorMessage) {
    if (inProgress) {
      this.setState({ display: "none" });
      this.refs.NinjaProgressSpinnerSmall.setState({ display: "block" });
      this.disableButtons();
    } else {
      this.refs.NinjaProgressSpinnerSmall.setState({ display: "none" });
      this.setState({ display: "block" });
      this.enableButtons();
    }

    if (errorMessage) {
      this.refs.errorDiv.showError(errorMessage);
    }
  }

  disableButtons() {
    $("#ID_SIGNIN_BTN").prop("disabled", true);
    $("#ID_GOTO_PASSWORDRESET_BTN").prop("disabled", true);
    $("#ID_GOTO_CREATEACCOUNT_BTN").prop("disabled", true);
    $("#ninjaSignInEmail").prop("disabled", true);
    $("#ninjaSignInPassword").prop("disabled", true);
  }

  enableButtons() {
    $("#ID_SIGNIN_BTN").prop("disabled", false);
    $("#ID_GOTO_PASSWORDRESET_BTN").prop("disabled", false);
    $("#ID_GOTO_CREATEACCOUNT_BTN").prop("disabled", false);
    $("#ninjaSignInEmail").prop("disabled", false);
    $("#ninjaSignInPassword").prop("disabled", false);
  }

  passwordInputKeyPressed(e) {
    e = e || window.event;
    if (e.key === "Enter") {
      //enter key pressed
      this.handleLogin(e);
    }
  }

  render() {
    const errors = ["Yo! Error!", "Again Error"];

    return (
      <div className="login-body">
        <UserHelper ref="userHelper" parentComponent={this} />
        <ErrorDiv ref="errorDiv" clssName="no-padding" />

        <div
          className="login-panel ui-fluid"
          style={{ margin: "3px auto 0 auto" }}
        >
          <div className="ui-g">
            <NinjaLogoMedium />

            <NinjaProgressSpinnerSmall
              ref="NinjaProgressSpinnerSmall"
              maxWidth="150px"
              maxHeight="150px"
              marginTop="0px"
              display="none"
              divHeight="250px"
            />

            <div
              id="ID_LOGIN_PANEL"
              className="ui-g ui-fluid no-padding"
              style={{ display: this.state.display }}
            >
              <div
                id="ID_DIV_ninjaSignInEmail"
                className="card ui-g-12"
                style={{ opacity: 0.9 }}
              >
                <span className="md-inputfield">
                  <InputText
                    autoFocus
                    id="ninjaSignInEmail"
                    type="text"
                    className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                    style={{ fontSize: "1.3em" }}
                    required
                  />
                  <label
                    htmlFor="ninjaSignInEmail"
                    style={({ fontWeight: "Bold" }, { fontSize: 20 + "px" })}
                  >
                    Email
                  </label>
                </span>
              </div>

              <div
                id="ID_DIV_ninjaSignInPassword"
                className="card ui-g-12"
                style={{ opacity: 0.9 }}
              >
                <span className="md-inputfield">
                  <InputText
                    id="ninjaSignInPassword"
                    type="password"
                    className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                    onKeyPress={this.passwordInputKeyPressed}
                    style={{ fontSize: "1.3em" }}
                    required
                  />
                  <label
                    htmlFor="password"
                    style={({ fontWeight: "Bold" }, { fontSize: 20 + "px" })}
                  >
                    Password
                  </label>
                </span>
              </div>

              <div className="ui-g-12" style={{ padding: 3 + "px" }}>
                <Button
                  id="ID_SIGNIN_BTN"
                  onClick={this.handleLogin}
                  style={{ fontSize: "1.3em" }}
                  className="secondary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left ripple-animate"
                >
                  <i
                    style={{ float: "left" }}
                    className="ui-button-icon-left ui-c fa fa-fw ui-icon-person"
                  ></i>
                  <span
                    className="ui-button-text ui-c"
                    style={{ fontSize: "1.3em" }}
                  >
                    {Constants.ACTION_SIGN_IN.linkLabel}
                  </span>
                </Button>
              </div>

              <div className="ui-g-12" style={{ padding: 3 + "px" }}>
                <center>
                  <Link
                    id="ID_GOTO_PASSWORDRESET_BTN"
                    to={Constants.ACTION_RESET_PASSWORD.url}
                    style={{ fontSize: "1.3em", backgroundColor: "#9aaaf4" }}
                    className="secondary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left"
                  >
                    <i
                      style={{ float: "left" }}
                      className="ui-button-icon-left ui-c fa fa-fw ui-icon-vpn-key"
                    ></i>
                    <span
                      className="ui-button-text ui-c"
                      style={{ fontSize: "1.3em" }}
                    >
                      {Constants.ACTION_RESET_PASSWORD.linkLabel}
                    </span>
                  </Link>
                </center>
              </div>

              <div className="ui-g-12" style={{ padding: 3 + "px" }}>
                <center>
                  <Link
                    id="ID_GOTO_CREATEACCOUNT_BTN"
                    to={Constants.ACTION_CREATE_ACCOUNT.url}
                    style={{ fontSize: "1.3em", backgroundColor: "#9aaaf4" }}
                    className="secondary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left"
                  >
                    <i
                      style={{ float: "left" }}
                      className="ui-button-icon-left ui-c fa fa-fw ui-icon-visibility"
                    ></i>
                    <span
                      className="ui-button-text ui-c"
                      style={{ fontSize: "1.3em" }}
                    >
                      {Constants.ACTION_CREATE_ACCOUNT.linkLabel}
                    </span>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>

        <Help />
        <FooterSimple />
      </div>
    );
  }
}

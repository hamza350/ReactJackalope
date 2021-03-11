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

const utils = new Utils();

export default class ReferFriendLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "block",
      userName: "",
      userId: "",
    };

    this.fetchReferLinkData = this.fetchReferLinkData.bind(this);
    this.fetchReferLinkDataSuccess = this.fetchReferLinkDataSuccess.bind(this);
    this.fetchReferLinkDataError = this.fetchReferLinkDataError.bind(this);
  }

  componentDidMount() {
    //jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
    this.fetchReferLinkData();
  }

  fetchReferLinkData() {
    let a1 = utils.getUrlParameter("a1");
    // let a2 = utils.getUrlParameter('a2');
    // this.setState({user_id: a2});
    if (a1) {
      // let url = utils.getServicesUrl() + '/get.referUser?a1=' + encodeURIComponent(a1) + '&a2=' + encodeURIComponent(a2);
      let url =
        utils.getServicesUrl() + "/get.referUser?a1=" + encodeURIComponent(a1);
      utils.ajaxRequest(
        "GET",
        url,
        this.fetchReferLinkDataSuccess,
        this.fetchReferLinkDataError
      );
      this.setState({ pageErrorMessage: null });
      this.InProgress(true);
    }
  }

  fetchReferLinkDataSuccess(data, status, response) {
    this.InProgress(false);
    if (data) {
      let msg = data.error;
      this.setState({ display: "none" });
      this.setState({
        fetchReferLinkError: null,
        userName: data.user_full_name,
        userId: data.user_id,
      });
      utils.createCookie("refered_user_id", data.user_id);
      return;
    }
  }

  fetchReferLinkDataError(jqXHR, exception) {
    this.InProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({ fetchReferLinkError: errorResponse });
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

  render() {
    const { userName, fetchReferLinkError } = this.state;
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
                display: this.state.fetchReferLinkError ? "block" : "none",
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
              <p>Your referal link is not valid </p>
              <center style={{ margin: "10px" }}>
                <a
                  href="https://myjackalope.com/contact-us/"
                  target="_blank"
                  //   style={{
                  //     color: "#fff",
                  //     background: "#8426b0",
                  //     background:
                  //       "-webkit-linear-gradient(135deg,#8426b0 3%,#bd0283 47%,#ec4b3c 98%)",
                  //     border: "0 solid #8426b0",
                  //     height: "50px",
                  //     width: "150px",
                  //     fontSize: "16px",
                  //     marginBottom: "30px",
                  //     display: "inline-block",
                  //     padding: "0.5em .5em",
                  //     fontFamily:
                  //       '"ProximaNova-Regular", "Helvetia", "Arial","sans-serif"',
                  //     fontWeight: "600",
                  //     textDecoration: "none",
                  //   }}
                  style={{
                    borderRadius: "3px 3px",
                    padding: "0.5em .5em",
                    textDecoration: "none",
                  }}
                  className={"commonButtonClass"}
                >
                  <span className="ui-button-text ui-c">Contact Us</span>
                </a>
              </center>
            </div>

            <div>
              <center>
                <div className="each_label_sec">
                  {userName && (
                    <div>
                      <p className="login_label">
                        You have been referred by {userName} please complete the
                        process by clicking below button.{" "}
                      </p>
                      <center>
                        <div className="" style={{}}>
                          <center>
                            <Link
                              to={Constants.ACTION_CREATE_ACCOUNT.url}
                              //   style={{
                              //     color: "#fff",
                              //     background: "#8426b0",
                              //     background:
                              //       "-webkit-linear-gradient(135deg,#8426b0 3%,#bd0283 47%,#ec4b3c 98%)",
                              //     border: "0 solid #8426b0",
                              //     height: "50px",
                              //     width: "150px",
                              //     marginBottom: "30px",
                              //     fontSize: "16px",
                              //     lineHeight: "45px",
                              //     fontFamily:
                              //       '"ProximaNova-Regular", "Helvetia", "Arial","sans-serif"',
                              //     fontWeight: "600",
                              //     textDecoration: "none",
                              //   }}
                              style={{
                                borderRadius: "3px 3px",
                                textDecoration: "none",
                              }}
                              className="secondary ui-button  commonButtonClass"
                            >
                              <span className="ui-button-text ui-c">
                                Sign up
                              </span>
                            </Link>
                          </center>
                        </div>
                      </center>
                    </div>
                  )}
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

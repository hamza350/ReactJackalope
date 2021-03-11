import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import $ from "jquery";
import * as Constants from "../../Constants";
import FooterSimple from "../../components/FooterSimple";
import "./SubscriptionForm.css";

import "../../assets/ninja/theme/theme-indigo.css";
import "../../assets/ninja/layout/css/layout-indigo.css";
import "primereact/resources/primereact.min.css";

import { Panel } from "primereact/components/panel/Panel";
import { Button } from "primereact/components/button/Button";
import { InputText } from "primereact/components/inputtext/InputText";
import { Column } from "primereact/components/column/Column";
import { DataGrid } from "primereact/components/datagrid/DataGrid";
import NinjaProgressSpinner from "../shared/NinjaProgressSpinner";
import Utils from "../shared/Utils";
import styles from "../RateQuote.module.scss";
import { PasswordTextfield } from "../../shared/inputFields";
import "../../../src/App.css";
const utils = new Utils();

export class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
      dataGridValue: [
        {
          label: "Current Password",
          id: "ID_PSWD_CURRENT",
          value: "",
          index: 0,
        },
        { label: "New Password", id: "ID_PSWD_NEW", value: "", index: 1 },
        {
          label: "Confirm New Password",
          id: "ID_PSWD_NEW_CONFIRM",
          value: "",
          index: 2,
        },
      ],
      value_ID_PSWD_CURRENT: "",
      value_ID_PSWD_NEW_CONFIRM: "",
      value_ID_PSWD_NEW: "",
    };
    this.dataGridTemplate = this.dataGridTemplate.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.submitChangePassword = this.submitChangePassword.bind(this);
    this.passwordChangeSuccess = this.passwordChangeSuccess.bind(this);
    this.passwordChangeError = this.passwordChangeError.bind(this);
    this.enterKeyPressed = this.enterKeyPressed.bind(this);
  }

  componentDidMount() {
    $("#ID_PSWD_CURRENT").focus();
  }

  onValueChange(e, elementId) {
    e.preventDefault();
    // let value = $("#" + elementId).val();
    let value = e.target.value;
    this.setState({ ["value_" + elementId]: value });
    // let stateId = `value_${elementId}`;
    // console.log('stateId', stateId);
    // this.setState({[stateId]: value});
  }

  changePassword(e) {
    this.setState({ pageErrorMessage: null });
    this.setState({ passwordChangedMessage: null });
    let currentPassword = this.state["value_ID_PSWD_CURRENT"];
    if (
      !currentPassword ||
      !currentPassword.length ||
      currentPassword.trim().length < Constants.PASSWORD_MIN_LENGTH
    ) {
      $("#ID_PSWD_CURRENT").select();
      $("#ID_PSWD_CURRENT").focus();
      this.setState({
        pageErrorMessage:
          "Your Current Password must be  at least " +
          Constants.PASSWORD_MIN_LENGTH +
          " characters long.",
      });
      return;
    }

    let newPassword = this.state["value_ID_PSWD_NEW"];
    // let newPassword = this.state.dataGridValue[1].value;
    if (
      !newPassword ||
      !newPassword.length ||
      newPassword.trim().length < Constants.PASSWORD_MIN_LENGTH
    ) {
      $("#ID_PSWD_NEW").select();
      $("#ID_PSWD_NEW").focus();
      this.setState({
        pageErrorMessage:
          "Your New Password must be at least " +
          Constants.PASSWORD_MIN_LENGTH +
          " characters long.",
      });
      return;
    }

    let confirmPassword = this.state["value_ID_PSWD_NEW_CONFIRM"];
    // let confirmPassword = this.state.dataGridValue[2].value;
    if (
      !confirmPassword ||
      !confirmPassword.length ||
      confirmPassword.trim().length < Constants.PASSWORD_MIN_LENGTH
    ) {
      $("#ID_PSWD_NEW_CONFIRM").select();
      $("#ID_PSWD_NEW_CONFIRM").focus();
      this.setState({
        pageErrorMessage:
          "Your Confirmed Password must be at least " +
          Constants.PASSWORD_MIN_LENGTH +
          " characters long.",
      });
      return;
    }

    if (newPassword.trim() != confirmPassword.trim()) {
      // this.setState({["value_ID_PSWD_NEW_CONFIRM"]: ""});
      // this.setState({["value_ID_PSWD_NEW"]: ""});

      $("#ID_PSWD_NEW").focus();
      this.setState({
        pageErrorMessage:
          "New and Confirmed Passwords do not match. Please try again.",
      });
      return;
    }

    this.InProgress(true);
    this.submitChangePassword(e);
  }

  submitChangePassword(e) {
    let currentPassword = utils.base64(
      this.state["value_ID_PSWD_CURRENT"].trim()
    );
    // let currentPassword = utils.base64(
    //   this.state.dataGridValue[0].value.trim()
    // );
    let newPassword = utils.base64(this.state["value_ID_PSWD_NEW"].trim());
    // let newPassword = utils.base64(this.state.dataGridValue[1].value.trim());
    let url = utils.getServicesUrl() + "/changePassword";
    let data = { cp: currentPassword, np: newPassword, a: "changePswd" };
    utils.ajaxRequest(
      "POST",
      url,
      this.passwordChangeSuccess,
      this.passwordChangeError,
      data,
      true
    );
  }

  passwordChangeSuccess(data, status, response) {
    this.InProgress(false);
    // this.setState({pageErrorMessage: null});
    this.setState((state) => {
      this.state.passwordChangedMessage =
        "Success! Your password has been changed.";
      this.state.pageErrorMessage = null;
      return state;
    });
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  passwordChangeError(jqXHR, exception) {
    this.InProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({ pageErrorMessage: errorResponse });
    this.setState({ passwordChangedMessage: null });
  }

  InProgress(InProgress) {
    if (InProgress) {
      this.setState({ InProgress: true });
      this.refs.NinjaProgressSpinner.setState({ display: "block" });

      $("#ID_PSWD_CURRENT").prop("disabled", true);
      $("#ID_PSWD_NEW_CONFIRM").prop("disabled", true);
      $("#ID_CVC").prop("disabled", true);
      $("#ID_PSWD_NEW").prop("disabled", true);
      $("#ID_CHANGE_PSWD_BTN").prop("disabled", true);
    } else {
      this.setState({ InProgress: false });
      this.refs.NinjaProgressSpinner.setState({ display: "none" });

      $("#ID_PSWD_CURRENT").prop("disabled", false);
      $("#ID_PSWD_NEW_CONFIRM").prop("disabled", false);
      $("#ID_CVC").prop("disabled", false);
      $("#ID_PSWD_NEW").prop("disabled", false);
      $("#ID_CHANGE_PSWD_BTN").prop("disabled", false);
    }
  }

  enterKeyPressed(e) {
    e = e || window.event;
    if (e.key === "Enter") {
      //enter key pressed
      this.changePassword(e);
    }
  }

  dataGridTemplate(row) {
    if (!row) {
      return;
    }
    return (
      <div className="ui-g-12">
        <span
        // className="md-inputfield"
        // style={{width: '100%'}}
        // className={['md-inputfield', 'ui-autocomplete', styles.whiteBackground].join(' ')}
        >
          {/* <InputText */}
          <PasswordTextfield
            className={styles.whiteBackground}
            id={row.id}
            placeholder={row.label}
            type="password"
            // className="ui-inputtext ui-corner-all ui-state-default ui-widget"
            value={this.state["value_" + row.id] || ""}
            // value={this.state.dataGridValue[row.index].value}
            onKeyPress={this.enterKeyPressed}
            onChange={(e) => {
              this.onValueChange(e, row.id);
            }}
            className={styles.widthHundPer}
            // style={{width: "100%"}}
            required
          />
          {/* <label
            htmlFor="password"
            style={{fontWeight: "Bold", fontSize: 20 + "px"}}
          >
            {row.label}
          </label> */}
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="ui-g-12 no-padding" style={{ width: "100%" }}>
        <p className={["previous_head", "commonButtonClass"].join(" ")}>
          Change My Password
            </p>
        <div
          className="ui-g"
          style={{ fontSize: "1.3em", display: "contents" }}
        >
          <NinjaProgressSpinner
            ref="NinjaProgressSpinner"
            maxWidth="200px"
            maxHeight="200px"
            marginTop="-10px"
          />

          <div
            className="ui-g-12 no-padding"
            style={{ width: "100%", height: "100%" }}
          >
            <Panel>
              <DataGrid
                paginator={false}
                rows={2}
                value={this.state.dataGridValue}
                itemTemplate={this.dataGridTemplate}
                // style={{textAlign: "center"}}
                className={styles.dataGridStyle}
              />
              <div
                className="ui-g-12 no-padding"
                id="ID_PSWD_ERROR"
                style={{
                  display: this.state.pageErrorMessage ? "block" : "none",
                }}
              >
                <div
                  style={{
                    color: "#b00020",
                    // fontWeight: "bold",
                    fontSize: "16px",
                    marginLeft: "15px",
                    textAlign: "center",
                  }}
                >
                  *{this.state.pageErrorMessage}
                  <br />
                </div>
              </div>

              <div
                className="ui-g-12 no-padding"
                id="ID_PSWD_SUCCESS"
                style={{
                  display: this.state.passwordChangedMessage ? "block" : "none",
                }}
              >
                <div
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginLeft: "15px",
                    textAlign: "center",
                  }}
                >
                  {this.state.passwordChangedMessage}
                  <br />
                </div>
              </div>
              <div className="ui-g-12-" style={{ textAlign: "center" }}>
                <Button
                  className="commonButtonClass"
                  id="ID_CHANGE_PSWD_BTN"
                  type="button"
                  label="Change Password"
                  // icon="ui-icon-vpn-key"
                  // onClick={this.changePassword}
                  onClick={(e) => this.changePassword(e)}
                ></Button>
              </div>
            </Panel>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

import React, { Component } from "react";
import classNames from "classnames";
import "../../App.css";
import { Link } from "react-router-dom";
import jQuery from "jquery";
import $ from "jquery";
import * as Constants from "../../Constants";
import FooterSimple from "../../components/FooterSimple";
import "../../assets/ninja/theme/theme-indigo.css";
import "../../assets/ninja/layout/css/layout-indigo.css";
import "primereact/resources/primereact.min.css";

import moment from "moment";
import { Panel } from "primereact/components/panel/Panel";
import { Button } from "primereact/components/button/Button";
import { InputText } from "primereact/components/inputtext/InputText";
import { Column } from "primereact/components/column/Column";
import { DataGrid } from "primereact/components/datagrid/DataGrid";
import NinjaProgressSpinner from "../shared/NinjaProgressSpinner";
import { Calendar } from "primereact/components/calendar/Calendar";
import { InputMask } from "primereact/components/inputmask/InputMask";
import { Checkbox } from "primereact/components/checkbox/Checkbox";

import { Elements, StripeProvider } from "react-stripe-elements";
import SubscriptionForm from "./SubscriptionForm";
import { CardElement } from "react-stripe-elements";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from "react-stripe-elements";
import UserHelper from "../shared/UserHelper";
import jstz from "jstz";
import Utils from "../shared/Utils";
import { NinjaContext } from "../shared/Utils";

const utils = new Utils();

export class UpdateCreditCard extends React.Component {
  constructor() {
    super();
    this.state = {
      stripe: null,
      showCreditCard: "block",
    };
    this.dataGridTemplate = this.dataGridTemplate.bind(this);
    this.enterKeyPressed = this.enterKeyPressed.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.InProgress = this.InProgress.bind(this);
    this.stripeTokenReady = this.stripeTokenReady.bind(this);
    this.updateCreditCardSuccess = this.updateCreditCardSuccess.bind(this);
    this.updateCreditCardError = this.updateCreditCardError.bind(this);
    this.parseUserCard = this.parseUserCard.bind(this);
  }

  // componentDidMount() {
  //   let userCard = this.parseUserCard();
  //   this.setState({ userCard: userCard });

  //   if(Constants.IS_PRODUCTION) {
  //     this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE)});
  //   } else {
  //     this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST)});
  //   }
  // }
  componentDidMount() {
    let userCard = this.parseUserCard();
    this.setState({ userCard: userCard });
    if (window.Stripe) {
      if (Constants.IS_PRODUCTION) {
        this.setState({ stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE) });
      } else {
        this.setState({ stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST) });
      }
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        // Create Stripe instance once Stripe.js loads
        if (Constants.IS_PRODUCTION) {
          this.setState({ stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE) });
        } else {
          this.setState({ stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST) });
        }
      });
    }
  }
  parseUserCard(userCard) {
    if (!userCard) userCard = this.context.initialData.userCard;
    try {
      let createTimeString = moment(userCard.create_time).format("DD MMM YYYY");
      userCard.createTimeString = createTimeString;
    } catch (e) {
      return userCard;
    }
    return userCard;
  }

  enterKeyPressed(e) {
    e = e || window.event;
    if (e.key === "Enter") {
      //enter key pressed
      this.subscribe(e);
    }
  }

  stripeTokenReady(card) {
    let stripe_token = card.token.id;
    let timeZone = jstz.determine().name();

    // let url = utils.getServicesUrl() + '/update_subscription_payment?stripe_token=' + stripe_token;
    // url += '&tmz=' + timeZone + '&live=' + Constants.IS_PRODUCTION;
    console.log("stripe_token", stripe_token);
    let url =
      utils.getServicesUrl() +
      "/update_payment_details?stripe_token=" +
      stripe_token;
    url += "&tmz=" + timeZone + "&live=" + Constants.IS_PRODUCTION;

    let data = card.token.card;
    utils.ajaxRequest(
      "PUT",
      url,
      this.updateCreditCardSuccess,
      this.updateCreditCardError,
      data,
      true
    );
  }

  updateCreditCardSuccess(data, status, response) {
    this.InProgress(false);
    // this.setState({showCreditCard: 'none'});
    let userInfo = this.context.userInfo;
    let successMsg =
      userInfo.firstName + ", Your Credit Card has been updated!";
    this.setState({ subscribedMessage: successMsg });
    // data = JSON.parse(data);
    // let userCard = this.parseUserCard(data.card);
    // this.setState({userCard: userCard});

    // setTimeout(
    //   function () {
    //     //new UserHelper({parentComponent: this}).getUserAfterLogin(userInfo.userId);
    //     window.location = window.origin + Constants.ACTION_RATES.url;
    //   }
    //     .bind(this),
    //   3000
    // );
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  updateCreditCardError(jqXHR, exception) {
    this.InProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({ pageErrorMessage: errorResponse });
  }

  InProgress(InProgress) {
    if (InProgress) {
      this.setState({ InProgress: true });
      this.refs.NinjaProgressSpinner.setState({ display: "block" });

      $("#ID_CARD_NUMBER").prop("disabled", true);
      $("#ID_EXPIRATION").prop("disabled", true);
      $("#ID_CVC").prop("disabled", true);
      $("#ID_SUBSCRIBE_BTN").prop("disabled", true);

      $("#ID_CHKBTN_" + Constants.PLAN_WHITE_BELT).addClass("disabled");
      $("#ID_CHKBTN_" + Constants.PLAN_NINJA_MASTER).addClass("disabled");
    } else {
      this.setState({ InProgress: false });
      this.refs.NinjaProgressSpinner.setState({ display: "none" });

      $("#ID_CARD_NUMBER").prop("disabled", false);
      $("#ID_EXPIRATION").prop("disabled", false);
      $("#ID_CVC").prop("disabled", false);
      $("#ID_SUBSCRIBE_BTN").prop("disabled", false);
      $("#ID_CHKBTN_" + Constants.PLAN_WHITE_BELT).removeClass("disabled");
      $("#ID_CHKBTN_" + Constants.PLAN_NINJA_MASTER).removeClass("disabled");
    }
  }

  onValueChange(e, elementId) {
    //e.preventDefault();
    let value = $("#" + elementId).val();
    this.setState({ ["value_" + elementId]: value });
  }

  dataGridTemplate(row) {
    if (!row) {
      return;
    }

    return (
      <div className="ui-g-12">
        <span className="md-inputfield">
          <InputText
            id={row.id}
            type="text"
            className="ui-inputtext ui-corner-all ui-state-default ui-widget"
            value={this.state["value_" + row.id]}
            onKeyPress={this.enterKeyPressed}
            onChange={(e) => {
              this.onValueChange(e, row.id);
            }}
            style={{ fontSize: "1.3em", width: "100%" }}
            required
          />
          <label
            htmlFor="password"
            style={{ fontWeight: "Bold", fontSize: 20 + "px" }}
          >
            {row.label}
          </label>
        </span>
      </div>
    );
  }

  render() {
    let updateLabel = "Update " + Constants.ACTION_UPDATE_CREDIT_CARD.linkLabel;
    return (
      <div className="ui-g-12 no-padding" style={{ width: "100%" }}>
        <p className={["previous_head", "commonButtonClass"].join(" ")}>
          {updateLabel}
            </p>
        <div className="ui-g" style={{ fontSize: "1.3em", width: "100%" }}>
          <Panel style={{ width: "100%" }}>
            {/* {this.state.userCard && (
              <div className="ug-12 no-passing" style={{
                width: '100%', textAlign: 'center',
                display: this.state.userCard ? 'block' : 'none'
              }}>
                <div className="ui-g-12 ui-md-4">
                  {this.state.userCard.brand} x{this.state.userCard.last4}
                </div>
                <div className="ui-g-12 ui-md-3">
                  Exp. {this.state.userCard.exp_month}/{this.state.userCard.exp_year}
                </div>
                <div className="ui-g-12 ui-md-4">
                  Added on {this.state.userCard.createTimeString}
                </div>
              </div>
            )
            } */}

            <NinjaProgressSpinner
              ref="NinjaProgressSpinner"
              maxWidth="200px"
              maxHeight="200px"
              marginTop="-10px"
            />

            <div
              className="ug-12 no-passing"
              style={{ width: "100%", display: this.state.showCreditCard }}
            >
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <SubscriptionForm
                    parentComponent={this}
                    submitButtonLabel={updateLabel}
                  />
                </Elements>
              </StripeProvider>
            </div>
            <div
              className="ui-g-12 no-padding"
              style={{
                display: this.state.pageErrorMessage ? "block" : "none",
              }}
            >
              <div
                style={{
                  color: "#b00020",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                  marginBottom: "1em",
                }}
              >
                {this.state.pageErrorMessage}
                <br />
              </div>
            </div>

            <div
              className="ui-g-12 no-padding"
              // style={{display: this.state.subscribedMessage ? 'block' : 'none'}}
            >
              <div
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                  marginBottom: "1em",
                }}
              >
                {this.state.subscribedMessage}
                <br />
              </div>
            </div>
          </Panel>
        </div>
        <br />
      </div>
    );
  }
}

UpdateCreditCard.propTypes = {};
UpdateCreditCard.contextType = NinjaContext;

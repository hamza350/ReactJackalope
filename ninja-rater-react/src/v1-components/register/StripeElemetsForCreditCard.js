import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../../state/ducks/createAccount/createAccountActions";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from "react-stripe-elements";
import styles from "./register.module.scss";
import { Customisedbutton } from "../../shared/inputFields";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router";
import { SpinnerComponent as Spinner } from "../../shared/components/spinner";
import Utils from "../../components/shared/Utils";
import "../../../src/App.css";
const utils = new Utils();
const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "ProximaNova-Light, Helvetia, Arial, sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding,
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };
};

class SplitForm extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? "14px" : "18px",
      error: undefined,
    };
    window.addEventListener("resize", () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== "14px") {
        this.setState({ elementFontSize: "14px" });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== "18px"
      ) {
        this.setState({ elementFontSize: "18px" });
      }
    });
  }
  UNSAFE_componentWillMount() {
    this.setState({
      ...this.props.createAccountObject,
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error != this.props.error) {
      this.setState({ error: nextProps.error });
    }
    if (nextProps.signedUp != this.props.signedUp) {
      utils.eraseCookie("refered_user_id");
      this.props.history.push("/signedUp");
    }
  }
  onCardChange = (e) => {
    this.setState({ error: e.error });
  };
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      const {
        firstName,
        pswd,
        email,
        chosenPlan,
        phone,
        lastName,
        userName,
        state,
        zipcode,
        address,
        country,
        tmz,
        live,
        city,
        knewVia,
      } = this.state;
      let refered_user_id = utils.readCookie("refered_user_id");
      let createUserData = {
        userName: userName,
        // pswd: pswd,
        pswd: utils.base64(pswd),
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        planid: chosenPlan.planid,
        planName: chosenPlan.planName,
        tmz: tmz,
        trial_period_days: chosenPlan.trail_period,
        live: live,
        zipcode: zipcode,
        state: state,
        address: address,
        country: country,
        city: city,
        price_id: chosenPlan.priceId,
        knewVia: knewVia,
        refered_user_id:
          refered_user_id && refered_user_id != null ? refered_user_id : null,
      };
      // this.setState({showSpinner: isEmpty(this.state.error) ? true : false});
      this.props.stripe.createToken().then((payload) => {
        if (payload.error) {
          const { error } = payload;
          this.setState({ error: error });
        } else {
          const { actions } = this.props;
          const { token } = payload;
          console.log(createUserData,token.id,'getdatahere')
          actions.createAccount.createUser({
            ...createUserData,
            stripe_token: token.id,
          });
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    // const {showSpinner} = this.state;
    const { showSpinner } = this.props;
    return (
      <React.Fragment>
        <div className={styles.cardDivPayment}>
          <form className={styles.formCss}>
            <label className={styles.labelCSS}>
              Card number
              <CardNumberElement
                onChange={this.onCardChange}
                {...createOptions(this.props.fontSize)}
              />
            </label>
            <label className={styles.labelCSS}>
              Expiration date
              <CardExpiryElement
                onChange={this.onCardChange}
                {...createOptions(this.props.fontSize)}
              />
            </label>
            <label className={styles.labelCSS}>
              CVC
              <CardCVCElement
                onChange={this.onCardChange}
                {...createOptions(this.props.fontSize)}
              />
            </label>
            {!isEmpty(this.state.error) && (
              <span
                id="card-errors"
                role="alert"
                className={styles.stripeErrorDisplay}
              >
                {this.state.error.message}
              </span>
            )}
            <div className={styles.each_label_sec_button}>
              <Customisedbutton
                name="Next"
                // className={styles.custom_button}
                className={"commonButtonClass"}
                onClick={this.handleSubmit}
              />
            </div>
          </form>
        </div>
        {showSpinner && <Spinner show={showSpinner} loadingImage={true} />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    createAccountObject: state.createAccountReducer,
    showSpinner: state.createAccountAjaxCallsReducer.showSpinner,
    error: state.createAccountAjaxCallsReducer.error,
    signedUp: state.createAccountAjaxCallsReducer.signedUp,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createAccount: bindActionCreators(createAccountActions, dispatch),
    },
  };
}
export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(SplitForm))
);

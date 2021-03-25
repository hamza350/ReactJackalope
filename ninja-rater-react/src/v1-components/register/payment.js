import React, { Component } from "react";
import styles from "./register.module.scss";
import { SelectDropDown } from "../../shared/inputFields";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  CustomisedTextfield,
  Customisedbutton,
} from "../../shared/inputFields";
import { Checkbox } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../../state/ducks/createAccount/createAccountActions";
import { paymentPageValidator } from "./createAccountValidator";
import {
  displayForValidationErrors,
  resetFormValidations,
  updateFormValidations,
} from "../../shared/components/commonValidations";
// import { Elements, StripeProvider } from "react-stripe-elements";
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import * as Constants from "../../Constants";
import SplitForm from "./StripeElemetsForCreditCard";
import StripePayment from "./Payment"

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccountType: "",
      selectedPaymentType: "",
      routingNumber: "",
      accountNumber: "",
      nameOnAccount: "",
      cvs: "",
      termsAndSubFee: "",
      acceptTermsAndCond: false,
    };
  }
  Next = async (event) => {
    let validFileds = [];
    try {
      // event.preventDefault();
      Object.keys(this.state).forEach((item) => {
        let isvalid = updateFormValidations(
          item,
          this.state[item],
          paymentPageValidator
        );
        if (!isvalid) validFileds.push(isvalid);
        this.setState((state) => {
          this.state[item] = this.state[item];
          return state;
        });
      });
      if (validFileds.length <= 0) {
      }
    } catch (expection) {
      console.log(expection);
    }
  };
  onSelectedAccountType = (key, event) => {
    this.setState((state) => {
      this.state[key] = event.target.value;
      return state;
    });
  };
  updateInputValue = (name, event) => {
    const value =
      name == "acceptTerms"
        ? !this.state.acceptTermsAndCond
        : event.target.value;
    this.setState((state) => {
      this.state[name] = value;
      return state;
    });
  };
  componentDidMount() {
    resetFormValidations(paymentPageValidator);
  }
  UNSAFE_componentWillMount() {
    // console.log('window', window.Stripe('pk_test_51HeHd5JhuQxu88ulu2fBQP3BX82UMFecNIP8cHhXZy32uiQIdLSWzZ8GfARxD5WFdDHuol6zjLwtWUOV2xrmnOus00qCBpaWtJ'));
    // let stripe = window.Stripe(Constants.STRIPE_TOKEN_TEST);
    // enable below code while moving code to prod
    // let stripe = Constants.IS_PRODUCTION ? window.Stripe(Constants.STRIPE_TOKEN_LIVE)
    //   : window.Stripe(Constants.STRIPE_TOKEN_TEST)
    // this.setState({
    //   ...this.props.createAccountObject,
    //   stripe: stripe
    // });

    //For avoiding error if stripe element is not loaded

    if (window.Stripe) {
      if (Constants.IS_PRODUCTION) {
        this.setState({
          ...this.props.createAccountObject,
          stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE),
        });
      } else {
        this.setState({
          ...this.props.createAccountObject,
          stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST),
        });
      }
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        // Create Stripe instance once Stripe.js loads
        if (Constants.IS_PRODUCTION) {
          this.setState({
            ...this.props.createAccountObject,
            stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE),
          });
        } else {
          this.setState({
            ...this.props.createAccountObject,
            stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST),
          });
        }
      });
    }
  }
  render() {
    const accountTypes = [
      { ID: 0, reason: "Account Type" },
      { ID: 1, reason: "Checking" },
      { ID: 2, reason: "Savings" },
    ];
    const creditTypes = [
      { ID: 0, reason: "Credit Card or ACH" },
      { ID: 1, reason: "Credit Card" },
      { ID: 2, reason: "ACH" },
    ];
    const {
      selectedAccountType,
      selectedPaymentType,
      routingNumber,
      accountNumber,
      nameOnAccount,
      cvs,
      termsAndSubFee,
      acceptTermsAndCond,
      stripe,
    } = this.state;
    console.log("this.state", this.state);
    const { chosenPlan } = this.props.createAccountObject;
    console.log("chosenPlan.planPrice", chosenPlan.planPrice);
    return (
      <StripePayment chosenPlan={chosenPlan} styles={styles}/>
      // <div className={styles.payment_sec}>
      //   <div className={styles.desc_selected_pln}>
      //     {chosenPlan.planPrice == null ? (
      //       <span>Monthly installments </span>
      //     ) : (
      //       <span>{chosenPlan.planName} installments </span>
      //     )}
      //     {/* <span>{chosenPlan.duration}</span> */}
      //     {chosenPlan.planPrice != null ? (
      //       <span>${chosenPlan.planPrice}</span>
      //     ) : (
      //       <span>$19.99</span>
      //     )}
      //   </div>
      //   <p className={styles.bank_acc_desc}>Bank Account Information:</p>
      //   <span className={styles.desclaimer_desc}>
      //     Disclaimer: The subscription can be cancelled at anytime and is billed
      //     on a monthly basis, unless the annual option has been selected.
      //   </span>
      //   <section className={styles.card_main_sec}>
      //     <Elements stripe={loadStripe("pk_test_51HGD7HEdu9JfEzPrFMgNkpRpqxvvApxA2wfwIxwHzxaGIbpKDRsBf6WpbN4f071KovBx7eGzoj2dd2WKHmH4DYW500wyNEUkg2")}>
      //       <SplitForm nextPage={this.Next.bind(this)} />
      //     </Elements>
      //     {/* <div className={styles.Checkout}>
      //       <StripeProvider stripe={stripe}>
      //         <Elements>
      //           <SplitForm nextPage={this.Next.bind(this)} />
      //         </Elements>
      //       </StripeProvider>
      //     </div>
      //     {/* <div className={styles.each_label_sec_button}>
      //       <Customisedbutton
      //         name="Next"
      //         className={styles.custom_button}
      //         onClick={this.Next.bind(this)}
      //       />
      //     </div> */} 
      //   </section>
      // </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    createAccountObject: state.createAccountReducer,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createAccount: bindActionCreators(createAccountActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

import React from "react";
import "./SubscriptionForm.css";
import { injectStripe } from "react-stripe-elements";
import CardSection from "./CardSection";
import { Button } from "primereact/components/button/Button";
import * as Constants from "../../Constants";
import Utils from "../shared/Utils";
import { NinjaContext } from "../shared/Utils";
import styles from "../../v1-components/register/register.module.scss";
const utils = new Utils();

class SubscriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentComponent: this.props.parentComponent,
      submitButtonLabel: this.props.submitButtonLabel,
    };
    this.handleSubmitStripe = this.handleSubmitStripe.bind(this);
  }

  handleSubmitStripe = (ev) => {
    //TODO: Make it look like this https://jsfiddle.net/ywain/L96q8uj5/
    ev.preventDefault();
    this.state.parentComponent.InProgress(true);
    this.state.parentComponent.setState({ pageErrorMessage: null });
    this.state.parentComponent.setState({ subscribedMessage: null });

    let userInfo = this.context.userInfo;

    this.props.stripe
      .createToken({ name: userInfo.firstName + " " + userInfo.lastName })
      .then((token) => {
        if (token.error) {
          this.state.parentComponent.InProgress(false);
          this.state.parentComponent.setState({
            pageErrorMessage: token.error.message,
          });
        } else {
          this.state.parentComponent.stripeTokenReady(token);
        }
      });
  };

  render() {
    return (
      <div
        // style={{width: '100%', marginTop: '80px'}}
        className={styles.updateCreditCardMainDiv}
      >
        <form onSubmit={this.handleSubmitStripe} style={{ margin: "5px" }}>
          {/* <label style={{fontSize: '1em', color: '#293891'}}>Credit Card</label> */}
          <p
            style={{ fontSize: "18px", color: "#293891", textAlign: "center" }}
          >
            Credit Card
          </p>
          <CardSection />
          <div className="ui-g-12" style={{ textAlign: "center" }}>
            <Button
              //className="change_password_button commonButtonClass"
              className="commonButtonClass"
              id="ID_SUBSCRIBE_BTN"
              label={this.state.submitButtonLabel}
            ></Button>
          </div>
        </form>
      </div>
    );
  }
}

SubscriptionForm.propTypes = {};
SubscriptionForm.contextType = NinjaContext;

export default injectStripe(SubscriptionForm);

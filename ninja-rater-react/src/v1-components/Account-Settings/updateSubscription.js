import React, { Component } from "react";
import { connect } from "react-redux";
// import classNames from "classnames";
// import {Link} from "react-router-dom";
// import jQuery from "jquery";
import $ from "jquery";
import * as Constants from "../../Constants";
// import FooterSimple from "../../components/FooterSimple";
// import "./SubscriptionForm.css";

// import "../../assets/ninja/theme/theme-indigo.css";
// import "../../assets/ninja/layout/css/layout-indigo.css";
// import "primereact/resources/primereact.min.css";

import { Panel } from "primereact/components/panel/Panel";
import { Button } from "primereact/components/button/Button";
import { RadioButton } from "primereact/components/radiobutton/RadioButton";
// import {Column} from "primereact/components/column/Column";
import { DataGrid } from "primereact/components/datagrid/DataGrid";
import NinjaProgressSpinner from "../../components/shared/NinjaProgressSpinner";
import Utils from "../../components/shared/Utils";
import styles from "../../../src/components/RateQuote.module.scss";
import { PasswordTextfield } from "../../shared/inputFields";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../../state/ducks/createAccount/createAccountActions";
import { userActions } from "../../state/ducks/user/userAction";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import jstz from "jstz";
const utils = new Utils();
const Styles = (theme) => ({
  root: {
    color: "#E44249",
    "&$checked": {
      color: "#E44249",
    },
  },
  checked: {},
  label: {
    fontFamily: "'ProximaNova-Regular', 'Helvetia', 'Arial','sans-serif'",
    fontSize: "16px",
  },
  formRoot: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
  },
});
class UpdateSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.ninjaRaterApp.state.ninjaStore.userInfo.firstName,
      lastName: this.props.ninjaRaterApp.state.ninjaStore.userInfo.lastName,
      planData: {},
      currentPlan: "",
      userPlan: this.props.ninjaRaterApp.state.ninjaStore.userInfo.priceId,
      selectedValue: "",
      spinnerHeight: true,
    };
    this.updateSubscriptionSuccess = this.updateSubscriptionSuccess.bind(this);
    this.updateSubscriptionError = this.updateSubscriptionError.bind(this);
  }
  InProgress = (InProgress) => {
    if (InProgress) {
      this.setState({ InProgress: true });
      this.refs.NinjaProgressSpinner.setState({ display: "block" });
    } else {
      this.setState({ InProgress: false });
      this.refs.NinjaProgressSpinner.setState({ display: "none" });
    }
  };
  componentDidMount() {
    const { actions } = this.props;
    $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    actions.createAccount.getSubscriptionPlans({});
  }

  componentWillReceiveProps(nextProps) {
    $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
    $("#NinjaProgressSpinner").hide();
    let originalData = JSON.parse(JSON.stringify(nextProps.subscriptionPlans));
    let currentPlan = nextProps.subscriptionPlans.filter((data) => {
      return data.priceId == this.state.userPlan;
    });

    let selectedValue = this.setSelectedValue(currentPlan, originalData);

    this.setState({
      planData: originalData.filter((data) => {
        return data.productPrice != null;
      }),
      currentPlan: currentPlan,
      originalData: originalData,
      selectedValue: selectedValue[0].productId,
    });
  }
  setSelectedValue = (currentPlan, originalData) => {
    let selectedValue;
    if (currentPlan[0].priceId.toString() == "price_1Hwj8uEdu9JfEzPr9S6KlJMY") {
      //if user current plan is free one select monthly plan
      selectedValue = originalData.filter((data) => {
        return data.priceId == "price_1Hwj7eEdu9JfEzPrsafsx26f";
      });
    } else if (
      currentPlan[0].priceId.toString() == "price_1Hwj7eEdu9JfEzPrsafsx26f"
    ) {
      //if user current plan is monthly one select annual plan
      selectedValue = originalData.filter((data) => {
        return data.priceId == "price_1HwipzEdu9JfEzPrtM0vOkhi";
      });
    } else {
      selectedValue = originalData.filter((data) => {
        return data.priceId == "price_1Hwj7eEdu9JfEzPrsafsx26f";
      });
    }
    return selectedValue;
  };
  handleChange = (event) => {
    let product = this.state.originalData.filter((item) => {
      return item.productId == event.target.value;
    });
    this.setState({
      selectedValue: product[0].productId,
    });
  };

  updateSubscription(e) {
    // this.InProgress(true);
    this.setState({ spinnerHeight: false });
    $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    $("#NinjaProgressSpinner").show();
    const { originalData, selectedValue } = this.state;
    let plan = originalData.filter((data) => {
      return data.productId == selectedValue;
    });
    let planType;
    if (Constants.IS_PRODUCTION) {
      plan[0].productName == "Monthly"
        ? (planType = "MONTHLY")
        : (planType = "ANNUALLY");
    } else {
      plan[0].productName == "Monthly"
        ? (planType = "MONTHLY_TEST")
        : (planType = "ANNUALLY_TEST");
    }
    let timeZone = jstz.determine().name();
    let url =
      utils.getServicesUrl() + "/updateSubscriptionPlan?planType=" + planType;
    url += "&tmz=" + timeZone + "&live=" + Constants.IS_PRODUCTION;
    utils.ajaxRequest(
      "PUT",
      url,
      this.updateSubscriptionSuccess,
      this.updateSubscriptionError,
      {},
      true
    );
  }
  updateSubscriptionSuccess(data, status, response) {
    // this.InProgress(false);
    let updatedValue = this.state.originalData.filter((item) => {
      return item.priceId == data["Plan updated Id"];
    });
    let selectedValue = this.setSelectedValue(
      updatedValue,
      this.state.originalData
    );
    this.setState((state) => {
      this.state.updateSubscriptionChangedMessage =
        "Success! Your Subscription is Updated";
      this.state.pageErrorMessage = null;
      this.state.selectedValue = selectedValue[0].productId;
      this.state.currentPlan = updatedValue;
      this.state.userPlan = updatedValue[0].priceId;
      return state;
    });
    $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
    $("#NinjaProgressSpinner").hide();
    this.setState({ spinnerHeight: true });
    setTimeout(() => {
      this.setState({ updateSubscriptionChangedMessage: null });
    }, 1500);
  }

  updateSubscriptionError(jqXHR, exception) {
    // this.InProgress(false);
    // let errorResponse = utils.parseResponseError(jqXHR, exception);
    // this.setState({pageErrorMessage: errorResponse});
    this.setState({ pageErrorMessage: jqXHR.responseJSON.message });
    this.setState({ updateSubscriptionChangedMessage: null });
    setTimeout(() => {
      this.setState({ pageErrorMessage: null });
      // window.location.reload();
    }, 2000);
  }

  render() {
    const {
      firstName,
      lastName,
      planData,
      currentPlan,
      userPlan,
      selectedValue,
      spinnerHeight,
    } = this.state;
    var { classes } = this.props;
    return (
      <React.Fragment>
        <div className="ui-g-12 no-padding" style={{ width: "100%" }}>
          <p className={["previous_head", "commonButtonClass"].join(" ")}>
            Update Subscription
          </p>
        </div>
        <div
          id="NinjaProgressSpinner"
          style={{ textAlign: "center" }}
          style={{ height: this.state.spinnerHeight ? "500px" : "0px" }}
          className="container"
        >
          <NinjaProgressSpinner
            ref="NinjaProgressSpinner"
            maxWidth="200px"
            maxHeight="200px"
            marginTop="-10px"
          />
        </div>
        {planData && currentPlan && (
          <div className="ui-g" style={{ width: "100%" }}>
            <div
              className="ui-g"
              style={{ fontSize: "1.2em", display: "contents" }}
            >
              {/* <NinjaProgressSpinner
                ref="NinjaProgressSpinner"
                maxWidth="200px"
                maxHeight="200px"
                marginTop="-10px"
              /> */}

              <div className="ui-g-12 no-padding" style={{ width: "100%" }}>
                <Panel>
                  <div className="container">
                    <div
                      className="ui-g-12"
                      style={{ textAlign: "center", width: "100%" }}
                    >
                      <span className="text" style={{ color: "#ec4b3c" }}>
                        {" "}
                        Current Subscription Plan{" "}
                      </span>
                    </div>
                    <div className="overview-content clearfix">
                      <div className="justify-content-md-center">
                        <div className="card-deck mb-3 text-center col-md-auto">
                          <div className="card mb-4 box-shadow no-padding">
                            <div className="card-header">
                              <h4 className="my-0 font-weight-normal">
                                {currentPlan[0].productName}
                              </h4>
                            </div>
                            {currentPlan[0].productPrice > 0 && (
                              <div className="card-body">
                                <h1 className="card-title pricing-card-title">
                                  ${currentPlan[0].productPrice} /{" "}
                                  <span>
                                    {currentPlan[0].productDuration ==
                                    "1 month" ? (
                                      <span className={styles.durationFont}>
                                        month
                                      </span>
                                    ) : (
                                      <React.Fragment>
                                        <span className={styles.durationFont}>
                                          annual{" "}
                                        </span>
                                        <span className={styles.durationFont}>
                                          1 month free!
                                        </span>
                                      </React.Fragment>
                                    )}
                                  </span>
                                </h1>
                              </div>
                            )}
                            <div
                              className={
                                currentPlan[0].productPrice
                                  ? "card-footer"
                                  : "card-body"
                              }
                            >
                              <small>{currentPlan[0].productDiscraption}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ui-g-12" style={{ textAlign: "center" }}>
                      <span className="text" style={{ color: "#ec4b3c" }}>
                        To upgrade, please choose any of the below plan
                      </span>
                    </div>
                    <div className="ui-g-12" style={{ textAlign: "center" }}>
                      <div className="row justify-content-md-center">
                        <RadioGroup
                          onChange={this.handleChange.bind(this)}
                          value={selectedValue.toString()}
                        >
                          {planData.map((value, i) => (
                            <FormControlLabel
                              key={i}
                              value={value.productId}
                              control={
                                <Radio
                                  color="default"
                                  className={classes.root}
                                  disabled={value.priceId == userPlan}
                                />
                              }
                              label={
                                <React.Fragment>
                                  {
                                    <span className={styles.priceSize}>
                                      ${value.productPrice} /{" "}
                                    </span>
                                  }
                                  {
                                    <span>
                                      {value.productDuration == "1 month" ? (
                                        <span className={styles.durationFont}>
                                          month
                                        </span>
                                      ) : (
                                        <React.Fragment>
                                          <span className={styles.durationFont}>
                                            annual
                                          </span>{" "}
                                          <span className={styles.durationFont}>
                                            1 month free!
                                          </span>
                                        </React.Fragment>
                                      )}
                                    </span>
                                  }
                                </React.Fragment>
                              }
                            />
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

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
                    style={{
                      display: this.state.updateSubscriptionChangedMessage
                        ? "block"
                        : "none",
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
                      {this.state.updateSubscriptionChangedMessage}
                      <br />
                    </div>
                  </div>

                  <div className="ui-g-12" style={{ textAlign: "center" }}>
                    <Button
                      //className="change_password_button commonButtonClass"
                      className="commonButtonClass"
                      id="ID_UPDATE_SUBSCRIPTION"
                      type="button"
                      label="Update Subscription"
                      onClick={(e) => this.updateSubscription(e)}
                      style={{ fontWeight: "600" }}
                    ></Button>
                  </div>
                </Panel>
              </div>
            </div>
            <br />
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    subscriptionPlans: state.createAccountAjaxCallsReducer.subscriptionPlans,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createAccount: bindActionCreators(createAccountActions, dispatch),
      userActions: bindActionCreators(userActions, dispatch),
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(UpdateSubscription));

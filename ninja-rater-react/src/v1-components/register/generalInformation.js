import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomisedTextfield,
  Customisedbutton,
  PasswordTextfield,
} from "../../shared/inputFields";
import styles from "./register.module.scss";
import { userActions } from "../../state/ducks/user/userAction";
import { createAccountValidator } from "./createAccountValidator";
import {
  displayForValidationErrors,
  resetFormValidations,
  updateFormValidations,
} from "../../shared/components/commonValidations";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../../state/ducks/createAccount/createAccountActions";
import { Checkbox } from "@material-ui/core";
import { SelectDropDown } from "../../shared/inputFields";
import { MenuItem } from "@material-ui/core";
import * as Constants from "../../Constants";
import jstz from "jstz";
import MaskedInput from "react-text-mask";
import Utils from "../../../src/components/shared/Utils";
import "../../../src/App.css";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import axios from "axios";
const utils = new Utils();
class GeneralInformation extends Component {
  knewAboutTheSite = [
    { ID: 0, reason: "How did you hear about us?" },
    { ID: 1, reason: "Bigfoot Portal" },
    { ID: 2, reason: "Friend referral" },
    { ID: 3, reason: "Google" },
    { ID: 4, reason: "Email/Newsletter" },
    { ID: 5, reason: "Advertisement" },
  ];
  phoneMask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  Next = async (event) => {
    let validFileds = [];
    try {
      // event.preventDefault();
      Object.keys(this.state).forEach((item) => {
        let isvalid = updateFormValidations(
          item,
          this.state[item],
          createAccountValidator
        );
        if (!isvalid) validFileds.push(isvalid);
        this.setState((state) => {
          this.state[item] = this.state[item];
          return state;
        });
      });
      if (validFileds.length <= 0) {
        const { actions } = this.props;
        let timeZone = jstz.determine().name();
        let live = false; //Constants.IS_PRODUCTION
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
        } = this.state;
        // let userObj = {
        //   userName: userName,
        //   pswd: pswd,
        //   email: email,
        //   firstName: firstName,
        //   lastName: lastName,
        //   phone: phone,
        //   planid: chosenPlan.planid,
        //   planName: chosenPlan.planName,
        //   tmz: timeZone,
        //   stripe_token: stripe_token.id,
        //   live: live,
        //   zipcode: zipcode
        // }
        actions.createAccount.createAccountState(
          Object.assign(
            {},
            {
              ...this.state,
              tmz: timeZone,
              live: live,
            }
          )
        );
        let data = {
          userName: userName.toString(),
          email: email.toString(),
          callback: "JSON_CALLBACK",
        };
        let url = utils.getServicesUrl() + "/userChecking";
        utils.ajaxRequest(
          "POST",
          url,
          this.successUserChecking,
          this.errorUserChecking,
          data,
          true
        );
      }
    } catch (expection) {
      console.log(expection);
    }
  };
  successUserChecking = (data) => {
    const { actions } = this.props;
    actions.userActions.switchToPayment({});
  };
  errorUserChecking = (jqXHR, exception) => {
    console.log("jqXHR", jqXHR, jqXHR["responseJSON"].message);
    console.log("exception", exception);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    console.log("errorResponse", errorResponse);
    this.setState({ userCheckingError: jqXHR["responseJSON"].message });
  };
  updateInputValue = (name, event) => {
    const value = event.target.value;
    this.setState((state) => {
      this.state[name] = value;
      return state;
    });
  };
  UNSAFE_componentWillMount() {
    this.setState({
      ...this.props.createAccountObject,
    });
  }
  componentDidMount() {
    resetFormValidations(createAccountValidator);
  }

  customStyle = {
    position: "relative",
    left: "0px",
  };
  render() {
    const {
      userName,
      pswd,
      firstName,
      lastName,
      phone,
      email,
      organizationName,
      producerCode,
      address,
      city,
      state,
      country,
      zipcode,
      billingAddressSame,
      knewVia,
    } = this.state;
    return (
      <div className={styles.generalInfo_sec}>
        <div className={styles.every_div}>
          <CustomisedTextfield
            placeholder="Username:"
            className={styles.text_field}
            value={userName}
            onChange={this.updateInputValue.bind(this, "userName")}
            error={createAccountValidator["userName"].errors.length > 0}
          />
          <div>
            {displayForValidationErrors(
              "userName",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div className={styles.every_div}>
          <PasswordTextfield
            className={styles.text_field}
            placeholder="Password:"
            type="password"
            value={pswd}
            onChange={this.updateInputValue.bind(this, "pswd")}
            error={createAccountValidator["pswd"].errors.length > 0}
          />
          <div>
            {displayForValidationErrors(
              "pswd",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div className={styles.every_div}>
          <CustomisedTextfield
            placeholder="First Name:"
            className={styles.text_field}
            value={firstName}
            onChange={this.updateInputValue.bind(this, "firstName")}
            error={createAccountValidator["firstName"].errors.length > 0}
          />
          <div>
            {displayForValidationErrors(
              "firstName",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div className={styles.every_div}>
          <CustomisedTextfield
            placeholder="Last Name:"
            className={styles.text_field}
            value={lastName}
            onChange={this.updateInputValue.bind(this, "lastName")}
            error={createAccountValidator["lastName"].errors.length > 0}
          />
          <div>
            {displayForValidationErrors(
              "lastName",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div className={styles.every_div}>
          {/* <CustomisedTextfield
            placeholder="Phone Number:"
            className={styles.text_field}
            value={phone}
            onChange={this.updateInputValue.bind(this, "phone")}
            error={
              createAccountValidator["phone"].errors.length > 0
            }
          /> */}
          <MaskedInput
            mask={this.phoneMask}
            className={styles.masked_phone}
            placeholder="(567) 276-1765"
            guide={true}
            id="my-input-id"
            value={phone}
            onChange={this.updateInputValue.bind(this, "phone")}
            error={
              createAccountValidator["phone"].errors.length > 0
                ? "true"
                : "false"
            }
          />
          <div>
            {displayForValidationErrors(
              "phone",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div className={styles.every_div}>
          <CustomisedTextfield
            placeholder="Email:"
            className={styles.text_field}
            value={email}
            onChange={this.updateInputValue.bind(this, "email")}
            error={createAccountValidator["email"].errors.length > 0}
          />
          <div>
            {displayForValidationErrors(
              "email",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div className={styles.every_div}>
          <CustomisedTextfield
            placeholder="Organization Name:"
            className={styles.text_field}
            value={organizationName}
            onChange={this.updateInputValue.bind(this, "organizationName")}
            error={createAccountValidator["organizationName"].errors.length > 0}
          />
          <div>
            {displayForValidationErrors(
              "organizationName",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div className={styles.every_div}>
          <CustomisedTextfield
            placeholder="Producer Code (If known):"
            className={styles.text_field}
            value={producerCode}
            onChange={this.updateInputValue.bind(this, "producerCode")}
          />
        </div>
        <div
          className={[styles.address_filed_div, styles.generalInfo_sec].join(
            " "
          )}
        >
          <div className={styles.every_div}>
            <CustomisedTextfield
              placeholder="Address:"
              className={styles.text_field}
              value={address}
              onChange={this.updateInputValue.bind(this, "address")}
              error={createAccountValidator["address"].errors.length > 0}
            />
            <div>
              {displayForValidationErrors(
                "address",
                createAccountValidator,
                this.customStyle
              )}
            </div>
          </div>
          <div className={styles.every_div}>
            <CustomisedTextfield
              placeholder="City:"
              className={styles.text_field}
              value={city}
              onChange={this.updateInputValue.bind(this, "city")}
              error={createAccountValidator["city"].errors.length > 0}
            />
            <div>
              {displayForValidationErrors(
                "city",
                createAccountValidator,
                this.customStyle
              )}
            </div>
          </div>
          <div className={styles.every_div}>
            <CustomisedTextfield
              placeholder="State:"
              className={styles.text_field}
              value={state}
              onChange={this.updateInputValue.bind(this, "state")}
              error={createAccountValidator["state"].errors.length > 0}
            />
            <div>
              {displayForValidationErrors(
                "state",
                createAccountValidator,
                this.customStyle
              )}
            </div>
          </div>
          <div className={styles.every_div}>
            <CustomisedTextfield
              placeholder="Country:"
              className={styles.text_field}
              value={country}
              onChange={this.updateInputValue.bind(this, "country")}
              error={createAccountValidator["country"].errors.length > 0}
            />
            <div>
              {displayForValidationErrors(
                "country",
                createAccountValidator,
                this.customStyle
              )}
            </div>
          </div>
          <div className={styles.every_div}>
            <CustomisedTextfield
              placeholder="Zip Code:"
              className={styles.text_field}
              value={zipcode}
              onChange={this.updateInputValue.bind(this, "zipcode")}
              error={createAccountValidator["zipcode"].errors.length > 0}
            />
            <div>
              {displayForValidationErrors(
                "zipcode",
                createAccountValidator,
                this.customStyle
              )}
            </div>
          </div>
        </div>

        <div className={styles.text_field_address}>
          <span>Is this your billing address?</span>
          <Checkbox
            checked={billingAddressSame}
            // disabled={false}
            value={billingAddressSame}
            // onChange={this.updateInputValue.bind(this, "acceptTerms")}
            onChange={(e) => {
              this.setState({ billingAddressSame: e.target.checked });
            }}
          />
        </div>
        <div className={styles.dropdDownWidth}>
          <SelectDropDown
            class={styles.drop_down}
            value={knewVia}
            onChange={this.updateInputValue.bind(this, "knewVia")}
          >
            {this.knewAboutTheSite.map((item, i) => {
              return (
                <MenuItem
                  key={i}
                  value={item.ID == 0 ? "" : item.reason}
                  disabled={item.ID == 0}
                >
                  <span className={styles.dropdown_options}>{item.reason}</span>
                </MenuItem>
              );
            })}
          </SelectDropDown>

          <div>
            {displayForValidationErrors(
              "knewVia",
              createAccountValidator,
              this.customStyle
            )}
          </div>
        </div>
        <div
          className="ui-g-12 no-padding"
          style={{ display: this.state.userCheckingError ? "block" : "none" }}
        >
          <div
            style={{
              color: "#b00020",
              fontSize: "16px",
              marginLeft: "15px",
              textAlign: "center",
              marginTop: "14px",
            }}
          >
            {this.state.userCheckingError}
            <br />
          </div>
        </div>
        <div className={styles.each_label_sec_button}>
          <Customisedbutton
            name="Next"
            // className={styles.custom_button}
            className={"commonButtonClass"}
            onClick={this.Next.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    createAccountObject: state.createAccountReducer,
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

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInformation);

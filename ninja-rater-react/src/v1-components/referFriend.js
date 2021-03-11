import React, { Component } from "react";
import { withRouter } from "react-router";
import $ from "jquery";
import NinjaProgressSpinner from "../components/shared/NinjaProgressSpinner";
import styles from "./referFriend.module.scss";
import styles1 from "./login/login.module.scss";
import { Customisedbutton, CustomisedTextfield } from "../shared/inputFields";
import logo from "./../assets/images/jackalope_logo.jpg";
import { Button } from "primereact/components/button/Button";
import Utils from "../components/shared/Utils.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  displayForValidationErrors,
  resetFormValidations,
  updateFormValidations,
} from "../shared/components/commonValidations";
import "../../src/App.css";
const utils = new Utils();
const emailPattern = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export default class ReferFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // layoutMode: 'static',
      // profileMode: 'inline',
      // overlayMenuActive: false,
      // staticMenuDesktopInactive: false,
      // staticMenuMobileActive: false,
      // rotateMenuButton: false,
      // topbarMenuActive: false,
      // activeTopbarItem: null,
      // darkMenu: false,
      // rightPanelActive: false,
      // menuActive: false,
      // display: 'block',
      emailValid: true,
      friendEmailInvalid: "",
      sendLink: {
        friendEmail: "",
        friendcomment: "",
        inviteLink: "",
      },
    };
    this.handleSendFriendInvite = this.handleSendFriendInvite.bind(this);
    this.updateSendFriendValue = this.updateSendFriendValue.bind(this);
    this.validateSendRequest = this.validateSendRequest.bind(this);
    // this.referInputKeyPressed = this.referInputKeyPressed.bind(this);
    this.sendInviteSuccess = this.sendInviteSuccess.bind(this);
    this.sendInviteError = this.sendInviteError.bind(this);
    this.inProgress = this.inProgress.bind(this);
    this.getLinkSuccess = this.getLinkSuccess.bind(this);
    this.getLinkError = this.getLinkError.bind(this);
    this.copyToClipBoard = this.copyToClipBoard.bind(this);
  }
  referFriendValidator = {
    friendEmail: {
      rules: [
        {
          test: (value) => {
            return value.length > 0;
          },
          message: "Please enter the email",
        },
        {
          test: (value) => {
            return emailPattern.test(value) || value.length <= 0;
          },
          message: "Please enter a valid email address",
        },
      ],
      errors: [],
      valid: false,
      state: "",
    },
    friendcomment: {
      rules: [],
      errors: [],
      valid: false,
      state: "",
    },
    inviteLink: {
      rules: [],
      errors: [],
      valid: false,
      state: "",
    },
  };
  componentDidMount() {
    resetFormValidations(this.referFriendValidator);
    let url = utils.getServicesUrl() + "/get.referFriendLink";
    utils.ajaxRequest("GET", url, this.getLinkSuccess, this.getLinkError);
  }
  getLinkSuccess(data) {
    console.log("data", data);
  }
  getLinkError(jqXHR, exception) {
    this.setState({ inviteLink: jqXHR.responseText });
  }
  updateSendFriendValue = (name, event) => {
    const value = event.target.value;
    this.setState((state) => {
      this.state.sendLink[name] = value;
      return state;
    });
  };

  updateReferLinkValue(e) {
    this.state.sendLink.inviteLink = e.target.value;
  }

  handleSendFriendInvite(e) {
    let validFileds = [];
    e.preventDefault();
    // //alert(JSON.stringify(this.state.createAccount));
    // let isValid = this.validateSendRequest();
    // if(!isValid) {
    //   return;
    // }

    // let data = { "email": this.state.sendLink.friendEmail, "comment": this.state.sendLink.friendcomment,
    //   "inviteLink": this.state.sendLink.inviteLink };
    Object.keys(this.state.sendLink).forEach((item) => {
      let isvalid = updateFormValidations(
        item,
        this.state["sendLink"][item],
        this.referFriendValidator
      );
      if (!isvalid) validFileds.push(isvalid);
      this.setState((state) => {
        this.state.sendLink[item] = this.state.sendLink[item];
        return state;
      });
    });
    if (validFileds.length <= 0) {
      let data = {
        email: this.state.sendLink.friendEmail,
        comment: this.state.sendLink.friendcomment,
      };

      let url = utils.getServicesUrl() + "/submitReferFriend";
      utils.ajaxRequest(
        "POST",
        url,
        this.sendInviteSuccess,
        this.sendInviteError,
        data,
        true
      );

      this.setState({ pageMessage: null });
      this.inProgress(true);
    }
  }

  sendInviteSuccess(data, status, response) {
    this.inProgress(false);
    //let msg = 'Both the user that sent the invite as well as referred person ' + this.state.sendLink.friendEmail + ' will get email notifcation';
    let msg =
      "The email has been sent to referred person " +
      this.state.sendLink.friendEmail;
    this.setState({
      pageMessage: msg,
    });
    this.setState((state) => {
      this.state.sendLink["friendEmail"] = "";
      return state;
    });
    //{this.updateSendFriendValue.bind(this, "inviteLink")}
    //{this.updateResetPasswordValue}
  }

  sendInviteError(jqXHR, exception) {
    this.inProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({ pageMessage: errorResponse });
  }

  inProgress(inProgress) {
    if (inProgress) {
      $("#ID_REFER_FRIEND_DIV").hide();
      $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    } else {
      $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
      $("#ID_REFER_FRIEND_DIV").show();
    }
  }

  validateSendRequest() {
    let isValid = true;

    let friendEmail = this.refs.friendEmail;
    let email = this.state.sendLink.friendEmail;
    if (email == null || email.trim() == "" || !utils.isEmail(email)) {
      //$('#friendEmail').get(0).scrollIntoView();
      //this.setState({emailValid: false, friendEmailInvalid: 'Invalid Email'});
      this.setState({ emailValid: false, pageMessage: "Invalid Email" });
      $("#friendEmail").select();
      isValid = false;
    } else {
      this.setState({ emailValid: true });
    }
    return isValid;
  }

  referInputKeyPressed(e) {
    e = e || window.event;
    if (e.key === "Enter") {
      //enter key pressed
      this.handleSendFriendInvite(e);
    }
  }

  copyToClipBoard() {}
  render() {
    const { friendEmail, comment, inviteLink } = this.state;
    return (
      <React.Fragment>
        <div className="ui-g-12 no-padding">
          <p className={["previous_head", "commonButtonClass"].join(" ")}>
            Refer A Friend!
            </p>
        </div>
        <div className="container">
          <section style={{ width: "100%" }}>
            <div className={styles.section_pos}>
              <h2 className={styles.heading}>
                Earn Jackalope swag when you refer a friend!
              </h2>
              <p className={styles.title}>
                Refer a Frined below! Once they signed up, the following month
                we will send you a box of Jackalope swag to say Thank you!
              </p>
            </div>
            <div
              id="ID_REFER_FRIEND_DIV"
              className="ui-g"
              style={{ width: "100%", flexDirection: "column" }}
            >
              <div
                id="ID_REFER_FRIEND_ERROR"
                style={{
                  display: this.state.pageMessage ? "block" : "none",
                  backgroundColor: "white",
                  opacity: 0.9,
                  color: "red",
                  fontSize: "1.5em",
                  textAlign: "center",
                  marginBottom: "15px",
                  borderRadius: "5px",
                }}
              >
                {this.state.pageMessage}
              </div>
            </div>
            <div className={styles.section_panel}>
              <div>
                {/* <div> */}

                <NinjaProgressSpinner
                  ref="NinjaProgressSpinner"
                  maxWidth="200px"
                  maxHeight="200px"
                  marginTop="-10px"
                />
                <div>
                  {" "}
                  <h2 className={styles.sub_heading}>Invite By Email</h2>
                </div>
                {/* <div style={{display: this.state.emailValid ? 'none' : 'block', paddingBottom: '15px'}}>
                <span><font color="red" ref="friendEmailInvalid">{this.state.friendEmailInvalid}</font></span>
              </div> */}
                <p className={styles.label}>Friends Email:</p>

                <div>
                  <CustomisedTextfield
                    placeholder="Email:"
                    className={styles1.text_field}
                    id="friendEmail"
                    value={this.state.sendLink.friendEmail}
                    onChange={this.updateSendFriendValue.bind(
                      this,
                      "friendEmail"
                    )}
                    error={
                      this.referFriendValidator["friendEmail"].errors.length > 0
                    }
                  />
                  <div>
                    {displayForValidationErrors(
                      "friendEmail",
                      this.referFriendValidator,
                      this.customStyle
                    )}
                  </div>
                </div>
                <p className={styles.label} style={{ marginTop: "30px" }}>
                  Message:
                </p>
                <textarea
                  id="friendcomment"
                  className={styles.textfield}
                  onChange={this.updateSendFriendValue.bind(
                    this,
                    "friendcomment"
                  )}
                ></textarea>
                <p>
                  <Button
                    onClick={this.handleSendFriendInvite}
                    //className={styles.custom_button}
                    className={"commonButtonClass"}
                  >
                    Send Invite
                  </Button>
                </p>
              </div>
              <div>
                <h2 className={styles.sub_heading}>Invite By Link</h2>
                <div className={styles.invite_link_container}>
                  <CustomisedTextfield
                    id="friendShowLink"
                    className={styles1.text_field}
                    // ref={(textarea) => this.textArea = textarea}
                    value={inviteLink || ""}
                    disabled
                  />
                  <CopyToClipboard text={inviteLink}>
                    <p>
                      <button
                        // className={styles.custom_button}
                        className={[
                          "commonButtonClass",
                          styles.copy_custom_button,
                        ].join(" ")}
                        style={{ marginTop: "30px" }}
                        tooltip="Copied"
                        // onClick={this.copyToClipBoard}
                        // data-clipboard-text="1"
                      >
                        Copy Link
                      </button>
                    </p>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            {/* </div> */}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

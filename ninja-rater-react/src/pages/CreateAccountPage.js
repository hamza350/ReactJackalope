import React, { Component } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import jQuery from 'jquery';
import $ from 'jquery';

import ErrorDiv from './ErrorDiv';
import FooterSimple from '../components/FooterSimple';
import BrowserBackArrowForPage from '../components/navigation/BrowserBackArrowForPage';
import NinjaLogoMedium from '../components/logos/NinjaLogoMedium';
import * as Constants from '../Constants';
import '../assets/ninja/theme/theme-indigo.css';
import '../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';
import '../ripple.js';
import {InputMask} from 'primereact/components/inputmask/InputMask';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {Panel} from 'primereact/components/panel/Panel';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Password} from 'primereact/components/password/Password';
import {Button} from 'primereact/components/button/Button';
import {TermsOfUse} from './TermsOfUse'
import Utils from '../components/shared/Utils';
import NinjaProgressSpinner from '../components/shared/NinjaProgressSpinner';
import UserHelper from '../components/shared/UserHelper.js';
import Help from './Help';

const utils = new Utils();

export default class CreateAccountPage extends React.Component {

  constructor() {
      super();
      this.state = {
        layoutMode: 'static',
        profileMode: 'inline',
        overlayMenuActive: false,
        staticMenuDesktopInactive: false,
        staticMenuMobileActive: false,
        rotateMenuButton: false,
        topbarMenuActive: false,
        activeTopbarItem: null,
        darkMenu: false,
        rightPanelActive: false,
        menuActive: false,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
          password1: null,
          password2: null,
        createAccount: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password1: '',
            password2: '',
            ninjaReferralCode: '',
            statusSuccess: null,
            statusFailure: null,
            ninjaTermsOfUse: true //checkbox not working, temp workaround
        },

        firstNameValid: true,
        lastNameValid: true,
        emailValid: true,
        phoneValid: true,
        passwordValid: true,
        confirmPasswordValid: true,
        passwordsMatch: true,
        ninjaTermsOfUseValid: true,

        ninjaFirstNameInvalid: '',
        ninjaLastNameInvalid: '',
        ninjaEmailInvalid: '',
        ninjaPhoneInvalid: '',
        ninjaPasswordInvalid: '',
        ninjaConfirmPasswordInvalid: '',
        ninjaPasswordsMismatch: '',
        ninjaTermsOfUseInvalid: ''
      };

      this.handleCreateAccount = this.handleCreateAccount.bind(this);
      this.updateCreateAccountValue = this.updateCreateAccountValue.bind(this);
      this.validateCreateAccount = this.validateCreateAccount.bind(this);
      this.passwordInputKeyPressed = this.passwordInputKeyPressed.bind(this);
      this.createAccountSuccess = this.createAccountSuccess.bind(this);
      this.createAccountError = this.createAccountError.bind(this);
      this.inProgress = this.inProgress.bind(this);
      this.resetValid = this.resetValid.bind(this);
      this.onPhoneFocusLost = this.onPhoneFocusLost.bind(this);
  }

  resetValid() {
    this.setState({
        firstNameValid: true,
        lastNameValid: true,
        emailValid: true,
        phoneValid: true,
        passwordValid: true,
        confirmPasswordValid: true,
        passwordsMatch: true,
        ninjaTermsOfUseValid: true
    });
  }

  componentDidMount() {
      this.resetValid();
      var inputs = document.getElementsByTagName('input');

      var addClass = function(element, className) {
          if (element.classList)
              element.classList.add(className);
          else
              element.className += ' ' + className;
      },
      removeClass = function(element, className) {
          if (element.classList)
              element.classList.remove(className);
          else
              element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      };

      for(var i = 0; i < inputs.length; i++) {
          var input = inputs[i];

          input.addEventListener('blur', function(event) {
              if(this.value != '') {
                  addClass(this, 'ui-state-filled');
              }
              else {
                  removeClass(this, 'ui-state-filled');
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
      return this.state.layoutMode === 'overlay';
  }

  isHorizontal() {
      return this.state.layoutMode === 'horizontal';
  }

  isSlim() {
      return this.state.layoutMode === 'slim';
  }


    updateCreateAccountValue(e) {
        var event = e;
        var target = e.target;
        if(!target) {
          event = e.originalEvent;
          target = e.originalEvent.target;
        }

        var value = target.value;

        switch (target.id)
        {
            case "ninjaFirstName":
                this.state.createAccount.firstName = value ? value.trim() : value;
                break;

            case "ninjaLastName":
                this.state.createAccount.lastName = value ? value.trim() : value;
                break;

            case "ninjaEmail":
                this.state.createAccount.email = value ? value.trim() : value;
                break;

            case "ninjaPhone":
                if(value && value.trim() != '') {
                  this.state.createAccount.phone = value.trim();
                }
                break;

            case "ninjaPassword":
                this.state.createAccount.password1 = value ? value.trim() : value;
                break;

            case "ninjaConfirmPassword":
                this.state.createAccount.password2 = value ? value.trim() : value;
                break;

            case "ninjaReferralCode":
                this.state.createAccount.ninjaReferralCode = value ? value.trim() : value;
                break;

            case "ninjaReferralCode":
                this.state.createAccount.ninjaTermsOfUse = e.checked;
                break;

            default:
                break;
        }
    }

  handleCreateAccount(e) {
    e.preventDefault();
    this.resetValid();
    //alert(JSON.stringify(this.state.createAccount));
    let isValid = this.validateCreateAccount();
    if(!isValid) {
      return;
    }

    let data = { "email": this.state.createAccount.email, "firstName": this.state.createAccount.firstName, "lastName": this.state.createAccount.lastName,
      "phone": this.state.createAccount.phone, "userName": this.state.createAccount.email, "pswd": utils.base64(this.state.createAccount.password1),
      "referral": this.state.createAccount.referral };

    let url = utils.getServicesUrl() + '/newNinjaTrialUser';
    utils.ajaxRequest('POST', url, this.createAccountSuccess, this.createAccountError, data, true);

    this.setState({pageErrorMessage: null});
    this.inProgress(true);
  }

  createAccountSuccess(data, status, response) {
    this.inProgress(false);
    let loginSuccess = this.refs.userHelper.loginUser(this.state.createAccount.email, this.state.createAccount.password1);
    if(loginSuccess) {
      window.location = Constants.ACTION_RATES.url;
    }
  }

  createAccountError(jqXHR, exception) {
    this.inProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({pageErrorMessage: errorResponse});
  }

  loginProgress(inProgress) {
    //called from UserHelp.loginUser(...)
  }

  inProgress(inProgress) {
    if(inProgress) {
      $('#ID_CREATE_ACCOUNT_DIV').hide();
      $('#ID_NINJA_SPINNER_IN_PROGRESS').show();
    } else {
      $('#ID_NINJA_SPINNER_IN_PROGRESS').hide();
      $('#ID_CREATE_ACCOUNT_DIV').show();
    }
  }

  onPhoneFocusLost(isValid) {
    let ninjaPhone = this.refs.ninjaPhone;
    let phone = utils.filterNonNumeric(this.state.createAccount.phone);
    if(phone == null || phone.trim() == '') {
      $('#ninjaEmail').get(0).scrollIntoView();
      this.setState({ phoneValid: false, ninjaPhoneInvalid: 'Invalid Phone' });
      $('#ninjaPhone').select();
      isValid = false;
    } else {
      phone = utils.filterNonNumeric(phone);
      let minPhoneLength = Constants.PHONE_MIN_LENGTH;
      if(phone.length < minPhoneLength) {
        $('#ninjaEmail').get(0).scrollIntoView();
        let partialPhone = utils.formatPartialPhone(phone);
        let phoneMsg = (partialPhone ? partialPhone : 'Phone') +' is < '+minPhoneLength+' digits';
        this.setState({ phoneValid: false, ninjaPhoneInvalid: phoneMsg });
        $('#ninjaPhone').select();
        isValid = false;
      } else {
        this.setState({ phoneValid: true });
      }
    }
    return isValid;
  }

  validateCreateAccount() {
    let isValid = true;
    let minPasswdLength = Constants.PASSWORD_MIN_LENGTH;

    let ninjaConfirmPassword = this.refs.ninjaConfirmPassword;
    let password2 = this.state.createAccount.password2;
    if(password2 == null || password2.trim() == '') {
      $('#ninjaPassword').get(0).scrollIntoView();
      this.setState({ confirmPasswordValid: false, ninjaConfirmPasswordInvalid: 'Invalid Confirm Password' });
      $('#ninjaConfirmPassword').select();
      isValid = false;
    } else {
      password2 = password2.trim();
      if(password2.length < minPasswdLength) {
        $('#ninjaPassword').get(0).scrollIntoView();
        let passwdMsg = 'Password < '+minPasswdLength+' characters.';
        this.setState({ confirmPasswordValid: false, ninjaConfirmPasswordInvalid: passwdMsg });
        $('#ninjaConfirmPassword').select();
        isValid = false;
      } else {
        this.setState({ confirmPasswordValid: true });
      }
    }

    let ninjaPassword = this.refs.ninjaPassword;
    let password1 = this.state.createAccount.password1;
    if(password1 == null || password1.trim() == '') {
      $('#ninjaPhone').get(0).scrollIntoView();
      this.setState({ passwordValid: false, ninjaPasswordInvalid: 'Invalid Password' });
      $('#ninjaPassword').select();
      isValid = false;
    } else {
      password1 = password1.trim();
      if(password1.length < minPasswdLength) {
        $('#ninjaPhone').get(0).scrollIntoView();
        let passwdMsg = 'Password < '+minPasswdLength+' characters.';
        this.setState({ passwordValid: false, ninjaPasswordInvalid: passwdMsg });
        $('#ninjaPassword').select();
        isValid = false;
      } else {
        this.setState({ passwordValid: true });
      }
    }

    isValid = this.onPhoneFocusLost(isValid);

    let ninjaEmail = this.refs.ninjaEmail;
    let email = this.state.createAccount.email;
    if(email == null || email.trim() == '' || !utils.isEmail(email)) {
      $('#ninjaLastName').get(0).scrollIntoView();
      this.setState({ emailValid: false, ninjaEmailInvalid: 'Invalid Email' });
      $('#ninjaEmail').select();
      isValid = false;
    } else {
      this.setState({ emailValid: true });
    }

    let ninjaLastName = this.refs.ninjaLastName;
    let lastName = this.state.createAccount.lastName;
    if(lastName == null || lastName.trim() == '') {
      $('#ninjaFirstName').get(0).scrollIntoView();
      this.setState({ lastNameValid: false, ninjaLastNameInvalid: 'Invalid Last Name' });
      $('#ninjaLastName').select();
      isValid = false;
    } else {
      this.setState({ lastNameValid: true });
    }

    let ninjaFirstName = this.refs.ninjaFirstName;
    let firstName = this.state.createAccount.firstName;
    if(firstName == null || firstName.trim() == '') {
      $('#ID_CREATE_ACCOUNT_DIV').get(0).scrollIntoView();
      this.setState({ firstNameValid: false, ninjaFirstNameInvalid: 'Invalid First Name' });
      $('#ninjaFirstName').select();
      isValid = false;
    } else {
      this.setState({ firstNameValid: true });
    }

    if(isValid) {
      if(password1 != password2) {
        this.setState({ passwordsMatch: false, ninjaPasswordsMismatch: 'Passwords do not match' });
        $('#ninjaEmail').get(0).scrollIntoView();
        this.state.createAccount.password1 = '';
        this.state.createAccount.password2 = '';
        $('#ninjaConfirmPassword').val('');
        $('#ninjaPassword').val('');
        $('#ninjaPassword').focus();
        isValid = false;
      } else {
        this.setState({ passwordsMatch: true });
      }
    }

    let ninjaTermsOfUse = this.refs.ninjaTermsOfUse;
    if(!this.state.createAccount.ninjaTermsOfUse) {
      $('#ninjaConfirmPassword').get(0).scrollIntoView();
      this.setState({ ninjaTermsOfUseValid: false, ninjaTermsOfUseInvalid: 'Please Accept the Terms of Use' });
      isValid = false;
    }

    return isValid;
  }

  passwordInputKeyPressed(e) {
    e = e || window.event;
    if (e.key === 'Enter') //enter key pressed
    {
      this.handleCreateAccount(e);
    }
  }

    render() {
        const errors = ["Yo! Error!", "Again Error"];
        //const logoImage = 'NinjaRater-Logo-Login.png';
        const logoImage = '';

        return (
            <div className="create-account-body">
                <UserHelper ref="userHelper" parentComponent={this} />
                <NinjaProgressSpinner maxWidth="200px" maxHeight="200px" marginTop="-20px" />
                <div id="ID_CREATE_ACCOUNT_DIV" className="login-panel ui-fluid" style={{margin: '3px auto 0 auto'}}>
                  <div className="ui-g">
                    <NinjaLogoMedium logoImage={logoImage} />

                      <div id="ID_CREATE_ACCOUNT_ERROR" style={{display: this.state.pageErrorMessage ? 'block' : 'none', backgroundColor: 'white',
                          opacity: 0.9, color: 'red', fontSize: '1.5em', textAlign: 'center', marginBottom: '15px', borderRadius: '5px'}}>
                        {this.state.pageErrorMessage}
                      </div>

                    <div className="card ui-g-12" style={{opacity: 0.9}}>
                      <div style={{display: this.state.firstNameValid ? 'none' : 'block', paddingBottom: '15px'}}>
                        <span><font color="red" ref="ninjaFirstNameInvalid">{this.state.ninjaFirstNameInvalid}</font></span>
                      </div>
                      <span className="md-inputfield">
                          <InputText autoFocus id="ninjaFirstName" ref="ninjaFirstName" type="text" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                              style={{fontSize: '1.3em'}}
                              onChange={this.updateCreateAccountValue} required/>
                          <label htmlFor="ninjaFirstName" style={{fontWeight: 'Bold'}, {fontSize: 20+'px'}}>First Name</label>
                      </span>
                    </div>

                    <div className="card ui-g-12" style={{opacity: 0.9}}>
                      <div style={{display: this.state.lastNameValid ? 'none' : 'block', paddingBottom: '15px'}}>
                        <span><font color="red" ref="ninjaLastNameInvalid">{this.state.ninjaLastNameInvalid}</font></span>
                      </div>
                      <span className="md-inputfield">
                          <InputText id="ninjaLastName" ref="ninjaLastName" type="text" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                              style={{fontSize: '1.3em'}}
                              onChange={this.updateCreateAccountValue} required/>
                          <label htmlFor="ninjaLastName"  style={{fontWeight: 'Bold'}, {fontSize: 20+'px'}}>Last Name</label>
                      </span>
                    </div>

                    <div className="card ui-g-12" style={{opacity: 0.9}}>
                      <div style={{display: this.state.emailValid ? 'none' : 'block', paddingBottom: '15px'}}>
                          <span><font color="red" ref="ninjaEmailInvalid">{this.state.ninjaEmailInvalid}</font></span>
                      </div>
                      <span className="md-inputfield">
                          <InputText id="ninjaEmail" ref="ninjaEmail" type="text" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                              style={{fontSize: '1.3em'}}
                              onChange={this.updateCreateAccountValue} required/>
                          <label htmlFor="ninjaEmail"  style={{fontWeight: 'Bold'}, {fontSize: 20+'px'}}>Email</label>
                      </span>
                    </div>

                    <div className="card ui-g-12" style={{opacity: 0.9}}>
                      <div style={{display: this.state.phoneValid ? 'none' : 'block', paddingBottom: '15px'}}>
                          <span><font color="red" ref="ninjaPhoneInvalid">{this.state.ninjaPhoneInvalid}</font></span>
                      </div>
                      <span className="md-inputfield">
                          <InputMask mask="(999) 999-9999? x99999" id="ninjaPhone" ref="ninjaPhone" type="text" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                              style={{fontSize: '1.3em'}} value={this.state.createAccount.phone} autoClear="false"
                              onChange={this.updateCreateAccountValue} required />
                          <label htmlFor="ninjaPhone"  style={{fontWeight: 'Bold'}, {fontSize: 20+'px'}}>Phone</label>
                      </span>
                    </div>

                    {/*<div className="card ui-g-12" style={{opacity: 0.9}}>
                      <span className="md-inputfield">
                          <InputText id="ninjaReferralCode" ref="ninjaReferralCode" type="text" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                              style={{fontSize: '1.3em'}}
                              onChange={this.updateCreateAccountValue} />
                          <label htmlFor="ninjaReferralCode" style={{fontWeight: 'Bold'}, {fontSize: 20+'px'}}>Referral Code (Optional)</label>
                      </span>
                    </div>*/}

                    <div className="card ui-g-12" style={{opacity: 0.9}}>
                      <div style={{display: this.state.passwordValid ? 'none' : 'block', paddingBottom: '15px'}}>
                          <span><font color="red" ref="ninjaPasswordInvalid">{this.state.ninjaPasswordInvalid}</font></span>
                      </div>
                      <div style={{display: this.state.passwordsMatch ? 'none' : 'block', paddingBottom: '15px'}}>
                          <span><font color="red" ref="ninjaPasswordInvalid">{this.state.ninjaPasswordsMismatch}</font></span>
                      </div>
                      <span className="md-inputfield">
                          <Password id="ninjaPassword" ref="ninjaPassword" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                              style={{fontSize: '1.3em'}}
                              onChange={this.updateCreateAccountValue} required />
                          <label htmlFor="ninjaPassword"  style={{fontWeight: 'Bold'}, {fontSize: 20+'px'}}>Password</label>
                      </span>
                    </div>

                    <div className="card ui-g-12" style={{opacity: 0.9}}>
                      <div style={{display: this.state.confirmPasswordValid ? 'none' : 'block', paddingBottom: '15px'}}>
                          <span><font color="red" ref="ninjaConfirmPasswordInvalid">{this.state.ninjaConfirmPasswordInvalid}</font></span>
                      </div>
                      <span className="md-inputfield">
                          <InputText type="password" id="ninjaConfirmPassword" ref="ninjaConfirmPassword" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                              style={{fontSize: '1.3em'}} onKeyPress={this.passwordInputKeyPressed}
                              onChange={this.updateCreateAccountValue} required />
                          <label htmlFor="ninjaConfirmPassword"  style={{fontWeight: 'Bold'}, {fontSize: 20+'px'}}>Confirm Password</label>
                      </span>
                    </div>

                    <div className="ui-g no-padding" style={{textAlign: 'center'}}>
                      <div style={{display: this.state.ninjaTermsOfUseValid ? 'none' : 'block', paddingBottom: '15px'}}>
                          <span><font color="red" ref="ninjaTermsOfUseInvalid">{this.state.ninjaTermsOfUseInvalid}</font></span>
                      </div>
                      <TermsOfUse />
                      <Checkbox id="ninjaTermsOfUse" ref="ninjaTermsOfUse"
                          onChange={this.updateCreateAccountValue}
                          checked={this.state.createAccount.ninjaTermsOfUse} />
                      <label htmlFor="ninjaTermsOfUse">I agree to the terms & conditions</label>
                    </div>

                    <div className="ui-g-12" style={{padding: 3+'px'}}>
                        <Button onClick={this.handleCreateAccount} style={{fontSize: '1.3em'}} className="secondary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left ripple-animate">
                            <i style={{float: 'left'}} className="ui-button-icon-left ui-c fa fa-fw ui-icon-visibility"></i>
                            <span className="ui-button-text ui-c" style={{fontSize: '1.3em'}}>Create Account</span>
                        </Button>
                    </div>

                    <div className="ui-g-12" style={{padding: 3+'px'}}>
                        <center><Link to={Constants.ACTION_SIGN_IN.url} style={{fontSize: '1.3em', backgroundColor: '#9aaaf4'}} className="secondary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left">
                            <i style={{float: 'left'}} className="ui-button-icon-left ui-c fa fa-fw ui-icon-person"></i>
                            <span className="ui-button-text ui-c" style={{fontSize: '1.3em'}}>{Constants.ACTION_SIGN_IN.linkLabel}</span>
                        </Link></center>
                    </div>

                    <div className="ui-g-12" style={{padding: 3+'px'}}>
                        <center><Link to={Constants.ACTION_RESET_PASSWORD.url} style={{fontSize: '1.3em', backgroundColor: '#9aaaf4'}} className="secondary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left">
                            <i style={{float: 'left'}} className="ui-button-icon-left ui-c fa fa-fw ui-icon-vpn-key"></i>
                            <span className="ui-button-text ui-c" style={{fontSize: '1.3em'}}>{Constants.ACTION_RESET_PASSWORD.linkLabel}</span>
                        </Link></center>
                    </div>
                  </div>
                </div>

                <Help />
                <FooterSimple />
            </div>
        );
    }
}

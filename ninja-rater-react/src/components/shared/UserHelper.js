import React, {Component} from 'react';
import * as Constants from '../../Constants';
import {Base64} from 'js-base64';
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from './Utils';
import moment from 'moment';

const utils = new Utils();

export default class UserHelper extends Component {

  constructor (props) {
    super(props);
    this.state = {
      parentComponent: this.props.parentComponent,
      USER: {user_id: 'PUBLIC'},
      MIGRATE_USER: false,
      MINIMUM_PASSWORD_LENGTH: 6
    };
    this.isLoginFormValid = this.isLoginFormValid.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    //alert(this.state.parentComponent);
  }

  isLoginFormValid() {
    let userNameInput = $('#ninjaSignInEmail');
    let userName = $(userNameInput).val().trim();
    let passwordInput = $('#ninjaSignInPassword');
    let password = $(passwordInput).val().trim();

    if (!utils.isEmail(userName)) {
      this.state.parentComponent.refs.errorDiv.showError('Invalid Email');
      $(userNameInput).select();
      $(userNameInput).focus();
      $(userNameInput).css('borderColor', 'red');
      return false;
    }
    $(userNameInput).css('borderColor', '');

    if (password.length < this.state.MINIMUM_PASSWORD_LENGTH) {
      this.state.parentComponent.refs.errorDiv.showError('Password is too short!');
      $(passwordInput).select();
      $(passwordInput).focus();
      $(passwordInput).css('borderColor', 'red');
      return false;
    }
    $(passwordInput).css('borderColor', '');

    if (this.state.MIGRATE_USER == true) {
      let inputPasswordConfirm = $('#inputPasswordConfirm').val().trim();
      if (inputPasswordConfirm != password) {
        $('#inputPasswordConfirm').prop('title', 'Confirmation Password Does Not Match. Please Try Again.');
        $('#inputPasswordConfirm').tooltip('show');
        $('#inputPassword3').val('');
        $('#inputPasswordConfirm').val('');
        $('#inputPassword3').focus();
        return false;
      }
      //loginUserApp(userName, password, inputPasswordConfirm);
    }

    return true;
    //return this.loginUser(userName, password);
  }

  loginUser(userName, password, inputPasswordConfirm) {
    password = Base64.encode(password);
    password = encodeURIComponent(password);
    password = password;
    if (inputPasswordConfirm && inputPasswordConfirm != '') {
      inputPasswordConfirm = Base64.encode(inputPasswordConfirm);
      inputPasswordConfirm = encodeURIComponent(inputPasswordConfirm);
    }

    var data = '{ "login": "' + encodeURIComponent(userName) + '", "passwd": "' + password + '"';
    if (inputPasswordConfirm && inputPasswordConfirm != '') {
      data += ', "confPasswd": "' + inputPasswordConfirm + '"';
    }
    data += ' }';

    //this.state.parentComponent.loginProgress(false);
    $.ajax
      ({
        type: "POST",
        async: false,
        headers: {},
        url: utils.getServicesUrl() + "/v1/user.login",
        dataType: 'json',
        data: data,
        success: function (response) {
          this.state.USER.user_id = response;
          utils.createCookie('token', this.state.USER.user_id);
          window.location = window.origin + Constants.ACTION_HOME_PAGE.url;
        },
        error: function (jqXHR, exception) {
          console.log('jqXHR', jqXHR);
          if (jqXHR.status == 200) {
            debugger
            this.state.USER.user_id = jqXHR.responseText;
            utils.createCookie('token', this.state.USER.user_id);
            //this.getUserAfterLogin(this.state.USER.user_id, this.navigateToLandingPageWithData);
            console.log('window.origin + Constants.ACTION_RATES.url', window.origin + Constants.ACTION_RATES.url);
            // window.location = window.origin + Constants.ACTION_RATES.url;
            window.location = window.origin + Constants.ACTION_HOME_PAGE.url;
          } else {
            debugger
            utils.eraseAllCookies();
            this.state.parentComponent(false, jqXHR.responseText);
          }
        }.bind(this)
      });
  }

  navigateToLandingPageWithData = (response) => {
    if (this.state.parentComponent.props.router && this.state.parentComponent.props.router.current) {
      this.state.parentComponent.props.router.current.history.push({
        pathname: Constants.ACTION_RATES.url,
        state: {
          userInfo: response.userInfo,
          authFeatures: response.authFeatures,
          initialData: response.initialData
        }
      });
    }
  }

  fetchUserAndInitialData = (token, callback) => {
    $.ajax
      ({
        type: "POST",
        async: false,
        headers: {},
        url: utils.getServicesUrl() + "/v1/user.get",
        // url: "http://NinjaRaterStaging-env.eba-9rs96puk.us-west-2.elasticbeanstalk.com/v1/user.get",
        dataType: 'json',
        data: '{ "user_id": "' + token + '"}',
        success: function (response) {
          callback(response);
        },
        error: function (jqXHR, exception) {
          utils.eraseAllCookies();
          //this.state.parentComponent.loginInProgress(false, jqXHR.responseText);
        }
      });
  }

  render() {
    return (
      <div></div>
    );
  }

}

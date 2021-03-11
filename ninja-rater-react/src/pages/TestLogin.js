import React, { Component } from 'react';
import TestErrorDiv from './TestErrorDiv';
import jQuery from 'jquery';
import $ from 'jquery';

export default class TestLoginPage extends React.Component {

    handleLogin(e) {
      const errMsg = document.getElementById('errorMsgTest').value.trim();
      //document.getElementById('ErrorDiv').errorMessage = errMsg;
      alert(errMsg);
      $('ErrorDiv').prop('errorMessage', errMsg);
    }

    handleForgotPassword() {
      alert('ForgotPassword');
    }

    handleCreateAccount() {
      alert('CreateAccount');
    }

    render() {
        const errors = ["Yo! Error!", "Again Error"];
        return (
            <div>
              <input type="text" name="errorMsgTest" id="errorMsgTest" /><br/>
              <button onClick={this.handleLogin}>Login</button><br/>
              <button onClick={this.handleForgotPassword}>Forgot Password</button><br/>
              <button onClick={this.handleCreateAccount}>Create Account</button><br/>
              <br/>
              <ErrorDiv id="TestErrorDiv" errors={errors} /><br/>
            </div>
        );
    }
}

import React, { Component } from 'react';

export default class TestCreateAccountPage extends React.Component {

    createAccount(e) {
      e.preventDefault();
      const firstName = e.target.elements.firstName.value.trim();
      if(firstName) {
        alert(firstName);
      }
    }

    render() {
        return (
            <div>
              <form onSubmit={this.createAccount}>
                <input type="text" name="firstName" /><br/>
                <button onClick={this.handleLogin}>Create Account</button>
              </form>
            </div>
        );
    }
}

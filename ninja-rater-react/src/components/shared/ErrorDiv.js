import React, { Component } from 'react';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import '../../App.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class ErrorDiv extends React.Component {
  constructor(props) {
    super(props);
    this.showError = this.showError.bind(this);
    this.state = {
      hasErrors: props.errors && props.errors.length > 0
    };
  }

  showError(errorMessage) {
    let hasErrors = (errorMessage && errorMessage.length > 0);
    this.setState({ hasErrors: hasErrors });
    if(!hasErrors) {
      return;
    }

    NotificationManager.error(errorMessage, '', 500000, () => {
      //alert('callback');
    });
  }

  render() {
    return (
      <NotificationContainer style={{top: '100', right: '100'}} />
    );
  }
}

export default ErrorDiv;

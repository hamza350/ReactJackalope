import React, { Component } from 'react';

import {Messages} from 'primereact/components/messages/Messages';
import {Message} from 'primereact/components/message/Message';


import {Growl} from 'primereact/components/growl/Growl';
import {Button} from 'primereact/components/button/Button';

class ErrorMessageDiv extends React.Component {

  constructor() {
    super();
    //this.state = {messages: null};
    this.state = {
      messages: [{severity:'error', summary:'Error Message', detail:'Validation failed'}]
    };
    this.showError = this.showError.bind(this);
    this.showSticky = this.showSticky.bind(this);
  }

  showError() {
      //this.setState({messages:[{severity:'error', summary:'Error Message', detail:'Validation failed'}]});
      alert(JSON.stringify(this.state));
  }

  showSticky() {
      this.refs.ErrorMessages.show({ severity: 'error', summary: 'Sticky Message', detail: 'You need to close Me', sticky: true });
  }

  render() {
    return (
          <div>
          Error Will Be Here

<div className="card">
  <Messages ref="ErrorMessages" value={this.state.messages}></Messages>
    <Button onClick={this.showSticky} label="Sticky" />
</div>

            {this.state.messages && this.state.messages.length > 0 && (
              <div>
                <Messages value={this.state.messages}/>
                <Growl value={this.state.messages} />
              </div>
            )}
          </div>
    );
  }
}

export default ErrorMessageDiv;

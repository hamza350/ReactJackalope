import React, { Component } from 'react';

class TestErrorDiv extends React.Component {
  constructor(props) {
    super(props);
    this.toggleErrorDiv = this.toggleErrorDiv.bind(this);
    const errors = (props.errors && props.errors.length > 0) ? props.errors : [];
    this.state = {
      hasErrors: errors.length > 0,
      errors: errors
    };
  }

  /* Changes state, which re-renders ErrorDiv, empty or list of errors */
  toggleErrorDiv(errors) {
    errors = (errors && errors.length > 0) ? errors : [];
    this.setState((prevState) => {
      return {
        hasErrors: errors.length > 0,
        errors: errors
      };
    });
  }

  render() {
    return (
      <div>
          <br/>
          <div>
            {this.state.hasErrors && (
              <div>
                {this.state.errors.map((errorMessage, i) => <p>{i + 1} - {errorMessage} </p>)}
              </div>
            )}
          </div>
      </div>
    );
  }
}

export default TestErrorDiv;

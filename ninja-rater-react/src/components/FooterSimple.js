import React, { Component } from 'react';
import classNames from 'classnames';

export default class FooterSimple extends React.Component {

  constructor() {
      super();
      this.state = {

      };
  }

    render() {
        return (
          <div>
            <div style={{textAlign: 'center'}}>
              All Rights Reserved &nbsp;&nbsp;&nbsp; Copyright ©  NinjaRater 2014 - {new Date().getFullYear()}
            </div>
            <br/>
          </div>
        );
    }
}

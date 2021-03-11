import React, { Component } from 'react';
import classNames from 'classnames';
import {DataGrid} from 'primereact/components/datagrid/DataGrid';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Panel} from 'primereact/components/panel/Panel';
import {Calendar} from 'primereact/components/calendar/Calendar';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import jQuery from 'jquery';
import $ from 'jquery';
import '../Demo.css';
import '../App.css';

export class grid3 extends React.Component {

  constructor() {
      super();
      this.state = {

      };

  }

  componentDidMount() {

  }


  render() {

      return (
<div className="ui-g" style={{width: '100%'}}>
  <div className="ui-g-12 ui-md-10" style={{width: '100%'}}>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        One
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        Two
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        Three
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        Four
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        Five
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        Six
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        Seven
      </div>
      <div className="ui-g-12 ui-md-6 ui-lg-3">
        Eight
      </div>
      <div className="ui-g-12">
        <div className="ui-g">
          <div className="ui-g-12 ui-md-4">
              <img alt="Galleria 1" src="https://www.primefaces.org/primereact/showcase/resources/demo/images/galleria/galleria1.jpg" style={{width: '100%'}} />
          </div>
          <div className="ui-g-12 ui-md-4">
            <div className="ui-g-12" styl={{textAlign: 'left !important'}}>
              <span><b>Items: </b></span>
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
              Item 1
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
              Item 2
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
              Item 3
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
              Item 4
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
              Item 5
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
              Item 6
            </div>
            <div className="ui-g-12 ui-md-6 ui-lg-3">
              Item 7
            </div>

          </div>
          <div className="ui-g-12 ui-md-4">
            <div className="ui-g-12" styl={{textAlign: 'left !important'}}>
              <span><b>Line Items: </b></span>
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 1
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 2
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 3
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 4
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 5
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 6
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 7
            </div>
            <div className="ui-g-12 ui-md-4 ui-lg-3">
              Line Item 8
            </div>

          </div>
        </div>
      </div>
  </div>
</div>
      );
  }
}

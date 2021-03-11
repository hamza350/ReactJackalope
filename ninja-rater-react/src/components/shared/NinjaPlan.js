import React, { Component } from 'react';
import classNames from 'classnames';
import '../../App.css';
import moment from 'moment';
import * as Constants from '../../Constants';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';

export default class NinjaPlan extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        elementId: this.props.id,
        parentComponent: this.props.parentComponent,
        ninjaPlanName: this.props.ninjaPlanName,
        ninjaPlanDescription: this.props.ninjaPlanDescription,
        ninjaPlanPrice: this.props.ninjaPlanPrice,
        planSelected: this.props.planSelected
      };
  }

  componentDidMount() {

  }

  selectNinjaPlan(elementId) {
    alert(elementId);
  }

  render() {
      let checkBoxId = 'ID_CHKBTN_' + this.state.elementId;
      return (
        // <div className="overview" style={{cursor: 'pointer', border: '1px solid', borderRadius: '5px', borderColor: '#293891', color: '#293891'}}>
        <div className="overview">
            <div className="overview-content clearfix" style={{margin: '10px'}}>
                  <div className="ui-g-3">
                      <img src="assets/ninja/layout/images/NinjaRater-Logo-iPhoneRetina.png" />
                  </div>
                  <div className="ui-g-9" id={this.state.elementId}>
                      <div style={{marginBottom: '0.7em', fontSize: '1.5em', fontWeight: 'bold', color: 'goldenrod'}}><span className="colorbox-count">{this.state.ninjaPlanName}</span></div>
                      <div style={{marginBottom: '0.5em'}}><span className="colorbox-name">{this.state.ninjaPlanDescription}</span></div>
                      <div style={{marginBottom: '0.5em'}}><span className="colorbox-name">{this.state.ninjaPlanPrice}</span></div>
                  </div>
                  {/* <Checkbox id={checkBoxId} checked={this.state.planSelected} style={{width: '100%', textAlign: '-webkit-center'}} /> */}
            </div>
        </div>
      );
  }
}

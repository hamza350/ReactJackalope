import React, { Component } from 'react';
import classNames from 'classnames';
import '../../App.css';
import jQuery from 'jquery';
import $ from 'jquery';
import * as Constants from '../../Constants';

import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';

import NinjaProgressSpinner from '../shared/NinjaProgressSpinner';
import NinjaPlan from '../shared/NinjaPlan';

export default class SelectNinjaPlan extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        parentComponent: this.props.parentComponent,
        selectedNinjaPlan: this.props.selectedNinjaPlan ? this.props.selectedNinjaPlan : Constants.PLAN_NINJA_MASTER
      };
      this.selectNinjaPlan = this.selectNinjaPlan.bind(this);
  }

  componentDidMount() {
    // if(this.state.selectedNinjaPlan) {
    //   if(this.state.selectedNinjaPlan == Constants.PLAN_NINJA_MASTER) {
    //     this.selectNinjaPlan(null, Constants.PLAN_NINJA_MASTER);
    //   } else {
    //     this.selectNinjaPlan(null, Constants.PLAN_WHITE_BELT);
    //   }
    // } else {
    //   this.selectNinjaPlan(null, Constants.PLAN_NINJA_MASTER);
    // }

    this.refs.PLAN_NINJA_MASTER.setState({ planSelected: true });
    if(Constants.IS_PRODUCTION) {
      this.state.parentComponent.setState({ ninjaPlan: Constants.PLAN_NINJA_MASTER });
    } else {
      this.state.parentComponent.setState({ ninjaPlan: Constants.PLAN_NINJA_MASTER_TEST });
    }
  }

  selectNinjaPlan(e, elementId) {
    try { e.preventDefault(); } catch(e) { }

    if(elementId == Constants.PLAN_NINJA_MASTER) {
      if(Constants.IS_PRODUCTION)
        this.state.parentComponent.setState({ ninjaPlan: Constants.PLAN_NINJA_MASTER });
      else
        this.state.parentComponent.setState({ ninjaPlan: Constants.PLAN_NINJA_MASTER_TEST });
      this.refs.PLAN_WHITE_BELT.setState({ planSelected: false });
      this.refs.PLAN_NINJA_MASTER.setState({ planSelected: true });
    } else {
      if(Constants.IS_PRODUCTION)
        this.state.parentComponent.setState({ ninjaPlan: Constants.PLAN_WHITE_BELT });
      else
        this.state.parentComponent.setState({ ninjaPlan: Constants.PLAN_WHITE_BELT_TEST });
      this.refs.PLAN_WHITE_BELT.setState({ planSelected: true });
      this.refs.PLAN_NINJA_MASTER.setState({ planSelected: false });
    }
  }

    render() {
        return (
          <div className="ui-g-12" style={{width: '100%', textAlign: 'center'}}>
              {/* <div className="ui-g-12 ui-md-5" onClick={(e) => this.selectNinjaPlan(e, Constants.PLAN_WHITE_BELT)}>
                <NinjaPlan ref={Constants.PLAN_WHITE_BELT} parentComponent={this} id={Constants.PLAN_WHITE_BELT} planSelected={false} ninjaPlanName={Constants.PLAN_WHITE_BELT_DESC}
                  ninjaPlanDescription="Unlimited Rating" ninjaPlanPrice="$14/month" />
              </div> */}
              {/* <div className="ui-g-12 ui-md-5" onClick={(e) => this.selectNinjaPlan(e, Constants.PLAN_NINJA_MASTER)}> */}
              <div className="ui-g-12 ui-md-5"> 
                <NinjaPlan ref={Constants.PLAN_NINJA_MASTER} parentComponent={this} id={Constants.PLAN_NINJA_MASTER} planSelected={true} ninjaPlanName={Constants.PLAN_NINJA_MASTER_DESC}
                  ninjaPlanDescription="Unlimited ExMods & Sales Leads" ninjaPlanPrice="$49/month" />
              </div>
          </div>
        );
    }
}

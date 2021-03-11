import React, { Component } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import jQuery from 'jquery';
import $ from 'jquery';
import * as Constants from '../../Constants';
import FooterSimple from '../../components/FooterSimple';

import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';
import '../../App.css';
import jstz from 'jstz';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Panel} from 'primereact/components/panel/Panel';
import {Button} from 'primereact/components/button/Button';
import NinjaProgressSpinner from '../shared/NinjaProgressSpinner';
import SelectNinjaPlan from './SelectNinjaPlan';
import {Fieldset} from 'primereact/components/fieldset/Fieldset';
import Utils from '../shared/Utils';
import UserHelper from '../shared/UserHelper';
import { NinjaContext } from '../shared/Utils';

const utils = new Utils();

export class MyNinjaPlan extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        userNinjaPlan: ''
      };
      this.cancelSubscriptionConfirm = this.cancelSubscriptionConfirm.bind(this);
      this.cancelSubscriptionSubmit = this.cancelSubscriptionSubmit.bind(this);
      this.updateSubscriptionSubmit = this.updateSubscriptionSubmit.bind(this);
      this.InProgress = this.InProgress.bind(this);
      this.cancelSubscriptionSuccess = this.cancelSubscriptionSuccess.bind(this);
      this.cancelSubscriptionError = this.cancelSubscriptionError.bind(this);
      this.updateSubscriptionSuccess = this.updateSubscriptionSuccess.bind(this);
      this.updateSubscriptionError = this.updateSubscriptionError.bind(this);
      this.reloadPageInSeconds = this.reloadPageInSeconds.bind(this);
  }

  componentDidMount() {
      this.setState({
        userNinjaPlan: utils.getUserNinjaPlan(this.context.authFeatures)
      });
  }

  updateSubscriptionSubmit(e) {
    e.preventDefault();
    this.setState({pageErrorMessage: null});
    this.setState({pageSuccessMessage: null});
    let newNinjaPlan = this.state.ninjaPlan;
    let currentNinjaPlan = utils.getUserNinjaPlan();
    if(newNinjaPlan == currentNinjaPlan) {
      let authFeatures = this.context.authFeatures;
      this.setState({pageErrorMessage: 'You are already on a "'+utils.getUserNinjaPlanDescription(authFeatures)+'" NinjaRater Monthly Plan.'});
      return;
    }

    let timeZone = jstz.determine().name();
    let couponCode = '';
    let url = utils.getServicesUrl() + '/updateNinjaPlanForPaidUser?tmz='+timeZone+'&live='+Constants.IS_PRODUCTION;
    url += '&ninjaPlan='+newNinjaPlan+'&couponCode='+couponCode;
    this.InProgress(true, false);
    utils.ajaxRequest('PUT', url, this.updateSubscriptionSuccess, this.updateSubscriptionError, null, false);
  }

  updateSubscriptionSuccess(data, status, response) {
    this.InProgress(false, false);
    $('#ID_CHANGE_NINJA_PLAN_BTN').prop('disabled', true);
    $('#ID_CANCEL_NINJA_PLAN_BTN').prop('disabled', true);
    data = JSON.parse(data);
    let firstName = data.userInfo.firstName;
    let ninjaPlan = this.state.ninjaPlan;
    let ninjaPlanDesc = utils.getNinjaPlanDescriptionByType(ninjaPlan);
    let successMsg = firstName+', you have changed your NinjaRater plan to "'+ninjaPlanDesc+'".';
    this.setState({pageSuccessMessage: successMsg});
    this.reloadPageInSeconds(3, data);
  }

  updateSubscriptionError(jqXHR, exception) {
    this.InProgress(false, false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({pageErrorMessage: errorResponse});
  }

  cancelSubscriptionConfirm(e) {
    e.preventDefault();
    this.setState({ displayCancelSubscriptionDialog: true });
  }

  cancelSubscriptionSubmit(e) {
    e.preventDefault();
    this.setState({ displayCancelSubscriptionDialog: false });
    this.setState({pageErrorMessage: null});
    this.setState({pageSuccessMessage: null});
    let timeZone = jstz.determine().name();
    let url = utils.getServicesUrl() + '/subscription?tmz='+timeZone+'&live='+Constants.IS_PRODUCTION;
    this.InProgress(true, true);
    utils.ajaxRequest('DELETE', url, this.cancelSubscriptionSuccess, this.cancelSubscriptionError, null, false);
  }

  cancelSubscriptionSuccess(data, status, response) {
    this.InProgress(false, true);
    $('#ID_CHANGE_NINJA_PLAN_BTN').prop('disabled', true);
    $('#ID_CANCEL_NINJA_PLAN_BTN').prop('disabled', true);
    data = JSON.parse(data);
    let firstName = data.userInfo.firstName;
    let authFeatures = this.context.authFeatures;
    let ninjaPlan = utils.getUserNinjaPlanDescription(authFeatures);
    let successMsg = firstName+', Your subscription to our "'+ninjaPlan+'" monthly plan has been CANCELED.';
    this.setState({pageSuccessMessage: successMsg});
    this.reloadPageInSeconds(3, data);
  }

  cancelSubscriptionError(jqXHR, exception) {
    this.InProgress(false, true);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({pageErrorMessage: errorResponse});
  }

  InProgress(InProgress, isCancelSubscription) {
    if(InProgress) {
      this.setState({ InProgress: true });
      if(isCancelSubscription) {
        this.refs.NinjaProgressSpinnerCancel.setState({ display: 'block' });
      } else {
        this.refs.NinjaProgressSpinnerUpdate.setState({ display: 'block' });
      }
      $('#ID_CHANGE_NINJA_PLAN_BTN').prop('disabled', true);
      $('#ID_CANCEL_NINJA_PLAN_BTN').prop('disabled', true);
    } else {
      this.setState({ InProgress: false });
      if(isCancelSubscription) {
        this.refs.NinjaProgressSpinnerCancel.setState({ display: 'none' });
      } else {
        this.refs.NinjaProgressSpinnerUpdate.setState({ display: 'none' });
      }
      $('#ID_CHANGE_NINJA_PLAN_BTN').prop('disabled', false);
      $('#ID_CANCEL_NINJA_PLAN_BTN').prop('disabled', false);
    }
  }

  reloadPageInSeconds(seconds, data) {
    setTimeout(
        function() {
            //new UserHelper({parentComponent: this}).getUserAfterLogin(data.userInfo.userId);
            window.location = window.origin + Constants.ACTION_RATES.url;
        }
        .bind(this),
        seconds * 1000
    );
  }

    render() {
      let dialogFooter = <div className="ui-dialog-buttonpane ui-helper-clearfix">
          <Button icon="fa-close" onClick={()=>this.setState({displayCancelSubscriptionDialog:false})} label="Nope, let me think about it ..."/>
          <Button icon="fa-check" onClick={(e)=>this.cancelSubscriptionSubmit(e)} label="Yes, I am Sure."/>
      </div>;

        return (
          <div className="ui-g">

            <Fieldset legend={Constants.ACTION_MY_NINJA_PLAN.linkLabel} collapsed={false}
                style={{width: '100%', fontSize: '1.3em'}} className="no-padding">
                  <NinjaProgressSpinner ref="NinjaProgressSpinnerUpdate" maxWidth="200px" maxHeight="200px" marginTop="-10px" />
                  <div className="ui-g-12 no-padding" style={{width: '100%'}}>
                      <SelectNinjaPlan parentComponent={this} selectedNinjaPlan={this.state.userNinjaPlan} />
                      {/* <div className="ui-g-12" style={{textAlign: 'center'}}>
                        <Button id="ID_CHANGE_NINJA_PLAN_BTN" onClick={this.updateSubscriptionSubmit} type="button" label="Change My Ninja" icon="ui-icon-business-center"></Button>
                      </div> */}
                  </div>

            </Fieldset>

            <div className="ui-g-12 no-padding"
              style={{display: this.state.pageErrorMessage ? 'block' : 'none'}}>
              <div style={{color: 'red', fontWeight: 'bold', fontSize: '1.2em', textAlign: 'center', marginBottom: '1em'}}>
                {this.state.pageErrorMessage}
                <br/>
              </div>
            </div>

            <div className="ui-g-12 no-padding"
              style={{display: this.state.pageSuccessMessage ? 'block' : 'none'}}>
              <div style={{color: 'green', fontWeight: 'bold', fontSize: '1.2em', textAlign: 'center', marginBottom: '1em'}}>
                {this.state.pageSuccessMessage}
                <br/>
              </div>
            </div>

            <Fieldset legend={Constants.ACTION_CANCEL_SUBSCRIPTION.linkLabel} collapsed={true} style={{width: '100%'}}>
              <div className="ui-g-12 no-padding" style={{width: '100%'}}>
                <div className="ui-g-12" style={{textAlign: 'center'}}>
                  <NinjaProgressSpinner ref="NinjaProgressSpinnerCancel" maxWidth="200px" maxHeight="200px" marginTop="-10px" />
                  <Button id="ID_CANCEL_NINJA_PLAN_BTN" onClick={this.cancelSubscriptionConfirm} label={Constants.ACTION_CANCEL_SUBSCRIPTION.linkLabel} icon="ui-icon-cancel"></Button>
                </div>
              </div>

              <Dialog header="Confirm" visible={this.state.displayCancelSubscriptionDialog} modal={false} width="300px" footer={dialogFooter} onHide={()=>this.setState({displayCancelSubscriptionDialog:false})}>
                  <p>You are about to cancel your NinjaRater Membership. Are you sure you would like to do this?
                  Please feel free to call us to discuss your options at {Constants.NINJARATER_CUSTOMER_SERVICE_PHONE}.</p>
              </Dialog>
            </Fieldset>

          </div>
        );
    }
}

MyNinjaPlan.propTypes = {};
MyNinjaPlan.contextType = NinjaContext;

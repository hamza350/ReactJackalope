import React, {Component} from 'react';
import classNames from 'classnames';
import '../../App.css';
import {Link} from 'react-router-dom'
import jQuery from 'jquery';
import $ from 'jquery';
import * as Constants from '../../Constants';
import FooterSimple from '../../components/FooterSimple';

import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';

import {Panel} from 'primereact/components/panel/Panel';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Column} from 'primereact/components/column/Column';
import {DataGrid} from 'primereact/components/datagrid/DataGrid';
import NinjaProgressSpinner from '../shared/NinjaProgressSpinner';
import {Calendar} from 'primereact/components/calendar/Calendar';
import {InputMask} from 'primereact/components/inputmask/InputMask';
import NinjaPlan from '../shared/NinjaPlan';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';

import {Elements, StripeProvider} from 'react-stripe-elements';
import SubscriptionForm from './SubscriptionForm';
import SelectNinjaPlan from './SelectNinjaPlan';
import {CardElement} from 'react-stripe-elements';
import {CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';

import jstz from 'jstz';
import Utils from '../shared/Utils';
import UserHelper from '../shared/UserHelper';

const utils = new Utils();

export class Subscribe extends React.Component {

  constructor () {
    super();
    this.state = {
      stripe: null,
      ninjaPlan: Constants.PLAN_NINJA_MASTER,
      showCreditCard: 'block'
    };
    this.dataGridTemplate = this.dataGridTemplate.bind(this);
    this.enterKeyPressed = this.enterKeyPressed.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.InProgress = this.InProgress.bind(this);
    this.stripeTokenReady = this.stripeTokenReady.bind(this);
    this.subscribePayingCustomerSuccess = this.subscribePayingCustomerSuccess.bind(this);
    this.subscribePayingCustomerError = this.subscribePayingCustomerError.bind(this);
  }

  // componentDidMount() {
  //   console.log('window', window.Stripe('pk_test_51HeHd5JhuQxu88ulu2fBQP3BX82UMFecNIP8cHhXZy32uiQIdLSWzZ8GfARxD5WFdDHuol6zjLwtWUOV2xrmnOus00qCBpaWtJ'));
  //   if (Constants.IS_PRODUCTION) {
  //     this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE)});
  //   } else {
  //     this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST)});
  //   }
  // }
  componentDidMount() {
    if (window.Stripe) {
      if (Constants.IS_PRODUCTION) {
        this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE)});
      } else {
        this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST)});
      }
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        if (Constants.IS_PRODUCTION) {
          this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_LIVE)});
        } else {
          this.setState({stripe: window.Stripe(Constants.STRIPE_TOKEN_TEST)});
        }
      });
    }
  }

  enterKeyPressed(e) {
    e = e || window.event;
    if (e.key === 'Enter') //enter key pressed
    {
      this.subscribe(e);
    }
  }

  stripeTokenReady(card) {
    let stripe_token = card.token.id;
    let ninjaPlan = this.state.ninjaPlan;
    let couponCode = "";
    let timeZone = jstz.determine().name();

    let url = utils.getServicesUrl() + '/subscribeUser?stripe_token=' + stripe_token + '&ninjaPlan=' + ninjaPlan;
    url += '&tmz=' + timeZone + '&live=' + Constants.IS_PRODUCTION + '&couponCode=' + couponCode;

    let data = card.token.card;
    utils.ajaxRequest('PUT', url, this.subscribePayingCustomerSuccess, this.subscribePayingCustomerError, data, true);
  }

  subscribePayingCustomerSuccess(data, status, response) {
    this.InProgress(false);
    this.setState({showCreditCard: 'none'});
    data = JSON.parse(data);
    let firstName = data.userInfo.firstName;
    let ninjaPlan = data.ninjaPlan;
    if (ninjaPlan == Constants.PLAN_WHITE_BELT || ninjaPlan == Constants.PLAN_WHITE_BELT_TEST) {
      ninjaPlan = Constants.PLAN_WHITE_BELT_DESC;
    }
    if (ninjaPlan == Constants.PLAN_NINJA_MASTER || ninjaPlan == Constants.PLAN_NINJA_MASTER_TEST) {
      ninjaPlan = Constants.PLAN_NINJA_MASTER_DESC;
    }
    let successMsg = 'Congratulations, ' + firstName + '! You\'ve subscribed to our "' + ninjaPlan + '" monthly plan.';
    this.setState({subscribedMessage: successMsg});

    setTimeout(
      function () {
        //new UserHelper({parentComponent: this}).getUserAfterLogin(data.userInfo.userId);
        window.location = window.origin + Constants.ACTION_RATES.url;
      }
        .bind(this),
      3000
    );
  }

  subscribePayingCustomerError(jqXHR, exception) {
    this.InProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({pageErrorMessage: errorResponse});
  }

  InProgress(InProgress) {
    if (InProgress) {
      this.setState({InProgress: true});
      this.refs.NinjaProgressSpinner.setState({display: 'block'});

      $('#ID_CARD_NUMBER').prop('disabled', true);
      $('#ID_EXPIRATION').prop('disabled', true);
      $('#ID_CVC').prop('disabled', true);
      $('#ID_SUBSCRIBE_BTN').prop('disabled', true);

      $('#ID_CHKBTN_' + Constants.PLAN_WHITE_BELT).addClass('disabled');
      $('#ID_CHKBTN_' + Constants.PLAN_NINJA_MASTER).addClass('disabled');
    } else {
      this.setState({InProgress: false});
      this.refs.NinjaProgressSpinner.setState({display: 'none'});

      $('#ID_CARD_NUMBER').prop('disabled', false);
      $('#ID_EXPIRATION').prop('disabled', false);
      $('#ID_CVC').prop('disabled', false);
      $('#ID_SUBSCRIBE_BTN').prop('disabled', false);
      $('#ID_CHKBTN_' + Constants.PLAN_WHITE_BELT).removeClass('disabled');
      $('#ID_CHKBTN_' + Constants.PLAN_NINJA_MASTER).removeClass('disabled');
    }
  }

  onValueChange(e, elementId) {
    //e.preventDefault();
    let value = $('#' + elementId).val();
    this.setState({['value_' + elementId]: value});
  }

  dataGridTemplate(row) {
    if (!row) {
      return;
    }

    return (
      <div className="ui-g-12">
        <span className="md-inputfield">
          <InputText id={row.id} type="text" className="ui-inputtext ui-corner-all ui-state-default ui-widget"
            value={this.state['value_' + row.id]}
            onKeyPress={this.enterKeyPressed}
            onChange={(e) => {this.onValueChange(e, row.id)}}
            style={{fontSize: '1.3em', width: '100%'}} required />
          <label htmlFor="password" style={{fontWeight: 'Bold', fontSize: 20 + 'px'}}>{row.label}</label>
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="ui-g" style={{width: '100%'}}>

        <div className="ui-g" style={{fontSize: '1.3em', width: '100%'}}>
          <Panel header={Constants.ACTION_SUBSCRIBE.linkLabel} style={{width: '100%'}}>

            {/* <SelectNinjaPlan parentComponent={this} selectedNinjaPlan={Constants.PLAN_NINJA_MASTER} /> */}



            <NinjaProgressSpinner ref="NinjaProgressSpinner" maxWidth="200px" maxHeight="200px" marginTop="-10px" />

            <div className="ug-12 no-passing" style={{display: this.state.showCreditCard, width: '100%'}}>
              <StripeProvider stripe={this.state.stripe} >
                <Elements>
                  <SubscriptionForm parentComponent={this} submitButtonLabel={Constants.ACTION_SUBSCRIBE.linkLabel} />
                </Elements>
              </StripeProvider>
            </div>
            <div className="ui-g-12 no-padding"
              style={{display: this.state.pageErrorMessage ? 'block' : 'none'}}>
              <div style={{color: '#b00020', fontWeight: 'bold', fontSize: '1.2em', textAlign: 'center', marginBottom: '1em'}}>
                {this.state.pageErrorMessage}
                <br />
              </div>
            </div>

            <div className="ui-g-12 no-padding"
              style={{display: this.state.subscribedMessage ? 'block' : 'none'}}>
              <div style={{color: 'green', fontWeight: 'bold', fontSize: '1.2em', textAlign: 'center', marginBottom: '1em'}}>
                {this.state.subscribedMessage}
                <br />
              </div>
            </div>
          </Panel>
        </div>
        <br />
      </div>
    );
  }
}

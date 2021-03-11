import React, { Component } from 'react';
import moment from 'moment';
import * as Constants from '../../Constants';
import {Link} from 'react-router-dom'
import Utils from '../shared/Utils';
import UserHelper from '../shared/UserHelper';
import { NinjaContext } from '../shared/Utils';

import classNames from 'classnames';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import '../../App.css';

const utils = new Utils();

export class MessageSubscribe extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        NinjaRaterAppStateHandler: this.props.NinjaRaterAppStateHandler,
        message: ''
      };
  }

  componentDidMount() {
    let accountInfo = utils.getUserAccountSummary(this.context.userInfo, this.context.authFeatures);
    if(!accountInfo.subscriber) {
      let message = Constants.ACTION_SUBSCRIBE.linkLabel + ' NOW and Access Unlimited ExMod and Business Data!';
      // let daysLeft = utils.daysLeftForTrialUser(accountInfo);
      // if(daysLeft > 0) {
      //   message += 'Expires in ' + daysLeft + ' days!';
      // } else {
      //   message += 'Expired on ' + accountInfo.trialEnd.format('MMM DD, YYYY');
      // }
      this.setState({ message: message });
    }

  }

  render() {
      const subscribeLinkStyle = {
        css: {
          color: '#e72564',
          textAlign: 'center',
          fontSize: '26px',
          cursor: 'pointer'
        }
      };

      let isPaidSubscriber = this.context.userInfo.subscriber;

      return (
          // <div className="ui-g-12 no-padding" style={{textAlign: 'center', width: '100%', display: isPaidSubscriber ? 'none' : 'block' }}>
          //      <a style={subscribeLinkStyle.css} onClick={(event) => this.state.NinjaRaterAppStateHandler(event, Constants.ACTION_SUBSCRIBE)}>
          //          <i style={{verticalAlign: '-23%'}} className="topbar-icon material-icons">credit_card</i>
          //          <span className="text">{this.state.message}</span>
          //      </a>
          // </div>
        <div className="ui-g-12 no-padding" style={{width: '100%'}}>
          { !isPaidSubscriber && <div className="ui-g-12 no-padding" style={{textAlign: 'center', width: '100%' }}>
            <a style={subscribeLinkStyle.css} onClick={(event) => this.state.NinjaRaterAppStateHandler(event, Constants.ACTION_SUBSCRIBE)}>
                <i style={{verticalAlign: '-23%'}} className="topbar-icon material-icons">credit_card</i>
                <span className="text">{this.state.message}</span>
            </a>
          </div> }
        </div>
      );
  }
}

MessageSubscribe.propTypes = {};
MessageSubscribe.contextType = NinjaContext;
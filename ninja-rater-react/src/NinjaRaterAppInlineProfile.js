import React, { Component } from 'react';
import classNames from 'classnames';
import * as Constants from './Constants';
import {Button} from 'primereact/components/button/Button';
import MenuUtility from './components/shared/MenuUtility'
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from './components/shared/Utils';
import { NinjaContext } from './components/shared/Utils';
import logo from "./assets/images/jackalope_logo.jpg";

const utils = new Utils();

export class NinjaRaterAppInlineProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            userInfo: new Object(),
            NinjaRaterAppStateHandler: this.props.NinjaRaterAppStateHandler,
            MenuUtility: new MenuUtility()
        };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        let userInfo = this.context.userInfo;
        this.setState({userInfo: userInfo});
    }

    setData = (userInfo) => {

    }

    onClick(event) {
        this.setState(
          {
            expanded: !this.state.expanded
          }
        );
        event.preventDefault();
    }

    onProfileMenuItemClick(event, action) {
      let menuItem = $('#ID_USER_MENU_ITEM')[0];
      this.state.MenuUtility.toggleMenuItemTabs(menuItem);
      this.state.NinjaRaterAppStateHandler(event, action);
    }

    render() {
        let isPaidSubscriber = this.context.userInfo.subscriber;
        return  <div>
                    <div className={classNames('profile', {'profile-expanded': this.state.expanded})}>
                        <a onClick={this.onClick}>
                            <img className="profile-image" src={logo} alt="Profile"/>
                            <span className="profile-name">{this.context.userInfo.firstName} {this.context.userInfo.lastName}</span>
                            <i className="material-icons">keyboard_arrow_down</i>
                        </a>
                    </div>

                    <ul className="ultima-menu profile-menu">
                        <li role="menuitem">
                            <a className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}
                                onClick={(event) => this.onProfileMenuItemClick(event, Constants.ACTION_MY_ACCOUNT)}>
                                <i className="material-icons">person</i>
                                <span>{Constants.ACTION_MY_ACCOUNT.linkLabel}</span>
                            </a>
                        </li>

                        { isPaidSubscriber && (
                          <li role="menuitem">
                              <a className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}
                                  onClick={(event) => this.onProfileMenuItemClick(event, Constants.ACTION_UPDATE_CREDIT_CARD)}>
                                  <i className="material-icons">credit_card</i>
                                  <span>{Constants.ACTION_UPDATE_CREDIT_CARD.linkLabel}</span>
                              </a>
                          </li>)
                        }

                        { isPaidSubscriber && (
                          <li role="menuitem">
                              <a className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}
                                  onClick={(event) => this.onProfileMenuItemClick(event, Constants.ACTION_MY_NINJA_PLAN)}>
                                  <i className="material-icons">business_center</i>
                                  <span>{Constants.ACTION_MY_NINJA_PLAN.linkLabel}</span>
                              </a>
                          </li>)
                        }

                        { !isPaidSubscriber && (
                          <li role="menuitem">
                              <a className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}
                                  onClick={(event) => this.onProfileMenuItemClick(event, Constants.ACTION_SUBSCRIBE)}>
                                  <i className="material-icons">credit_card</i>
                                  <span>{Constants.ACTION_SUBSCRIBE.linkLabel}</span>
                              </a>
                          </li>)
                        }

                        <li role="menuitem">
                            <a className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}
                                onClick={(event) => this.onProfileMenuItemClick(event, Constants.ACTION_CHANGE_PASSWORD)}>
                                <i className="material-icons">vpn_key</i>
                                <span>{Constants.ACTION_CHANGE_PASSWORD.linkLabel}</span>
                            </a>
                        </li>

                        <li role="menuitem">
                            <a className="ripplelink" tabIndex={this.state.expanded ? null : '-1'}
                                onClick={(event) => this.onProfileMenuItemClick(event, Constants.ACTION_SIGN_OUT)}>
                                <i className="material-icons">exit_to_app</i>
                                <span>{Constants.ACTION_SIGN_OUT.linkLabel}</span>
                            </a>
                        </li>
                    </ul>

                </div>
    }
}

NinjaRaterAppInlineProfile.propTypes = {};
NinjaRaterAppInlineProfile.contextType = NinjaContext;

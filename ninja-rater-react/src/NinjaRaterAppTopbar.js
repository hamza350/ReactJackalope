import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import * as Constants from './Constants';
import jQuery from 'jquery';
import $ from 'jquery';
import MenuUtility from './components/shared/MenuUtility'
import Utils from './components/shared/Utils';
import {NinjaContext} from './components/shared/Utils';

const utils = new Utils();

export class NinjaRaterAppTopbar extends Component {

    static defaultProps = {
        onMenuButtonClick: null,
        onTopbarMenuButtonClick: null,
        onTopbarItemClick: null,
        profileMode: null,
        horizontal: false,
        topbarMenuActive: false,
        activeTopbarItem: null,
        onRightPanelButtonClick: null,
        NUMBER_OF_USER_QUOTES: 0,
        NUMBER_OF_AVAILABLE_CONTRACTORS: 0,
        NUMBER_OF_AVAILABLE_EXMODS: 0
    }

    static propTypes = {
        onMenuButtonClick: PropTypes.func.isRequired,
        onTopbarMenuButtonClick: PropTypes.func.isRequired,
        onTopbarItemClick: PropTypes.func.isRequired,
        profileMode: PropTypes.string.isRequired,
        horizontal: PropTypes.bool.isRequired,
        topbarMenuActive: PropTypes.bool.isRequired,
        activeTopbarItem: PropTypes.string,
        onRightPanelButtonClick: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            NinjaRaterAppStateHandler: this.props.NinjaRaterAppStateHandler,
            MenuUtility: new MenuUtility(),
            lastClickedMenuItem_ID: 'ID_RATES_MENU_ITEM',
            sideBarMenuCollapsed: false,
            firstName: '',
            lastName: ''
        };
        this.onClick = this.onClick.bind(this);
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {

    }

    setData(userInfo) {
        this.setState({firstName: userInfo.firstName, lastName: userInfo.lastName});
        this.NUMBER_OF_AVAILABLE_CONTRACTORS = 0;
        if (userInfo.maxCslbContractorsAvailable) {
            this.NUMBER_OF_AVAILABLE_CONTRACTORS = userInfo.maxCslbContractorsAvailable;
        }
        this.NUMBER_OF_AVAILABLE_EXMODS = 0;
        if (userInfo.maxWcirbEmployersAvailable) {
            this.NUMBER_OF_AVAILABLE_EXMODS = userInfo.maxWcirbEmployersAvailable;
        }
    }

    onClick(event) {
        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        if (this.props.onTopbarItemClick) {
            this.props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    onMenuItemClick(event, action, clickedMenuItemId) {
        // Temp workaround to automatically reload the page when coming back to the 'Quote' tab, otherwise Rates won't work unless you relaod the page manually.
        if (this.state.lastClickedMenuItem_ID && this.state.lastClickedMenuItem_ID != clickedMenuItemId && clickedMenuItemId == 'ID_RATES_MENU_ITEM') {
            //alert('Reload page');
            window.location = window.location.origin + Constants.ACTION_RATES.url;
        }
        this.collapseOrExpandSideMenuBar(clickedMenuItemId);
        let clickedMenuItem = document.getElementById(clickedMenuItemId);
        this.state.MenuUtility.toggleMenuItemTabs(clickedMenuItem);
        this.state.NinjaRaterAppStateHandler(event, action);
    }

    collapseOrExpandSideMenuBar = (clickedMenuItemId) => {
        const previous = this.state.lastClickedMenuItem_ID;
        if (this.state.lastClickedMenuItem_ID != clickedMenuItemId) { // not the same tab clicked
            let clickedTab_Element_I = $('#menu-button')[0].children[0];
            if (clickedMenuItemId == 'ID_RATES_MENU_ITEM') { // expand side bar
                if (previous != 'ID_RATES_MENU_ITEM' && this.state.sideBarMenuCollapsed) {
                    clickedTab_Element_I.click();
                    this.setState({sideBarMenuCollapsed: false});
                }
            } else {
                if (clickedMenuItemId == 'ID_SEARCH_MENU_ITEM' ||
                    clickedMenuItemId == 'ID_WCIRB_MENU_ITEM' ||
                    clickedMenuItemId == 'ID_SALES_LEADS_MENU_ITEM' ||
                    clickedMenuItemId == 'ID_HELP_MENU_ITEM') {

                    if (previous != 'ID_SEARCH_MENU_ITEM' &&
                        previous != 'ID_WCIRB_MENU_ITEM' &&
                        previous != 'ID_HELP_MENU_ITEM' &&
                        previous != 'ID_SALES_LEADS_MENU_ITEM' && !this.state.sideBarMenuCollapsed) {
                        clickedTab_Element_I.click();
                        this.setState({sideBarMenuCollapsed: true});
                    }
                }
            }
            this.setState({lastClickedMenuItem_ID: clickedMenuItemId});
        }
    }

    logoClicked = (event) => {
        alert('Logo Clicked');
    }

    render() {
        let topbarItemsClassName = classNames('topbar-items animated fadeInDown', {'topbar-items-visible': this.props.topbarMenuActive});

        const menuItemStyle = {
            size: {
                fontSize: '16px',
                fontWeight: 'bald'
            }
        };

        let isPaidSubscriber = this.context.userInfo.subscriber;

        return <div className="topbar clearfix">
            {/* <div className="topbar-left">
                        <div className="logo"></div>
                    </div> */}

            <a href="https://www.ninjarater.com" target="_blank" style={{cursor: 'pointer'}}>
                <div className="topbar-left" style={{cursor: 'pointer'}}>
                    <img onClick={this.logoClicked} src="/images/NinjaRater-Logo-Login.png" style={{cursor: 'pointer'}} />
                </div>
            </a>


            <div className="topbar-right">
                <a id="menu-button" onClick={this.props.onMenuButtonClick}>
                    <i></i>
                </a>

                <a id="rightpanel-menu-button" onClick={this.props.onRightPanelButtonClick}>
                    <i className="material-icons">more_vert</i>
                </a>

                <a id="topbar-menu-button" onClick={this.props.onTopbarMenuButtonClick}>
                    <i className="material-icons">menu</i>
                </a>
                <ul className={topbarItemsClassName}>
                    {(this.props.profileMode === 'top' || this.props.horizontal) &&
                        <li className={classNames('profile-item', {'active-top-menu': this.props.activeTopbarItem === 'profile'})}>

                            <a onClick={(e) => this.onTopbarItemClick(e, 'profile')}>
                                <img className="profile-image" src="assets/layout/images/avatar.png" alt="Profile" />
                                <span className="topbar-item-name">Jane Williams</span>
                            </a>

                            <ul className="ultima-menu animated fadeInDown">
                                <li role="menuitem">
                                    <a >
                                        <i className="material-icons">person</i>
                                        <span>Profile</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a >
                                        <i className="material-icons">security</i>
                                        <span>Privacy</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a >
                                        <i className="material-icons">settings_applications</i>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                <li role="menuitem">
                                    <a >
                                        <i className="material-icons">power_settings_new</i>
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </li>}


                    <li id="ID_USER_MENU_ITEM" className={classNames({'active-top-menu': this.props.activeTopbarItem === 'person'})}>
                        <a onClick={(e) => this.onTopbarItemClick(e, 'person')}>
                            <i className="topbar-icon material-icons">person</i>
                            <label className="text">{this.state.firstName} {this.state.lastName}</label>
                        </a>
                        <ul className="ultima-menu animated fadeInDown">
                            <li role="menuitem" style={menuItemStyle.size}>
                                <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_MY_ACCOUNT, 'ID_USER_MENU_ITEM')}>
                                    <i className="material-icons">person</i>
                                    <span>{Constants.ACTION_MY_ACCOUNT.linkLabel}</span>
                                </a>
                            </li>
                            {isPaidSubscriber && (
                                <li role="menuitem" style={menuItemStyle.size}>
                                    <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_UPDATE_CREDIT_CARD, 'ID_USER_MENU_ITEM')}>
                                        <i className="material-icons">credit_card</i>
                                        <span>{Constants.ACTION_UPDATE_CREDIT_CARD.linkLabel}</span>
                                    </a>
                                </li>)
                            }

                            {isPaidSubscriber && (
                                <li role="menuitem" style={menuItemStyle.size}>
                                    <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_MY_NINJA_PLAN, 'ID_USER_MENU_ITEM')}>
                                        <i className="material-icons">business_center</i>
                                        <span>{Constants.ACTION_MY_NINJA_PLAN.linkLabel}</span>
                                    </a>
                                </li>)
                            }

                            {!isPaidSubscriber && (
                                <li role="menuitem" style={menuItemStyle.size}>
                                    <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_SUBSCRIBE, 'ID_USER_MENU_ITEM')}>
                                        <i className="material-icons">credit_card</i>
                                        <span>{Constants.ACTION_SUBSCRIBE.linkLabel}</span>
                                    </a>
                                </li>)
                            }

                            <li role="menuitem" style={menuItemStyle.size}>
                                <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_CHANGE_PASSWORD, 'ID_USER_MENU_ITEM')}>
                                    <i className="material-icons">vpn_key</i>
                                    <span>{Constants.ACTION_CHANGE_PASSWORD.linkLabel}</span>
                                </a>
                            </li>
                            <li role="menuitem" style={menuItemStyle.size}>
                                <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_SIGN_OUT, 'ID_USER_MENU_ITEM')}>
                                    <i className="material-icons">exit_to_app</i>
                                    <span>{Constants.ACTION_SIGN_OUT.linkLabel}</span>
                                </a>
                            </li>
                        </ul>
                    </li>


                    {/* <li id="ID_HELP_MENU_ITEM" className={classNames({'active-top-menu': this.props.activeTopbarItem === 'beenhere'})}>
                                <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_HELP, 'ID_HELP_MENU_ITEM')}>
                                    <i className="topbar-icon material-icons">help_outline</i>
                                    <label className="text">Help</label>
                                </a>
                            </li> */}

                    {/* <li id="ID_SALES_LEADS_MENU_ITEM" className={classNames({'active-top-menu': this.props.activeTopbarItem === 'beenhere'})}>
                                <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_MY_SALES_LEADS, 'ID_SALES_LEADS_MENU_ITEM')}>
                                    <i className="topbar-icon material-icons">search</i>
                                    <label className="text">Contractors</label>
                                    <span style={{backgroundColor: 'green'}} className="topbar-badge animated rubberBand">{utils.formatNumber(this.NUMBER_OF_AVAILABLE_CONTRACTORS)}</span>
                                </a>
                            </li> */}

                    {/* <li id="ID_WCIRB_MENU_ITEM" className={classNames({'active-top-menu': this.props.activeTopbarItem === 'beenhere'})}>
                                <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_WCIRB, 'ID_WCIRB_MENU_ITEM')}>
                                    <i className="topbar-icon material-icons">search</i>
                                    <label className="text">WCIRB</label>
                                    <span style={{backgroundColor: 'green'}} className="topbar-badge animated rubberBand">{utils.formatNumber(this.NUMBER_OF_AVAILABLE_EXMODS)}</span>
                                </a>
                            </li> */}

                    {/* <li role="menuitem" id="ID_SEARCH_MENU_ITEM">
                                <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_EXMOD_SEARCH, 'ID_SEARCH_MENU_ITEM')} className="topbar-message">
                                    <i className="topbar-icon material-icons">search</i>
                                    <label className="text">{Constants.ACTION_EXMOD_SEARCH.linkLabel}</label>
                                    <span style={{backgroundColor: 'green'}} className="topbar-badge animated rubberBand">{utils.formatNumber(this.NUMBER_OF_AVAILABLE_EXMODS)}</span>
                                </a>
                            </li> */}
                    {/*
                            <li role="menuitem" id="ID_SEARCH_MENU_ITEM" className={classNames({'active-top-menu': this.props.activeTopbarItem === 'search'})}>
                                <a onClick={(e) => this.onTopbarItemClick(e, 'search')}>
                                    <i className="topbar-icon material-icons">search</i>
                                    <label className="text">{Constants.ACTION_SEARCH.linkLabel}</label>
                                </a>

                                <ul className="ultima-menu animated fadeInDown">
                                    <li role="menuitem" style={menuItemStyle.size}>
                                        <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_EXMOD_SEARCH, 'ID_SEARCH_MENU_ITEM')}>
                                            <i className="material-icons">search</i>
                                            <span>{Constants.ACTION_EXMOD_SEARCH.linkLabel}</span>
                                        </a>
                                    </li>
                                    <li role="menuitem" style={menuItemStyle.size}>
                                        <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_MARKET_SEARCH, 'ID_SEARCH_MENU_ITEM')}>
                                            <i className="material-icons">search</i>
                                            <span>{Constants.ACTION_MARKET_SEARCH.linkLabel}</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
*/}
                    <li role="menuitem" id="ID_RATES_MENU_ITEM">
                        <a onClick={(event) => this.onMenuItemClick(event, Constants.ACTION_RATES, 'ID_RATES_MENU_ITEM')} className="topbar-message">

                            <i className="topbar-icon material-icons">attach_money</i>
                            <label className="text">{Constants.ACTION_RATES.linkLabel}</label>
                            <span style={{backgroundColor: 'green'}} className="topbar-badge animated rubberBand">{utils.formatNumber(this.state.NUMBER_OF_USER_QUOTES)}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>;
    }
}

NinjaRaterAppTopbar.propTypes = {};
NinjaRaterAppTopbar.contextType = NinjaContext;
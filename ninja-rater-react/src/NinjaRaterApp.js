import React, { Component } from "react";
import classNames from "classnames";
import "nanoscroller";
import * as Constants from "./Constants";
import { NinjaRaterAppTopbar } from "./NinjaRaterAppTopbar";
import { NinjaRaterAppInlineProfile } from "./NinjaRaterAppInlineProfile";
import { AppMenu } from "./AppMenu";
import { NinjaRaterAppRightPanel } from "./NinjaRaterAppRightPanel";
import "primereact/resources/primereact.min.css";
import "nanoscroller/bin/css/nanoscroller.css";
import "fullcalendar/dist/fullcalendar.css";
import jQuery from "jquery";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import moment from "moment";
import { Button } from "primereact/components/button/Button";
import { Dialog } from "primereact/components/dialog/Dialog";
import $ from "jquery";
import { Rates } from "./components/Rates";
import { Wcirb } from "./components/wcirb/Wcirb";
import { WcirbRange } from "./components/wcirb/WcirbRange";
import { SalesLeads } from "./components/sales_leads/SalesLeads";
import { MyAccount } from "./components/account/MyAccount";
import { UpdateCreditCard } from "./components/account/UpdateCreditCard";
import { MyNinjaPlan } from "./components/account/MyNinjaPlan";
import { ChangePassword } from "./components/account/ChangePassword";
import { Subscribe } from "./components/account/Subscribe";
import Help from "./pages/Help";

import FooterSimple from "./components/FooterSimple";
import { MessageSubscribe } from "./components/shared/MessageSubscribe";
import Utils from "./components/shared/Utils";
import UserHelper from "./components/shared/UserHelper";
import RatesUtility from "./components/shared/RatesUtility";
import UserActivity from "./components/shared/UserActivity";
import { NinjaContext } from "./components/shared/Utils";
import "./ripple.js";
import "./App.css";
import Home from "./components/Home";
import styles from "./NinjaRaterApp.module.scss";
import NinjaHeader from "./ninjaheader";
import BrowserBackArrowForPage from "./components/navigation/BrowserBackArrowForPage";
import UpdateSubscription from "./v1-components/Account-Settings/updateSubscription";
import PreviousSubmissions from "./v1-components/previousSubmissions";
import ReferFriend from "./v1-components/referFriend";
import AddUser from "./v1-components/Add-User/addUser"
const utils = new Utils();
const ratesUtility = new RatesUtility();

class NinjaRaterApp extends Component {
  constructor(props) {
    super(props);
    this.NinjaRaterAppStateHandler = this.NinjaRaterAppStateHandler.bind(this);

    // Need to log in again
    // if(!props.router || !props.router.current) {
    //   utils.logOut();
    // }
    // let userInfo = props.router.current.history.location.state.userInfo;
    // let authFeatures = props.router.current.history.location.state.authFeatures;
    // let initialData = props.router.current.history.location.state.initialData;

    this.state = {
      ninjaStore: {
        router: props.router,
        userInfo: new Object(),
        authFeatures: new Object(),
        initialData: new Object(),
      },
      layoutMode: "static",
      profileMode: "inline",
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      rotateMenuButton: false,
      topbarMenuActive: false,
      activeTopbarItem: null,
      darkMenu: false,
      rightPanelActive: false,
      menuActive: false,
      recentQuotesMenu: [],
      displayClearRecentQuotesDialog: false,
      // action: Constants.ACTION_RATES.value //Default action is Constants.ACTION_RATES
      action: Constants.ACTION_HOME_PAGE.value, //Now redrecting to home page.
      prevSubData:"",
    };

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
    this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
    this.onRightPanelButtonClick = this.onRightPanelButtonClick.bind(this);
    this.onRightPanelClick = this.onRightPanelClick.bind(this);
    this.clearRecentQuotes = this.clearRecentQuotes.bind(this);
    this.successClearRecentQuotes = this.successClearRecentQuotes.bind(this);
    this.failClearRecentQuotes = this.failClearRecentQuotes.bind(this);
    this.redrawLandingPage = this.redrawLandingPage.bind(this);
  }

  componentDidMount() {
    // let token = utils.readCookie("token");
    // if (!token) {
    //   utils.logOut();
    // }
    // let action = [{ value: 23 }];
    // if (window.location.hash.split("#/")[1] != "") {
    //   action = Constants.arrayRoutes.filter((item) => {
    //     return item.url == window.location.hash.split("#")[1];
    //   });
    // }
    // new UserHelper({ parentComponent: this }).fetchUserAndInitialData(
    //   token,
    //   this.userAndInitialDataFetched
    // );

    // jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    // let refs = {
    //   Rates: this.refs.Rates,
    //   Wcirb: this.refs.Wcirb,
    //   WcirbRange: this.refs.WcirbRange,
    //   MyAccount: this.refs.MyAccount,
    //   UpdateCreditCard: this.refs.UpdateCreditCard,
    //   MyNinjaPlan: this.refs.MyNinjaPlan,
    //   ChangePassword: this.refs.ChangePassword,
    //   Subscribe: this.refs.Subscribe,
    //   MySalesLeads: this.refs.MySalesLeads,
    //   UpdateSubscription: this.refs.UpdateSubscription,
    //   Help: this.refs.Help,
    //   PreviousSubmissions: this.refs.PreviousSubmissions,
    //   ReferFriend: this.refs.ReferFriend,
    //   userActivity: this.refs.userActivity,
    //   AddUser: this.refs.AddUser,
    // };
    // this.setState({ refs: refs, action: action[0].value });
  }

  userAndInitialDataFetched = (response) => {
    this.setState({
      ninjaStore: {
        userInfo: response.userInfo,
        authFeatures: response.authFeatures,
        initialData: response.initialData,
      },
      mapOfClassCodes: response.initialData.NinjaClassesForLeads,
    });
    this.refs.NinjaHeader.setData({
      userInfo: response.userInfo,
      initialData: response.initialData,
    });

    // this.refs.NinjaRaterAppTopbar.setData(response.userInfo);
    this.refs.NinjaHeader.getAmountOfIndications(response.userInfo);
    this.refs.userActivity.getUserActivity(response.userInfo);
  };

  prevSubmissionData(event, item) {
    event.preventDefault();
    this.setState({
      prevSubData: item,
    });
    this.NinjaRaterAppStateHandler(event, Constants.ACTION_RATES);
  }

  gotoIndications(event) {
    event.preventDefault();
    this.setState({
      prevSubData: "",
    });
    this.NinjaRaterAppStateHandler(event, Constants.ACTION_RATES);
  }

  NinjaRaterAppStateHandler(e, action) {
    try {
      e.preventDefault();
    } catch (e) {}
    //alert('AppInlineNinjaProfile changed state in NinjaRaterApp:' + action.url ==.);
    this.setState({
      action: action.value,
    });

    if (action.value == Constants.ACTION_SIGN_OUT.value) {
      utils.logOut();
    } else {
      window.location.hash = action.url;
      this.redrawLandingPage(e, action.value);
      // window.location.reload();
    }
  }

  redrawLandingPage(event, action) {
    //alert('Change Page To: ' + action);
    this.setState({
      action: action ? action : Constants.ACTION_RATES.value,
    });
    try {
      event.preventDefault();
    } catch (e) {}
  }

  onMenuClick(event) {
    this.menuClick = true;

    if (!this.isHorizontal()) {
      setTimeout(() => {
        jQuery(this.layoutMenuScroller).nanoScroller();
      }, 500);
    }
  }

  onMenuButtonClick(event) {
    this.menuClick = true;
    this.setState({
      rotateMenuButton: !this.state.rotateMenuButton,
      topbarMenuActive: false,
    });

    if (this.state.layoutMode === "overlay") {
      this.setState({
        overlayMenuActive: !this.state.overlayMenuActive,
      });
    } else {
      if (this.isDesktop())
        this.setState({
          staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive,
        });
      else
        this.setState({
          staticMenuMobileActive: !this.state.staticMenuMobileActive,
        });
    }

    event.preventDefault();
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
    this.hideOverlayMenu();
    event.preventDefault();
  }

  onTopbarItemClick(event) {
    this.topbarItemClick = true;

    if (this.state.activeTopbarItem === event.item)
      this.setState({ activeTopbarItem: null });
    else this.setState({ activeTopbarItem: event.item });

    event.originalEvent.preventDefault();
  }

  onMenuItemClick(event) {
    if (!event.item.items) {
      this.hideOverlayMenu();
    }
  }

  onRootMenuItemClick(event) {
    this.setState({
      menuActive: !this.state.menuActive,
    });

    event.originalEvent.preventDefault();
  }

  onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.setState({
      rightPanelActive: !this.state.rightPanelActive,
    });
    event.preventDefault();
  }

  onRightPanelClick(event) {
    this.rightPanelClick = true;
  }

  onDocumentClick(event) {
    if (!this.topbarItemClick) {
      this.setState({
        activeTopbarItem: null,
        topbarMenuActive: false,
      });
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        this.setState({
          menuActive: false,
        });
      }

      this.hideOverlayMenu();
    }

    if (!this.rightPanelClick) {
      this.setState({
        rightPanelActive: false,
      });
    }

    this.topbarItemClick = false;
    this.menuClick = false;
    this.rightPanelClick = false;
  }

  hideOverlayMenu() {
    this.setState({
      rotateMenuButton: false,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
    });
  }

  isTablet() {
    let width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isOverlay() {
    return this.state.layoutMode === "overlay";
  }

  isHorizontal() {
    return this.state.layoutMode === "horizontal";
  }

  isSlim() {
    return this.state.layoutMode === "slim";
  }

  changeTheme(theme) {
    this.changeStyleSheetUrl("layout-css", theme, "layout");
    this.changeStyleSheetUrl("theme-css", theme, "theme");
  }

  changeStyleSheetUrl(id, value, prefix) {
    let element = document.getElementById(id);
    let urlTokens = element.getAttribute("href").split("/");
    urlTokens[urlTokens.length - 1] = prefix + "-" + value + ".css";
    let newURL = urlTokens.join("/");
    element.setAttribute("href", newURL);
  }

  createRecentQuotesMenu(sortedQuoteHistory) {
    let quotesMenu = [];
    let NUMBER_OF_USER_QUOTES = 0;
    for (let i = 0; i < sortedQuoteHistory.length; ++i) {
      let quotesForDay = sortedQuoteHistory[i];
      let date = quotesForDay[0].formattedCreateTime;
      let momentDate = moment(date);
      let row = ratesUtility.createRecentQuoteMenuRow(
        momentDate,
        utils.formatNumber(quotesForDay.length)
      );

      NUMBER_OF_USER_QUOTES += quotesForDay.length;
      for (let j = 0; j < quotesForDay.length; ++j) {
        let quote = quotesForDay[j];
        let request = quote.request;
        request = JSON.parse(request);
        ratesUtility.addRecentQuoteToMenuRow(row, request.combo, this);
      }
      quotesMenu.push(row);
    }

    this.setState({
      recentQuotesMenu: quotesMenu,
    });
    this.refs.NinjaHeader.setState({
      NUMBER_OF_USER_QUOTES: NUMBER_OF_USER_QUOTES,
    });
    // this.refs.NinjaRaterAppTopbar.setState({NUMBER_OF_USER_QUOTES: NUMBER_OF_USER_QUOTES});
  }

  clearRecentQuotes() {
    this.setState({ displayClearRecentQuotesDialog: false });
    $("#ID_CLEAR_RECENT_QUOTES_BTN").prop("icon", "ui-icon-delete-forever");
    let userId = this.state.ninjaStore.userInfo.userId;
    let url = utils.getServicesUrl() + "/clearRecentSearches?uid=" + userId;
    utils.ajaxRequest(
      "GET",
      url,
      this.successClearRecentQuotes,
      this.failClearRecentQuotes
    );
  }

  successClearRecentQuotes() {
    $("#ID_CLEAR_RECENT_QUOTES_BTN").prop("icon", "ui-icon-delete-forever");
    this.setState({ recentQuotesMenu: [] });
  }

  failClearRecentQuotes() {
    $("#ID_CLEAR_RECENT_QUOTES_BTN").prop("icon", "");
  }

  render() {
    let layoutContainerClassName = classNames("layout-container", {
      "menu-layout-static": this.state.layoutMode !== "overlay",
      "menu-layout-overlay": this.state.layoutMode === "overlay",
      "layout-menu-overlay-active": this.state.overlayMenuActive,
      "menu-layout-slim": this.state.layoutMode === "slim",
      "menu-layout-horizontal": this.state.layoutMode === "horizontal",
      "layout-menu-static-inactive": this.state.staticMenuDesktopInactive,
      "layout-menu-static-active": this.state.staticMenuMobileActive,
    });
    let menuClassName = classNames("layout-menu", {
      "layout-menu-dark": this.state.darkMenu,
    });

    let dialogFooter = (
      <div className="ui-dialog-buttonpane ui-helper-clearfix">
        <Button
          icon="fa-close"
          onClick={() =>
            this.setState({ displayClearRecentQuotesDialog: false })
          }
          label="No"
        />
        <Button
          icon="fa-check"
          onClick={() => this.clearRecentQuotes()}
          label="Yes"
        />
      </div>
    );

    return (
      <div className="layout-wrapper" onClick={this.onDocumentClick}>
        <NinjaContext.Provider value={this.state.ninjaStore}>
          {/* <BrowserBackArrowForPage /> */}
          <UserActivity ref="userActivity" parentComponent={this} />
          <div
            ref={(el) => (this.layoutContainer = el)}
            className={layoutContainerClassName}
          >
            <div id="load" className="ring-loader">
              <div className="load-wrap"></div>
            </div>
            <NinjaHeader
              ref="NinjaHeader"
              ninjaRaterApp={this}
              ninjaStore={this.state.ninjaStore}
            />
            {/* <NinjaRaterAppTopbar ref="NinjaRaterAppTopbar" NinjaRaterAppStateHandler={this.NinjaRaterAppStateHandler} profileMode={this.state.profileMode} horizontal={this.props.horizontal}
                        topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
                        onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
                        onTopbarItemClick={this.onTopbarItemClick} onRightPanelButtonClick={this.onRightPanelButtonClick} /> */}

            {/* <div className={menuClassName} onClick={this.onMenuClick}>

                        <div ref={(el) => this.layoutMenuScroller = el} className="nano">

                            <div className="nano-content menu-scroll-content">
                                {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <NinjaRaterAppInlineProfile ref="NinjaRaterAppInlineProfile" router={this.props.router} NinjaRaterAppStateHandler={this.NinjaRaterAppStateHandler} />}

                                {this.state.recentQuotesMenu && this.state.recentQuotesMenu.length > 0 &&
                                    <div className="ui-g-12">
                                        <h3><i>Recent Quotes</i></h3>
                                        <Button id="ID_CLEAR_RECENT_QUOTES_BTN" onClick={() => this.setState({displayClearRecentQuotesDialog: true})} style={{textAlign: 'center'}} type="button" label="Clear Recent Quotes" icon="ui-icon-delete-forever"></Button>

                                        <Dialog header="Confirm" visible={this.state.displayClearRecentQuotesDialog} modal={false} width="250px" footer={dialogFooter} onHide={() => this.setState({displayClearRecentQuotesDialog: false})}>
                                            <p>Clear Your Recent Quotes?</p>
                                        </Dialog>
                                    </div>
                                }
                                <AppMenu model={this.state.recentQuotesMenu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
                                    layoutMode={this.state.layoutMode} active={this.state.menuActive} />
                            </div>
                        </div>
                    </div> */}

            <div className={["layout-main", styles.layoutMenu].join(" ")}>
              <div className="ui-g">
                {/* <MessageSubscribe NinjaRaterAppStateHandler={this.NinjaRaterAppStateHandler} /> */}

                {this.state.action == Constants.ACTION_RATES.value && (
                  <Rates ref="Rates" ninjaRaterApp={this} />
                )}

                {this.state.action == Constants.ACTION_HOME_PAGE.value && (
                  <Home ref="Home" ninjaRaterApp={this} />
                )}

                {this.state.action == Constants.ACTION_EXMOD_SEARCH.value && (
                  <Wcirb ref="Wcirb" ninjaRaterApp={this} />
                )}

                {this.state.action == Constants.ACTION_WCIRB.value && (
                  <WcirbRange ref="WcirbRange" ninjaRaterApp={this} />
                )}

                {this.state.action == Constants.ACTION_MY_ACCOUNT.value && (
                  <MyAccount ref="MyAccount" ninjaRaterApp={this} />
                )}

                {this.state.action ==
                  Constants.ACTION_UPDATE_CREDIT_CARD.value && (
                  <UpdateCreditCard
                    ref="UpdateCreditCard"
                    ninjaRaterApp={this}
                  />
                )}

                {this.state.action == Constants.ACTION_MY_NINJA_PLAN.value && (
                  <MyNinjaPlan ref="MyNinjaPlan" ninjaRaterApp={this} />
                )}

                {this.state.action ==
                  Constants.ACTION_CHANGE_PASSWORD.value && (
                  <ChangePassword ref="ChangePassword" ninjaRaterApp={this} />
                )}

                {this.state.action == Constants.ACTION_SUBSCRIBE.value && (
                  <Subscribe ref="Subscribe" ninjaRaterApp={this} />
                )}

                {this.state.action == Constants.ACTION_MY_SALES_LEADS.value && (
                  <SalesLeads ref="MySalesLeads" ninjaRaterApp={this} />
                )}

                {this.state.action == Constants.ACTION_HELP.value && (
                  <Help ref="Help" ninjaRaterApp={this} />
                )}
                {this.state.action ==
                  Constants.ACTION_UPDATE_SUBSCRIPTION.value && (
                  <UpdateSubscription
                    ref="UpdateSubscription"
                    ninjaRaterApp={this}
                  />
                )}
                {this.state.action ==
                  Constants.ACTION_PREVIOUS_SUBMISSIONS.value && (
                  <PreviousSubmissions
                    ref="PreviousSubmissions"
                    ninjaRaterApp={this}
                  />
                )}
                {this.state.action == Constants.ACTION_REFER_FRIEND.value && (
                  <ReferFriend ref="ReferFriend" ninjaRaterApp={this} />
                )}
                {this.state.action == Constants.ACTION_ADD_USER.value && (
                  <AddUser ref="AddUser" ninjaRaterApp={this} />
                )}
              </div>
              {/* <footer className={styles.footer_css}>{item.footer}</footer>      */}
              {/*<FooterSimple /> */}
            </div>
            {/* {this.state.ninjaStore.initialData.listOfUserActivitySummary && (
              <NinjaRaterAppRightPanel
                expanded={this.state.rightPanelActive}
                onContentClick={this.onRightPanelClick}
                ninjaStore={this.state.ninjaStore}
              />
            )} */}
            {/* <div className="layout-mask"></div> */}
          </div>
        </NinjaContext.Provider>
      </div>
    );
  }
}

NinjaRaterApp.propTypes = {};

export default NinjaRaterApp;

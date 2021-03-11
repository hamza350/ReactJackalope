import React, { Component } from "react";
import { withRouter } from "react-router";
// import styles from "../v1-components/register/register.module.scss";
import styles from "./v1-components/register/register.module.scss";
import { Customisedbutton } from "./shared/inputFields";
import * as Constants from "./Constants";
import MenuUtility from "./components/shared/MenuUtility";
import { Link } from "react-router-dom";
import Utils from "./components/shared/Utils";
import jQuery from "jquery";
import { NinjaContext } from "./components/shared/Utils";
import classNames from "classnames";
const utils = new Utils();

class NinjaHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NinjaRaterAppStateHandler: this.props.NinjaRaterAppStateHandler,
      MenuUtility: new MenuUtility(),
      lastClickedMenuItem_ID: "ID_RATES_MENU_ITEM",
      sideBarMenuCollapsed: false,
      firstName: "",
      lastName: "",
      listOfUserActivitySummary: {
        numberOfPdfReports: 0,
        numberOfRateQuotes: 0,
        numberOfMarketSearches: 0,
        numberOfDetailedPdfReports: 0,
      },
      amountCount: 0,
    };
    this.setData = this.setData.bind(this);
    this.getAmountOfIndications = this.getAmountOfIndications.bind(this);
    this.quoteHistoryResponse = this.quoteHistoryResponse.bind(this);
  }
  setData({ userInfo, initialData }) {
    this.setState({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      userId: userInfo.userId,
      numberOfRateQuotes:
        initialData.listOfUserActivitySummary.numberOfRateQuotes,
    });
  }

  componentDidMount() {
    jQuery(this.rightPanelMenuScroller).nanoScroller({ flash: true });
  }

  getAmountOfIndications(userInfo) {
    let url =
      utils.getServicesUrl() + "/quoteHistory?userName=" + userInfo.userId;
    utils.ajaxRequest(
      "GET",
      url,
      this.quoteHistoryResponse,
      utils.errorResponse
    );
  }

  quoteHistoryResponse(response) {
    this.setState((state) => {
      this.state.amountCount = response.length;
      return state;
    });
  }

  render() {
    const { firstName, lastName, numberOfRateQuotes, amountCount } = this.state;
    return (
      <React.Fragment>
        <div id="page">
          <a className="skip-link screen-reader-text">Skip to content</a>
          <div
            className="sticky-on masthead inline-header right full-height full-width shadow-decoration shadow-mobile-header-decoration medium-mobile-menu-icon mobile-menu-icon-bg-on mobile-menu-icon-hover-bg-on dt-parent-menu-clickable"
            role="banner"
          >
            <div className="top-bar top-bar-empty top-bar-line-hide">
              <div className="top-bar-bg"></div>
              <div className="mini-widgets left-widgets"></div>
              <div className="mini-widgets right-widgets"></div>
            </div>
            <header className="header-bar">
              <div
                className="branding"
                onClick={(event) =>
                  this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                    event,
                    Constants.ACTION_HOME_PAGE
                  )
                }
              >
                <div id="site-title" className="assistive-text">
                  Jackalope
                </div>
                <div id="site-description" className="assistive-text">
                  WorkComp Comparative Rater
                </div>
                {/* <a className="same-logo" href="/"> */}
                <a>
                  <img
                    className=" preload-me"
                    src="https://myjackalope.com/wp-content/uploads/2020/10/OPT117x77.png"
                    // srcset="https://myjackalope.com/wp-content/uploads/2020/10/OPT117x77.png 117w, https://myjackalope.com/wp-content/uploads/2020/10/OPT117x77.png 117w"
                    width="117"
                    height="77"
                    sizes="117px"
                    alt="Jackalope"
                  />
                </a>
              </div>
              <ul
                id="primary-menu"
                className="main-nav bg-outline-decoration hover-bg-decoration active-bg-decoration gradient-hover outside-item-remove-margin"
                role="menubar"
                style={{ margin: "0px" }}
              >
                <li
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                  id="1"
                  role="presentation"
                >
                  <a
                    data-level="1"
                    onClick={(event) =>
                      this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                        event,
                        Constants.ACTION_HOME_PAGE
                      )
                    }
                    role="menuitem"
                  >
                    <span className="menu-item-text">
                      <span className="menu-text">Home</span>
                    </span>
                  </a>
                </li>

                <li
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-57516 has-children"
                  role="presentation"
                >
                  <a data-level="1" role="menuitem">
                    <span className="menu-item-text">
                      <span className="menu-text">Account Settings</span>
                    </span>
                  </a>
                  <ul
                    className="sub-nav gradient-hover level-arrows-on"
                    role="menubar"
                  >
                    <li
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                      id="1"
                      role="presentation"
                    >
                      <a
                        onClick={(event) =>
                          this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                            event,
                            Constants.ACTION_UPDATE_CREDIT_CARD
                          )
                        }
                        data-level="1"
                        role="menuitem"
                      >
                        <span className="menu-item-text">
                          <span className="menu-text">
                            Update Payment Method
                          </span>
                        </span>
                      </a>
                    </li>
                    <li
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                      id="1"
                      role="presentation"
                    >
                      <a
                        onClick={(event) =>
                          this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                            event,
                            Constants.ACTION_UPDATE_SUBSCRIPTION
                          )
                        }
                        data-level="1"
                        role="menuitem"
                      >
                        <span className="menu-item-text">
                          <span className="menu-text">Update Subscription</span>
                        </span>
                      </a>
                    </li>
                    <li
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                      id="1"
                      role="presentation"
                    >
                      <a
                        onClick={(event) =>
                          this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                            event,
                            Constants.ACTION_REFER_FRIEND
                          )
                        }
                        data-level="1"
                        role="menuitem"
                      >
                        <span className="menu-item-text">
                          <span className="menu-text">Refer A Friend</span>
                        </span>
                      </a>
                    </li>
                    <li
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                      id="1"
                      role="presentation"
                    >
                      <a
                        onClick={(event) =>
                          this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                            event,
                            Constants.ACTION_ADD_USER
                          )
                        }
                        data-level="1"
                        role="menuitem"
                      >
                        <span className="menu-item-text">
                          <span className="menu-text">Add User</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                  id="1"
                  role="presentation"
                >
                  <a
                    href="https://myjackalope.com/contact-us/"
                    data-level="1"
                    role="menuitem"
                    target="_blank"
                  >
                    <span className="menu-item-text">
                      <span className="menu-text">Help</span>
                    </span>
                  </a>
                </li>

                <li
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-57716 has-children"
                  role="presentation"
                >
                  <a data-level="1" role="menuitem">
                    <span className="menu-item-text">
                      <span className="menu-text">
                        {firstName} {lastName}
                      </span>
                    </span>
                  </a>
                  <ul
                    className="sub-nav gradient-hover level-arrows-on"
                    role="menubar"
                  >
                    <li
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-57750 first"
                      role="presentation"
                    >
                      <a
                        data-level="1"
                        role="menuitem"
                        onClick={(event) =>
                          this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                            event,
                            Constants.ACTION_PREVIOUS_SUBMISSIONS
                          )
                        }
                      >
                        <span className="menu-item-text">
                          <span className="menu-text">
                            {/* Amount of Indications: {numberOfRateQuotes} */}
                            Amount of Indications: {amountCount}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-57750 first"
                      role="presentation"
                    >
                      <a
                        data-level="2"
                        role="menuitem"
                        onClick={(event) =>
                          this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                            event,
                            Constants.ACTION_CHANGE_PASSWORD
                          )
                        }
                      >
                        <span className="menu-item-text">
                          <span className="menu-text">Change Password</span>
                        </span>
                      </a>
                    </li>

                    <li
                      className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                      id="1"
                      role="presentation"
                    >
                      <a
                        onClick={(event) =>
                          this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                            event,
                            Constants.ACTION_SIGN_OUT
                          )
                        }
                        data-level="1"
                        role="menuitem"
                      >
                        <span className="menu-item-text">
                          <span className="menu-text">Sign Out</span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518" id="1"
                                    role="presentation">
                                    <a id="rightpanel-menu-button" onClick={this.props.ninjaRaterApp.onRightPanelButtonClick}>
                                        <i className="material-icons" style={{fontSize: "20px"}}>more_vert</i>
                                    </a>
                                </li> */}
              </ul>
            </header>
          </div>
          <div className="dt-mobile-header mobile-menu-show-divider">
            <div className="dt-close-mobile-menu-icon">
              <div className="close-line-wrap">
                <span className="close-line"></span>
                <span className="close-line"></span>
                <span className="close-line"></span>
              </div>
            </div>
            <ul id="mobile-menu" className="mobile-main-nav" role="menubar">
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-57517"
                role="presentation"
              >
                <a
                  data-level="1"
                  onClick={(event) =>
                    this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                      event,
                      Constants.ACTION_HOME_PAGE
                    )
                  }
                  role="menuitem"
                >
                  <span className="menu-item-text">
                    <span className="menu-text">Home</span>
                  </span>
                </a>
              </li>
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-57516 has-children"
                role="presentation"
              >
                <a data-level="1" role="menuitem">
                  <span className="menu-item-text">
                    <span className="menu-text">Account Settings</span>
                  </span>
                </a>
                <ul
                  className="sub-nav gradient-hover level-arrows-on"
                  role="menubar"
                >
                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                    id="1"
                    role="presentation"
                  >
                    <a
                      onClick={(event) =>
                        this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                          event,
                          Constants.ACTION_UPDATE_CREDIT_CARD
                        )
                      }
                      data-level="1"
                      role="menuitem"
                    >
                      <span className="menu-item-text">
                        <span className="menu-text">Update Payment Method</span>
                      </span>
                    </a>
                  </li>
                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                    id="1"
                    role="presentation"
                  >
                    <a
                      onClick={(event) =>
                        this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                          event,
                          Constants.ACTION_UPDATE_SUBSCRIPTION
                        )
                      }
                      data-level="1"
                      role="menuitem"
                    >
                      <span className="menu-item-text">
                        <span className="menu-text">Update Subscription</span>
                      </span>
                    </a>
                  </li>
                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                    id="1"
                    role="presentation"
                  >
                    <a
                      onClick={(event) =>
                        this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                          event,
                          Constants.ACTION_REFER_FRIEND
                        )
                      }
                      data-level="1"
                      role="menuitem"
                    >
                      <span className="menu-item-text">
                        <span className="menu-text">Refer A Friend</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                id="1"
                role="presentation"
              >
                <a
                  onClick={(event) =>
                    this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                      event,
                      Constants.ACTION_ADD_USER
                    )
                  }
                  data-level="1"
                  role="menuitem"
                >
                  <span className="menu-item-text">
                    <span className="menu-text">Add User</span>
                  </span>
                </a>
              </li>
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-57517"
                role="presentation"
              >
                <a
                  href="https://myjackalope.com/contact-us/"
                  data-level="1"
                  role="menuitem"
                  target="_blank"
                >
                  <span className="menu-item-text">
                    <span className="menu-text">Help</span>
                  </span>
                </a>
              </li>
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-57716 has-children"
                role="presentation"
              >
                <a data-level="1" role="menuitem">
                  <span className="menu-item-text">
                    <span className="menu-text">
                      {firstName} {lastName}
                    </span>
                  </span>
                </a>

                <ul
                  className="sub-nav gradient-hover level-arrows-on"
                  role="menubar"
                >
                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                    id="1"
                    role="presentation"
                  >
                    <a
                      data-level="1"
                      role="menuitem"
                      onClick={(event) =>
                        this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                          event,
                          Constants.ACTION_PREVIOUS_SUBMISSIONS
                        )
                      }
                    >
                      <span className="menu-item-text">
                        <span className="menu-text">
                          {/* Amount of Indications: {numberOfRateQuotes} */}
                          Amount of Indications: {amountCount}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li
                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-57750 first"
                    role="presentation"
                  >
                    <a
                      data-level="2"
                      role="menuitem"
                      onClick={(event) =>
                        this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                          event,
                          Constants.ACTION_CHANGE_PASSWORD
                        )
                      }
                    >
                      <span className="menu-item-text">
                        <span className="menu-text">Change Password</span>
                      </span>
                    </a>
                  </li>

                  <li
                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518"
                    id="1"
                    role="presentation"
                  >
                    <a
                      onClick={(event) =>
                        this.props.ninjaRaterApp.NinjaRaterAppStateHandler(
                          event,
                          Constants.ACTION_SIGN_OUT
                        )
                      }
                      data-level="1"
                      role="menuitem"
                    >
                      <span className="menu-item-text">
                        <span className="menu-text">Sign Out</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-57518" id="1"
                                role="presentation">
                                <a id="rightpanel-menu-button" onClick={this.props.ninjaRaterApp.onRightPanelButtonClick}>
                                    <i className="material-icons" style={{fontSize: "20px"}}>more_vert</i>
                                </a>
                            </li> */}
            </ul>
            <div className="mobile-mini-widgets-in-menu"></div>
          </div>
        </div>
        <div id="slider"></div>
      </React.Fragment>
    );
  }
}
NinjaHeader.contextType = NinjaContext;
export default NinjaHeader;

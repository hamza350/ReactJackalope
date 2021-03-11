import React, { Component } from 'react';
import classNames from 'classnames';
import 'nanoscroller';
import * as Constants from '../../Constants';
import {NinjaRaterService} from '../../service/NinjaRaterService';
import MenuUtility from '../shared/MenuUtility'
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from '../shared/Utils';
import UserActivity from '../shared/UserActivity';
import WcirbRangeSearch from './WcirbRangeSearch';
import WcirbRangeSearchResults from './WcirbRangeSearchResults';
import NinjaProgressSpinner from '../shared/NinjaProgressSpinner';
import BusinessUtility from '../shared/BusinessUtility'
import { NinjaContext } from '../shared/Utils';

const utils = new Utils();
const businessUtils = new BusinessUtility();

export class WcirbRange extends React.Component {

  constructor(props) {
      super(props);
      let rowsPerPageOptions = [25, 50, 100];
      this.state = {
        showResults: false,
        businessData: [],
        businessResponse: {},
          csv: {data: [], headers: [ 
                  // { label: "Id", key: "id" },
                  { label: "Name", key: "name" },
                  { label: "Bureau Number", key: "bureauNumber" },
                  // { label: "Ex Mod / Year", key: "exModAndYear" },
                  { label: "ExMod", key: "exMod" },
                  { label: "Year", key: "exModYear" },
                  // { label: "Original Matching Name", key: "originalMatchingName" },
                  { label: "Address", key: "address" }]},
        MenuUtility: new MenuUtility(),
        ninjaRaterApp: this.props.ninjaRaterApp,
        errorResponse: null,
        first: 0, rows: rowsPerPageOptions[0], first2: 0, rows2: rowsPerPageOptions[0], totalRecords: rowsPerPageOptions[0],
        rowsPerPageOptions: rowsPerPageOptions,
        currentResultsPerPage: rowsPerPageOptions[0]
      };
      this.resultsPerPage = this.state.currentResultsPerPage;
      this.showBusinessResults = this.showBusinessResults.bind(this);
      this.hideBusinessResults = this.hideBusinessResults.bind(this);
      this.findBusiness = this.findBusiness.bind(this);
      this.findBusinessError = this.findBusinessError.bind(this);
      this.initializeBusinessResponseData = this.initializeBusinessResponseData.bind(this);
      this.findBusinessEnterKeyPressed = this.findBusinessEnterKeyPressed.bind(this);
      this.findBusinessButtonPressed = this.findBusinessButtonPressed.bind(this);
      this.clearPagingValues = this.clearPagingValues.bind(this);
      this.goNext = this.goNext.bind(this);
      this.goPrevious = this.goPrevious.bind(this);
      this.clearPagingValues = this.clearPagingValues.bind(this);
      this.getLastEmployerId = this.getLastEmployerId.bind(this);
      this.setStreetAddress = this.setStreetAddress.bind(this);
      this.setCity = this.setCity.bind(this);
      this.setZip = this.setZip.bind(this);
      this.getExModSearchInput = this.getExModSearchInput.bind(this);
  }

  componentDidMount() {
    $('#ID_WCIRB_PARTIAL_BUSINESS_NAME').focus();

    let userInfo = this.context.userInfo;
    if(userInfo.subscriber) {
      let allowExModSearch = utils.isNinjaPlanMaster(this.context.authFeatures);
      if(!allowExModSearch) {
        this.turnOffExModSearch(userInfo);
      }
    } else {
      this.turnOffExModSearch(userInfo);
    }
  }

  setStreetAddress(e) {
    let streetAddress = e.value;
    if(!streetAddress) {
      streetAddress = e.currentTarget.value;
    }
    this.setState({ streetAddress: streetAddress });
  }

  setCity(e) {
    let city = e.value;
    if(!city) {
      city = e.currentTarget.value;
    }
    this.setState({ city: city });
  }

  setZip(e) {
    let zip = e.value;
    if(!zip) {
      zip = e.currentTarget.value;
    }
    this.setState({ zip: zip });
  }

  turnOffExModSearch(userInfo) {
    this.setState({ userMustUpgradeNinjaPlan: true });
    let userMsg = userInfo.firstName+', you need be subscribed to "'+Constants.PLAN_NINJA_MASTER_DESC+'" to use this feature!';
    let userMustUpgradeNinjaPlanLink = Constants.ACTION_SUBSCRIBE;
    if(userInfo.subscriber) {
      userMsg = userInfo.firstName+', please upgrade your monthly subscription to "'+Constants.PLAN_NINJA_MASTER_DESC+'" by going to My Ninja Plan to unlock this feature!';
      userMustUpgradeNinjaPlanLink = Constants.ACTION_MY_NINJA_PLAN;
    }
    this.setState({ userMustUpgradeNinjaPlanMessage: userMsg });
    this.setState({ userMustUpgradeNinjaPlanLink: userMustUpgradeNinjaPlanLink });
  }

  showBusinessResults(data, status, response) {
    this.InProgress(false);
    this.setState({showResults: true});
    this.setState({pageErrorMessage: null});
    $('#ID_WCIRB_SUMMARY').show();
    this.initializeBusinessResponseData(data);
  }

  hideBusinessResults() {
    $('#ID_WCIRB_SUMMARY').hide();
    this.InProgress(true);
    this.setState({showResults: false});
    this.setState({pageErrorMessage: null});
  }

  findBusinessEnterKeyPressed(e) {
    e = e || window.event;
    if (e.key === 'Enter') //enter key pressed
    {
      if(this.state.userMustUpgradeNinjaPlan) {
        return;
      }
      this.clearPagingValues();
      this.findBusiness(e, null, null);
    }
  }

  findBusinessButtonPressed(e) {
    if(this.state.userMustUpgradeNinjaPlan) {
      return;
    }
    this.clearPagingValues();
    this.findBusiness(e, null, null);
  }

  goNext(e) {
    let lastEmployerId = this.getLastEmployerId(Constants.DIRECTION_NEXT);
    //alert('lastEmployerId: ' + lastEmployerId);
    this.setState({lastEmployerId: lastEmployerId});
    this.setState({pagingDirection: Constants.DIRECTION_NEXT});
    this.findBusiness(e, lastEmployerId, Constants.DIRECTION_NEXT);
  }

  goPrevious(e) {
    let lastEmployerId = this.getLastEmployerId(Constants.DIRECTION_PREVIOUS);
    //alert('lastEmployerId: ' + lastEmployerId);
    this.setState({lastEmployerId: lastEmployerId});
    this.setState({pagingDirection: Constants.DIRECTION_PREVIOUS});
    this.findBusiness(e, lastEmployerId, Constants.DIRECTION_PREVIOUS);
  }

  getLastEmployerId(pagingDirection) {
    // let lastEmployerId = null;
    // if(this.state.businessData && this.state.businessData.length > 0) {
    //   if(pagingDirection === Constants.DIRECTION_NEXT) {
    //     lastEmployerId = this.state.businessData[this.state.businessData.length - 1].id;
    //   }
    //   if(pagingDirection === Constants.DIRECTION_PREVIOUS) {
    //     lastEmployerId = this.state.businessData[0].id;
    //   }
    //   //lastEmployerId = this.state.businessData[this.state.businessData.length - 1].id;
    // }

    let lastEmployerId = this.state.businessData[0].id;
    for(let i = 1; i < this.state.businessData.length; ++i) {
      let id = this.state.businessData[i].id;
      if(lastEmployerId > id) {
        lastEmployerId = id;
      }
    }

    return lastEmployerId;
  }

  clearPagingValues() {
    this.setState({lastEmployerId: null});
    this.setState({pagingDirection: null});
  }

  findBusiness(event, lastEmployerId, pagingDirection) {
    this.setState({showResults: false});
    this.setState({pageErrorMessage: null});

    let wcirbFindBusinessInput = this.getExModSearchInput();

    // if((!wcirbFindBusinessInput.bureauNumber || wcirbFindBusinessInput.bureauNumber.trim() == '') &&
    //   (!wcirbFindBusinessInput.streetAddress || wcirbFindBusinessInput.streetAddress.trim() == '') &&
    //   (!wcirbFindBusinessInput.city || wcirbFindBusinessInput.city.trim() == '') &&
    //   (!wcirbFindBusinessInput.zipCode || wcirbFindBusinessInput.zipCode.trim() == '')) {
    //     if(!wcirbFindBusinessInput.businessPartialName || wcirbFindBusinessInput.businessPartialName.length < 3) {
    //       this.setState({pageErrorMessage: 'Business Name must be at least 3 characters long'});
    //       $('#ID_WCIRB_PARTIAL_BUSINESS_NAME').focus();
    //       $('#ID_WCIRB_PARTIAL_BUSINESS_NAME').select();
    //       return;
    //     }
    //   }

    wcirbFindBusinessInput.lastEmployerId = lastEmployerId;
    wcirbFindBusinessInput.pagingDirection = pagingDirection;

    let url = utils.getServicesUrl() + '/findWcirbRangeGroupedByBureauNumber';
    this.hideBusinessResults();
    utils.ajaxRequest('POST', url, this.showBusinessResults, this.findBusinessError, wcirbFindBusinessInput, true);
  }

  getExModSearchInput() {

    let exModRangeFrom = this.refs.WcirbRangeSearch.getExModRangeFrom();
    let exModRangeTo = this.refs.WcirbRangeSearch.getExModRangeTo();
    let selectedNinjaClasses = this.refs.WcirbRangeSearch.getSelectedNinjaClasses();
    let selectedCounties = this.refs.WcirbRangeSearch.getSelectedCounties();
    let wcirbFindBusinessInput = {
        resultsPerPage: this.resultsPerPage,
        exModLower: exModRangeFrom, exModUpper: exModRangeTo, 
        groupByBureauNumber: true, selectedNinjaClasses: selectedNinjaClasses, 
        selectedCounties: selectedCounties, city: this.state.city, zipCode: this.state.zip
    };
    //alert(JSON.stringify(wcirbFindBusinessInput));
    return wcirbFindBusinessInput;
  }

  findBusinessError(jqXHR, exception) {
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({pageErrorMessage: errorResponse});

    this.InProgress(false);
  }

  initializeBusinessResponseData(response) {
    response = JSON.parse(response);
    let totalRecords = response.totalRecords;
    let businessData = businessUtils.parseWcirbRangeBusinessSearchResults(response);
    let resultsPerPage = response.resultsPerPage;
    this.setState({ businessData: businessData });
    this.setState({ businessResponse: response });
    let disablePaging = false;
    //if(resultsPerPage && resultsPerPage > businessData.length) {
    if(businessData.length == 0) {
      disablePaging = true;
    }
    this.setState({ disablePaging: disablePaging });

    this.refs.businessSummary.setWcirbBusinessData(totalRecords, businessData, response,
      this.state.rowsPerPageOptions, this.state.businessPartialName);
  }

  InProgress(InProgress) {
    if(InProgress) {
      $('#ID_WCIRB_BUSINESS_SEARCH').find('input, textarea, button, select, span').prop('disabled',true);
      $('#ID_NINJA_SPINNER_IN_PROGRESS').show();
    } else {
      $('#ID_WCIRB_BUSINESS_SEARCH').find('input, textarea, button, select, span').prop('disabled',false);
      $('#ID_NINJA_SPINNER_IN_PROGRESS').hide();
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

        return (
          <div className="ui-g-12">

              { this.state.userMustUpgradeNinjaPlanMessage &&
                (<div className="ui-g-12 no-padding" style={{textAlign: 'center', width: '100%'}}>
                     <a style={subscribeLinkStyle.css} onClick={(event) => this.state.ninjaRaterApp.NinjaRaterAppStateHandler(event, this.state.userMustUpgradeNinjaPlanLink)}>
                         <i style={{verticalAlign: '-23%'}} className="topbar-icon material-icons">star_half</i>
                         <span className="text">{this.state.userMustUpgradeNinjaPlanMessage}</span>
                     </a>
                </div>)
              }

              <WcirbRangeSearch parentComponent={this} ref="WcirbRangeSearch" />

              <div className="ui-g-12 no-padding" id="ID_WCIRB_ERROR"
                style={{display: this.state.pageErrorMessage ? 'block' : 'none'}}>
                <div style={{color: 'red', fontSize: '1.5em', textAlign: 'center'}}>
                  <br/>
                  {this.state.pageErrorMessage}
                </div>
              </div>

              {this.state.showResults && (
                <div className="ui-g-12 no-padding">
                  <div className="ui-g-12 no-padding" id="ID_WCIRB_SUMMARY" style={{display: 'none'}}>
                    <WcirbRangeSearchResults ref="businessSummary" parentComponent={this}
                    first={this.state.first} rows={this.state.rows} first2={this.state.first2}
                    rows2={this.state.rows2} totalRecords={this.state.totalRecords}
                    rowsPerPageOptions={this.state.rowsPerPageOptions}
                    businessResponse={this.state.businessResponse} businessData={this.state.businessData} />
                  </div>
                </div>
              )}

          </div>
        );
    }
}

WcirbRange.propTypes = {};
WcirbRange.contextType = NinjaContext;
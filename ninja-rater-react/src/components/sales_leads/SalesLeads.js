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
import SalesLeadsSearch from './SalesLeadsSearch';
import SalesLeadsSearchResults from './SalesLeadsSearchResults';
import BusinessUtility from '../shared/BusinessUtility';
import { NinjaContext } from '../shared/Utils';

const utils = new Utils();
const businessUtils = new BusinessUtility();

export class SalesLeads extends React.Component {

  constructor(props) {
      super(props);
      let rowsPerPageOptions = [25, 50, 100];
      this.cslbLicenseNumberMax = 0;
      this.cslbLicenseNumberMin = 1000000000;
      this.state = {
        showResults: false,
        businessData: [],
        businessResponse: {},
        csv: {data: [], headers: [ 
          { label: "Name", key: "name" },
          { label: "License #", key: "cslbLicenseNumber" },
          { label: "Issued On", key: "issuedOn" },
          { label: "Expires On", key: "expiresOn" },
          { label: "Phone", key: "phone" },
          { label: "Address", key: "address" }]},
        MenuUtility: new MenuUtility(),
        ninjaRaterApp: this.props.ninjaRaterApp,
        errorResponse: null,
        bureauNumber: null,
        expiredBefore: null,
        cslbLicenseExpireDateFrom: null,
        cslbLicenseExpireDateTo: null,
        cslb_WC_ExpireDateFrom: null,
        cslb_WC_ExpireDateTo: null,
        hasWcPolicy: null,
        first: 0, rows: rowsPerPageOptions[0], first2: 0, rows2: rowsPerPageOptions[0], totalRecords: rowsPerPageOptions[0],
        rowsPerPageOptions: rowsPerPageOptions,
        currentResultsPerPage: rowsPerPageOptions[0]
      };
      this.resultsPerPage = this.state.currentResultsPerPage
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
      this.setBureauNumber = this.setBureauNumber.bind(this);
      this.setStreetAddress = this.setStreetAddress.bind(this);
      this.setCity = this.setCity.bind(this);
      this.setZip = this.setZip.bind(this);
  }

  componentDidMount() {
    $('#ID_SalesLeads_PARTIAL_BUSINESS_NAME').focus();

    let userInfo = this.context.userInfo;
    if(userInfo.subscriber) {
      let allowExModSearch = utils.isNinjaPlanMaster(this.context.authFeatures);
      if(!allowExModSearch) {
        this.turnOffExModSearch(userInfo);
      }
    } else {
      this.turnOffExModSearch(userInfo);
    }

    this.fetchCslbInsurers();
  }

  fetchCslbInsurers = () => {
    let url = utils.getServicesUrl() + '/fetchCslbInsurers';
    utils.ajaxRequest('POST', url, this.getCslbInsurersSuccess, this.getCslbInsurersError);
  }

  getCslbInsurersSuccess = (cslbInsurers, status, response) => {
    try {
      this.setState({ cslbInsurers: JSON.parse(cslbInsurers) });
    } catch(e) { }
  }

  getCslbInsurersError = (jqXHR, exception) => {
    const errorResponse = utils.parseResponseError(jqXHR, exception);
    console.log(errorResponse);
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
    this.initializeBusinessResponseData(data);
  }

  hideBusinessResults() {
    this.InProgress(true);
    this.setState({showResults: false});
    this.setState({pageErrorMessage: null});
  }

  InProgress = (InProgress) => {
    if(InProgress) {
      $('#ID_NINJA_SPINNER_IN_PROGRESS').show();
      this.setState({showResults: false});
      this.refs.SalesLeadsSearch.enableOrDisableALL_UI_CONTROLLS(true);
    } else {
      $('#ID_NINJA_SPINNER_IN_PROGRESS').hide();
      this.setState({showResults: true});
      this.refs.SalesLeadsSearch.enableOrDisableALL_UI_CONTROLLS(false);
    }
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
    this.setState({pagingDirection: Constants.DIRECTION_NEXT});
    this.findBusiness(e, Constants.DIRECTION_NEXT);
  }

  goPrevious(e) {
    this.setState({pagingDirection: Constants.DIRECTION_PREVIOUS});
    this.findBusiness(e, Constants.DIRECTION_PREVIOUS);
  }

  clearPagingValues() {
    this.setState({pagingDirection: null});
  }

  findBusiness(event, pagingDirection) {
    this.setState({showResults: false});
    this.setState({pageErrorMessage: null});

    this.salesLeadsInput = this.refs.SalesLeadsSearch.getSalesLeadsInput();
    const isValidInput = this.validateContractorsInput(this.salesLeadsInput);
    if(!isValidInput) {
      return;
    }

    //alert(JSON.stringify(salesLeadsInput));

    this.salesLeadsInput.pagingDirection = pagingDirection;

    let url = utils.getServicesUrl() + '/findSalesLeads';
    this.hideBusinessResults();
    utils.ajaxRequest('POST', url, this.showBusinessResults, this.findBusinessError, this.salesLeadsInput, true);
  }

  validateContractorsInput = (salesLeadsInput) => {
    if((!salesLeadsInput.businessPartialName || salesLeadsInput.businessPartialName.trim() == '') && 
      (!salesLeadsInput.city || salesLeadsInput.city.trim() == '') &&
      (!salesLeadsInput.zipCode || salesLeadsInput.zipCode.trim() == '') &&
      (!salesLeadsInput.selectedCslbClassifications || salesLeadsInput.selectedCslbClassifications.length == 0) &&
      (!salesLeadsInput.selectedCounties || salesLeadsInput.selectedCounties.length == 0) &&
      (!salesLeadsInput.cslbLicenseExpireDateFrom || salesLeadsInput.cslbLicenseExpireDateFrom.trim() == '') &&
      (!salesLeadsInput.cslbLicenseExpireDateTo || salesLeadsInput.cslbLicenseExpireDateTo.trim() == '') &&
      (!salesLeadsInput.cslb_WC_ExpireDateFrom || salesLeadsInput.cslb_WC_ExpireDateFrom.trim() == '') &&
      (!salesLeadsInput.cslb_WC_ExpireDateTo || salesLeadsInput.cslb_WC_ExpireDateTo.trim() == '') && 
      (!salesLeadsInput.cslbLicenseNumber || salesLeadsInput.cslbLicenseNumber.trim() == '') && 
      (!salesLeadsInput.hasWcPolicy || salesLeadsInput.hasWcPolicy == false)
    ) {
      this.setState({pageErrorMessage: 'Please specify at least one search criteria'});
      return false;
    }

    if((salesLeadsInput.businessPartialName && salesLeadsInput.businessPartialName.trim().length < 3)) {
      this.setState({pageErrorMessage: 'Business Name "' + salesLeadsInput.businessPartialName.trim() + '" must be at least 3 characters long, if specified.'});
      return false;
    }

    if((salesLeadsInput.city && salesLeadsInput.city.trim().length < 3)) {
      this.setState({pageErrorMessage: 'City "' + salesLeadsInput.city.trim() + '" must be at least 3 characters long, if specified.'});
      return false;
    }

    if((salesLeadsInput.zipCode && salesLeadsInput.zipCode.trim().length < 3)) {
      this.setState({pageErrorMessage: 'Zip Code "' + salesLeadsInput.zipCode.trim() + '" must be at least 3 characters long, if specified.'});
      return false;
    }

    if((salesLeadsInput.zipCode && salesLeadsInput.zipCode.trim().length < 3)) {
      this.setState({pageErrorMessage: 'Zip Code "' + salesLeadsInput.zipCode.trim() + '" must be at least 3 characters long, if specified.'});
      return false;
    }

    return true;
  }

  findBusinessError(jqXHR, exception) {
    this.InProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({pageErrorMessage: errorResponse});
  }

  initializeBusinessResponseData(response) {
    response = JSON.parse(response);
    let totalRecords = response.totalRecords;
    let listOfSalesLeads = response.listOfSalesLeads;
    let businessData = listOfSalesLeads.map( (item, i) => { //Assign Insurance Company by ins comp code for each business.
      //const currentlyWith = this.state.cslbInsurers[item.workCompPolicyInsuranceCompanyCode];
      const business = {
        // count: i+1,
        cslbLicenseNumber: item.cslbLicenseNumber,
        cslbLicenseOriginalIssueDate: item.cslbLicenseOriginalIssueDate,
        cslbLicenseExpirationDate: item.cslbLicenseExpirationDate,
        name: this.matchingBusinessName(item.businessName1, item.businessName2),
        address: item.address1 +', '+item.city+', '+item.state+' '+item.zipCode,
        phone: utils.formatPhone(item.phoneNumber),
        //currentlyWith: currentlyWith ? currentlyWith.cslbInsurerDesc : item.workCompPolicyInsuranceCompanyCode
      };
      return business;
    });

    //sort by name
    businessData.sort(function(a,b){
      if(a.name < b.name)
          return -1;
      if(a.name > b.name)
          return 1;
      return 0;
    });
    businessData = businessData.map( (business, i) => { 
      business.count = i+1;
      return business;
    });


    this.cslbLicenseNumberMax = 0;
    this.cslbLicenseNumberMin = 1000000000;
    this.findMaxMinCslbLicenseNumbers(businessData);


    this.setState({ businessData: businessData });
    this.setState({ businessResponse: response });
    let disablePaging = false;

    if(businessData.length == 0) {
      disablePaging = true;
    }
    //let resultsPerPage = response.resultsPerPage;
    //if(resultsPerPage && resultsPerPage > businessData.length) {

    this.setState({ disablePaging: disablePaging });

    this.refs.businessSummary.setSalesLeadsBusinessData(totalRecords, businessData, response,
      this.state.rowsPerPageOptions, this.state.businessPartialName);
  }

  findMaxMinCslbLicenseNumbers = (businessData) => {
    for(let i = 0; i < businessData.length; ++i) {
      if(businessData[i].cslbLicenseNumber > this.cslbLicenseNumberMax) {
        this.cslbLicenseNumberMax = businessData[i].cslbLicenseNumber;
      }
      if(businessData[i].cslbLicenseNumber < this.cslbLicenseNumberMin) {
        this.cslbLicenseNumberMin = businessData[i].cslbLicenseNumber;
      }
    }
  }

  matchingBusinessName = (businessName1, businessName2) => {
    let partialBusinessName = this.salesLeadsInput.businessPartialName;
    if(!partialBusinessName || partialBusinessName.trim().length == 0) {
      if(businessName1 && businessName1.trim() != '') 
          return businessName1;
      else if(businessName2 && businessName2.trim() != '') 
          return businessName2;
      else
          return '';
    }
      
    partialBusinessName = partialBusinessName.toLowerCase();
    if(businessName1 && businessName1.trim().length > 0) {
      if(businessName1.toLowerCase().indexOf(partialBusinessName) != -1)
          return businessName1;
    }

    if(businessName2 && businessName2.trim().length > 0) {
      if(businessName2.toLowerCase().indexOf(partialBusinessName) != -1)
          return businessName2;
    }
    if(businessName1 && businessName1.trim() != '') 
      return businessName1;
    if(businessName2 && businessName2.trim() != '') 
      return businessName2;

    return '';
  }

  setBureauNumber(e) {
    let bureauNumber = e.value;
    if(!bureauNumber) {
      bureauNumber = e.currentTarget.value;
    }
    this.setState({ bureauNumber: bureauNumber });
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

              <SalesLeadsSearch parentComponent={this} ref="SalesLeadsSearch" />

              <div className="ui-g-12 no-padding" id="ID_SalesLeads_ERROR"
                style={{display: this.state.pageErrorMessage ? 'block' : 'none'}}>
                <div style={{color: 'red', fontSize: '1.5em', textAlign: 'center'}}>
                  <br/>
                  {this.state.pageErrorMessage}
                </div>
              </div>

              {this.state.showResults && (
                <div className="ui-g-12 no-padding">
                  <div className="ui-g-12 no-padding" id="ID_SalesLeads_SUMMARY">
                    <SalesLeadsSearchResults ref="businessSummary" parentComponent={this}
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

SalesLeads.propTypes = {};
SalesLeads.contextType = NinjaContext;
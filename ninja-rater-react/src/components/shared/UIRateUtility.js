import React, {Component} from 'react';
import * as Constants from '../../Constants';
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from './Utils';
import moment from 'moment';

const utils = new Utils();

export default class UIRateUtility extends Component {

  constructor (props) {
    super(props);
    this.state = {
      RateQuote: this.props.RateQuote
    };
    this.getRatesRequest = this.getRatesRequest.bind(this);
  }

  getRatesRequest() {
    let RateQuote = this.state.RateQuote;
    if (!RateQuote) {
      RateQuote = this.state.refs.RateQuote;
    }
    let policyDate = moment(RateQuote.state.policyDate).format('MM/DD/YYYY');
    let exMod = RateQuote.state.exModValue;
    //exMod = parseFloat(exMod);

    //console.log(Object.keys(this.state.RateQuote.state));

    //Gather Input From Class Code Groups
    let listOfClassCodes = [];
    let numberOfClaims = 0;
    for (let i = 0; i < RateQuote.state.classCodeCombos.length; ++i) {
      let classCodeGroupIDs = RateQuote.state.classCodeCombos[i].forms_ids;
      let classCodeObject = RateQuote.state['classCode_' + classCodeGroupIDs.class_code];
      let subCode = RateQuote.state['subCode_' + classCodeGroupIDs.subcode];
      let sicCodeObject = RateQuote.state['sicCode_' + classCodeGroupIDs.siccode];
      let payroll = RateQuote.state['payroll_' + classCodeGroupIDs.payroll];
      let numberOfEmployees = RateQuote.state['numEmployees_' + classCodeGroupIDs.employees];
      let zipCode = RateQuote.state['zipCode_' + classCodeGroupIDs.zipcode];

      listOfClassCodes.push({
        classCodeObject: classCodeObject, subCode: subCode, sicCodeObject: sicCodeObject, numberOfClaims: numberOfClaims,
        payroll: payroll, numberOfEmployees: numberOfEmployees, zipCode: zipCode, classCodeGroupId: (i + 1)
      });
    }

    let yearsInBusiness = 0;
    let yearsOfCreditHistory = 0;
    let applyFilter = true;
    // let numberOfClaims = 0;

    return {
      policyDate: policyDate, exMod: exMod, applyFilter: applyFilter, yearsInBusiness: yearsInBusiness,
      yearsOfCreditHistory: yearsOfCreditHistory, listOfClassCodes: listOfClassCodes
    };
  }

  render() {
    return (
      <div></div>
    );
  }

}

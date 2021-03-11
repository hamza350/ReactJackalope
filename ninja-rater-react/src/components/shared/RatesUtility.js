import React, {Component} from 'react';
import * as Constants from '../../Constants';
import Utils from './Utils';
import moment from 'moment';
import jQuery from 'jquery';
import $ from 'jquery';
import ReactDOM from 'react-dom';
const utils = new Utils();

export default class RatesUtility extends Component {

  constructor () {
    super();
    this.isRatesRequestValid = this.isRatesRequestValid.bind(this);
  }

  getBackgroundColorByAppetite(appetite) {
    if (appetite == 'Maybe') {
      return Constants.BACKGROUND_YELLOW;
    }
    if (appetite == 'NO') {
      return Constants.BACKGROUND_RED;
    }

    return Constants.BACKGROUND_GREEN;
  }

  getCssClassByAppetite(appetite) {
    if (appetite == 'Maybe') {
      return 'ui-rate-detail-inner-row-background-yellow';
    }
    if (appetite == 'NO') {
      return 'ui-rate-detail-inner-row-background-red';
    }

    return 'ui-rate-detail-inner-row-background-green';
  }

  processRates(responseData) {
    responseData = this.presortRatesResponse(responseData);
    var gridData = [];
    for (var i = 0; i < responseData.length; ++i) {
      var company = responseData[i][1];
      var premium = responseData[i][2];
      var appetite = responseData[i][3];
      var naic = responseData[i][4];
      var filterGroupCode = responseData[i][5];
      gridData.push({company: company, premium: premium, appetite: appetite, naic: naic, filterGroupCode: filterGroupCode});
    }
    return gridData;
  }

  presortRatesResponse(responseData) {
    var appetite_Y = [];
    var appetite_X = [];
    var appetite_N = [];
    var keys = Object.keys(responseData);
    for (var i = 0; i < keys.length; ++i) {
      var naic = keys[i];
      var company = responseData[naic].premiumAppetiteDTOs[0].parent_name;
      var premium = responseData[naic].premiumData.modifiedPremium;
      var premium = '$' + premium.toFixed().replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      });
      //var accept_business = responseData[naic].premiumAppetiteDTOs[0].accept_business.toUpperCase();
      var filterGroupCode = responseData[naic].premiumAppetiteComboDTO.filter_group_code;
      var accept_business = responseData[naic].premiumAppetiteComboDTO.accept_business.toUpperCase();

      if (accept_business == 'Y')
        accept_business = 'YES';
      if (accept_business == 'X')
        accept_business = 'Maybe';
      if (accept_business == 'N')
        accept_business = 'NO';

      //var obj = { company: company, premium: premium, accept_business: accept_business };
      var obj = ["", company, premium, accept_business, naic, filterGroupCode];
      if (accept_business == 'YES')
        appetite_Y.push(obj);
      if (accept_business == 'Maybe')
        appetite_X.push(obj);
      if (accept_business == 'NO')
        appetite_N.push(obj);
    }

    appetite_Y = appetite_Y.sort(function (a, b) {
      var premium_a = parseInt(a[2].replace(/[^\d]/g, ''));
      var premium_b = parseInt(b[2].replace(/[^\d]/g, ''));
      if (premium_a < premium_b)
        return -1;
      if (premium_a > premium_b)
        return 1;
      return 0;
    });
    appetite_X = appetite_X.sort(function (a, b) {
      var premium_a = parseInt(a[2].replace(/[^\d]/g, ''));
      var premium_b = parseInt(b[2].replace(/[^\d]/g, ''));
      if (premium_a < premium_b)
        return -1;
      if (premium_a > premium_b)
        return 1;
      return 0;
    });
    appetite_N = appetite_N.sort(function (a, b) {
      var premium_a = parseInt(a[2].replace(/[^\d]/g, ''));
      var premium_b = parseInt(b[2].replace(/[^\d]/g, ''));
      if (premium_a < premium_b)
        return -1;
      if (premium_a > premium_b)
        return 1;
      return 0;
    });

    var presortedData = [];
    for (var i = 0; i < appetite_Y.length; ++i)
      presortedData.push(appetite_Y[i]);
    for (var i = 0; i < appetite_X.length; ++i)
      presortedData.push(appetite_X[i]);
    for (var i = 0; i < appetite_N.length; ++i)
      presortedData.push(appetite_N[i]);

    return presortedData;
  }

  flattenClassCodes(classCodes) {
    const classCodeKeys = Object.keys(classCodes);
    let flatClassCodes = [];
    for (let i = 0; i < classCodeKeys.length; i++) {
      let classCodeObj = classCodes[classCodeKeys[i]];
      let classCode = classCodeObj.class_code;
      let subCode = classCodeObj.class_sub_code;
      let description = classCodeObj.description;
      let longDescription = classCode + (subCode == null ? null : '-' + subCode) + ' ' + description;
      flatClassCodes.push(
        {classCode: classCode, subCode: subCode, longDescription: longDescription, original: classCodeObj});
    }
    return flatClassCodes;
  }

  groupSubCodesByClassCode(classCodes) {
    const classCodeKeys = Object.keys(classCodes);
    let subCodesGroupedByClassCode = {};
    for (let i = 0; i < classCodeKeys.length; i++) {
      let classCodeObj = classCodes[classCodeKeys[i]];
      let classCode = classCodeObj.class_code;
      let subCode = classCodeObj.class_sub_code;
      if (subCode) {
        if (!subCodesGroupedByClassCode[classCode]) {
          subCodesGroupedByClassCode[classCode] = [];
        }
        subCodesGroupedByClassCode[classCode].push(subCode);
      }
    }
    subCodesGroupedByClassCode = this.sortSubCodes(subCodesGroupedByClassCode);
    return subCodesGroupedByClassCode;
  }

  sortSubCodes(subCodesGroupedByClassCode) {
    const classCodeKeys = Object.keys(subCodesGroupedByClassCode);
    for (let i = 0; i < classCodeKeys.length; ++i) {
      let classCode = classCodeKeys[i];
      let subCodeArray = subCodesGroupedByClassCode[classCode];
      subCodeArray = this.sortArray(subCodeArray);
    }
    return subCodesGroupedByClassCode;
  }

  getSubCodesForClassCode(classCodes, classCode, subCodesGroupedByClassCode) {
    for (let i = 0; i < classCodes.length; ++i) {
      let classCodeObj = classCodes[i];
      if (classCodeObj.classCode == classCode) {
        let subCodeArray = subCodesGroupedByClassCode[classCode];
        if (!subCodeArray)
          continue;
        let subCodeOptions = [];
        for (let j = 0; j < subCodeArray.length; ++j) {
          subCodeOptions.push({label: subCodeArray[j], value: {id: {j}, name: subCodeArray[j], code: subCodeArray[j]}});
        }
        return subCodeOptions;
      }
    }
    return null;
  }

  flattenSicCodes(classCodes) {
    const classCodeKeys = Object.keys(classCodes);
    let flatSicCodes = [];
    for (let i = 0; i < classCodeKeys.length; i++) {
      let sicCodeObj = classCodes[classCodeKeys[i]][0];
      let sicCode = sicCodeObj.sic_code;
      let description = sicCodeObj.sic_code_desc;
      let longDescription = sicCode + ' ' + description;
      flatSicCodes.push(
        {sicCode: sicCode, longDescription: longDescription, original: sicCodeObj});
    }
    return flatSicCodes;
  }

  logQuoteHistory(ratesRequest) {
    if (ratesRequest) {
      let data = {
        startDate: ratesRequest.policyDate,
        combo: ratesRequest.combo,
        exModFactor: ratesRequest.exModFactor + '', //convert to string
        zipCode: ratesRequest.zipCode + '', //convert to string
        yrsInB: ratesRequest.yearsInBusiness + '', //convert to string
        yrsCredHist: ratesRequest.yearsOfCreditHistory + '', //convert to string
        applyFilter: ratesRequest.applyFilter + '', //convert to string
        numOfClaims: ratesRequest.numberOfClaims + '', //convert to string
        numOfEmpl: ratesRequest.numberOfEmployees, //integer
        logQuote: 'true',
        callback: 'JSON_CALLBACK',
        insuredName: ratesRequest.insuredName
      };
      let url = utils.getServicesUrl() + '/logQuoteHistory';
      utils.ajaxRequest('POST', url, utils.successResponse, utils.errorResponse, data);
    }
  }

  addRecentQuote(ninjaRaterApp, ratesRequest) {
    if (ninjaRaterApp && ninjaRaterApp.state && ratesRequest) {
      let recentQuotesMenu = ninjaRaterApp.state.recentQuotesMenu;
      if (recentQuotesMenu) {
        let today = moment();
        if (recentQuotesMenu && recentQuotesMenu.length > 0) {
          let mostRecentDate = recentQuotesMenu[0].momentDate;
          let quoteMenuRow = recentQuotesMenu[0];
          if (today.format('MM/DD/YYYY') != mostRecentDate.format('MM/DD/YYYY')) { //not the same day
            quoteMenuRow = this.createRecentQuoteMenuRow(today, 1, ninjaRaterApp); //create new row
          } else {
            quoteMenuRow.badge = quoteMenuRow.items.length + 1;
          }
          this.addRecentQuoteToMenuRow(quoteMenuRow, ratesRequest.combo, ninjaRaterApp);

        } else { // Menu is empty. Create first row
          let quoteMenuRow = this.createRecentQuoteMenuRow(today, 1);
          this.addRecentQuoteToMenuRow(quoteMenuRow, ratesRequest.combo, ninjaRaterApp);
          recentQuotesMenu = [quoteMenuRow];
        }

        ninjaRaterApp.setState({recentQuotesMenu: recentQuotesMenu});
      }
    }
  }

  addRecentQuoteToMenuRow(quoteMenuRow, requestCombo, ninjaRaterApp) {
    let classCodeGroups = requestCombo.split(';');
    let toolTipTxtArray = [];
    let ccTxt = '[';
    for (let i = 0; i < classCodeGroups.length; ++i) {
      let ccGrp = classCodeGroups[i];
      if (ccGrp.trim().length == 0) {
        continue;
      }
      let recentQuote = this.parseRecentQuote(ccGrp + ';');
      let ccDesc = recentQuote.classCode;
      try { //get classcode desc
        let mapOfClassCodes = ninjaRaterApp.state.mapOfClassCodes;
        let subCode = recentQuote.subCode ? recentQuote.subCode : 'null';
        let key = recentQuote.classCode + '-' + subCode;
        let desc = mapOfClassCodes[key] ? mapOfClassCodes[key].description : null;
        if (desc) {
          ccDesc = desc;
        } else {
          ccDesc = `Class Code: ${ccDesc}`;
        }
      } catch (e) { }
      toolTipTxtArray.push(`${ccDesc}, Payroll: $${utils.formatNumber(recentQuote.payroll)},
        # Emp: ${recentQuote.numberOfEmployees}, Zip: ${recentQuote.zipCode}`);
      ccTxt += recentQuote.classCode;
      if ((i + 1) < classCodeGroups.length) {
        ccTxt += ' ';
      }
    }
    ccTxt = ccTxt.trim();
    ccTxt += ']';

    let toolTipTxt = '[' + toolTipTxtArray.join('] - [') + ']';
    quoteMenuRow.items.unshift({
      label: 'Class Codes ' + ccTxt, icon: 'edit', toolTipText: <span>{toolTipTxt}</span>,
      command: (event) => {this.onRecentQuoteClick(event, requestCombo, ninjaRaterApp)}
    }); //insert as first element in array
  }

  createRecentQuoteMenuRow(momentDate, numberOfQuotes) {
    let date = momentDate.format('MMM D, YYYY');
    let quoteMenuRow = {
      label: date, icon: 'flag', momentDate: momentDate,
      badge: numberOfQuotes, badgeStyleClass: 'teal-badge', items: []
    };
    return quoteMenuRow;
  }

  onRecentQuoteClick(event, requestCombo, ninjaRaterApp) {
    if (!ninjaRaterApp.refs.Rates) {
      ninjaRaterApp.NinjaRaterAppStateHandler(event, Constants.ACTION_RATES);
    }

    //let RateQuote = ninjaRaterApp.refs.Rates.refs.RateQuote;
    let RateQuote = ninjaRaterApp.state.refs.Rates.state.refs.RateQuote;
    let numberOfClassCodes = RateQuote.state.classCodeCombos.length;
    if (numberOfClassCodes > 1) {
      this.clearClassCodes(event, RateQuote);
    }
    this.setInputForClassCodes(event, RateQuote, requestCombo);
    RateQuote.triggerQuote(event, false);
  }

  onRecentQuoteClickNew(event, RateQuote, requestCombo, ninjaRaterApp) {

    let numberOfClassCodes = RateQuote.state.classCodeCombos.length;
    if (numberOfClassCodes > 1) {
      this.clearClassCodes(event, RateQuote);
    }
    this.setInputForClassCodes(event, RateQuote, requestCombo);
    
    if (RateQuote.state.isHome == true) {
      RateQuote.triggerQuote(event, false);
    }
    if (ninjaRaterApp.refs.Rates) {
      ninjaRaterApp.NinjaRaterAppStateHandler(event, Constants.ACTION_RATES);
    }
    
  }

  setInputForClassCodes(event, RateQuote, requestCombo) {
    let splitCcGroups = requestCombo.split(';');
    for (let i = 0; i < splitCcGroups.length; ++i) {
      if (splitCcGroups[i] && splitCcGroups[i].trim() != '') {
        if (i > 0) {
          RateQuote.addClassCode(event);
        }
        let recentQuote = this.parseRecentQuote(splitCcGroups[i]);

        let id = i + 1;

        let KEY_CLASSCODE = 'ID_CLASSCODE_';
        let KEY_NUM_EMP = 'ID_NUM_EMPLOYEES_INPUT_';
        let KEY_ZIP = 'ID_ZIPCODE_INPUT_';
        let KEY_PAYROLL = 'ID_PAYROLL_INPUT_';

        let classCodeObject = this.findClassCodeObjectByClassCode(RateQuote, recentQuote.classCode);

        // $('#' + KEY_CLASSCODE + id).val(classCodeObject.longDescription);
        // $('#' + KEY_NUM_EMP + id).val(recentQuote.numberOfEmployees);
        // $('#' + KEY_ZIP + id).val(recentQuote.zipCode);
        // $('#' + KEY_PAYROLL + id).val(recentQuote.payroll);

        let zipCodeValue = recentQuote.zipCode;
        try {
          zipCodeValue = parseInt(zipCodeValue);
        } catch (e) { }

        RateQuote.state['classCode_' + KEY_CLASSCODE + id] = classCodeObject;
        RateQuote.state['numEmployees_' + KEY_NUM_EMP + id] = recentQuote.numberOfEmployees;
        RateQuote.state['zipCode_' + KEY_ZIP + id] = zipCodeValue;
        RateQuote.state['payroll_' + KEY_PAYROLL + id] = recentQuote.payroll;

      }
    }
  }

  findClassCodeObjectByClassCode(RateQuote, classCode) {
    for (let i = 0; i < RateQuote.state.ninjaClassData.length; ++i) {
      let classCodeObject = RateQuote.state.ninjaClassData[i];

      if (classCode.includes("-")) {
        if (classCodeObject.classCode + '-' + classCodeObject.subCode === classCode)
          return classCodeObject;
      }
      else {
        if (parseInt(classCodeObject.classCode) === parseInt(classCode) && classCodeObject.subCode === null){
          return classCodeObject;
        }
      }

    }
    return null;
  }

  parseRecentQuote(recentQuoteStr) {
    if (recentQuoteStr && recentQuoteStr.trim() != '') {
      let ccGroup = recentQuoteStr.split(',');
      let classCode = ccGroup[0];
      let payroll = ccGroup[1];
      let sicCode = ccGroup[2];
      let something1 = ccGroup[3]; // ? not sure what it is
      let numberOfEmployees = ccGroup[4];
      let zipCode = ccGroup[5];
      let something2 = ccGroup[6]; // ? not sure what it is
      let subCode = ccGroup[7];
      // let s = 'classCode: '+classCode+'; payroll: '+payroll+'; sicCode: '+sicCode
      //       + '; something1: '+something1+'; something2'+something2
      //       +'; numberOfEmployees='+numberOfEmployees+'; zipCode: '+zipCode+'; subCode: '+subCode;
      // alert(s);
      return {classCode: classCode, payroll: payroll, sicCode: sicCode, numberOfEmployees: numberOfEmployees, zipCode: zipCode, subCode: subCode};
    } else {
      return {};
    }
  }

  clearClassCodes(event, RateQuote) { //except first class code group
    let classCodeCombos = RateQuote.state.classCodeCombos;
    for (let i = (classCodeCombos.length - 1); i > 0; --i) {
      let ccId = classCodeCombos[i].forms_ids.cc;
      RateQuote.removeClassCodeBTN(i, event);
    }
  }

  sortArray(arrayOfValues) {
    arrayOfValues.sort(function (a, b) {
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    });
    return arrayOfValues;
  }

  isRatesRequestValid(ratesRequest, RateQuote, Rates) {
    let isRatesRequestValid = true;
    let errors = [];
    if (!RateQuote) {
      RateQuote = Rates.state.refs.RateQuote;
    }

    //validate Policy Date
    //let POLICY_DATE = $('#ID_POLICY_DATE_INPUT').find(">:first-child");
    let POLICY_DATE = $('#ID_POLICY_DATE_INPUT').find(">:first-child");
    if (!((ratesRequest.policyDate && ratesRequest.policyDate.length > 0)
      && ratesRequest.policyDate.toLowerCase() != 'invalid date')) {
      $(POLICY_DATE).addClass('ui-messages-error');
      isRatesRequestValid = false;
      $(POLICY_DATE).css({'border-color': 'red'});
      errors = utils.addErrorMessage(errors, "Invalid Policy Date");
    } else {
      $(POLICY_DATE).css({'border-color': ''});
    }

    //validate Ex Mod
    let EX_MOD = $('#ID_EXMOD_INPUT').find(">:first-child");
    if (!ratesRequest.exMod) {
      $(EX_MOD).css({'border-color': 'red'});
      isRatesRequestValid = false;
      errors = utils.addErrorMessage(errors, "Invalid ExMod");
    } else {
      $(EX_MOD).css({'border-color': ''});
    }

    //validate required Class Code Group elements
    for (let i = 0; i < ratesRequest.listOfClassCodes.length; ++i) {
      let isValidCCGroup = true;
      let classCodeGroup = ratesRequest.listOfClassCodes[i];
      let forms_ids = RateQuote.state.classCodeCombos[i].forms_ids;

      let CC_AUTOCOMPLETE = $('#' + forms_ids.auto_complete).find(">:first-child");
      let CCGRP = $('#' + forms_ids.cc);
      let classCodeObj = RateQuote.state['classCode_' + forms_ids.class_code];
      if (!classCodeObj) {
        $(CCGRP).css({'border-color': 'red'});
        isRatesRequestValid = false;
        isValidCCGroup = false;
        $(CC_AUTOCOMPLETE).css({'border-color': 'red'});
        errors = utils.addErrorMessage(errors, "Invalid Class Code");
      } else {
        $(CC_AUTOCOMPLETE).css({'border-color': ''});
      }

      let PAYROLL = $('#' + forms_ids.payroll);
      if (!classCodeGroup.payroll) {
        $(PAYROLL).css({'border-color': 'red'});
        isRatesRequestValid = false;
        isValidCCGroup = false;
        errors = utils.addErrorMessage(errors, "Invalid Payroll");
      } else {
        $(PAYROLL).css({'border-color': ''});
      }

      let NUM_EMP = $('#' + forms_ids.employees);
      if (!classCodeGroup.numberOfEmployees) {
        $(NUM_EMP).css({'border-color': 'red'});
        isRatesRequestValid = false;
        isValidCCGroup = false;
        errors = utils.addErrorMessage(errors, "Invalid Number of Employees");
      } else {
        $(NUM_EMP).css({'border-color': ''});
      }

      let ZIP = $('#' + forms_ids.zipcode);
      if (!classCodeGroup.zipCode) {
        $(ZIP).css({'border-color': 'red'});
        isRatesRequestValid = false;
        isValidCCGroup = false;
        errors = utils.addErrorMessage(errors, "Invalid Zipcode");
      } else {
        $(ZIP).css({'border-color': ''});
      }

      if (isValidCCGroup) {
        $(CCGRP).css({'border-color': ''});
      } else {
        $(CCGRP).css({'border-color': 'red'});
      }
    }

    if (errors.length > 0) {
      Rates.setState({pageErrorMessage: errors.join(", ")});
    } else {
      Rates.setState({pageErrorMessage: null});
    }

    return isRatesRequestValid;
  }

  render() {
    return (
      <div></div>
    );
  }

}

import React, {Component} from "react";
import * as Constants from "../../Constants";
import {Base64} from "js-base64";
import jQuery from "jquery";
import $ from "jquery";
import moment from "moment";

//Context API was first introduced in react version 16.3
export const NinjaContext = React.createContext();

export default class Utils extends Component {
  constructor () {
    super();
    this.state = {};

    this.ajaxRequest = this.ajaxRequest.bind(this);
    this.successResponse = this.successResponse.bind(this);
    this.errorResponse = this.errorResponse.bind(this);
    this.parseResponseError = this.parseResponseError.bind(this);
    this.logOut = this.logOut.bind(this);
    this.cleanLineItemMoney = this.cleanLineItemMoney.bind(this);
    this.cleanLineItemKey = this.cleanLineItemKey.bind(this);
    this.addErrorMessage = this.addErrorMessage.bind(this);
    this.formatPartialPhone = this.formatPartialPhone.bind(this);
    this.base64 = this.base64.bind(this);
    this.getUrlParameter = this.getUrlParameter.bind(this);
  }

  getUrlParameter(name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );
    if (results == null) {
      return null;
    } else {
      return decodeURI(results[1]) || 0;
    }
  }

  getServicesUrl() {
    if (Constants.IS_PRODUCTION) {
      return Constants.NINJA_SERVICIES_URL_PROD;
    }
    return Constants.NINJA_SERVICIES_URL_LOCAL;
  }

  make_base_auth(user, password) {
    let tok = user + ":" + password;
    let hash = Base64.encode(tok);
    return "Basic " + hash;
  }

  base64(str) {
    return Base64.encode(str);
  }

  getUserAuthFeatures() {
    return this.getCachedAppData().authFeatures;
  }

  buttonSpinnerInProgress(event, InProgress) {
    try {
      //event.preventDefault();
      let btn = event.currentTarget; //icon="ui-icon-save"
      if (btn) {
        let icon = btn.getElementsByClassName("ui-icon-picture-as-pdf")[0];
        if (icon) {
          if (InProgress) {
            $(icon).removeClass("ui-icon-blur-circular");
            $(icon).addClass("ui-icon-picture-as-pdf");
          } else {
            $(icon).removeClass("ui-icon-picture-as-pdf");
            $(icon).addClass("ui-icon-blur-circular");
          }
        }
      }
    } catch (e) {
      try {
        console.console.log(e);
      } catch (e) { }
    }
  }

  formatValidDateMMDDYYYY_OrNull = (dateStr) => {
    const dateFormat = "MM/DD/YYYY";
    try {
      const momentDate = moment(dateStr);
      if (!momentDate.isValid()) return null;
      const formattedDate = momentDate.format(dateFormat);
      return formattedDate;
    } catch (e) {
      return null;
    }
  };

  getUserNinjaPlan(authFeatures) {
    if (this.isNinjaPlanMaster(authFeatures)) {
      return Constants.PLAN_NINJA_MASTER;
    }
    // if(this.isNinjaPlanWhiteBelt()) {
    //   return Constants.PLAN_WHITE_BELT;
    // }
    return null;
  }

  getUserNinjaPlanDescription(authFeatures) {
    if (this.isNinjaPlanMaster(authFeatures)) {
      return Constants.PLAN_NINJA_MASTER_DESC;
    }
    // if(this.isNinjaPlanWhiteBelt()) {
    //   return Constants.PLAN_WHITE_BELT_DESC;
    // }
    return "";
  }

  getNinjaPlanDescriptionByType(ninjaPlanType) {
    if (
      ninjaPlanType == Constants.PLAN_NINJA_MASTER ||
      ninjaPlanType == Constants.PLAN_NINJA_MASTER_TEST
    ) {
      return Constants.PLAN_NINJA_MASTER_DESC;
    }
    if (
      ninjaPlanType == Constants.PLAN_WHITE_BELT ||
      ninjaPlanType == Constants.PLAN_WHITE_BELT_TEST
    ) {
      return Constants.PLAN_WHITE_BELT_DESC;
    }
    return "";
  }

  // isNinjaPlanWhiteBelt(context) {
  //   return this.containsAuthFeature(Constants.PLAN_WHITE_BELT, context) || this.containsAuthFeature(Constants.PLAN_WHITE_BELT_TEST, context);
  // }

  isNinjaPlanMaster(authFeatures) {
    return (
      this.containsAuthFeature(Constants.PLAN_NINJA_MASTER, authFeatures) ||
      this.containsAuthFeature(Constants.PLAN_NINJA_MASTER_TEST, authFeatures)
    );
  }

  daysLeftForTrialUser(userInfo) {
    if (!userInfo || (!userInfo.trialEnd && !userInfo.trialEndDate)) {
      return 0;
    }
    let daysLeft = 0;
    try {
      let trialEnd = null;

      if (userInfo.trialEndDate) {
        trialEnd = moment(userInfo.trialEndDate);
      } else {
        trialEnd = userInfo.trialEnd;
      }
      daysLeft = trialEnd.diff(moment(), "days") + 2; //include the start AND include today as full day
      return daysLeft > 0 ? daysLeft : 0;
      //let daysLeft = trialEnd.diff(moment(), 'days') + 1; //include the start
      //let daysLeft = trialEnd.diff(moment(), 'days');
    } catch (e) {
      return daysLeft;
    }
  }

  containsAuthFeature(targetAuthFeature, authFeaturesList) {
    for (let i = 0; i < authFeaturesList.length; ++i) {
      let userAuthFeature = authFeaturesList[i];
      if (
        userAuthFeature &&
        userAuthFeature.toLowerCase() === targetAuthFeature.toLowerCase()
      ) {
        return true;
      }
    }
    return false;
  }

  exModToDoublePrecisionIfNumeric(exModStr) {
    if (!exModStr) return "";
    let exMod = "";
    try {
      exMod = parseFloat(exModStr);
      if (isNaN(exMod)) return exModStr;
      exMod = this.formatToDoublePrecision(exMod / 100) + "";
    } catch (e) {
      return exModStr;
    }
    return exMod;
  }

  getExModDataSortedDescending = (EXMOD_DATA) => {
    let sortedExmodData = [];
    for (let i = 0; i < 14; ++i) {
      let exMod = eval("EXMOD_DATA.experienceModification" + (i + 1));
      let exModData = eval("EXMOD_DATA.experienceModificationData" + (i + 1));
      let inceptionOfMod = eval("EXMOD_DATA.inceptionOfModification" + (i + 1));
      let modChangeIndicator = eval(
        "EXMOD_DATA.modificationChangeIndicator" + (i + 1)
      );
      let typeOfExMod = eval(
        "EXMOD_DATA.typeOfExperienceModification" + (i + 1)
      );
      if (
        exMod ||
        exModData ||
        inceptionOfMod ||
        modChangeIndicator ||
        typeOfExMod
      ) {
        if (!inceptionOfMod) {
          try {
            inceptionOfMod = new Date().getFullYear() + "";
            inceptionOfMod = inceptionOfMod.substring(2, 4);
          } catch (e) { }
        }
        sortedExmodData.push({
          exMod: exMod,
          exModData: exModData,
          inceptionOfMod: inceptionOfMod,
          modChangeIndicator: modChangeIndicator,
          typeOfExMod: typeOfExMod,
        });
      }
    }

    // Sort by year in descending order
    sortedExmodData.sort(function (a, b) {
      if (a.inceptionOfMod > b.inceptionOfMod) return -1;
      if (a.inceptionOfMod < b.inceptionOfMod) return 1;
      return 0;
    });

    return sortedExmodData;
  };

  exModStringToDouble = (exModStr) => {
    if (!exModStr) return "";
    let exMod = "";
    try {
      exMod = parseInt(exModStr);
      if (isNaN(exMod)) return "";
      exMod = this.formatToDoublePrecision(exMod / 100) + "";
    } catch (e) {
      return exModStr;
    }
    return exMod;
  };

  isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  createCookie(name, value, days) {
    localStorage[name] = value;
  }

  readCookie(name) {
    return localStorage[name];
  }

  eraseCookie(name) {
    localStorage.removeItem(name);
  }

  eraseAllCookies() {
    this.eraseCookie("token");
  }

  ajaxRequest(
    METHOD,
    URL,
    successCallBack,
    errorCallBack,
    data,
    stringify,
    additionalHeaderParams
  ) {
    let token = this.readCookie("token");
    let headers = {
      user_id: token,
      Authorization: token,
    };

    if (additionalHeaderParams) {
      Object.keys(additionalHeaderParams).forEach(function (key) {
        headers[key] = additionalHeaderParams[key];
      });
    }

    headers["Content-Type"] = "application/json";
    // if(METHOD.toLowerCase().trim() != 'get') {
    //   headers["Content-Type"] = "application/json";
    // }
    data = data ? data : {};

    let ajaxRequest = {
      url: URL,
      type: METHOD,
      headers: headers,
      success: successCallBack,
      error: errorCallBack,
    };
    if (METHOD.toLowerCase().trim() != "get") {
      ajaxRequest.data = stringify ? JSON.stringify(data) : data;
    }
    $.ajax(ajaxRequest);
  }

  successResponse(data, status, response) {
    //alert('Success: ' + JSON.stringify(data));
  }

  errorResponse(jqXHR, exception) {
    let errorResponse = this.parseResponseError(jqXHR, exception);
    alert(errorResponse);
  }

  parseResponseError(jqXHR, exception) {
    let errorMsg = "Error: ";
    if (jqXHR.responseJSON) {
      errorMsg += "[";
      if (jqXHR.status) {
        errorMsg += jqXHR.responseJSON.status;
      }
      if (jqXHR.status && jqXHR.responseJSON.error) {
        errorMsg += " - ";
      }
      if (jqXHR.responseJSON.error) {
        errorMsg += jqXHR.responseJSON.error;
      }
      errorMsg += "] ";

      if (jqXHR.responseJSON.exception) {
        errorMsg += jqXHR.responseJSON.exception + " ";
      }
      if (jqXHR.responseJSON.message) {
        errorMsg += jqXHR.responseJSON.message + " ";
      }
    } else {
      errorMsg += "[" + jqXHR.status + "] - " + jqXHR.responseText;
    }

    /*errorMsg += '\n';
    if(jqXHR.status) {
      errorMsg += exception+': ['+jqXHR.status+'] ';
      if(jqXHR.statusText) {
        errorMsg += jqXHR.statusText;
      }
    }*/

    return errorMsg;
  }

  filterNonNumeric(val) {
    if (val && val != "") return val.replace(/\D/g, ""); // strip non-numeric characters from string
    return val;
  }

  formatToDoublePrecision(amount) {
    if (!amount) {
      return "";
    }
    if (this.isNumber(amount)) {
      amount = parseFloat(amount);
    }
    if (amount == 0) {
      return 0;
    }
    return amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  formatMoney(amount) {
    return this.formatToDoublePrecision(amount);
  }

  formatNumber(num) {
    if (!num) {
      return 0;
    }
    if (this.isNumber(num)) {
      num = parseInt(num);
    }
    if (num == 0) {
      return 0;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  cleanLineItemMoney(val) {
    if (!val) return "";
    let negativeValue = val.indexOf("-") != -1 ? true : false;
    val = (this.formatNumber(this.filterNonNumeric(val)) + "").trim(); //filter non digits
    val = negativeValue ? "-$" + val : "$" + val;
    return val;
  }

  cleanLineItemKey(val) {
    if (!val) return "";
    val = val.trim();

    let idxLeftParenthesis = val.indexOf("(");
    let idxRightParenthesis = val.indexOf(")");
    if (idxLeftParenthesis != -1 && idxRightParenthesis != -1) {
      let before_parenthesis = val.substring(0, idxLeftParenthesis).trim();
      let after_parenthesis = val
        .substring(idxRightParenthesis + 1, val.length)
        .trim();
      let valueBetweenParenthesis = val
        .substring(idxLeftParenthesis + 1, idxRightParenthesis)
        .trim();
      let idxPercent = valueBetweenParenthesis.indexOf("%");
      if (idxPercent != -1) {
        let before = valueBetweenParenthesis.substring(0, idxPercent).trim();
        let after = valueBetweenParenthesis
          .substring(idxPercent, valueBetweenParenthesis.length)
          .trim();
        valueBetweenParenthesis = before + after;
      }
      val =
        before_parenthesis +
        "(" +
        valueBetweenParenthesis +
        ")" +
        after_parenthesis;
      //console.log('cleanLineItemKey: \'' + val + '\'');
    }

    return val;
  }

  formatPhone(phone) {
    if (!phone) {
      return "";
    }
    phone = this.filterNonNumeric(phone) + ""; //filter non digits and convert to string
    phone = phone.trim();
    if (phone.length && phone.length < 1) {
      //most likely not US phone or other
      return phone;
    }
    try {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } catch (e) {
      return phone;
    }
  }

  ratesRequesToUri(ratesRequest) {
    console.log();
    let req = "/rates?startDate=" + ratesRequest.policyDate;
    req += "&combo=" + ratesRequest.combo;
    req +=
      "&exModFactor=" + ratesRequest.exMod + "&zipCode=" + ratesRequest.zipCode;
    req +=
      "&yrsInB=" +
      ratesRequest.yearsInBusiness +
      "&yrsCredHist=" +
      ratesRequest.yearsOfCreditHistory;
    req +=
      "&applyFilter=" +
      ratesRequest.applyFilter +
      "&numOfClaims=" +
      ratesRequest.numberOfClaims;
    req +=
      "&numOfEmpl=" +
      ratesRequest.numberOfEmployees +
      "&logQuote=" +
      ratesRequest.logQuote +
      "&callback=JSON_CALLBACK";

    return req;
  }

  getRatesRequestCombo(ratesRequest) {
    let combo = '';
    let subCode = '';
    for(let i = 0; i < ratesRequest.listOfClassCodes.length; ++i) {
      let classCodeGroup = ratesRequest.listOfClassCodes[i];
      subCode = classCodeGroup.classCodeObject.subCode ? classCodeGroup.classCodeObject.subCode.trim() : '';
      if (subCode != '') {
        subCode = classCodeGroup.classCodeObject.classCode + '-' + classCodeGroup.classCodeObject.subCode;
      }
      else {
        subCode = classCodeGroup.classCodeObject.classCode;
      }

      combo += subCode + ',' + //required
               this.filterNonNumeric(classCodeGroup.payroll) + ',' + //required
               (classCodeGroup.sicCodeObject ? classCodeGroup.sicCodeObject.sicCode : '') + //optional
               ',,' + //? not sure what it's supposed to be
               classCodeGroup.numberOfEmployees + ',' + //required
               classCodeGroup.zipCode + ',' + //required
               (classCodeGroup.subCode ? classCodeGroup.subCode.trim() : '') + ';'; //optional
    }

    return combo;
  }

  logOut() {
    console.log(".....window.......");
    console.log(window.location.href);
    this.eraseAllCookies();
    window.location = window.location.origin + Constants.ACTION_SIGN_IN.url;
  }

  RandomNumberInRange = (min, max) => {
    let randmonNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randmonNumber;
  };

  parseUrl(locationUrl) {
    let url = locationUrl.split("/");
    return url[0];
  }

  mapToArray(map) {
    let arrayFromMap = [];
    if (!map) return arrayFromMap;

    let listOfKeys = Object.keys(map);
    for (let i = 0; i < listOfKeys.length; ++i) {
      let key = listOfKeys[i];
      let value = map[key];
      arrayFromMap.push({key: key, value: value});
    }
    return arrayFromMap;
  }

  getZipCodes(ZipcodeCityCountyCA) {
    let zipCodes = [];
    for (let i = 0; i < ZipcodeCityCountyCA.length; ++i) {
      zipCodes.push(ZipcodeCityCountyCA[i].zipcode);
    }
    return zipCodes;
  }

  getNinjaterInfo() {
    return {
      name: "Myjackalope.com",
      twitter: "https://twitter.com/bigfootbinds",
      email: "sales@myjackalope.com",
    };
  }

  getGoogleApiKey = () => {
    if (Constants.IS_PRODUCTION) return Constants.GOOGLE_API_KEY_PROD;
    else return Constants.GOOGLE_API_KEY_DEV;
  };

  getCurrentTimeStampAsFileNamePrefix = () => {
    const today = moment();
    let todayStr = today.format("MM.DD.YYYY_HH.mm.ss");
    return todayStr;
  };

  getUserAccountSummary = (userInfo, authFeatures) => {
    let joinedDate = null;
    try {
      joinedDate = moment(userInfo.trialStartDate);
    } catch (e) { }

    let trialEnd = null;
    try {
      trialEnd = moment(userInfo.trialEndDate);
    } catch (e) { }

    let subscription = this.getUserNinjaPlanDescription(authFeatures);
    if (!userInfo.subscriber) {
      subscription = "Free Member";
      // try {
      //   let daysLeft = utils.daysLeftForTrialUser(userInfo);
      //   let subscriptionStatus = '';
      //   if(daysLeft > 0)
      //       subscriptionStatus = ' (' + daysLeft + ' Days Left)';
      //   else
      //       subscriptionStatus = ' (Expired)';
      //   subscription += subscriptionStatus;
      // } catch(e) { }
    }

    let lastSeenDate = moment();
    try {
      lastSeenDate = moment(userInfo.lastLoginAt);
    } catch (e) { }

    return {
      joinedDate: joinedDate,
      trialEnd: trialEnd,
      lastSeenDate: lastSeenDate,
      subscription: subscription,
    };
  };

  getPdfNinjaImage() {
    var image = "data:image/png;base64,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";
    return image;
  }

  addErrorMessage(errors, errorMessage) {
    if (!errors) return;
    if (!errorMessage) return;

    let exists = false;
    for (let i = 0; i < errors.length; ++i) {
      if (
        errors[i] &&
        errors[i].trim().toLowerCase() == errorMessage.trim().toLowerCase()
      ) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      errors.push(errorMessage.trim());
    }

    return errors;
  }

  formatPartialPhone(phone) {
    if (!phone || phone.trim().length < 1) return "";
    phone = phone.trim();
    var s = ("" + phone).replace(/\D/g, "");
    var partialFormatted = null;
    switch (s.length) {
      case 1:
        partialFormatted = "(" + s + "xx) xxx-xx-xx";
        break;
      case 2:
        partialFormatted = "(" + s + "x) xxx-xx-xx";
        break;
      case 3:
        partialFormatted = "(" + s + ") " + "xxx-xx-xx";
        break;
      case 4:
        partialFormatted =
          "(" + s.substring(0, 3) + ") " + s.charAt(3) + "xx-xx-xx";
        break;
      case 5:
        partialFormatted =
          "(" + s.substring(0, 3) + ") " + s.substring(3, 5) + "x-xx-xx";
        break;
      case 6:
        partialFormatted =
          "(" + s.substring(0, 3) + ") " + s.substring(3, 6) + "-xx-xx";
        break;
      case 7:
        partialFormatted =
          "(" +
          s.substring(0, 3) +
          ") " +
          s.substring(3, 6) +
          "-" +
          s.charAt(6) +
          "x-xx";
        break;
      case 8:
        partialFormatted =
          "(" +
          s.substring(0, 3) +
          ") " +
          s.substring(3, 6) +
          "-" +
          s.substring(6, 8) +
          "-xx";
        break;
      case 9:
        partialFormatted =
          "(" +
          s.substring(0, 3) +
          ") " +
          s.substring(3, 6) +
          "-" +
          s.substring(6, 8) +
          "-" +
          s.charAt(8) +
          "x";
        break;
      default:
        var m = s.match(/^(\d{3})(\d{3})(\d{4})$/);
        partialFormatted = !m ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
        break;
    }
    return partialFormatted;
  }

  render() {
    return <div></div>;
  }
}

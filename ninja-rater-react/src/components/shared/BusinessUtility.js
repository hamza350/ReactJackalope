import React, { Component } from 'react';
import * as Constants from '../../Constants';
import { Base64 } from 'js-base64';
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from './Utils';

const utils = new Utils();

export default class BusinessUtility extends Component {

  parseWcirbBusinessSearchResults(response, businessPartialName) {
    let businessData = [];
    if(!response || !response.mapGroupedByBureauNumber || response.mapGroupedByBureauNumber.length == 0)
      return businessData;

    let keys = [];
    Object.keys(response.mapGroupedByBureauNumber).map(function(keyName, keyIndex) {
      keys.push(keyName);
    });

    for(let i = 0; i < keys.length; ++i) {
        let bureauNumber = keys[i];
        let listOfBusinesses = response.mapGroupedByBureauNumber[bureauNumber];
        let matchingName = '';
        let address = '';
        for(let j = 0; j < listOfBusinesses.length; j++) {
          let nameOfEmployer = listOfBusinesses[j].employer.nameOfEmployer;
          businessPartialName = 'A';
          //if(nameOfEmployer.toLowerCase().indexOf(businessPartialName.toLowerCase()) != -1) {
            matchingName = listOfBusinesses[j].employer.nameOfEmployer;
            address = this.parseAddress(listOfBusinesses[j].address);
          //}
        }
        let name = '#' + bureauNumber + ' - ' + matchingName;

        let id = listOfBusinesses[0].employer.id;
        let exModAndYear = this.getMostRecentExModAndYear(listOfBusinesses[0].exmod);
        // exModAndYear = exModAndYear.exModYear != '' ?
        //         exModAndYear.exModValue+' / '+exModAndYear.exModYear : exModAndYear.exModYear;

        businessData.push({
          count: (i+1),
          //listOfBusinesses: listOfBusinesses,
          id: id,
          bureauNumber: bureauNumber,
          name: name,
          originalMatchingName: matchingName,
          address: address,
          exMod: exModAndYear.exModValue,
          exModYear: exModAndYear.exModYear,
          // exModAndYear: exModAndYear
        });
    }

    businessData = this.sortBusinessesByEmployerName(businessData);
    //businessData = this.sortBusinessesById(businessData);

    return businessData;
  }


  parseWcirbRangeBusinessSearchResults(response) {
    let businessData = [];
    if(!response || !response.mapGroupedByBureauNumber || response.mapGroupedByBureauNumber.length == 0)
      return businessData;

    let keys = [];
    Object.keys(response.mapGroupedByBureauNumber).map(function(keyName, keyIndex) {
      keys.push(keyName);
    });

    for(let i = 0; i < keys.length; ++i) {
        let bureauNumber = keys[i];
        let listOfBusinesses = response.mapGroupedByBureauNumber[bureauNumber];
        let name = '#' + bureauNumber + ' - ' + listOfBusinesses[0].employer.nameOfEmployer;
        let address = this.parseAddress(listOfBusinesses[0].address);
        let id = listOfBusinesses[0].employer.id;
        let exModAndYear = this.getMostRecentExModAndYear(listOfBusinesses[0].exmod);
        // exModAndYear = exModAndYear.exModYear != '' ?
        //         exModAndYear.exModValue+' / '+exModAndYear.exModYear : exModAndYear.exModYear;

        businessData.push({
          count: (i+1),
          //listOfBusinesses: listOfBusinesses,
          id: id,
          bureauNumber: bureauNumber,
          name: name,
          originalMatchingName: name,
          address: address,
          exMod: exModAndYear.exModValue,
          exModYear: exModAndYear.exModYear,
          // exModAndYear: exModAndYear
        });
    }

    businessData = this.sortBusinessesByEmployerName(businessData);
    //businessData = this.sortBusinessesById(businessData);

    return businessData;
  }

  sortBusinessesByEmployerName(businessData) {
    businessData.sort(function(a,b) {
      let employerName_1 = a.originalMatchingName.trim();
      let employerName_2 = b.originalMatchingName.trim();
      return (employerName_1 > employerName_2) ? 1 : ((employerName_2 > employerName_1) ? -1 : 0);
    });

    //re-do counts after sort
    businessData = this.setCounterValuesForBusinessData(businessData);

    return businessData;
  }

  sortBusinessesById(businessData) {
    businessData.sort(function(a,b) {
      let employerId_1 = a.id;
      let employerId_2 = b.id;
      return (employerId_1 > employerId_2) ? 1 : ((employerId_2 > employerId_1) ? -1 : 0);
    });

    //re-do counts after sort
    businessData = this.setCounterValuesForBusinessData(businessData);

    return businessData;
  }

  setCounterValuesForBusinessData(businessData) {
    let count = 0;
    for(let i = 0; i < businessData.length; ++i) {
      count += 1;
      businessData[i].count = count;
    }
    return businessData;
  }

  parseAddress(address) {
    let strAddress = address.addressOfEmployer + ', ' + address.cityOfEmployer + ', CA, ' + address.zipCode;
    return strAddress;
  }

  getMostRecentExModAndYear(exModData) {
    let mostRecentExmodData = utils.getExModDataSortedDescending(exModData)[0];
    let exModValue = utils.exModStringToDouble(mostRecentExmodData.exMod);
    exModValue = (exModValue != '') ? exModValue : 'DNQ';
    const exModYear = (mostRecentExmodData.inceptionOfMod && mostRecentExmodData.inceptionOfMod.trim() != '') ? 
                      '20'+mostRecentExmodData.inceptionOfMod : new Date().getFullYear();

    const exModAndYear = { exModValue: exModValue, exModYear: exModYear };
    return exModAndYear;
  }

  parseExModAndYear(experienceModification, inceptionOfModification) {
    let exMod = parseFloat(experienceModification) / 100;
    return {exModValue: exMod, exModYear: '20' + inceptionOfModification};
  }

  render() {
      return (
        <div></div>
      );
  }

}

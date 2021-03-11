import React, { Component } from 'react';
import classNames from 'classnames';
import '../../App.css';
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from '../shared/Utils';
import BusinessUtility from '../shared/BusinessUtility';
import {Button} from 'primereact/components/button/Button';
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import NinjaGoogleMaps from '../common/NinjaGoogleMaps';
import NinjaGoogleMapsMarker from '../common/NinjaGoogleMapsMarker';
import Geocode from "react-geocode";
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import {Panel} from 'primereact/components/panel/Panel';
import NinjaProgressSpinnerSmall from '../shared/NinjaProgressSpinnerSmall';
import * as Constants from '../../Constants';
import ExModHistDataTable from './ExModHistDataTable';
import ClassCodeHistDataTable from './ClassCodeHistDataTable';

const utils = new Utils();
const businessUtils = new BusinessUtility();

export default class WcirbRangeExModClassCodeHistory extends React.Component {

  constructor(props) {
      super(props);
      this.tabWidth = '100%';
      this.tabHeight = '450px';
      this.panelHeight = '440px';
      this.state = {
        parentComponent: this.props.parentComponent,
        FETCHING_DETAILS: true,
        data: this.props.data,
        defaultLatitude: 37.773972,
        defaultLongitude: -122.431297,
        defaultAddress: 'San Francisco, CA',
        gmapsLoaded: false
      };
      const API_KEY = utils.getGoogleApiKey();
      Geocode.setApiKey(API_KEY);
      //Geocode.enableDebug();
  }

  componentDidMount() {
    let data = JSON.parse(this.state.data);

    // EMPLOYER NAMES
    // let employerNames = [];
    let employerNames = '';
    let employerAddress = '';
    let employerData = this.props.parentComponent.state.businessResponse.mapGroupedByBureauNumber[data.bureauNumber];
    for(let i = 0; i < employerData.length; ++i) {
      let thisEmployer = employerData[i];
      employerNames += thisEmployer.employer.nameOfEmployer;
      if((i+1) < employerData.length) {
        employerNames += ' / ';
      }
      employerAddress = businessUtils.parseAddress(thisEmployer.address);
    }

    let empName = this.getAllNamesOfEmployer(employerData[0].listOfEmployerNames);
    empName = empName && empName.length > 0 ? empName : employerNames;
    empName = 'Bureau #'+data.bureauNumber + ' - ' + empName;

    // CLASS CODE HISTORY
    let ccHist = data.listOfAssignedClassifications && data.listOfAssignedClassifications.length > 0
            ? data.listOfAssignedClassifications : new Object();
    // if(ccHist.length > 1) {
    //   alert(employerNames);
    // }
    let ccHistCodeDescPairs = [];
    for(let idx = 0; idx < ccHist.length; ++idx) {
      const CC_DATA = ccHist[idx];
      const numCodes = CC_DATA.numberOfClassificationCodes ? CC_DATA.numberOfClassificationCodes : 0;
      for(let i = 0; i < numCodes; ++ i) {
        ccHistCodeDescPairs.push( {
          classificationCode: eval('CC_DATA.classificationCode' + (i+1)),
          classificationDesc: eval('CC_DATA.classificationDescription' + (i+1))
        } );
      }
    }

    // EXMOD HISTORY
    // const bureauData = this.props.parentComponent.state.businessResponse.mapGroupedByBureauNumber[data.bureauNumber];
    // let exModHist = bureauData[0] && bureauData[0].exmod ? bureauData[0].exmod : new Object();
    let exModHist = data.listOfExMods && data.listOfExMods.length > 0 ? data.listOfExMods : new Object();
    let exModHistData = [];
    for(let idx = 0; idx < exModHist.length; ++idx) {
      const EXMOD_DATA = exModHist[idx];
      //let numOfExModRecords = EXMOD_DATA.numberOfRecords ? EXMOD_DATA.numberOfRecords : 0;
      let sortedExmodData = utils.getExModDataSortedDescending(EXMOD_DATA);
      exModHistData = [... sortedExmodData];
    }

    this.setState({ exModHistData: exModHistData, ccHistCodeDescPairs: ccHistCodeDescPairs, empName: empName, defaultAddress: employerAddress, FETCHING_DETAILS: false })

    Geocode.fromAddress(employerAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({defaultLatitude: lat, defaultLongitude: lng, geocodeComplete: true});
      },
      error => {
        console.error(error);
      }
    );
  }

  getAllNamesOfEmployer = (listOfEmployerNames) => {
    if(!listOfEmployerNames || !listOfEmployerNames.length || listOfEmployerNames.length == 0)
      return '';
    const uniqueNames = Array.from(new Set(listOfEmployerNames)).join(' / ');
    return uniqueNames;
  }

  getGoogleMapsMarker = () => {
    let marker = <NinjaGoogleMapsMarker key={this.uniqueKey} lat={this.state.defaultLatitude} 
        lng={this.state.defaultLongitude} text={this.state.defaultAddress} />;
    return marker;
  }

  render() {
    //alert('businessPartialName: '+this.state.parentComponent.state.businessPartialName);
    const fontSize = '2em !important';
    return (
      <div className="ui-g ui-fluid no-padding" style={{width: '100%'}}>
        { this.state.FETCHING_DETAILS && (
          <NinjaProgressSpinnerSmall maxWidth="50px" maxHeight="50px" marginTop="0px" display="block" />
        )}

        { !this.state.FETCHING_DETAILS && (<Panel className="ui-g-12 no-padding" style={{fontSize: fontSize, width: this.tabWidth, height: this.tabHeight}}>
          <div className="ui-g-12 ui-md-5 no-padding">
            <ScrollPanel className="ui-g-12" style={{fontSize: fontSize, width: this.tabWidth, height: this.panelHeight}}>
              <div className="ui-g-12"><font color={Constants.themeColor}><b>{ this.state.empName }</b></font></div>
                <div className="ui-g-12">
                  {this.state.defaultAddress}
                </div>

                { this.state.exModHistData && this.state.exModHistData.length > 0 &&
                  (<div className="ui-g-12 no-padding" style={{fontSize: fontSize, marginTop: '1em'}}><ExModHistDataTable data={this.state.exModHistData} /></div>)}

                { this.state.ccHistCodeDescPairs && this.state.ccHistCodeDescPairs.length > 0 &&
                  (<div className="ui-g-12 no-padding" style={{fontSize: fontSize, marginTop: '1em'}}><ClassCodeHistDataTable data={this.state.ccHistCodeDescPairs} /></div>)}

            </ScrollPanel>
          </div>

          <div className="ui-g-12 ui-md-7 no-padding" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                  { this.state.geocodeComplete && (<NinjaGoogleMaps key={this.uniqueKey} center={{lat: this.state.defaultLatitude, lng: this.state.defaultLongitude}} 
                      markers={[ this.getGoogleMapsMarker() ]} height={this.panelHeight} />) }
          </div>
        </Panel>)}

       </div>
    );}
}

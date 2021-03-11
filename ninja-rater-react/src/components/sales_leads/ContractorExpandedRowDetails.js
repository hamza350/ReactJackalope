import React, { Component } from 'react';
import classNames from 'classnames';
import '../../App.css';
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from '../shared/Utils';
// import BusinessUtility from '../shared/BusinessUtility';
// import {Button} from 'primereact/components/button/Button';
// import {Fieldset} from 'primereact/components/fieldset/Fieldset';
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import {Panel} from 'primereact/components/panel/Panel';
import {TabView, TabPanel} from 'primereact/components/tabview/TabView';
// import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import NinjaProgressSpinnerSmall from '../shared/NinjaProgressSpinnerSmall';
import * as Constants from '../../Constants';
import NinjaGoogleMaps from '../common/NinjaGoogleMaps';
import NinjaGoogleMapsMarker from '../common/NinjaGoogleMapsMarker';
import Geocode from "react-geocode";
import WorkCompHistoryDataTable from './WorkCompHistoryDataTable';
import CslbLicenseClassDataTable from './CslbLicenseClassDataTable';
import CslbLicenseCertDataTable from './CslbLicenseCertDataTable';
import CslbBusinessContactsDataTable from './CslbBusinessContactsDataTable';

const utils = new Utils();

export default class ContractorExpandedRowDetails extends React.Component {

    constructor(props) {
        super(props);
        this.parentComponent = props.parentComponent;
        this.cslbLicenseNumber = props.cslbLicenseNumber;
        this.uniqueKey = props.uniqueKey || 1;
        this.tabWidth = '100%';
        this.tabHeight = '400px';
        this.panelHeight = '390px';
        this.state = {
          FETCHING_DETAILS: true,
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
      this.getContractorDetails(this.cslbLicenseNumber);
      this.fetchContractorDetailsFromCslbAsync(this.cslbLicenseNumber);
    }

    // This call is proxied to CSLB site for direct most up to date info
    // Error in this call is ignored and this.getContractorDetails(...) is used instead
    fetchContractorDetailsFromCslbAsync = (cslbLicenseNumber) => {
      let data = this.parentComponent.state.cslbDirectDetailsByCslbLicenseNumber[cslbLicenseNumber];
      if(!data) {
        let url = utils.getServicesUrl() + '/workcomphist/' + cslbLicenseNumber;
        utils.ajaxRequest('GET', url, this.cslbSiteDetailsSuccess, this.cslbSiteDetailsError);
      } else {
        // use the data from cache
        this.cslbDirectDataReceived(data);
      }
    }

    cslbDirectDataReceived = (data) => {
      if(data && data.cslbWorkCompHist) {
        if(data.cslbWorkCompHist.classesList) {
          this.setState({ cslbDirect_ClassesList: data.cslbWorkCompHist.classesList });
        }
        if(data.cslbWorkCompHist.certificationsList) {
          this.setState({ cslbDirect_CertificationsList: data.cslbWorkCompHist.certificationsList });
        }
        if(data.cslbWorkCompHist.workCompHistDetailList) {
          this.setState({ cslbDirect_WorkCompHistDetailList: data.cslbWorkCompHist.workCompHistDetailList });
        }
        if(data.cslbWorkCompHist.entity) {
          this.setState({ cslbDirect_Entity: data.cslbWorkCompHist.entity });
        }
        if(data.cslbWorkCompHist.licStatusList) {
          this.setState({ cslbDirect_LicStatusList: data.cslbWorkCompHist.licStatusList });
        }
        if(data.cslbWorkCompHist.licAdditionalStatusList) {
          this.setState({ cslbDirect_LicAdditionalStatusList: data.cslbWorkCompHist.licAdditionalStatusList });
        }
        if(data.cslbWorkCompHist.licenseStatusGreenOrRed) {
          this.setState({ cslbDirect_LicenseStatusGreenOrRed: data.cslbWorkCompHist.licenseStatusGreenOrRed });
        }
        if(data.cslbWorkCompHist.WC_StatusMessage) {
          this.setState({ cslbDirect_WC_StatusMessage: data.cslbWorkCompHist.WC_StatusMessage });
        }
        if(data.cslbWorkCompHist.WC_currentlyWithInsuranceCompany) {
          this.setState({ cslbDirect_WC_currentlyWithInsuranceCompany: data.cslbWorkCompHist.WC_currentlyWithInsuranceCompany });
        }
        if(data.cslbWorkCompHist.WC_currentlyWithInsuranceCompanyAddress) {
          this.setState({ cslbDirect_WC_currentlyWithInsuranceCompanyAddress: data.cslbWorkCompHist.WC_currentlyWithInsuranceCompanyAddress });
        }
      }
    }

    cslbSiteDetailsSuccess = (data, status, response) => {
      let licNumber = data.cslbWorkCompHist.licNumber;
      this.parentComponent.state.cslbDirectDetailsByCslbLicenseNumber[licNumber] = data;
      this.cslbDirectDataReceived(data);
    }

    cslbSiteDetailsError = (jqXHR, exception) => {
      // This call was proxied to CSLB site for direct most up to date info
      // Error in this call is ignored and this.getContractorDetails(...) is used instead
    }

    getContractorDetails = (cslbLicenseNumber) => {
      this.setState({detailsError: null});
      this.setState({detailsErrorMessage: null});
      let data = this.parentComponent.state.contractorDetailsByCslbLicenseNumber[cslbLicenseNumber];
      if(!data) {
        let url = utils.getServicesUrl() + '/getContractorDetailsByLicenseNumber';
        let request = { cslbLicenseNumber: cslbLicenseNumber };
        utils.ajaxRequest('POST', url, this.showContractorDetailsSuccess, this.showContractorDetailsError, request, true);
      } else {
        this.transformData(data);
      }
    }

    transformData = (data) => {
      this.licenseDTO = data.licenseDTO;
      let businessName1 = this.licenseDTO.businessName1 || '';
      let businessName2 = this.licenseDTO.businessName2 || '';
      this.businessName = '';
      if(businessName1 != '' && businessName2 != '') 
        this.businessName = businessName1 + ' / ' + businessName2;
      else {
        if(businessName1 != '')
          this.businessName = businessName1;
        else
          this.businessName = businessName2;
      }
      this.phoneNumber = utils.filterNonNumeric(this.licenseDTO.businessPhoneAreaCode + this.licenseDTO.businessPhoneNumber);
      this.phoneNumber = "tel:+1" + this.phoneNumber;
      this.phoneNumberFormatted = utils.formatPhone(this.licenseDTO.businessPhoneAreaCode + this.licenseDTO.businessPhoneNumber);

      this.listOfBusinessContacts = data.listOfBusinessContacts || [];

      const address = `${this.licenseDTO.mailingAddress1} ${this.licenseDTO.mailingAddress2} ${this.licenseDTO.mailingCity}, ${this.licenseDTO.mailingState}, ${this.licenseDTO.mailingZip}`;
      this.setState({FETCHING_DETAILS: false, defaultAddress: address});

      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({defaultLatitude: lat, defaultLongitude: lng, geocodeComplete: true});
        },
        error => {
          console.error(error);
        }
      );
    }

    showContractorDetailsSuccess = (data, status, response) => {
      data = JSON.parse(data);
      this.licNumber = data.licenseDTO.licNumber;
      this.parentComponent.state.contractorDetailsByCslbLicenseNumber[this.cslbLicenseNumber] = data;
      this.transformData(data);
    }

    showContractorDetailsError = (jqXHR, exception) => {
      this.setState({FETCHING_DETAILS: false});
      let errorResponse = utils.parseResponseError(jqXHR, exception);
      this.setState({detailsError: true});
      this.setState({detailsErrorMessage: errorResponse});
    }
  
    createPDFContractorDetails = () => {
      alert('Create PDF');
    }
  
    exportToExcel = (e) => {
      alert('Export to Excel');
    }

    redraw = () => {
    }

    componentDidUpdate() {
      if(!this.state.FETCHING_DETAILS) {
        $('legend').css({'font-size': 'small'});
      }
    }

    getGoogleMapsMarker = () => {
      let marker = <NinjaGoogleMapsMarker key={this.uniqueKey} lat={this.state.defaultLatitude} 
          lng={this.state.defaultLongitude} text={this.state.defaultAddress} />;
      return marker;
    }
  
    render() {
    const fontSize = '2em !important';
return (

  <div className="ui-g ui-fluid no-padding" style={{width: '100%'}}>

    { this.state.FETCHING_DETAILS && (
      <NinjaProgressSpinnerSmall maxWidth="50px" maxHeight="50px" marginTop="0px" display="block" />
     )}

    { !this.state.FETCHING_DETAILS && (<TabView className="ui-g ui-fluid no-padding" style={{width: '100%'}}>
        {/* <Fieldset toggleable={true} collapsed={false} className="no-padding" legend="License Info" style={{width: '100%'}}> */}
        <TabPanel header="License Info" leftIcon="ui-icon-assignment-ind" className="no-padding" style={{width: '100%'}}>
          <Panel className="ui-g-12 no-padding" style={{fontSize: fontSize, width: this.tabWidth, height: this.tabHeight}}>
            <div className="ui-g-12 ui-md-4 no-padding">
              <ScrollPanel className="ui-g-12" style={{fontSize: fontSize, width: this.tabWidth, height: this.panelHeight}}>
                <div className="ui-g-12 no-padding"><font color={Constants.themeColor}><b>{ this.businessName }</b></font></div>
                <div className="ui-g-12 no-padding">
                  {this.licenseDTO.mailingAddress1} {this.licenseDTO.mailingAddress2} <br/>
                  {this.licenseDTO.mailingCity}, {this.licenseDTO.mailingState}, {this.licenseDTO.mailingZip}
                </div>
                <div className="ui-g-12 no-padding" style={{paddingBottom: '1em'}}>
                  { this.phoneNumberFormatted && this.phoneNumberFormatted.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-7 no-padding"><a href={this.phoneNumber}><i className="material-icons">phone</i> {this.phoneNumberFormatted}</a></div></div>)}
                </div>

                { this.state.cslbDirect_LicStatusList && this.state.cslbDirect_LicStatusList.length > 0 &&
                  (<div className="ui-g-12 no-padding" style={{textAlign: 'center', width: '100%'}}>
                      { this.state.cslbDirect_LicStatusList.map(licStatus =>
                          <div className="ui-g-12 no-padding" style={{textAlign: 'center', width: '100%'}}>
                            { this.state.cslbDirect_LicenseStatusGreenOrRed && this.state.cslbDirect_LicenseStatusGreenOrRed == 'WarningRed' && (<font color="red"><b>{licStatus}</b></font>) }
                            { this.state.cslbDirect_LicenseStatusGreenOrRed && this.state.cslbDirect_LicenseStatusGreenOrRed == 'Green' && (<font color="green"><b>{licStatus}</b></font>) }
                            { (!this.state.cslbDirect_LicenseStatusGreenOrRed || this.state.cslbDirect_LicenseStatusGreenOrRed == '') && (<b>{licStatus}</b>) }
                          </div>) 
                        }
                  </div>)}
                
                <div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>License #:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licNumber } </div></div>
                { this.state.cslbDirect_Entity && this.state.cslbDirect_Entity.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Entity:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.state.cslbDirect_Entity } </div></div>)}
                { this.licenseDTO.lastUpdatedDate && this.licenseDTO.lastUpdatedDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Last Updated:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.lastUpdatedDate }</div></div>)}
                { this.licenseDTO.originalIssueDate && this.licenseDTO.originalIssueDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Original Issue Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.originalIssueDate } </div></div>)}
                { this.licenseDTO.expirationDate && this.licenseDTO.expirationDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Expiration Date:</b></div><div className="ui-g-12 ui-md-6 no-padding"><font color="green"><b>{ this.licenseDTO.expirationDate }</b></font> </div></div>)}
                { this.licenseDTO.reissueDate && this.licenseDTO.reissueDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Reissue Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.reissueDate } </div></div>)}
                { this.licenseDTO.lateRenewalDate && this.licenseDTO.lateRenewalDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Late Renewal Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.lateRenewalDate } </div></div>)}
                { this.licenseDTO.lateRenewalPrior1Date && this.licenseDTO.lateRenewalPrior1Date.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Late Renewal Prior 1 Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.lateRenewalPrior1Date } </div></div>)}
                { this.licenseDTO.lateRenewalPrior2Date && this.licenseDTO.lateRenewalPrior2Date.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Late Renewal Prior 2 Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.lateRenewalPrior2Date } </div></div>)}
                { this.licenseDTO.inactiveDate && this.licenseDTO.inactiveDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Inactive Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.inactiveDate } </div></div>)}
                { this.licenseDTO.reactivedDate && this.licenseDTO.reactivedDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>Reactivated Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.reactivedDate } </div></div>)}
                { this.licenseDTO.ipsoFactoDate && this.licenseDTO.ipsoFactoDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-6 no-padding"><b>IPSO Facto Date:</b></div><div className="ui-g-12 ui-md-6 no-padding">{ this.licenseDTO.ipsoFactoDate } </div></div>)}
              
                { this.state.cslbDirect_LicAdditionalStatusList && this.state.cslbDirect_LicAdditionalStatusList.length > 0 &&
                  (<div className="ui-g-12 no-padding" style={{width: '100%', marginTop: '1em'}}>
                      { this.state.cslbDirect_LicAdditionalStatusList.map(licStatus =>
                          <li>
                            {licStatus}
                          </li>) 
                      }
                  </div>)}

                  { this.state.cslbDirect_ClassesList && this.state.cslbDirect_ClassesList.length > 0 &&
                  (<div className="ui-g-12 no-padding" style={{fontSize: fontSize, marginTop: '1em'}}><CslbLicenseClassDataTable data={this.state.cslbDirect_ClassesList} /></div>)}

                  { this.state.cslbDirect_CertificationsList && this.state.cslbDirect_CertificationsList.length > 0 &&
                  (<div className="ui-g-12 no-padding" style={{fontSize: fontSize, marginTop: '1em'}}><CslbLicenseCertDataTable data={this.state.cslbDirect_CertificationsList} /></div>)}
              </ScrollPanel>
            </div>

            <div className="ui-g-12 ui-md-8 no-padding" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              { this.state.geocodeComplete && (<NinjaGoogleMaps key={this.uniqueKey} center={{lat: this.state.defaultLatitude, lng: this.state.defaultLongitude}} 
                  markers={[ this.getGoogleMapsMarker() ]} height={this.panelHeight} />) }
              {/* <NinjaGoogleMaps key={this.uniqueKey} center={{lat: this.state.defaultLatitude, lng: this.state.defaultLongitude}} 
                  markers={[ this.getGoogleMapsMarker() ]} /> */}
            </div>
          </Panel> 
        </TabPanel>
        {/* <Fieldset toggleable={true} collapsed={true} className="no-padding" legend="Workers' Compensation" style={{width: '100%'}}> */}
        <TabPanel header="Workers' Compensation" leftIcon="ui-icon-gavel" className="no-padding" style={{width: '100%'}}>
          <Panel className="ui-g-12 no-padding" style={{fontSize: fontSize, width: this.tabWidth, height: this.tabHeight}}>
            <div className="ui-g-12 ui-md-6 no-padding" style={{fontSize: fontSize}}>
                { this.state.cslbDirect_WC_StatusMessage && (
                  <div className="ui-g-12 no-padding">{ this.state.cslbDirect_WC_StatusMessage }</div>
                ) }
                { (!this.licenseDTO.policyNumber || this.licenseDTO.policyNumber.trim() == '') && (<div className="ui-g-12 no-padding">NO WORKCOMP POLICY</div>)}
 
                { /* Info from Ninja Database */ }
                { (!this.state.cslbDirect_WorkCompHistDetailList || !this.state.cslbDirect_WorkCompHistDetailList.length || this.state.cslbDirect_WorkCompHistDetailList.length == 0) && this.licenseDTO.policyNumber && this.licenseDTO.policyNumber.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-2 no-padding"><b>Policy #:</b></div><div className="ui-g-12 ui-md-7 no-padding">{ this.licenseDTO.policyNumber } </div></div>)}
                { (!this.state.cslbDirect_WorkCompHistDetailList || !this.state.cslbDirect_WorkCompHistDetailList.length || this.state.cslbDirect_WorkCompHistDetailList.length == 0) && this.licenseDTO.exempt && this.licenseDTO.exempt.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-2 no-padding"><b>Exempt:</b></div><div className="ui-g-12 ui-md-7 no-padding">{ this.licenseDTO.exempt } </div></div>)}
                { (!this.state.cslbDirect_WorkCompHistDetailList || !this.state.cslbDirect_WorkCompHistDetailList.length || this.state.cslbDirect_WorkCompHistDetailList.length == 0) && this.licenseDTO.cslbInsurerDesc && this.licenseDTO.cslbInsurerDesc.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-2 no-padding"><b>Currently With:</b></div><div className="ui-g-12 ui-md-7 no-padding"><font color={Constants.themeColor}><b>{ this.licenseDTO.cslbInsurerDesc }</b></font> <br/> { this.licenseDTO.cslbInsurerAddressDetails } </div></div>)}

                { /* Info from CSLB Conctractors site. Takes precedence over Infor from Ninja Database */ }
                { this.state.cslbDirect_WorkCompHistDetailList && this.state.cslbDirect_WorkCompHistDetailList.length > 0 && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-2 no-padding"><b>Policy #:</b></div><div className="ui-g-12 ui-md-7 no-padding">{ this.state.cslbDirect_WorkCompHistDetailList[0].policyNumber } </div></div>)}
                { this.state.cslbDirect_WorkCompHistDetailList && this.state.cslbDirect_WorkCompHistDetailList.length > 0 && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-2 no-padding"><b>Effective Date:</b></div><div className="ui-g-12 ui-md-7 no-padding">{ this.state.cslbDirect_WorkCompHistDetailList[0].effectiveDate } </div></div>)}
                { this.state.cslbDirect_WorkCompHistDetailList && this.state.cslbDirect_WorkCompHistDetailList.length > 0 && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-2 no-padding"><b>Expire Date:</b></div><div className="ui-g-12 ui-md-7 no-padding">{ this.state.cslbDirect_WorkCompHistDetailList[0].expirationDate } </div></div>)}
                { this.state.cslbDirect_WC_currentlyWithInsuranceCompany && this.state.cslbDirect_WC_currentlyWithInsuranceCompany.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-2 no-padding"><b>Currently With:</b></div><div className="ui-g-12 ui-md-7 no-padding"><font color={Constants.themeColor}><b>{ this.state.cslbDirect_WC_currentlyWithInsuranceCompany }</b></font> <br/> { this.state.cslbDirect_WC_currentlyWithInsuranceCompanyAddress } </div></div>)}
            </div>
            
              { this.state.cslbDirect_WorkCompHistDetailList && this.state.cslbDirect_WorkCompHistDetailList.length > 0 && 
                (<div className="ui-g-12 ui-md-6 no-padding" style={{fontSize: fontSize}}> 
                  <ScrollPanel className="ui-g-12 no-padding" style={{fontSize: fontSize, width: this.tabWidth, height: this.panelHeight}}>
                    <WorkCompHistoryDataTable data={this.state.cslbDirect_WorkCompHistDetailList} />
                  </ScrollPanel>
                </div>)
              }
          </Panel>
        </TabPanel>
        {/* <Fieldset toggleable={true} collapsed={true} className="no-padding" legend="Business Contacts" style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}> */}
        <TabPanel header="Business Contacts" leftIcon="ui-icon-group" className="no-padding" style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <ScrollPanel className="ui-g-12 no-padding" style={{fontSize: fontSize, width: this.tabWidth, height: this.tabHeight}}>
              { this.listOfBusinessContacts && this.listOfBusinessContacts.length > 0 && (<CslbBusinessContactsDataTable data={this.listOfBusinessContacts} />) }
              { (!this.listOfBusinessContacts || this.listOfBusinessContacts.length == 0) && (<div>NO BUSINESS CONTACTS</div>) }

              {/* { this.listOfBusinessContacts.map(contact =>
                    <div className="ui-g-12 ui-md-5" style={{fontSize: fontSize, border: '1px solid', borderRadius: '5px', borderColor: 'lightgrey', margin: '5px 5px 5px 5px'}}>
                      <div className="ui-g-12 no-padding" style={{fontWeight: 'bold'}}><font color={Constants.themeColor}>{contact.nameSuffix} {contact.firstName} {contact.middleName} {contact.lastName}</font></div>
                      { contact.cslbClassCode && contact.cslbClassCode.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-4 no-padding"><b>Classification:</b></div><div className="ui-g-12 ui-md-3 no-padding">{ contact.cslbClassCode } </div></div>)}
                      { contact.asbExamInd && contact.asbExamInd.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-4 no-padding"><b>ASB Exam Indicator:</b></div><div className="ui-g-12 ui-md-3 no-padding">{ contact.asbExamInd } </div></div>)}
                      { contact.lastUpdatedDate && contact.lastUpdatedDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-4 no-padding"><b>Last Updated:</b></div><div className="ui-g-12 ui-md-3 no-padding">{ contact.lastUpdatedDate } </div></div>)}
                      { contact.associatedDate && contact.associatedDate.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-4 no-padding"><b>Associated:</b></div><div className="ui-g-12 ui-md-3 no-padding">{ contact.associatedDate } </div></div>)}
                      { contact.disassociated && contact.disassociated.trim() != '' && (<div className="ui-g-12 no-padding"><div className="ui-g-12 ui-md-4 no-padding"><b>Disassociated:</b></div><div className="ui-g-12 ui-md-3 no-padding">{ contact.disassociated } </div></div>)}
                    </div> ) 
              } */}
          </ScrollPanel>
        </TabPanel>
    </TabView>)}

  </div>
      );}
  }
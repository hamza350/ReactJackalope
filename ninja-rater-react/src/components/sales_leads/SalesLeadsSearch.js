import React, { Component } from 'react';
import classNames from 'classnames';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import {Fieldset} from 'primereact/components/fieldset/Fieldset';
import {InputText} from 'primereact/components/inputtext/InputText';
import {InputMask} from 'primereact/components/inputmask/InputMask';
import {Button} from 'primereact/components/button/Button';
import {MultiSelect} from 'primereact/components/multiselect/MultiSelect';
import {AutoCompleteMultiClassCodes} from '../shared/AutoCompleteMultiClassCodes';
import jQuery from 'jquery';
import $ from 'jquery';
import {Calendar} from 'primereact/components/calendar/Calendar';
import NinjaProgressSpinner from '../shared/NinjaProgressSpinner';
import Utils from '../shared/Utils';
import * as Constants from '../../Constants';
import ReactDOM from 'react-dom';
import * as jsPdfAutoTable from 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import {SplitButton} from 'primereact/components/splitbutton/SplitButton';
import TemplateUtility from '../shared/TemplateUtility';
import moment from 'moment';
import '../../App.css';
import { NinjaContext } from '../shared/Utils';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import { CSVLink, CSVDownload } from "react-csv";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const utils = new Utils();
const themeColor = '#293891';
const inputSize = '0.9em';

const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const excelFileExtension = '.csv';

const exportToCSV = (csvData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'csv', type: 'array' });
  const data = new Blob([excelBuffer], {type: excelFileType});
  FileSaver.saveAs(data, fileName + excelFileExtension);
}

export default class SalesLeadsSearch extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        parentComponent: this.props.parentComponent,
        downloadCSV: false,
        csvFiles: [],
        templateUtility: new TemplateUtility(),
        selectedCslbClassifications: [],
        cslbClassifications: [],
        cslbCountyOptions: [],
        cslbCounties: [],
        hasWcPolicy: false,
        UI_ElementsDisabled: false,
        UI_ButtonsDisabled: false
      };
      this.createContractorsPDF = this.createContractorsPDF.bind(this);
      this.exportToExcel = this.exportToExcel.bind(this);
      this.onMultiSelectCslbClassChange = this.onMultiSelectCslbClassChange.bind(this);
      this.onMultiSelectCslbCountyChange = this.onMultiSelectCslbCountyChange.bind(this);
  }

  componentDidMount() {
    let initialData = this.context.initialData;
    let cslbClassesForLeads = initialData.CslbClassesForLeads;
    let cslbClassifications = Object.keys(cslbClassesForLeads).map(cslbClassKey => {
        let label = ` ${cslbClassKey} - ${cslbClassesForLeads[cslbClassKey].cslbClassDesc}`;
        if(cslbClassesForLeads[cslbClassKey].cslbClassDesc == '')
          label = label.replace(' - ', '')
        return { label: label, value: cslbClassKey };
      }
    );

    cslbClassifications.sort(function(a,b){
      if(a.value < b.value)
          return -1;
      if(a.value > b.value)
          return 1;
      return 0;
    });

    this.setState({ cslbClassifications: cslbClassifications });
    $('#contractorClasses input').css({'color': 'black', 'font-weight': 'bold', 'font-size': inputSize, 'border-radius': '0.2em'});
    $('#contractorClasses label').css({'color': themeColor, 'font-weight': 'bold', 'font-size': inputSize});

    let cslbCounties = initialData.listOfCounties.map(county => {
        return { label: " "+county, value: county };
      }
    );
    this.setState({ cslbCounties: cslbCounties });
    $('#salesLeadsCounties input').css({'color': 'black', 'font-weight': 'bold', 'font-size': inputSize, 'border-radius': '0.2em'});
    $('#salesLeadsCounties label').css({'color': themeColor, 'font-weight': 'bold', 'font-size': inputSize});

    $('#ID_SalesLeads_ClassCodes').css({'width': '100%'});
    $('#ID_SalesLeads_ClassCodes ul').css({'width': '100%'});
    $('#ID_SalesLeads_ClassCodes ul li').css({'width': '100%'});
    $('#ID_SalesLeads_ClassCodes ul li input').css({'width': '100%'});

    $('#contractorClasses').css({'width': '100%'});
    $('#contractorClasses ul').css({'width': '100%'});
    $('#contractorClasses ul li').css({'width': '100%'});
    $('#contractorClasses ul li input').css({'width': '100%'});

    // let classItems = $('.ui-multiselect-items-wrapper').children('li');
    // classItems.map(item => {
    //   $(item).css({'color': themeColor, 'font-weight': 'bold', 'font-size': '1.3em'});
    // });
  }

  createContractorsPDF() {
    let businessData = this.state.parentComponent.state.businessData;
    var rows = [];
    for(let i = 0 && businessData.length; i < businessData.length; ++i) {
      //rows.push([businessData[i].count, businessData[i].name, businessData[i].exModAndYear, businessData[i].address])
      rows.push([businessData[i].count, businessData[i].name, businessData[i].cslbLicenseNumber,  businessData[i].cslbLicenseOriginalIssueDate, 
                businessData[i].cslbLicenseExpirationDate, businessData[i].phone, businessData[i].address])
    }

    let filename = "ninjarater_Contractors_" + utils.getCurrentTimeStampAsFileNamePrefix() + ".pdf";
    let columns = ["#", "Name", "License #", "Issued On", "Expires On", "Phone", "Address"];

    var pdf = new jsPDF('p', 'pt');
    var image = utils.getPdfNinjaImage();
    pdf.autoTable(columns, rows,
    {
        theme: 'striped',
        margin: {top: 120, left: 20},
        addPageContent: function (data) {
            pdf.addImage(image, 'PNG', 20, 30);
            pdf.setFontSize(26);
            pdf.text(utils.getNinjaterInfo().name, 109, 70);
            pdf.setFontSize(10);
            pdf.setTextColor(128,128,128);
            pdf.text(utils.getNinjaterInfo().email,109, 85);
            pdf.text(utils.getNinjaterInfo().twitter,109, 100);

        },
        drawRow: function (row, data) {
            var acceptBusiness = row.cells["2"].raw;

            Object.values(row.cells).forEach( c => {c.styles.fontSize = 8});

            if (acceptBusiness == "NO") {
                row.cells["2"].styles.textColor = [200, 0, 0];
            }
            else if (acceptBusiness == "YES") {
                row.cells["2"].styles.textColor = [0, 200, 0];
                row.cells["1"].styles.fontStyle='bold';
                row.cells["0"].styles.fontStyle='bold';
            }
        },
        columnStyles: { // let columns = ["#", "Name", "License #", "Issued On", "Expires On", "Phone", "Address"];
            0: {columnWidth: 20},
            1: {columnWidth: 110},
            2: {columnWidth: 60},
            3: {columnWidth: 70},
            4: {columnWidth: 70},
            5: {columnWidth: 75},
            6: {columnWidth: 152}
            // etc
        },
        styles: {overflow: 'linebreak'}
    });

    pdf.save(filename);
  }

  
  
  asyncifyPDF = async (event) => {
    this.enableOrDisableALL_UI_CONTROLLS(true);
    setTimeout(
        function() {
            this.createContractorsPDF(event);
            this.enableOrDisableALL_UI_CONTROLLS(false);
        }
        .bind(this), 1000
    );
  }

  exportToExcel(e) {
    //this.state.csvFiles.push(<CSVDownload data={this.state.parentComponent.state.csv.data} headers={this.state.parentComponent.state.csv.headers} target="_self"/>);
    const fileName = 'NinjaRater_Contractors_' + utils.getCurrentTimeStampAsFileNamePrefix();
    exportToCSV(this.state.parentComponent.state.csv.data, fileName);
  }

  onMultiSelectCslbClassChange(e) {
    this.setState({selectedCslbClassifications: e.value});
  }

  onMultiSelectCslbCountyChange(e) {
    this.setState({cslbCountyOptions: e.value});
  }

  onValueChange = ( event, elementId ) => {
    if(elementId == "ID_SalesLeads_PARTIAL_BUSINESS_NAME") {
      this.setState({ partialBusinessName: event.target.value })
    }
    if(elementId == "ID_SalesLeads_CITY") {
      this.setState({ city: event.target.value })
    }
    if(elementId == "ID_SalesLeads_ZIP") {
      this.setState({ zipCode: event.target.value })
    }
    if(elementId == "ID_SalesLeads_ClassCodes") {
      this.setState({ ninjaClassCode: event.target.value })
    }
    if(elementId == "cslbLicenseNumber") {
      this.setState({ cslbLicenseNumber: event.target.value })
    }
    if(elementId == 'cslbLicenseNumber') {
      const cslbLicenseNumber = event.target.value;
      if(cslbLicenseNumber && cslbLicenseNumber.trim() != '') { // disable all other UI controls, license # is the only search filter
        this.enableOrDisableAllUIControls(true);
        $('#cslbLicenseNumber').prop('disabled', false);
        $('#cslbLicenseNumber').focus();
      } else { //re-enable all other UI controls
        this.enableOrDisableAllUIControls(false);
      }
    }
  }

  enableOrDisableAllUIControls = (isDisabled) => {
    $('#ID_SalesLeads_PARTIAL_BUSINESS_NAME').prop('disabled', isDisabled);
    $('#cslbLicenseNumber').prop('disabled', isDisabled);
    $('#ID_SalesLeads_CITY').prop('disabled', isDisabled);
    $('#ID_SalesLeads_ZIP').prop('disabled', isDisabled);
    this.setState({ UI_ElementsDisabled: isDisabled });
    if(isDisabled)
      $('#ID_HAS_WC_POLICY').addClass('"ui-state-disabled');
    else
      $('#ID_HAS_WC_POLICY').removeClass('"ui-state-disabled');
  }

  enableOrDisableALL_UI_CONTROLLS = (isDisabled) => {
    this.enableOrDisableAllUIControls(isDisabled);
    if(isDisabled) {
      this.setState({UI_ButtonsDisabled: true});
    }
    else {
      this.setState({UI_ButtonsDisabled: false});
    }
  }

  getSalesLeadsInput = () => {
    const dateFormat = 'MM/DD/YYYY';
    const salesLeadsInput = {
      businessPartialName: this.state.partialBusinessName,
      city: this.state.city,
      zipCode: this.state.zipCode,
      selectedNinjaClasses: this.state.ninjaClassCode,
      selectedCounties: this.state.cslbCountyOptions,
      selectedCslbClassifications: this.state.selectedCslbClassifications,
      cslbLicenseExpireDateFrom: utils.formatValidDateMMDDYYYY_OrNull(this.state.parentComponent.state.cslbLicenseExpireDateFrom),
      cslbLicenseExpireDateTo: utils.formatValidDateMMDDYYYY_OrNull(this.state.parentComponent.state.cslbLicenseExpireDateTo),
      cslb_WC_ExpireDateFrom: utils.formatValidDateMMDDYYYY_OrNull(this.state.parentComponent.state.cslb_WC_ExpireDateFrom),
      cslb_WC_ExpireDateTo: utils.formatValidDateMMDDYYYY_OrNull(this.state.parentComponent.state.cslb_WC_ExpireDateTo),
      hasWcPolicy: this.state.parentComponent.state.hasWcPolicy,
      cslbLicenseNumber: this.state.cslbLicenseNumber,
      resultsPerPage: this.state.parentComponent.resultsPerPage,
      cslbLicenseNumberMax: this.state.parentComponent.cslbLicenseNumberMax > 0 ? this.state.parentComponent.cslbLicenseNumberMax : null,
      cslbLicenseNumberMin: this.state.parentComponent.cslbLicenseNumberMin > 0 ? this.state.parentComponent.cslbLicenseNumberMin : null
    };
    return salesLeadsInput;
  }

  toggleHasWcPolicy = (event) => {
    if(this.state.parentComponent.state.hasWcPolicy)
      this.state.parentComponent.setState({ hasWcPolicy: false });
    else
      this.state.parentComponent.setState({ hasWcPolicy: true });
  }

  render() {

      let splitButtonItems = [
          {label: 'Create PDF', icon: 'ui-icon-picture-as-pdf', command: (event) => {this.asyncifyPDF(event)}}
      ];

      return (
<div id="ID_SalesLeads_BUSINESS_SEARCH" className="ui-g-12 no-padding" style={{width: '100%'}}>
    <NinjaProgressSpinner maxWidth="200px" maxHeight="200px" marginTop="-10px" />
    <Fieldset className="no-padding" legend="Find by: Contractor Name/Location" style={{width: '100%'}}>
        <div className="ui-g-12 no-padding ui-md-3" style={{marginRight: '10px'}}>
          <span className="md-inputfield">
              <InputText id="ID_SalesLeads_PARTIAL_BUSINESS_NAME" disabled={false} ref="ID_SalesLeads_PARTIAL_BUSINESS_NAME"
                  onChange = { (event) => this.onValueChange(event, "ID_SalesLeads_PARTIAL_BUSINESS_NAME") }
                  className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                  onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                  style={{fontSize: inputSize, width: '100%'}}
                  type="text" className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
              <label htmlFor="ID_SalesLeads_PARTIAL_BUSINESS_NAME" style={{fontSize: inputSize, fontWeight: 'Bold'}}>Business Name</label>
          </span>
        </div>
        <div className="ui-g-12 no-padding ui-md-1" style={{marginRight: '10px'}}>
          <span className="md-inputfield">
                <InputText id="cslbLicenseNumber" name="cslbLicenseNumber" type="text"
                    onChange = { (event) => this.onValueChange(event, "cslbLicenseNumber") }
                    onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                    className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                    keyfilter="pint"
                    style={{fontSize: inputSize, width: '100%'}} />
                <label htmlFor="cslbLicenseNumber"  style={{fontWeight: 'Bold', fontSize: inputSize}}>License#</label>
            </span>
        </div>
        <div className="ui-g-12 no-padding ui-md-3" style={{marginRight: '10px'}}>
          <span className="md-inputfield">
              <InputText id="ID_SalesLeads_CITY" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                  className="ui-inputtext ui-corner-all ui-state-default ui-widget" type="text"
                  onChange = { (event) => this.onValueChange(event, "ID_SalesLeads_CITY") }
                  style={{fontSize: inputSize, width: '100%'}}
                  className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
              <label style={{fontSize: inputSize, fontWeight: 'Bold'}}>City</label>
          </span>
        </div>
        <div className="ui-g-12 no-padding ui-md-1">
          <span className="md-inputfield">
              <InputText id="ID_SalesLeads_ZIP" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                  className="ui-inputtext ui-corner-all ui-state-default ui-widget" type="text"
                  onChange = { (event) => this.onValueChange(event, "ID_SalesLeads_ZIP") }
                  keyfilter="pint"
                  style={{fontSize: inputSize, width: '100%'}}
                  className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
              <label style={{fontSize: inputSize, fontWeight: 'Bold'}}>Zip</label>
          </span>
        </div>
        <div className="ui-g-12 no-padding ui-md-3" style={{display: 'flex', justifyContent: 'center'}}>
            <MultiSelect id="salesLeadsCounties" name="salesLeadsCounties"
              value={this.state.cslbCountyOptions} options={this.state.cslbCounties}
              onChange={this.onMultiSelectCslbCountyChange} disabled={this.state.UI_ElementsDisabled}
              style={{width: 'auto', fontWeight: 'Bold', color: 'black'}}
              className="ui-inputtext ui-corner-all ui-state-default ui-widget"
              defaultLabel="California Counties" filter={true} />
        </div>
    </Fieldset>

    <Fieldset className="no-padding" legend="Find by: Contractor Details" style={{width: '100%'}}>
        {/* <div className="ui-g no-padding" style={{width: '100%'}}>
          <div className="ui-g-12 no-padding ui-md-5">
            <AutoCompleteMultiClassCodes style={{width: '100%', fontSize: inputSize}} parentComponent={this}
              onValueChange={this.onValueChange} id="ID_SalesLeads_ClassCodes" placeholder="Select Class Code(s)" />
          </div>
        </div> */}
        <div className="ui-g-12 ui-md-3 no-padding">
          <MultiSelect id="contractorClasses" name="contractorClasses"
            value={this.state.selectedCslbClassifications} options={this.state.cslbClassifications}
            onChange={this.onMultiSelectCslbClassChange} disabled={this.state.UI_ElementsDisabled}
            style={{width: 'auto', fontWeight: 'Bold', color: 'black'}}
            className="ui-inputtext ui-corner-all ui-state-default ui-widget"
            defaultLabel="Contractor Classifications" filter={true} />
        </div>
        <div className="ui-g-12 ui-md-4" style={{marginLeft: '1em', border: '1px solid lightgrey', borderRadius: '5px'}}>
            <div className="ui-g-12 no-padding"><font color={Constants.themeColor}>License Expires Between Dates</font></div>
            <div className="ui-g-12 no-padding" style={{display: 'flex', alignItems: 'flex-start'}}>
              <Calendar id="ID_SalesLeads_LIC_EXPIRES_FROM" placeholder="Lic. Expires From" showIcon={true}
                value={this.state.parentComponent.state.cslbLicenseExpireDateFrom} style={{width: 'inherit'}}
                disabled={this.state.UI_ElementsDisabled}
                onChange={(e) => this.state.parentComponent.setState({cslbLicenseExpireDateFrom: e.value})} />

              <Calendar id="ID_SalesLeads_LIC_EXPIRES_TO" placeholder="Lic. Expires To" showIcon={true}
                value={this.state.parentComponent.state.cslbLicenseExpireDateTo} style={{width: 'inherit'}}
                disabled={this.state.UI_ElementsDisabled}
                onChange={(e) => this.state.parentComponent.setState({cslbLicenseExpireDateTo: e.value})} />
            </div>
        </div>
        <div className="ui-g-12 ui-md-4" style={{marginLeft: '1em', border: '1px solid lightgrey', borderRadius: '5px'}}>
            <div className="ui-g-12 no-padding"><font color={Constants.themeColor}>WorkComp Policy Expires Between Dates</font></div>
            <div className="ui-g-12 no-padding" style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>

              <Calendar id="ID_SalesLeads_WC_EXPIRES_FROM" placeholder="WC Expires From" showIcon={true}
                value={this.state.parentComponent.state.cslb_WC_ExpireDateFrom} style={{width: 'inherit'}}
                disabled={this.state.UI_ElementsDisabled}
                onChange={(e) => this.state.parentComponent.setState({cslb_WC_ExpireDateFrom: e.value})} />

              <Calendar id="ID_SalesLeads_WC_EXPIRES_TO" placeholder="WC Expires To" showIcon={true}
                value={this.state.parentComponent.state.cslb_WC_ExpireDateTo} style={{width: 'inherit'}}
                disabled={this.state.UI_ElementsDisabled}
                onChange={(e) => this.state.parentComponent.setState({cslb_WC_ExpireDateTo: e.value})} />
            </div>
            <div className="ui-g-12 no-padding">
              <font color={Constants.themeColor}>
                <span style={{width: 'inherit'}}>
                  Has WC Policy &nbsp;
                  <span onClick={this.toggleHasWcPolicy}>
                    <Checkbox id="ID_HAS_WC_POLICY" checked={this.state.parentComponent.state.hasWcPolicy} />
                  </span>
                </span>
              </font>
            </div>
        </div>
    </Fieldset>
<br/>
    <div className="ui-g" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <span>
            <Button ref="ContractorsSearchButton" onClick={this.state.parentComponent.findBusinessButtonPressed}
              disabled={this.state.parentComponent.state.userMustUpgradeNinjaPlan || this.state.UI_ButtonsDisabled}
              type="button" label="Find Contractors" icon="ui-icon-search">
            </Button>

            <SplitButton ref="ContractorsPdfCsvButton" className="amber-btn no-padding" type="button"
                label="Export to Excel" icon="ui-icon-save" disabled={this.state.UI_ButtonsDisabled}
                model={splitButtonItems} onClick={this.exportToExcel} icon="ui-icon-grid-on"
                style={{fontSize: inputSize, fontWeight: 'bald', float: 'right',
                display: this.state.parentComponent.state.businessData.length > 0 ? 'block' : 'none'}} />
          </span>
        </div>


</div>
      );
  }
}

SalesLeadsSearch.propTypes = {};
SalesLeadsSearch.contextType = NinjaContext;
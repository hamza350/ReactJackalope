import React, { Component } from 'react';
import classNames from 'classnames';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import {Fieldset} from 'primereact/components/fieldset/Fieldset';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
//import {AutoCompleteMultiClassCodes} from '../shared/AutoCompleteMultiClassCodes';
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
import { CSVLink, CSVDownload } from "react-csv";

const utils = new Utils();

export default class WcirbSearch extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        parentComponent: this.props.parentComponent,
        downloadCSV: false,
        csvFiles: []
      };
      this.createWcirbPDF = this.createWcirbPDF.bind(this);
      this.exportToExcel = this.exportToExcel.bind(this);
      //this.getSelectedNinjaClasses = this.getSelectedNinjaClasses.bind(this);
  }

  componentDidMount() {
    // let date = new Date();
    // date.setYear(1970);
    // date.setMonth(1);
    // date.setDate(1);
    // this.state.parentComponent.setState({effDateFrom: date});
  }

  // getSelectedNinjaClasses() {
  //   return this.refs.AutoCompleteMultiClassCodes.state.ninjaClass;
  // }


  asyncifyPDF = async (event) => {
    //utils.buttonSpinnerInProgress(event, true);
    this.state.parentComponent.InProgress(true);
    setTimeout(
        function() {
            this.createWcirbPDF(event);
            //utils.buttonSpinnerInProgress(event, false);
            this.state.parentComponent.InProgress(false);
        }
        .bind(this), 1000
    );
  }

  createWcirbPDF(event) {
    let businessData = this.state.parentComponent.state.businessData;
    var rows = [];
    for(let i = 0 && businessData.length; i < businessData.length; ++i) {
      //rows.push([businessData[i].count, businessData[i].name, businessData[i].exModAndYear, businessData[i].address])
      const exModYear = businessData[i].exMod + '/' + businessData[i].exModYear;
      rows.push([businessData[i].count, businessData[i].name, exModYear, businessData[i].address])
    }

    let filename = "ninjarater_ExMods_" + utils.getCurrentTimeStampAsFileNamePrefix() + ".pdf";
    let columns = ["#", "Bureau # - Business", "ExMod/Year", "Address"];

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
        columnStyles: {
          0: {columnWidth: 15},
          1: {columnWidth: 212},
          2: {columnWidth: 80},
          3: {columnWidth: 242}
          // etc
      },
      styles: {overflow: 'linebreak'}
    });

    pdf.save(filename);
  }

  exportToExcel(e) {
        this.state.csvFiles.push(<CSVDownload data={this.state.parentComponent.state.csv.data} headers={this.state.parentComponent.state.csv.headers} target="_self"/>);
  }

  render() {

    let splitButtonItems = [
        {label: 'Create PDF', icon: 'ui-icon-grid-on', command: (event) => {this.asyncifyPDF(event)}}
    ];

      return (
          <div className="ui-g-12 no-padding" style={{width: '100%'}}>
              <NinjaProgressSpinner maxWidth="200px" maxHeight="200px" marginTop="-10px" />

              <div id="ID_WCIRB_BUSINESS_SEARCH" className="ui-g-12 no-padding" style={{width: '100%'}}>
                  <Fieldset legend="Find ExMod">
                    <div className="ui-g no-padding" style={{width: '100%', padding: '0.4em'}}>

                      <div className="ui-g-12 no-padding ui-md-7" style={{marginRight: '10px', paddingTop: '29px'}}>
                        <span className="md-inputfield">
                            <InputText id="ID_WCIRB_PARTIAL_BUSINESS_NAME"
                                type="text"
                                onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                                style={{fontSize: '1.3em', width: '100%'}}
                                className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                            <label style={{fontSize: '0.8em', fontWeight: 'Bold'}}>Business Name</label>
                        </span>
                      </div>

                      <div className="ui-g-12 no-padding ui-md-4" style={{marginRight: '10px', paddingTop: '29px'}}>
                        <span className="md-inputfield">
                            <InputText id="ID_WCIRB_BUREAU_NUM" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                                onChange={(e) => this.state.parentComponent.setBureauNumber(e)}
                                style={{fontSize: '1.3em', width: '100%'}} type="text"
                                className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                            <label style={{fontSize: '0.8em', fontWeight: 'Bold'}}>Bureau #</label>
                        </span>
                      </div>

                    </div>

                    <br/>

                    <div className="ui-g no-padding" style={{width: '100%', padding: '0.4em'}}>
                      <div className="ui-g-12 no-padding ui-md-5" style={{marginRight: '10px', paddingTop: '29px'}}>
                        <span className="md-inputfield">
                            <InputText id="ID_WCIRB_STREET_ADDR" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                                onChange={(e) => this.state.parentComponent.setStreetAddress(e)}
                                style={{fontSize: '1.3em', width: '100%'}} type="text"
                                className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                            <label style={{fontSize: '0.8em', fontWeight: 'Bold'}}>Street Address</label>
                        </span>
                      </div>

                      <div className="ui-g-12 no-padding ui-md-4" style={{marginRight: '10px', paddingTop: '29px'}}>
                        <span className="md-inputfield">
                            <InputText id="ID_WCIRB_CITY" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                                onChange={(e) => this.state.parentComponent.setCity(e)}
                                style={{fontSize: '1.3em', width: '100%'}} type="text"
                                className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                            <label style={{fontSize: '0.8em', fontWeight: 'Bold'}}>City</label>
                        </span>
                      </div>

                      <div className="ui-g-12 no-padding ui-md-2" style={{marginRight: '10px', paddingTop: '29px'}}>
                        <span className="md-inputfield">
                            <InputText id="ID_WCIRB_ZIP" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                                onChange={(e) => this.state.parentComponent.setZip(e)} type="text" 
                                style={{fontSize: '1.3em', width: '100%'}} keyfilter="pint" 
                                className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                            <label style={{fontSize: '0.8em', fontWeight: 'Bold'}}>Zip</label>
                        </span>
                      </div>
                    </div>

                    <br/>

                    <div className="ui-g no-padding" style={{width: '100%'}}>

                      {/*<div className="ui-g-12 no-padding ui-md-2" style={{marginRight: '0.5em'}}>
                        <Calendar id="ID_WCIRB_EFF_DATE_FROM" placeholder="Effective From" showIcon={true}
                          value={this.state.parentComponent.state.effDateFrom}
                          onChange={(e) => this.state.parentComponent.setState({effDateFrom: e.value})} />
                      </div>

                      <div className="ui-g-12 no-padding ui-md-2">
                        <Calendar id="ID_WCIRB_EFF_DATE_TO" placeholder="Effective To" showIcon={true}
                          value={this.state.parentComponent.state.effDateTo}
                          onChange={(e) => this.state.parentComponent.setState({effDateTo: e.value})} />
                      </div>

                      <div className="ui-g-12 no-padding ui-md-7">
                        <AutoCompleteMultiClassCodes parentComponent={this} id="ID_WCIRB_ClassCodes" placeholder="Class Code" ref="AutoCompleteMultiClassCodes" />
                      </div>*/}

                      <div className="ui-g no-padding" style={{width: '100%'}}>
                        <div className="ui-g-12 no-padding ui-md-5" style={{marginTop: '1em'}}>
                          <Button onClick={this.state.parentComponent.findBusinessButtonPressed}
                            disabled={this.state.parentComponent.state.userMustUpgradeNinjaPlan}
                            type="button" label="Find ExMod" icon="ui-icon-search">
                          </Button>

                          <SplitButton className="amber-btn no-padding" type="button" label="Export to CSV" icon="ui-icon-save"
                              model={splitButtonItems} onClick={this.exportToExcel} icon="ui-icon-picture-as-pdf"
                              style={{fontSize: '0.8em', fontWeight: 'bald', float: 'right',
                                  display: this.state.parentComponent.state.businessData.length > 0 ? 'block' : 'none'}}>
                          </SplitButton>
                          <div>
                              {this.state.csvFiles}
                          </div>
                        </div>
                      </div>

                    </div>

                  </Fieldset>
              </div>
          </div>
      );
  }
}

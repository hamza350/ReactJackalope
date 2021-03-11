import React, { Component } from 'react';
import classNames from 'classnames';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import {Fieldset} from 'primereact/components/fieldset/Fieldset';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import {AutoCompleteMultiClassCodes} from '../shared/AutoCompleteMultiClassCodes';
import {ExMod} from '../shared/ExMod';
import {CountiesMultiSelect} from '../shared/CountiesMultiSelect';
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
import { NinjaContext } from '../shared/Utils';

const utils = new Utils();
const fieldMarginRight = '0.7em'

export default class WcirbRangeSearch extends React.Component {

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
      this.getSelectedNinjaClasses = this.getSelectedNinjaClasses.bind(this);
      this.getSelectedCounties = this.getSelectedCounties.bind(this);
  }

  componentDidMount() {
    // let date = new Date();
    // date.setYear(1970);
    // date.setMonth(1);
    // date.setDate(1);
    // this.state.parentComponent.setState({effDateFrom: date});
    let initialData = this.context.initialData;
    let allCaliforniaCounties = initialData.allCaliforniaCounties.map(county => {
        return { label: " "+county, value: county };
      }
    );
    this.refs.refCounties.setListOfCounties(allCaliforniaCounties);
  }

  getSelectedNinjaClasses () {
    return this.refs.refAutoCompleteMultiClassCodes.getSelectedClasses();
  }

  getSelectedCounties () {
    return this.refs.refCounties.getSelectedCounties();
  }

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
      // rows.push([businessData[i].count, businessData[i].name, businessData[i].exModAndYear, businessData[i].address])
      const exModYear = businessData[i].exMod + '/' + businessData[i].exModYear;
      rows.push([businessData[i].name, exModYear, businessData[i].address])
    }

    let filename = "ninjarater_ExMods_" + utils.getCurrentTimeStampAsFileNamePrefix() + ".pdf";
    //let columns = ["#", "Bureau # - Business", "ExMod/Year", "Address"];
    let columns = ["Bureau # - Business", "ExMod/Year", "Address"];
    // let columns = ["#", "Bureau # - Business", "ExMod", "Year", "Address"];

    var pdf = new jsPDF('p', 'pt');
    var image = utils.getPdfNinjaImage();
    pdf.autoTable(columns, rows, {
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
                0: {columnWidth: 224},
                1: {columnWidth: 112},
                2: {columnWidth: 222},
                // etc
            },
            styles: {overflow: 'linebreak'}
        });

    pdf.save(filename);
  }

  getExModRangeFrom = () => {
    return this.refs.refFromExMod.getExModValue();
  }

  getExModRangeTo = () => {
    return this.refs.refToExMod.getExModValue();
  }

  exportToExcel(e) {
      const fileName = 'NinjaRater_' + utils.getCurrentTimeStampAsFileNamePrefix() + '.csv';
      this.state.csvFiles.push(<CSVDownload filename={fileName} data={this.state.parentComponent.state.csv.data} headers={this.state.parentComponent.state.csv.headers} target="_self"/>);
  }

  render() {

    let splitButtonItems = [
        {label: 'Create PDF', icon: 'ui-icon-picture-as-pdf', command: (event) => {this.asyncifyPDF(event)}}
    ];

      return (
          <div className="ui-g-12 no-padding" style={{width: '100%'}}>
              <NinjaProgressSpinner maxWidth="200px" maxHeight="200px" marginTop="-10px" />

              <div id="ID_WCIRB_BUSINESS_SEARCH" className="ui-g-12 no-padding" style={{width: '100%'}}>
                  <Fieldset legend="WCIRB Range Search">
                    <div className="ui-g no-padding" style={{width: '100%'}}>
                      <div className="ui-g-12 no-padding ui-md-2" style={{marginRight: fieldMarginRight}}>
                        <ExMod ref="refFromExMod" label="From ExMod" exModValue="0.70" fontSize="0.8em" fontSizeLabel="1.1em" /> 
                      </div>
                      <div className="ui-g-12 no-padding ui-md-2" style={{marginRight: fieldMarginRight}}>
                        <ExMod ref="refToExMod" label="To ExMod" exModValue="1.40" fontSize="0.8em" fontSizeLabel="1.1em" />
                      </div>
                      <div className="ui-g-12 no-padding ui-md-4" style={{marginRight: fieldMarginRight}}>
                          <span className="md-inputfield">
                              <InputText id="ID_WCIRB_CITY" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                                  onChange={(e) => this.state.parentComponent.setCity(e)}
                                  style={{fontSize: Constants.FONT_SIZE_DEFAULT, width: '100%'}}
                                  type="text"
                                  className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                              <label style={{fontSize: Constants.FONT_SIZE_LABALE_DEFAULT, fontWeight: 'Bold'}}>City</label>
                          </span>
                        </div>
                        <div className="ui-g-12 no-padding ui-md-1">
                          <span className="md-inputfield">
                              <InputText id="ID_WCIRB_ZIP" onKeyPress={this.state.parentComponent.findBusinessEnterKeyPressed}
                                  type="text"
                                  onChange={(e) => this.state.parentComponent.setZip(e)}
                                  style={{fontSize: Constants.FONT_SIZE_DEFAULT, width: '100%'}} keyfilter="pint" 
                                  className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                              <label style={{fontSize: Constants.FONT_SIZE_LABALE_DEFAULT, fontWeight: 'Bold'}}>Zip</label>
                          </span>
                        </div>
                      </div>
                    <br/>

                    <div className="ui-g no-padding" style={{width: '100%', padding: '0.4em'}}>
                      <AutoCompleteMultiClassCodes style={{width: '100%', fontSize: Constants.FONT_SIZE_LABALE_DEFAULT}} 
                         parentComponent={this}
                         id="ID_SalesLeads_ClassCodes" placeholder="Class Code(s)" ref="refAutoCompleteMultiClassCodes" />
                    </div>

                    <div className="ui-g no-padding" style={{width: '100%', padding: '0.4em'}}>
                      <CountiesMultiSelect ref="refCounties" label="California Counties" />
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
                            type="button" label="WCIRB Range Search" icon="ui-icon-search">
                          </Button>

                          <SplitButton className="amber-btn no-padding" type="button" label="Export to CSV" icon="ui-icon-save"
                            model={splitButtonItems} onClick={this.exportToExcel} icon="ui-icon-grid-on"
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

WcirbRangeSearch.propTypes = {};
WcirbRangeSearch.contextType = NinjaContext;
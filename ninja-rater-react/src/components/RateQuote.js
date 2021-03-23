import React, {Component} from "react";
import classNames from "classnames";
import "primereact/resources/primereact.min.css";
import "../assets/ninja/theme/theme-indigo.css";
import "../assets/ninja/layout/css/layout-indigo.css";
import {DataGrid} from "primereact/components/datagrid/DataGrid";
import {Dialog} from "primereact/components/dialog/Dialog";
import {Panel} from "primereact/components/panel/Panel";
import {Calendar} from "primereact/components/calendar/Calendar";
import {AutoComplete} from "primereact/components/autocomplete/AutoComplete";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import {Fieldset} from "primereact/components/fieldset/Fieldset";
import NumberFormat from "react-number-format";
import {NinjaRaterService} from "../service/NinjaRaterService";
import jQuery, { event } from "jquery";
import $ from "jquery";
import RatesUtility from "./shared/RatesUtility";
import UIRateUtility from "./shared/UIRateUtility";
import NinjaProgressSpinner from "./shared/NinjaProgressSpinner";
import Utils from "./shared/Utils";
import {Dropdown} from "primereact/components/dropdown/Dropdown";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import ClassCodeGroup from "./ClassCodeGroup";
import {Checkbox} from "primereact/components/checkbox/Checkbox";
//import * as jsPDF from 'jspdf-autotable';
import styles from "./RateQuote.module.scss";
import "../../src/App.css";
import data from './class-codes.json'
const utils = new Utils();
const DEFAULT_EXMOD = "1.00";

export class RateQuote extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      parentComponent: this.props.parentComponent,
      ninjaRaterApp: this.props.parentComponent.props.ninjaRaterApp,
      userInfo: {},
      RatesUtility: new RatesUtility(),
      selectedCar: null,
      visible: false,
      policyDate: new Date(),
      exModValue: DEFAULT_EXMOD,
      applyFilter: true,
      isHome: true,
      ninjaClassData: [],
      subCodesGroupedByClassCode: {},
      ninjaSicData: [],
      countriesData: [],
      NUM_CLASS_CODES: 1,
      reqCombo: {},
      classCodes: {},
      sicCodes: {},
      zipCodesCA: null,
      classCodeHtmlGroup: [],
      classCodeFilter: {},
      zipCodes: {},
      classCodeCombos: [
        {
          index: 0,
          name: "ccc_" + 0,
          classCode: "",
          subcode: "",
          payroll: 0,
          employees: 0,
          zipcode: 0,
          forms_ids: {
            class_code: "ID_CLASSCODE_1",
            subcode: "ID_SUBCODE_1",
            payroll: "ID_PAYROLL_INPUT_1",
            employees: "ID_NUM_EMPLOYEES_INPUT_1",
            zipcode: "ID_ZIPCODE_INPUT_1",
            siccode: "ID_SICCODE_1",
            cc: "ID_CC_GROUP_1",
            remove: "ID_REMOVE_BTN_1",
            auto_complete: "ID_AUTO_COMPLETE_1",
          },
        },
      ],
    };

    this.addClassCode = this.addClassCode.bind(this);
    this.removeClassCode = this.removeClassCode.bind(this);
    this.triggerQuote = this.triggerQuote.bind(this);
    this.classCodesTemplate = this.classCodesTemplate.bind(this);
    // this.getClassCodeGroup = this.getClassCodeGroup.bind(this);
    this.onClassCodeValueChange = this.onClassCodeValueChange.bind(this);
    this.filterClassCode = this.filterClassCode.bind(this);
    this.onPayrollValueChange = this.onPayrollValueChange.bind(this);
    this.onNumEmployeesValueChange = this.onNumEmployeesValueChange.bind(this);
    this.onZipCodeValueChange = this.onZipCodeValueChange.bind(this);
    this.onSicCodeValueChange = this.onSicCodeValueChange.bind(this);
    this.onSubCodeValueChange = this.onSubCodeValueChange.bind(this);
    this.checkAndCorrectExMod = this.checkAndCorrectExMod.bind(this);
    this.checkAndCorrectExModOnBlur = this.checkAndCorrectExModOnBlur.bind(this);
    this.applyFilterChanged = this.applyFilterChanged.bind(this);
    this.askInsuredName = this.askInsuredName.bind(this);
    this.successLogHistory = this.successLogHistory.bind(this);
    this.populateRateData = this.populateRateData.bind(this);

    this.ninjaRaterService = new NinjaRaterService();
  }

  compare(a, b) {
    let comparison = 0;

    if (a.classCode > b.classCode) {
      comparison = 1;
    } else if (b.classCode > a.classCode) {
      comparison = -1;
    }

    return comparison;
  }

   componentDidMount() {
    //Cross checking - No more use
    // this.ninjaRaterService.getStubbedClassCodes().then(data => this.setState({classCodes: data}));
    // this.ninjaRaterService.getStubbedSicCodes().then(data => this.setState({sicCodes: data}));
    // this.ninjaRaterService.getZipcodeCityCountyCA().then(data => this.setState({zipCodesCA:  utils.getZipCodes(data) }) );

    
      this.setState({
        ninjaClassData: this.state.RatesUtility.flattenClassCodes(data),
      });
      this.state.ninjaClassData.sort(this.compare);

    //Cross checking - No more use
    // this.ninjaRaterService.getStubbedClassCodes().then(data => this.setState(
    // {
    //   subCodesGroupedByClassCode: this.state.RatesUtility.groupSubCodesByClassCode(data)
    // }));

    // this.ninjaRaterService.getStubbedSicCodes().then(data => this.setState(
    // {
    //   ninjaSicData: this.state.RatesUtility.flattenSicCodes(data)
    // }));

    let refs = {
      UIRateUtility: this.refs.UIRateUtility,
    };
    this.setState({refs: refs});

    // const CC_GROUPS = $('[id^=ID_CC_GROUP_]');
    // for(let i = 0; i < CC_GROUPS.length; ++i) {
    //   let ccGroup = CC_GROUPS[i];
    //   $(ccGroup).css('outline', '1px solid lightgrey');
    // }
    
    this.state.isHome = true;
    if (this.props.parentComponent.props.ninjaRaterApp.state.prevSubData !=  '') {
        this.state.isHome = false;
        $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
        const fullObject = this.state.ninjaRaterApp.state.prevSubData ? JSON.parse(this.state.ninjaRaterApp.state.prevSubData['request']) : "";
        this.state.reqCombo  = fullObject['combo'];
    
        this.populateRateData();
    }
    
   
  }

  populateRateData() {
    setTimeout(() => {
        this.state.RatesUtility.onRecentQuoteClickNew(event, this, this.state.reqCombo, this.state.ninjaRaterApp);
        $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
    }, 1000);

  }

  checkAndCorrectExMod(e) {
    //e.preventDefault();
    let event = e;
    let target = e.target;
    if (!target) {
      event = e.originalEvent;
      target = e.originalEvent.target;
    }
    let exMod = target.value + "";
    exMod = exMod.trim();
    this.setState({exModValue: exMod});
  }

  askInsuredName(e) {
    const {showResults} = this.state.parentComponent.state;
    const { userInfo } = this.state.ninjaRaterApp.state.ninjaStore;
    this.state.userInfo = userInfo;
    if (showResults) {
      let insuredName = window.prompt("Please enter insured name");
      if (insuredName != null && insuredName != "") {
        //call log quote history
        $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
        const {ratesRequest} = this.state;
        let data = {
          startDate: ratesRequest.policyDate,
          combo: ratesRequest.combo,
          exModFactor: ratesRequest.exModFactor + "", //convert to string
          zipCode: ratesRequest.zipCode + "", //convert to string
          yrsInB: ratesRequest.yearsInBusiness + "", //convert to string
          yrsCredHist: ratesRequest.yearsOfCreditHistory + "", //convert to string
          applyFilter: ratesRequest.applyFilter + "", //convert to string
          numOfClaims: ratesRequest.numberOfClaims + "", //convert to string
          numOfEmpl: ratesRequest.numberOfEmployees, //integer
          logQuote: "true",
          callback: "JSON_CALLBACK",
          insuredName: insuredName,
        };
        let url = utils.getServicesUrl() + "/logQuoteHistory";
        utils.ajaxRequest(
          "POST",
          url,
          this.successLogHistory,
          this.errorLogHistory,
          data
        );
      } else {
        console.log("else");
      }
    }
  }

  successLogHistory(data) {
    $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
    this.state.ninjaRaterApp.refs.NinjaHeader.getAmountOfIndications(this.state.userInfo);
  }
  errorLogHistory(jqXHR, exception) {
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({pageErrorMessage: errorResponse});
    $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
  }
  checkAndCorrectExModOnBlur(e) {
    try {
      let exModValue = this.state.exModValue;
      if (!exModValue || exModValue.trim() == "") {
        exModValue = DEFAULT_EXMOD;
      }
      let exMod = parseFloat(exModValue);
      if (exMod > 5) {
        exMod = exMod / 100;
      }
      if (exMod == 0) {
        exMod = parseFloat(DEFAULT_EXMOD);
      }
      exModValue = exMod.toFixed(2) + "";
      this.setState({exModValue: exModValue});
    } catch (e) { }
  }

  onClassCodeValueChange(e, elementId, currentClassCodeCountIndex) {
    e = e[0];
    let thisDropdown = $("#" + elementId)[0];
    //let thisID = $(thisDropdown).prop('id');
    this.setState({
      ["classCode_" + elementId]: e.value,
      ["filteredClassCodes_" + elementId]: null,
    });
    //this.setState({ classCode: e.value, filteredClassCodes: null });
    let classCodeInt = null;
    try {
      classCodeInt = parseInt(e.value);
    } catch (e) { }
    if (!classCodeInt) {
      classCodeInt = parseInt(e.value.classCode);
    }
    let subCodes = this.state.RatesUtility.getSubCodesForClassCode(
      this.state.ninjaClassData,
      classCodeInt,
      this.state.subCodesGroupedByClassCode
    );
    debugger
    let ID_SUBCODE = "ID_SUBCODE_" + currentClassCodeCountIndex;
    let subCodeDomElement = document.getElementById(ID_SUBCODE);

    if (subCodes && subCodes.length > 0) {
      this.setState({["subCodeData_" + elementId]: subCodes});
      this.setState({["subCode_" + elementId]: subCodes[0]});
      this.setState({["subCode_" + ID_SUBCODE + "_empty"]: false});
    } else {
      this.setState({["subCodeData_" + elementId]: []});
      this.setState({["subCode_" + elementId]: ""});
      this.setState({["subCode_" + ID_SUBCODE + "_empty"]: true});
    }
  }

  onSicCodeValueChange(e, elementId) {
    e = e[0];
    this.setState({["sicCode_" + elementId]: e.value});
  }

  onSubCodeValueChange(e, elementId) {
    e = e[0];
    this.setState({["subCode_" + elementId]: e.value});
  }

  onPayrollValueChange(e, elementId) {
    e = e[0];
    e.preventDefault();
    let value = $("#" + elementId).val();
    this.setState({["payroll_" + elementId]: value});
  }

  onZipCodeValueChange(e, elementId) {
    e = e[0];
    try {
      e.preventDefault();
    } catch (e) { }
    // let value = $('#'+elementId).val();
    // this.setState({ ['zipCode_'+elementId]: value });

    var key = "zipCode_" + elementId;
    if (console) {
      console.log("ZIP KEY: " + key);
    }
    let value = $("#" + elementId).val();
    this.setState({[key]: value});
  }

  onNumEmployeesValueChange(e, elementId) {
    e = e[0];
    e.preventDefault();

    let value = $("#" + elementId).val();

    if (console) {
      console.log("ELEMENT: " + elementId);
      console.log("VALUE: " + value);
    }

    this.setState({["numEmployees_" + elementId]: value});
  }

  filterClassCode(event, elementId) {
    event = event[0];
    let results = this.state.ninjaClassData.filter((classCode) => {
      return classCode.longDescription
        .toLowerCase()
        .startsWith(event.query.toLowerCase());
    });
    if (results && results.length == 0) {
      results = this.state.ninjaClassData.filter((classCode) => {
        return classCode.longDescription
          .toLowerCase()
          .includes(event.query.toLowerCase());
      });
    }
    let key = "filteredClassCodes_" + elementId;
    this.state.classCodeFilter[key] = results;
    this.setState({key: results});
  }
  filterSicCode(event, elementId) {
    event = event[0];
    let results = this.state.ninjaSicData.filter((sicCode) => {
      return sicCode.longDescription
        .toLowerCase()
        .startsWith(event.query.toLowerCase());
    });
    if (results && results.length == 0) {
      results = this.state.ninjaSicData.filter((sicCode) => {
        return sicCode.longDescription
          .toLowerCase()
          .includes(event.query.toLowerCase());
      });
    }
    this.setState({["filteredSicCodes_" + elementId]: results});
  }

  addClassCode(e) {
    var id = this.state.NUM_CLASS_CODES + 1;
    this.state.classCodeCombos.push({
      index: id,
      name: "ccc_" + id,
      classCode: "",
      subcode: "",
      payroll: 0,
      employees: 0,
      zipcode: 0,
      forms_ids: {
        class_code: "ID_CLASSCODE_" + id,
        subcode: "ID_SUBCODE_" + id,
        payroll: "ID_PAYROLL_INPUT_" + id,
        employees: "ID_NUM_EMPLOYEES_INPUT_" + id,
        zipcode: "ID_ZIPCODE_INPUT_" + id,
        siccode: "ID_SICCODE_" + id,
        cc: "ID_CC_GROUP_" + id,
        remove: "ID_REMOVE_BTN" + id,
        auto_complete: "ID_AUTO_COMPLETE" + id,
      },
    });
    this.state.NUM_CLASS_CODES++;
  }

  removeClassCode = (event, ID_CC_GROUP) => {
    event = event[0];
    try {
      event.preventDefault();
    } catch (e) { }

    let classCodeDivToRemove = $("#" + ID_CC_GROUP)[0];
    if (console) {
      console.log("Removing: " + classCodeDivToRemove);
    }
    document
      .getElementById("ID_CLASSCODE_GROUPS")
      .removeChild(classCodeDivToRemove);
  };

  classCodesTemplate(item) {
    if (!item) {
      return;
    }

    return (
      <div>
        <div className="ui-g-12 no-padding">
          <div className="ui-g-12" style={{paddingTop: "20px"}}>
            <div className="ui-g-12 no-padding" style={{marginBottom: "7px"}}>
              <div className="ui-g-12 ui-md-2 no-padding">
                <Button
                  className="amber-btn no-padding"
                  onClick={this.addClassCode}
                  type="button"
                  style={{fontSize: "0.8em", fontWeight: "bald"}}
                  label="Add Class Code"
                  icon="ui-icon-add"
                ></Button>
              </div>
            </div>
            <div className="ui-g-12 ui-md-12 no-padding">
              <div
                id="ID_CLASSCODE_GROUPS"
                className="ui-g-12 ui-md-12 no-padding"
              >
                // {this.getClassCodeGroup()}
                {/*<ClassCodeGroup parentComponent={this} />*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  removeClassCodeBTN = (index, e) => {
    if (this.state.classCodeCombos.length <= 1) {
      alert("1 class code group must be present to run quote");
      return;
    }

    var removeIdx = this.state.classCodeCombos.findIndex(function (ccc) {
      return ccc.index == index;
    });

    if (removeIdx != null) {
      console.log("removing: " + removeIdx);
      this.state.classCodeCombos.splice(removeIdx, 1);
    }
  };

  calendarAndExModTemplate(item) {
    if (!item) {
      return;
    }

    return (
      <div className="ui-g-12 no-padding">
        <fieldset>
        <div className="form-row">
          <div className="col-md-3 mb-3">
              <label htmlFor="DesiredEffectiveDate">Desired Effective Date:</label>
              <input type="date" style={{ marginBottom: '0', height: '30px'}} data-date-format="mm/dd/yyyy" className="datepicker form-control form-control-sm" id="ID_POLICY_DATE_INPUT" value={this.state.policyDate} onChange={(e) => this.setState({ policyDate: e.value })}/>
              <small id="DesiredEffectiveDate" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
        </fieldset>
      </div>
    );
  }

  triggerQuote(e, logQuote) {
    let ratesRequest = this.state.refs.UIRateUtility.getRatesRequest();
    ratesRequest.logQuote = logQuote;
    this.setState({ratesRequest: ratesRequest});
    ratesRequest.applyFilter = this.state.applyFilter;
    this.state.parentComponent.runQuote(ratesRequest, e);
  }

  applyFilterChanged(e) {
    try {
      e.preventDefault();
    } catch (e) { }
    if (this.state.applyFilter) {
      this.state.applyFilter = false;
    } else {
      this.state.applyFilter = true;
    }
  }

  render() {
    return (
      <div id="main" className="sidebar-none sidebar-divider-vertical">
        <div className="wf-wrap">
          <div className="wf-container-main">
            <div id="content" className="content" role="main">
              <UIRateUtility ref="UIRateUtility" RateQuote={this} />

              <NinjaProgressSpinner
                maxWidth="200px"
                maxHeight="200px"
                marginTop="-10px"
              />
              <div>
              <fieldset id="rateQuote_one" className="col-md">
                  <div className="row">
                <div className="col-md">
                  <div className="form-group" style={{ marginBottom: "0" }}>
                    <label className="required" style={{ marginBottom: "0" }}>Desired Effective Date</label>
                  </div>
                  <Calendar
                    id="ID_POLICY_DATE_INPUT"
                    readOnly="true"
                    value={this.state.policyDate}
                    onChange={(e) => this.setState({ policyDate: e.value })}
                  ></Calendar>
                </div>

                <div className="col-md">
                  <div className="form-group" style={{ marginBottom: "0" }}>
                    <label className="required" style={{ marginBottom: "0" }}>ExMod</label>
                    <InputText
                      type="text"
                      id="ID_EXMOD_INPUT"
                      ref="ID_EXMOD_INPUT"
                      className="form-control"
                      id="ex-mod-input"
                      //defaultValue={this.state.exModValue}
                      value={this.state.exModValue}
                      keyfilter="num"
                      onChange={(event) => this.checkAndCorrectExMod(event)}
                      onBlur={this.checkAndCorrectExModOnBlur}
                      size="3"
                    />
                    <small className="mt-0 form-text text-muted">Please use #.## format. If you do not know the Exmod, please enter 1.00</small>
                  </div>
                    </div>
                </div>
                </fieldset>
              </div>
                    {this.state.classCodeCombos.map((ccc, index) => (
                      <div
                        key={index}
                        id={ccc.forms_ids.cc}
                        >
                        <fieldset id="rateQuote" className="col-md">
                          <div className="row">
                         
                        <div className="col-md">
                            <div className="form-group" style={{ marginBottom: "0" }}>
                              <label className="required" style={{ marginBottom: "0" }}>Class Code</label>
                            </div>
                            <AutoComplete
                              inputClassName="form-control class-code"
                              className="form-group"
                              minLength={1}
                              id={ccc.forms_ids.auto_complete}
                              size={this.state.ninjaClassData.length}
                              field="longDescription"
                              suggestions={
                                this.state.classCodeFilter[
                                "filteredClassCodes_" + ccc.forms_ids.class_code
                                ]
                              }
                              completeMethod={(e) => {
                                this.filterClassCode([e], ccc.forms_ids.class_code);
                              }}
                              value={
                                this.state["classCode_" + ccc.forms_ids.class_code] ||
                                ""
                              }
                              onChange={(e) => {
                                this.onClassCodeValueChange(
                                  [e],
                                  ccc.forms_ids.class_code,
                                  this.state.NUM_CLASS_CODES
                                );
                              }}
                            />
                            <small className="mt-0 form-text text-muted">Type 'a' or '9709'</small>
                          </div>
                          <div className="col-md">
                            <div className="form-group" style={{ marginBottom: "0" }}>
                              <label className="required" style={{ marginBottom: "0" }}>Payroll</label>
                            </div>
                              <NumberFormat
                                id={ccc.forms_ids.payroll}
                                className="form-control"
                                value={
                                  this.state["payroll_" + ccc.forms_ids.payroll] || ""
                                }
                                thousandSeparator={true}
                                prefix={"$"}
                                onChange={(e) => {
                                  this.onPayrollValueChange(
                                    [e],
                                    ccc.forms_ids.payroll,
                                    this.state.NUM_CLASS_CODES
                                  );
                                }}
                                className="form-control ui-corner-all ui-state-default ui-widget payroll"
                              />
                            
                          </div>
                          </div>
                          <div className="row">

                          <div className="col-md">
                            <div className="form-group" style={{ marginBottom: "0" }}>
                              <label className="required" style={{ marginBottom: "0" }}>Number of Employees</label>
                            </div>
                            
                            <InputText
                              id={ccc.forms_ids.employees}
                              type="text"
                              onChange={(e) => {
                                this.onNumEmployeesValueChange(
                                  [e],
                                  ccc.forms_ids.employees,
                                  this.state.NUM_CLASS_CODES
                                );
                              }}
                              keyfilter="int"
                              value={
                                this.state[
                                "numEmployees_" + ccc.forms_ids.employees
                                ] || ""
                              }
                              className="form-control ui-corner-all ui-state-default ui-widget"
                            />
                
                          </div>
                       
                          <div className="col-md">
                            <div className="form-group" style={{ marginBottom: "0" }}>
                              <label className="required" style={{ marginBottom: "0" }}>Zipcode</label>
                            </div>       
                              <InputText
                                id={ccc.forms_ids.zipcode}
                                type="text"
                                onChange={(e) => {
                                  this.onZipCodeValueChange(
                                    [e],
                                    ccc.forms_ids.zipcode,
                                    this.state.NUM_CLASS_CODES
                                  );
                                }}
                                className="form-control ui-corner-all ui-state-default ui-widget"
                                value={
                                  this.state["zipCode_" + ccc.forms_ids.zipcode] || ""
                                }
                                keyfilter="int"
                              />
                          </div>
                        </div>


                        <div className="ui-g-12 ui-md-12">
                          <Button
                            disabled={
                              this.state.parentComponent.state.userMustSubscribe
                            }
                            id={ccc.forms_ids.remove}
                            className={[
                              "red-btn",
                              "no-padding",
                              "commonButtonClass",
                              "remove-class-code-btn",
                              styles.removeBtn,
                            ].join(" ")}
                            onClick={this.removeClassCodeBTN.bind(this, ccc.index)}
                            type="button"
                            style={{
                              float: "right"
                            }}
                            label="Remove"
                          ></Button>
                        </div>
                        </fieldset>
                      </div>
                    ))}
                  
                  <div
                    className="ui-g-12 no-padding"
                    style={{textAlign: "center", marginTop: "10px"}}
                  >
                    <Button
                      className={[
                        "amber-btn",
                        "no-padding",
                        "commonButtonClass",
                        styles.removeBtn,
                        styles.buttonContainer,
                      ].join(" ")}
                      onClick={this.addClassCode}
                      type="button"
                      disabled={this.state.parentComponent.state.userMustSubscribe}
                      label="Add a Class Code"
                    ></Button>
                    <Button
                      className={[styles.removeBtn, styles.buttonContainer, "commonButtonClass"].join(" ")}
                      onClick={(e) => {
                        this.askInsuredName(e, true);
                      }}
                      type="button"
                      label=" Save "
                      style={{
                       
                        display: (this.state.parentComponent.state.showResults && this.state.parentComponent.state.rateRowData.length)
                          ? "inline"
                          : "none",
                      }}
                      disabled={this.state.parentComponent.state.userMustSubscribe}
                    ></Button>
                    <Button
                      className={[styles.removeBtn, styles.buttonContainer, "commonButtonClass"].join(" ")}
                      onClick={(e) => {
                        this.triggerQuote(e, true);
                      }}
                      type="button"
                      label="Run Indication"
                      disabled={this.state.parentComponent.state.userMustSubscribe}
                    ></Button>
                    <Button
                      className={["amber-btn", "no-padding", "commonButtonClass", styles.removeBtn].join(
                        " "
                      )}
                      onClick={this.state.parentComponent.createRatesPDF}
                      type="button"
                      style={{
                       
                        float: "right",
                        display: (this.state.parentComponent.state.showResults && this.state.parentComponent.state.rateRowData.length)
                          ? "block"
                          : "none",
                      }}
                      label="Create PDF"
                    ></Button>
                  </div>
                
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

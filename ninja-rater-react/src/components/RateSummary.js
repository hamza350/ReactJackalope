import React, { Component } from "react";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";

import classNames from "classnames";
import "../App.css";
import { Button } from "primereact/components/button/Button";
import { InputText } from "primereact/components/inputtext/InputText";
import { DataGrid } from "primereact/components/datagrid/DataGrid";
import { NinjaRaterService } from "../service/NinjaRaterService";
import jQuery from "jquery";
import $ from "jquery";
import dt from "datatables.net";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "foundation-sites/dist/css/foundation.min.css";
import "foundation-sites/dist/css/foundation-float.min.css";
import "foundation-sites/dist/css/foundation-prototype.min.css";
import "foundation-sites/dist/css/foundation-rtl.min.css";
import "datatables.net-dt/css/jquery.dataTables.css";
import "bootstrap/dist/css/bootstrap.css";
import "datatables.net-bs/js/dataTables.bootstrap";
import "datatables.net-bs/css/dataTables.bootstrap.css";
//import 'datatables.net-dt/css/jquery.datatables.css';
import Utils from "./shared/Utils";
import RatesUtility from "./shared/RatesUtility";
import styles from "./RateQuote.module.scss";
import * as Constants from "../Constants";

const utils = new Utils();
const ratesUtility = new RatesUtility();

export default class RateSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentComponent: this.props.parentComponent,
      rateRowData: [],
      ratesResponse: {},
    };
    //this.ninjaRaterService = new NinjaRaterService();
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.setQuoteData = this.setQuoteData.bind(this);
    // this.requestBigFoot = this.requestBigFoot.bind(this);
    this.runAnotherIndication = this.runAnotherIndication.bind(this);
    this.contactPage = this.contactPage.bind(this);
    this.bigFoot = this.bigFoot.bind(this);
  }

  componentDidMount() {
    /*this.ninjaRaterService.getStubbedRateResults().then(
        data => this.initializeData(data)
      );*/
    $(".ui-datatable-tablewrapper").css({ "font-size": "x-small" });
    $(".ui-datatable-reflow")
      .addClass("run-indication-main")
      .removeClass("ui-datatable-reflow");
  }

  setQuoteData(rateRowData, ratesResponse) {
    this.setState({ rateRowData: rateRowData });
    this.setState({ ratesResponse: ratesResponse });
  }

  runAnotherIndication() {
    window.location.reload();
  }
  contactPage() {
    const url = "https://myjackalope.com/contact-us/";
    var win = window.open(url, "_blank");
    win.focus();
  }

  bigFoot() {
    const url = "https://commercialinsurance.surefyre.co/accounts/login/";
    var win = window.open(url, "_blank");
    win.focus();
  }

  rowExpansionTemplate(data) {
    let company = data.company;
    let naic = data.naic;
    let companyData = this.state.ratesResponse[naic];
    let premiumAppetite = companyData.premiumAppetiteDTOs[0];
    let filterGroupCode = premiumAppetite.filter_group_code;
    let lineItems = utils.mapToArray(companyData.headerLineitems);
    let items = utils.mapToArray(companyData.items);
    let companyRates = this.state.rateRowData;
    {
      /*let bgColor = ratesUtility.getBackgroundColorByAppetite(data.appetite);*/
    }
    let cssClass = ratesUtility.getCssClassByAppetite(data.appetite);
    let estimateAnnualUnmodifiedPremium = utils.formatNumber(
      companyData.premiumData.estimateAnnualUnmodifiedPremium
    );
    let modifiedPremium = utils.formatNumber(
      companyData.premiumData.modifiedPremium
    );
    let listOfCssClasses = "ui-g ui-fluid no-padding " + cssClass;

    var src =
      "assets/ninja/images/CompanyLogosByParentId/" + filterGroupCode + ".png";

    return (
      <div
        className={listOfCssClasses}
        style={{ borderTop: 0, borderRadius: "7px" }}
      >
        <div className="ui-g no-padding" style={{ width: "100%" }}>
          <div className="ui-g-12 no-padding" style={{ width: "100%" }}>
            <div
              className="ui-g-12 no-padding"
              style={{ width: "100%", marginTop: "5px" }}
            >
              <div className="ui-g-12 ui-md-3 no-padding">
                {/* <img
                  src={src}
                  alt={company}
                  style={{ width: "100%", float: "left" }}
                /> */}
              </div>
              <div className="ui-g-12 ui-md-9 no-padding">
                <div className="ui-g-12">
                  <div
                    className="ui-g-12 ui-md-6"
                    style={{ border: "1px solid", borderRadius: "5px" }}
                  >
                    <p className={styles.sub_text}>
                      {" "}
                      Parent Company: {company}
                    </p>
                  </div>
                  <div
                    className="ui-g-12 ui-md-6"
                    style={{ border: "1px solid", borderRadius: "5px" }}
                  >
                    <p className={styles.sub_text}>
                      Subsidiary: {premiumAppetite.subsidary_name}
                    </p>
                  </div>
                </div>
                <div className="ui-g-12">
                  <div
                    className="ui-g-12 ui-md-3"
                    style={{ border: "1px solid", borderRadius: "5px" }}
                  >
                    <p className={styles.sub_text}>
                      Base Rate: {premiumAppetite.rate}%
                    </p>
                  </div>
                  <div
                    className="ui-g-12 ui-md-5"
                    style={{
                      textAlign: "center",
                      border: "1px solid",
                      borderRadius: "5px",
                    }}
                  >
                    <p className={styles.sub_text}>
                      Accepts Business:{" "}
                      {premiumAppetite.accept_business == "Y"
                        ? "YES"
                        : premiumAppetite.accept_business == "N"
                        ? "NO"
                        : "MAYBE"}
                    </p>
                  </div>
                  <div
                    className="ui-g-12 ui-md-4"
                    style={{ border: "1px solid", borderRadius: "5px" }}
                  >
                    <p className={styles.sub_text}>
                      Class Code(s): {premiumAppetite.code}
                    </p>
                  </div>
                </div>
                <div className="ui-g-12">
                  <div
                    className="ui-g-12 ui-md-6"
                    style={{ border: "1px solid", borderRadius: "5px" }}
                  >
                    <p className={styles.sub_text}>
                      Total Manual Premium: ${estimateAnnualUnmodifiedPremium}
                    </p>
                  </div>
                  <div
                    className="ui-g-12 ui-md-6"
                    style={{ border: "1px solid", borderRadius: "5px" }}
                  >
                    <p className={styles.sub_text}>
                      Total Estimated Premium: ${modifiedPremium}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="ui-g-12 no-padding">
              <div
                className="ui-g-12 ui-md-5 no-padding"
                style={{ paddingRight: "7px" }}
              >
                <div
                  className="ui-g-12"
                  style={{ textAlign: "left !important" }}
                >
                  <span
                    style={{
                      float: "left",
                      fontStyle: "italic",
                      color: "black",
                    }}
                  >
                    <u className={styles.line_items}>LINE ITEMS</u>
                  </span>
                </div>
                {lineItems.map((item, i) => (
                  <div
                    className="ui-g-12 no-padding"
                    style={{ border: "1px solid", borderRadius: "5px" }}
                    key={i}
                  >
                    <div className="ui-g-12 ui-md-6 ui-lg-9">
                      {utils.cleanLineItemKey(item.key)}
                    </div>
                    <div className="ui-g-12 ui-md-6 ui-lg-3">
                      {utils.cleanLineItemMoney(item.value)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ui-g-12 ui-md-7 no-padding">
                <div
                  className="ui-g-12"
                  style={{ textAlign: "left !important" }}
                >
                  <span
                    style={{
                      float: "left",
                      fontStyle: "italic",
                      color: "black",
                    }}
                  >
                    <u className={styles.line_items}>ITEMS</u>
                  </span>
                </div>

                {items.map(
                  (item, i) =>
                    i + 1 < items.length && (
                      <div className="ui-g-12 no-padding" key={i}>
                        <div
                          className="ui-g-12 ui-md-6"
                          style={{ border: "1px solid", borderRadius: "5px" }}
                        >
                          <div className="ui-g-12 ui-md-8 no-padding">
                            {utils.cleanLineItemKey(item.key)}
                          </div>
                          <div className="ui-g-12 ui-md-4 no-padding">
                            $
                            {utils.formatNumber(
                              utils.formatNumber(
                                utils.filterNonNumeric(item.value)
                              )
                            )}
                          </div>
                        </div>
                        <div
                          className="ui-g-12 ui-md-6"
                          style={{
                            border:
                              i + 1 <= items.length && items[i + 1]
                                ? "1px solid"
                                : "",
                            borderRadius:
                              i + 1 <= items.length && items[i + 1]
                                ? "5px"
                                : "",
                          }}
                        >
                          <div className="ui-g-12 ui-md-8 no-padding">
                            {i + 1 <= items.length &&
                              items[i + 1] &&
                              utils.cleanLineItemKey(items[i + 1].key)}
                          </div>
                          <div className="ui-g-12 ui-md-4 no-padding">
                            {i + 1 <= items.length &&
                              items[i + 1] &&
                              "$" +
                                utils.formatNumber(
                                  utils.formatNumber(
                                    utils.filterNonNumeric(items[i + 1].value)
                                  )
                                )}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSelectedRow(e, data) {
    //alert('Selected Row');
    //var table = this.refs.ratesDataTable;
    //this.setState({dataTableSelectValue: e.data});
    this.setRowStyles(e.originalEvent);
    this.setState({ expandedRows: [e.data] });
  }

  setRowStyles(e) {
    let selectedRowIndex = e.currentTarget.sectionRowIndex;
    let tbody = e.currentTarget.parentElement;
    {
      /*let backgroundElement = tbody.childNodes[selectedRowIndex];
      let appetite = backgroundElement.children[3].innerText;
      let backGroundColor = ratesUtility.getBackgroundColorByAppetite(appetite);
      backgroundElement.firstChild.style.backgroundColor = backGroundColor;*/
    }
    let numRows = tbody.childElementCount;
    for (var i = 0; i < numRows; ++i) {
      let row = tbody.children[i];
      if (i == selectedRowIndex) {
        row.style.fontStyle = "italic";
      } else {
        row.style.fontStyle = "";
      }
    }
  }

  onRowSelect(e, data) {
    //e.originalEvent.currentTarget.style.fontStyle = 'italic';
  }

  onRowUnselect(e, data) {
    //e.originalEvent.currentTarget.style.fontStyle = '';
  }

  onRowToggle(e, data) {
    //this.setState({dataTableSelectValue: e.data});
    this.setState({ expandedRows: e.data });
  }

  rowClassName(rowData) {
    let appetite = rowData.appetite;
    if (appetite == "Maybe") {
      return { "ui-row-background-yellow": true };
    }
    if (appetite == "NO") {
      return { "ui-row-background-red": true };
    }

    return { "ui-row-background-green": true };
  }

  companyColumnTemplate(rowData, column) {
    let company = rowData.company;
    let naic = rowData.naic;
    let filterGroupCode = rowData.filterGroupCode;
    let src =
      "assets/ninja/images/CompanyLogosByParentId/" + filterGroupCode + ".png";
    return (
      <div className="no-padding">
        <span style={{ verticalAlign: "-webkit-baseline-middle" }}>
          {company}
        </span>{" "}
      </div>
    );
    //return <div className="no-padding"><span style={{verticalAlign: '-webkit-baseline-middle'}}>{company}</span> <img src={src} style={{width: '75px', height: '37px', float: 'right'}} /></div>;
  }

  render() {
    const { rateRowData } = this.state;
    return (
      <div>
        {rateRowData && rateRowData.length > 0 && (
          <div
            className="ui-g-12 no-padding"
            style={{ width: "100%", marginTop: "15px" }}
          >
            <DataTable
              ref="ratesDataTable"
              header="Rates By Company Appetite"
              emptyMessage="No Quotes Available"
              selectionMode="single"
              //responsive={true}
              rowClassName={this.rowClassName}
              value={this.state.rateRowData}
              expandedRows={this.state.expandedRows}
              //onRowSelect={(e) => this.onRowSelect(e, e.data)}

              //onRowUnselect={(e) => this.onRowUnselect(e, e.data)}

              onRowToggle={(e) => this.onRowToggle(e, e.data)}
              //onRowToggle={(e) => this.setState({expandedRows:e.data})}

              onSelectionChange={(e) => this.onSelectedRow(e, e.data)}
              //onSelectionChange={(e) => this.setState({dataTableSelectValue: e.data})}

              selection={this.state.dataTableSelectValue}
              expandableRow={true}
              loadingIcon="fa-circle-o-notch"
              rowExpansionTemplate={this.rowExpansionTemplate}
            >
              <Column
                expander={true}
                style={{
                  width: "2.3em",
                  fontWeight: "bald",
                  fontSize: "1em",
                }}
              />
              <Column
                field="company"
                header="Company"
                style={{ fontSize: "1em" }}
                sortable={true}
                body={this.companyColumnTemplate}
              />
              <Column
                field="premium"
                header="Premium"
                style={{ fontSize: "1em" }}
                sortable={true}
              />
              <Column
                field="appetite"
                header="Accepts Business"
                style={{ fontSize: "1em" }}
                sortable={true}
              />
            </DataTable>
          </div>
        )}
        {rateRowData && rateRowData.length <= 0 && (
          <React.Fragment>
            <div style={{ border: "solid 1px", marginTop: "1%" }}>
              <div style={{ padding: "4% 13%" }}>
                <p style={{ textAlign: "center", color: "black" }}>
                  Sorry for the inconvenience, it looks like the class code(s)
                  you listed are ineligible for an instant indication.
                  Jackalope’s list of carriers cannot find an appetite for this
                  risk.
                </p>
                <p
                  style={{
                    textAlign: "center",
                    // width: "87%",
                    // marginLeft: "8%",
                    color: "black",
                  }}
                >
                  If you would like to submit a workers’ compensation
                  application through Bigfoot Insurance, please click 'Request a
                  quote from Bigfoot'.
                </p>
                <p style={{ textAlign: "center", color: "black" }}>
                  Thank you!
                </p>
                <div
                  className="ui-g-12 no-padding"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  <Button
                    className={[
                      "amber-btn",
                      "no-padding",
                      "commonButtonClass",
                      styles.requestBtn,
                      styles.buttonContainer,
                    ].join(" ")}
                    onClick={this.bigFoot}
                    type="button"
                    // style={{fontSize: '0.8em', fontWeight: 'bald'}}
                    disabled={
                      this.state.parentComponent.state.userMustSubscribe
                    }
                    label="Request a quote from Bigfoot"
                  ></Button>
                  <Button
                    className={[
                      styles.removeBtn,
                      styles.buttonContainer,
                      "commonButtonClass",
                    ].join(" ")}
                    onClick={this.runAnotherIndication}
                    type="button"
                    // style={{fontSize: '1em'}}
                    label="Run another indication"
                    style={{
                      fontSize: "0.8em",
                      fontWeight: "bold",
                    }}
                    disabled={
                      this.state.parentComponent.state.userMustSubscribe
                    }
                  ></Button>
                </div>
                <img
                  className=" preload-me"
                  src="https://myjackalope.com/wp-content/uploads/2020/10/OPT117x77.png"
                  height="77"
                  sizes="117px"
                  alt="Jackalope"
                  className={styles.img_logo_style}
                />
                <p style={{ color: "black", fontWeight: "bold" }}>
                  Have questions? Contact the Jackalope team
                  <span
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={this.contactPage}
                  >
                    {" "}
                    HERE!
                  </span>
                </p>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

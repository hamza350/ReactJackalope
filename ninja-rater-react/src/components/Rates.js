import React, { Component } from "react";
import classNames from "classnames";
import "nanoscroller";
import * as Constants from "../Constants";
import { RateQuote } from "./RateQuote";
import RateSummary from "./RateSummary";
import { NinjaRaterService } from "../service/NinjaRaterService";
import MenuUtility from "./shared/MenuUtility";
import jQuery from "jquery";
import $ from "jquery";
import Utils from "./shared/Utils";
import { NinjaContext } from "./shared/Utils";
import RatesUtility from "./shared/RatesUtility";
import UserActivity from "./shared/UserActivity";
import NinjaProgressSpinner from "./shared/NinjaProgressSpinner";
//import 'bootstrap/dist/css/bootstrap.css';
import * as jsPdfAutoTable from "jspdf-autotable";
import * as jsPDF from "jspdf";
import { DataTable } from "primereact/components/datatable/DataTable";
import { Column } from "primereact/components/column/Column";

const utils = new Utils();
const ratesUtility = new RatesUtility();

export class Rates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      rateRowData: [],
      ratesResponse: {},
      MenuUtility: new MenuUtility(),
      ninjaRaterApp: this.props.ninjaRaterApp,
      errorResponse: null,
    };
    this.runQuote = this.runQuote.bind(this);
    this.showRateResults = this.showRateResults.bind(this);
    this.hideRateResults = this.hideRateResults.bind(this);
    this.runQuoteError = this.runQuoteError.bind(this);
    this.initializeRatesResponseData = this.initializeRatesResponseData.bind(
      this
    );
    this.createRatesPDF = this.createRatesPDF.bind(this);
    this.enableRateQuoteInputs = this.enableRateQuoteInputs.bind(this);
    this.disableRateQuoteInputs = this.disableRateQuoteInputs.bind(this);
  }

  componentWillUnmount() {}

  componentDidMount() {
    // $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    let menuItem = $("#ID_RATES_MENU_ITEM")[0];
    this.state.MenuUtility.toggleMenuItemTabs(menuItem);
    //alert('Rates: ninjaRaterApp: '+this.state.ninjaRaterApp);

    let userInfo = this.context.userInfo;
    // let daysLeft = utils.daysLeftForTrialUser(userInfo);
    // let allowRateQuote = userInfo.subscriber || daysLeft > 0;
    let allowRateQuote = true;
    if (!allowRateQuote) {
      this.setState({ userMustSubscribe: true });
      let userMsg = userInfo.firstName + ", please subscribe to run a quote!";
      this.setState({ mustSubscribeMessage: userMsg });
    }

    let refs = {
      RateQuote: this.refs.RateQuote,
      rateSummary: this.refs.rateSummary,
    };
    this.setState({ refs: refs });
  }

  showRateResults(data, status, response) {
    $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
    //$('#ID_RATE_QUOTE').show();
    this.enableRateQuoteInputs();
    this.setState({ showResults: true });
    this.setState({ pageErrorMessage: null });
    $("#ID_RATES_SUMMARY").show();
    this.initializeRatesResponseData(data);
  }

  enableRateQuoteInputs() {
    $("#ID_RATE_QUOTE")
      .find("input, textarea, button, select, span")
      .prop("disabled", false);
  }

  disableRateQuoteInputs() {
    //$('#ID_POLICY_DATE_INPUT').prop('disabled',true);
    $("#ID_RATE_QUOTE")
      .find("input, textarea, button, select, span")
      .prop("disabled", true);

    //jquery find not working for dynamic content
    // let numClassCodes = this.refs.RateQuote.state.NUM_CLASS_CODES;
    // for(let k = 1; k <= numClassCodes; ++k) {
    //   $('#ID_CC_GROUP_'+k).find('input, textarea, button, select, span').prop('disabled',true);
    // }
    //alert('NUM_CLASS_CODES: '+numClassCodes);

    ////$('[id*="ID_CC_GROUP"]').find('input, textarea, button, select').prop('disabled',true);
    // let listOfElements = $('[id*="ID_CC_GROUP"]').find('input, textarea, button, select');
    // for(let i = 0; i < listOfElements.length; ++i) {
    //   let element = listOfElements[i];
    //   $(element).prop('disabled',true);
    // }
  }

  hideRateResults() {
    //$('#ID_RATES_SUMMARY').hide();
    $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    //$('#ID_RATE_QUOTE').hide();
    this.disableRateQuoteInputs();
    this.setState({ showResults: false });
    this.setState({ pageErrorMessage: null });
  }

  runQuote(ratesRequest, event) {
    // if(this.state.userMustSubscribe) {
    //   return;
    // }

    if (
      !ratesUtility.isRatesRequestValid(ratesRequest, this.refs.RateQuote, this)
    ) {
      $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
      return;
    }

    ratesRequest.combo = utils.getRatesRequestCombo(ratesRequest);
    this.setState({ ratesRequest: ratesRequest });

    let requestUri = utils.ratesRequesToUri(ratesRequest);
    let url = utils.getServicesUrl() + requestUri;
    this.hideRateResults();
    this.setState({ logQuote: ratesRequest.logQuote });
    //alert('BEFORE: this.state.logQuote = '+this.state.logQuote);
    utils.ajaxRequest("GET", url, this.showRateResults, this.runQuoteError);
  }
  runQuoteError(jqXHR, exception) {
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    this.setState({ pageErrorMessage: null });
    this.setState({ showResults: true });
    $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
    $("#ID_RATES_SUMMARY").show();
    $("#ID_RATE_QUOTE").show();
    this.enableRateQuoteInputs();
    this.initializeRatesResponseData({});
    //alert(errorResponse);
  }
  initializeRatesResponseData(data) {
    let rateRowData = ratesUtility.processRates(data);
    this.setState({ rateRowData: rateRowData });
    this.setState({ ratesResponse: data });

    if (this.refs.rateSummary) {
      this.refs.rateSummary.setQuoteData(rateRowData, data);
      //this.setState({showResults: true});
    } else {
      //this.refs.rateSummary = new RateSummary({parentComponent: this});
      //this.refs.rateSummary.setQuoteData(rateRowData, data);

      this.state.refs.rateSummary.setQuoteData(rateRowData, data);
      //this.setState({showResults: true});
    }

    //alert('AFTER: this.state.logQuote = '+this.state.logQuote);
    if (this.state.logQuote) {
      ratesUtility.addRecentQuote(
        this.state.ninjaRaterApp,
        this.state.ratesRequest
      );
      // commented to prevent saving loghistory automatically
      // ratesUtility.logQuoteHistory(this.state.ratesRequest);
    }
  }

  createRatesPDF() {
    let combo = this.state.ratesRequest.combo;
    let filename =
      "Jackalope_" +
      this.state.ratesRequest.combo.substr(0, combo.indexOf(",")) +
      "_" +
      new Date().getTime() +
      ".pdf";
    let columns = ["Company", "Premium", "Accepts Business"];
    let rateData = this.state.rateRowData;

    var rows = [];

    for (var i = 0; i < rateData.length; i++) {
      rows.push([
        rateData[i].company,
        rateData[i].premium,
        rateData[i].appetite,
      ]);
    }

    var pdf = new jsPDF("p", "pt");
    var image = utils.getPdfNinjaImage();
    pdf.autoTable(columns, rows, {
      theme: "striped",
      margin: { top: 120 },
      addPageContent: function (data) {
        pdf.addImage(image, "PNG", 35, 45);
        pdf.setFontSize(26);
        pdf.text(utils.getNinjaterInfo().name, 119, 70);
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text(utils.getNinjaterInfo().email, 119, 85);
        pdf.text(utils.getNinjaterInfo().twitter, 119, 100);
      },
      drawRow: function (row, data) {
        var acceptBusiness = row.cells["2"].raw;
        if (acceptBusiness == "NO") {
          row.cells["2"].styles.textColor = [200, 0, 0];
        } else if (acceptBusiness == "YES") {
          row.cells["2"].styles.textColor = [0, 200, 0];
          row.cells["1"].styles.fontStyle = "bold";
          row.cells["0"].styles.fontStyle = "bold";
        }
      },
    });

    pdf.save(filename);
  }

  render() {
    const subscribeLinkStyle = {
      css: {
        color: "#e72564",
        textAlign: "center",
        fontSize: "26px",
        cursor: "pointer",
      },
    };

    return (
      <div id="ID_COMPONENT_RATES" className="ui-g-12 no-padding" id="DIV_RATES_PAGE_ID">
        <RateQuote ref="RateQuote" parentComponent={this} />

        <div
          className="ui-g-12 no-padding"
          id="ID_RATES_ERROR"
          style={{ display: this.state.pageErrorMessage ? "block" : "none" }}
        >
          <div
            className="ui-g-12 no-padding"
            style={{ width: "100%", marginTop: "15px" }}
          >
            <DataTable
              ref="ratesDataTable"
              header="Rates By Company Appetite"
              emptyMessage={this.state.pageErrorMessage}
              selectionMode="single"
            >
              <Column
                expander={true}
                style={{
                  width: "2.3em",
                  fontWeight: "bald",
                  fontSize: "1.5em",
                  fontFamily:"sans-serif"
                }}
              />
              <Column
                field="company"
                header="Company"
                style={{ fontSize: "1.5em" }}
                sortable={true}
                body={this.companyColumnTemplate}
              />
              <Column
                field="premium"
                header="Premium"
                style={{ fontSize: "1.5em" }}
                sortable={true}
              />
              <Column
                field="appetite"
                header="Accepts Business"
                style={{ fontSize: "1.5em" }}
                sortable={true}
              />
            </DataTable>
          </div>
        </div>

        {this.state.mustSubscribeMessage && (
          <div
            className="ui-g-12 no-padding"
            style={{ textAlign: "center", width: "100%" }}
          >
            <a
              style={subscribeLinkStyle.css}
              onClick={(event) =>
                this.state.ninjaRaterApp.NinjaRaterAppStateHandler(
                  event,
                  Constants.ACTION_SUBSCRIBE
                )
              }
            >
              <i
                style={{ verticalAlign: "-23%" }}
                className="topbar-icon material-icons"
              >
                credit_card
              </i>
              <span className="text">{this.state.mustSubscribeMessage}</span>
            </a>
          </div>
        )}

        <div
          className="ui-g-12 no-padding"
          style={{ display: this.state.showResults ? "block" : "none" }}
        >
          <div
            className="ui-g-12 no-padding"
            id="ID_RATES_SUMMARY"
            style={{ display: "none" }}
          >
            <RateSummary
              ref="rateSummary"
              parentComponent={this}
              ratesResponse={this.state.ratesResponse}
              rateRowData={this.state.rateRowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

Rates.propTypes = {};
Rates.contextType = NinjaContext;

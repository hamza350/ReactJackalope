import React, { Component } from "react";
import logo from "../assets/images/jackalope_logo.jpg";
import "./previousSubmissions.module.scss";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAccountActions } from "../state/ducks/createAccount/createAccountActions";
import UserHelper from "../components/shared/UserHelper.js";
import ErrorDiv from "../components/shared/ErrorDiv.js";
import NinjaProgressSpinnerSmall from "../components/shared/NinjaProgressSpinnerSmall.js";
import styles1 from "../shared/components/sharedcss.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Utils from "../components/shared/Utils";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import NativeSelect from "@material-ui/core/NativeSelect";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import * as Constants from "../Constants";
import NinjaProgressSpinner from "../components/shared/NinjaProgressSpinner";
import $ from "jquery";

import "../../src/App.css";
const utils = new Utils();

const style = (theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    // minWidth: 650,
  },
  tableRow: {
    cursor: "pointer",
  },
});

class PreviousSubmissions1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedQuoteHistory: [],
      showError: false,
      errorMessage: "",
      userInfo: this.props.ninjaRaterApp.state.ninjaStore.userInfo,
      changingQuoteHistory: [],
      searchInput: "",
      searched: false,
      perPage: "",
      asec: false,
    };
    this.quoteHistoryResponse = this.quoteHistoryResponse.bind(this);
    this.clearRecentHistory = this.clearRecentHistory.bind(this);
    this.inProgress = this.inProgress.bind(this);
    this.successClearRecentQuotes = this.successClearRecentQuotes.bind(this);
    this.failClearRecentQuotes = this.failClearRecentQuotes.bind(this);
    this.entriesList = this.entriesList.bind(this);
    this.enterKeyPressed = this.enterKeyPressed.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.sortZipcode = this.sortZipcode.bind(this);
  }
  inProgress = (InProgress) => {
    if (InProgress) {
      this.setState({ InProgress: true });
      this.refs.NinjaProgressSpinner.setState({ display: "block" });
    } else {
      this.setState({ InProgress: false });
      this.refs.NinjaProgressSpinner.setState({ display: "none" });
    }
  };
  componentDidMount() {
    $("#ID_NINJA_SPINNER_IN_PROGRESS").show();
    $("#noRecords").hide();
    let userId = this.state.userInfo.userId;
    console.log(this.state.userInfo, "userId");
    let url = utils.getServicesUrl() + "/quoteHistory?userName=" + userId;
    utils.ajaxRequest(
      "GET",
      url,
      this.quoteHistoryResponse,
      utils.errorResponse
    );
  }
  clearRecentHistory(quoteHistoryId, e) {
    this.inProgress(true);
    let userId = this.state.userInfo.userId;
    let url =
      utils.getServicesUrl() +
      "/deleteRecentSearches?uid=" +
      userId +
      "&quoteHistoryId=" +
      quoteHistoryId;
    utils.ajaxRequest(
      "GET",
      url,
      this.successClearRecentQuotes,
      this.failClearRecentQuotes
    );
  }
  successClearRecentQuotes() {
    this.inProgress(false);
    window.location.reload();
  }
  failClearRecentQuotes(jqXHR, exception) {
    this.inProgress(false);
    let errorResponse = utils.parseResponseError(jqXHR, exception);
    console.log("errorResponse", errorResponse);
    this.setState({ clearQuoteMsg: "*Something went wrong please try again" });
    setTimeout(() => {
      this.setState({ clearQuoteMsg: " " });
    }, 200);
  }
  quoteHistoryResponse(response) {
    $("#ID_NINJA_SPINNER_IN_PROGRESS").hide();
    $("#NinjaProgressSpinner").hide();
    $("#noRecords").show();
    this.setState((state) => {
      this.state.sortedQuoteHistory = JSON.parse(JSON.stringify(response));
      this.state.perPage = response.length;
      this.state.changingQuoteHistory = response.slice(0, response.length);
      this.state.originalArray = JSON.parse(JSON.stringify(response));
      return state;
    });
  }
  entriesList(e) {
    let value = e.target.value;
    this.setState({
      changingQuoteHistory: this.state.originalArray.slice(0, value),
      perPage: e.target.value,
    });
  }
  enterKeyPressed(e) {
    e = e || window.event;
    const { searchInput, searched, changingQuoteHistory } = this.state;
    if (e.key === "Enter") {
      this.state.changingQuoteHistory = this.state.originalArray;
      //enter key pressed
      if (searchInput != "") {
        let a = this.state.changingQuoteHistory.filter((data) => {
          return (
            data.insuredName
              .trim()
              .toLowerCase()
              .includes(searchInput.toLowerCase().trim()) ||
            data.zipcode
              .toLowerCase()
              .trim()
              .includes(searchInput.toLowerCase().trim()) ||
            data.customerName
              .toLowerCase()
              .trim()
              .includes(searchInput.toLowerCase().trim())
          );
        });
        this.setState({
          changingQuoteHistory: a,
          searched: true,
          searchErrorText: "",
        });
      } else {
        this.setState({ searchErrorText: "*Please enter input to search" });
        setTimeout(() => {
          this.setState({ searchErrorText: "" });
        }, 70000);
      }
    }
  }
  valueChange(e) {
    //e.preventDefault();
    let value = e.target.value;
    this.setState({ searchInput: value });
  }
  clearSearch() {
    this.setState({
      searchInput: "",
      changingQuoteHistory: this.state.originalArray,
    });
  }
  sortZipcode() {
    const { changingQuoteHistory, asec } = this.state;
    let a = changingQuoteHistory.sort((a, b) => {
      let reverse = asec ? 1 : -1;
      if (a["insuredName"] < b["insuredName"]) return -1 * reverse;
      if (a["insuredName"] > b["insuredName"]) return 1 * reverse;
      return 0;
    });
    this.setState({
      changingQuoteHistory: a,
      asec: !this.state.asec,
    });
  }
  render() {
    const { classes } = this.props;
    const {
      sortedQuoteHistory,
      userInfo,
      changingQuoteHistory,
      searchErrorText,
      searchInput,
      asec,
    } = this.state;
    return (
      <div className="ui-g-12 no-padding">
        <UserHelper ref="userHelper" parentComponent={this} />
        <ErrorDiv ref="errorDiv" clssName="no-padding" />

        {/* <img src={logo} /> */}
        <section className="main_section">
          {/* <NinjaProgressSpinnerSmall
            ref="NinjaProgressSpinnerSmall"
            maxWidth="150px"
            maxHeight="150px"
            marginTop="0px"
            display="none"
            divHeight="250px"
          /> */}
          <div
            className="ui-g-12 no-padding"
            id="ID_PSWD_ERROR"
            style={{ display: this.state.clearQuoteMsg ? "block" : "none" }}
          >
            <div
              style={{
                color: "#b00020",
                fontSize: "16px",
                marginLeft: "15px",
                textAlign: "center",
              }}
            >
              {this.state.clearQuoteMsg}
              <br />
            </div>
          </div>
          <div>
            <p className={["previous_head", "commonButtonClass"].join(" ")}>
              Previous Submissions
            </p>
          </div>

          {/* <div className="" style={{ display: changingQuoteHistory.length ? 'block' : 'none'}}> */}
          <div className="">
            <div id="pre-sub-main">
              {/* <label style={{margin: '5px'}}>Show</label><NativeSelect style={{background: "none"}} onChange={this.entriesList}>
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </NativeSelect> */}

              <IconButton
                style={{
                  padding: "0px",
                  marginRight: "6px",
                  color: "red",
                  display: "block",
                  float: "right",
                  marginTop: "7px",
                }}
                aria-label="Toggle password visibility"
                onClick={this.clearSearch}
              >
                <CancelIcon />
              </IconButton>
              {/* <label style={{ margin: "5px" }}>entries</label> */}
              <input
                style={{
                  float: "right",
                  width: "100px",
                  height: "30px",
                  marginTop: "7px",
                }}
                type="text"
                name="name"
                onKeyPress={this.enterKeyPressed}
                onChange={this.valueChange}
                value={searchInput}
              />
              <label
                className="d-none d-md-block"
                style={{ float: "right", marginTop: "7px" }}
              >
                Search
              </label>
            </div>
            <div
              className="ui-g-12 no-padding"
              style={{ display: searchErrorText ? "block" : "none" }}
            >
              <div
                style={{
                  color: "#b00020",
                  fontSize: "16px",
                  display: "block",
                  textAlign: "center",
                  marginTop: "14px",
                  float: "right",
                }}
              >
                {searchErrorText}
                <br />
              </div>
            </div>
          </div>
          <div>
            <div
              id="NinjaProgressSpinner"
              style={{ textAlign: "center", height: "500px" }}
              className="container"
            >
              <NinjaProgressSpinner
                ref="NinjaProgressSpinner"
                maxWidth="200px"
                maxHeight="200px"
                marginTop="-10px"
                display="block"
              />
            </div>
            <TableContainer
              id="noRecords"
              component={Paper}
              className={classes.root}
            >
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Insured Name
                      <IconButton
                        style={{
                          padding: "12px 0px",
                          marginRight: "-86px",
                          color: "blue",
                        }}
                        onClick={this.sortZipcode}
                      >
                        {asec ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">Zip Code</TableCell>
                    <TableCell align="center">Agent Name </TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {changingQuoteHistory && changingQuoteHistory.length > 0 ? (
                    <React.Fragment>
                      {changingQuoteHistory.map((row, index) => (
                        <TableRow key={index} className={classes.tableRow}>
                          <TableCell
                            component="th"
                            scope="row"
                            onClick={(event) =>
                              this.props.ninjaRaterApp.prevSubmissionData(
                                event,
                                row
                              )
                            }
                          >
                            {row.insuredName ? row.insuredName : ""}
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={(event) =>
                              this.props.ninjaRaterApp.prevSubmissionData(
                                event,
                                row
                              )
                            }
                          >
                            {row.zipcode ? row.zipcode : 90201}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={(event) =>
                              this.props.ninjaRaterApp.prevSubmissionData(
                                event,
                                row
                              )
                            }
                          >
                            {row.customerName
                              ? row.customerName
                              : userInfo.username}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              style={{
                                padding: "12px 0px",
                                marginRight: "-6px",
                                color: "red",
                              }}
                              aria-label="Toggle password visibility"
                              onClick={this.clearRecentHistory.bind(
                                this,
                                row.quoteHistoryId
                              )}
                              // onClick={this.togglePasswordMask}
                            >
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ) : (
                    <TableRow className={classes.tableRow}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell style={{ fontWeight: "500" }}>
                        {" "}
                        No Records Available
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(withStyles(style)(withRouter(PreviousSubmissions1)));

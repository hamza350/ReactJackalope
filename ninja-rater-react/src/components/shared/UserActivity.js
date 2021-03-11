import React, { Component } from 'react';
import * as Constants from '../../Constants';
import { Base64 } from 'js-base64';
import jQuery from 'jquery';
import $ from 'jquery';
import Utils from './Utils';

const utils = new Utils();

export default class UserActivity extends Component {

  constructor(props) {
      super(props);
      this.state = {
        parentComponent: this.props.parentComponent
      };
      this.getUserActivity = this.getUserActivity.bind(this);
      this.quoteHistoryResponse = this.quoteHistoryResponse.bind(this);
  }

  getUserActivity(userInfo) {
    let url = utils.getServicesUrl() + '/quoteHistory?userName='+userInfo.userId;
    utils.ajaxRequest('GET', url, this.quoteHistoryResponse, utils.errorResponse);
  }

  quoteHistoryResponse(response) {
      var quoteHistory = {};
      for(var i = 0; i < response.length; ++i) {
          var timestamp = response[i].formattedCreateTime;
          var dateObjShort = timestamp.substring(0, timestamp.indexOf(' '));
          dateObjShort = new Date(dateObjShort);
          timestamp = new Date(Date.parse(timestamp));
          response[i].timestamp = timestamp;
          if(quoteHistory[dateObjShort] == undefined) {
              quoteHistory[dateObjShort] = [];
              quoteHistory[dateObjShort].push(response[i]);
          } else {
              quoteHistory[dateObjShort].push(response[i]);
          }
      }
      //sort short date keys
      var sortedKeys = Object.keys(quoteHistory);
      sortedKeys.sort(function(date1, date2){
          date1 = new Date(date1);
          date2 = new Date(date2);
          if(date1 > date2)
              return -1;
          if(date1 < date2)
              return 1;
          return 0;
      });

      var sortedQuoteHistory = [];
      for(var i = 0; i < sortedKeys.length; ++i) {
          var date = sortedKeys[i];
          var quotesForTheDate = quoteHistory[date];
          quotesForTheDate.sort(function(a,b){
              if(a.timestamp > b.timestamp)
                  return -1;
              if(a.timestamp < b.timestamp)
                  return 1;
              return 0;
          });
          sortedQuoteHistory.push(quotesForTheDate);
      }
      if(this.state.parentComponent) {
        this.state.parentComponent.setState({sortedQuoteHistory: sortedQuoteHistory});
        this.state.parentComponent.createRecentQuotesMenu(sortedQuoteHistory);
      }
  }


  render() {
      return (
        <div></div>
      );
  }

}

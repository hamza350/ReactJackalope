import React, {Component} from 'react';
import classNames from 'classnames';
// import createHistory from 'history/createBrowserHistory'
// const history = createHistory();
import {createBrowserHistory} from "history";
const history = createBrowserHistory();


export default class BrowserBackArrowForPage extends React.Component {

  constructor (props) {
    super(props);
    this.navigateBack = this.navigateBack.bind(this);
    this.state = {
      backUrl: props.backUrl,
      backArrowColor: props.backArrowColor ? props.backArrowColor : 'white'
    };
  }

  navigateBack(event) {
    event.preventDefault();
    let backUrl = this.state.backUrl;
    if (backUrl) {
      window.location = backUrl;
    } else {
      history.goBack();
    }
  }

  render() {

    const backArrowStyle = {
      base: {
        top:"120px",
        position: "absolute",
        left: "3px"
      },
      icon: {
        color: this.state.backArrowColor,
        fontSize: '3em',
        fontWeight: 'bald'
      }
    };
    return (
      <div style={backArrowStyle.base}>
        <span onClick={this.navigateBack} style={{float: 'left'}, {cursor: 'pointer'}}>
          <i style={backArrowStyle.icon} className="ui-button-icon-left ui-c fa fa-fw ui-icon-arrow-back"></i>
        </span>
      </div>
    );
  }
}

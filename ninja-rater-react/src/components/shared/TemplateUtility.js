import React, { Component } from 'react';
import * as Constants from '../../Constants';

export default class TemplateUtility extends Component {


  ninjaClassSearchMultipleItemTemplate(ninjaClass) {
      if (!ninjaClass) {
          return;
      }
      ninjaClass = ninjaClass.trim();
      return (<div className="ui-helper-clearfix">
          <div style={{ fontSize: '14px', fontWeight: 'bold', float: 'left',
            margin: '5px 5px 0 0' }}>{ninjaClass}</div>
      </div>)
  }

  render() {
      return (
        <div></div>
      );
  }

}

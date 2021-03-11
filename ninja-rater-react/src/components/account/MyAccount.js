import React, { Component } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import jQuery from 'jquery';
import $ from 'jquery';
import * as Constants from '../../Constants';
import FooterSimple from '../../components/FooterSimple';

import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';

import {Panel} from 'primereact/components/panel/Panel';
import {Fieldset} from 'primereact/components/fieldset/Fieldset';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Column} from 'primereact/components/column/Column';
import {DataGrid} from 'primereact/components/datagrid/DataGrid';
import Utils from '../shared/Utils';
import UserHelper from '../shared/UserHelper';
import { NinjaContext } from '../shared/Utils';

const utils = new Utils();

export class MyAccount extends React.Component {

  constructor() {
      super();
      this.state = {

      };
      this.dataGridTemplate = this.dataGridTemplate.bind(this);
  }

  componentDidMount() {
    let userInfo = this.context.userInfo;
    let accountInfo = utils.getUserAccountSummary(userInfo, this.context.authFeatures);
    let dataGridValue = [
      {label: 'First Name', value: userInfo.firstName},
      {label: 'Last Name', value: userInfo.lastName},
      {label: 'Email', value: userInfo.email},
      {label: 'Phone', value: utils.formatPhone(userInfo.phone)},
      {label: 'Subscription', value: accountInfo.subscription},
      {label: 'Joined', value: accountInfo.joinedDate.format('MMM DD, YYYY')},
      // {label: 'Trial End', value: accountInfo.trialEnd.format('MMM DD, YYYY')},
      {label: 'Last Seen', value: accountInfo.lastSeenDate.format('MM/DD/YYYY, hh:mma')}
    ];
    this.setState({ dataGridValue: dataGridValue });
  }

  dataGridTemplate(row) {
      if (!row) {
          return;
      }

      return (


              <div className="ui-g-12">
                <div className="ui-g-4">{row.label}</div>
                <div className="ui-g-4">{row.value}</div>
              </div>

      );
  }

    render() {
        return (
          <div className="ui-g">
            <UserHelper ref="UserHelper" parentComponent={this} />
            <Fieldset legend={Constants.ACTION_MY_ACCOUNT.linkLabel}>
              <div className="ui-g" style={{fontSize: '1.3em'}}>
                  <DataGrid paginator={false} rows={2} value={this.state.dataGridValue} itemTemplate={this.dataGridTemplate}/>
              </div>
            </Fieldset>
          </div>
        );
    }
}

MyAccount.propTypes = {};
MyAccount.contextType = NinjaContext;

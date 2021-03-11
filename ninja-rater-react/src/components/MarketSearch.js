import React, { Component } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import jQuery from 'jquery';
import $ from 'jquery';
import * as Constants from '../Constants';
import FooterSimple from '../components/FooterSimple';
import {AutoCompleteMultiClassCodes} from './shared/AutoCompleteMultiClassCodes';
import '../assets/ninja/theme/theme-indigo.css';
import '../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';

import {DataTable} from 'primereact/components/datatable/DataTable';
import {Panel} from 'primereact/components/panel/Panel';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Column} from 'primereact/components/column/Column';
import {DataGrid} from 'primereact/components/datagrid/DataGrid';

import {NinjaRaterService} from '../service/NinjaRaterService';

export class MarketSearch extends React.Component {

  constructor() {
      super();
      this.state = {
          ninjaClassData: [],
          filteredNinjaClassifications: [],
          marketSearchResults: [],
          showAppetiteInMarketSearchResults: false
      };
      this.ninjaRaterService = new NinjaRaterService();
  }

  componentDidMount() {
      this.ninjaRaterService.getStubbedMarketSearchResults().then(data => this.setState({marketSearchResults: data}));
  }


    render() { return (
          <div className="ui-g-12" style={{fontSize: '1.3em'}}>

                <Panel header={Constants.ACTION_MARKET_SEARCH.linkLabel}>
                        Classifications<br/>
                        <AutoCompleteMultiClassCodes parentComponent={this} id="ninjaClassifications" placeholder="Type 'a' or '9079'" />
                </Panel>
            <br/>

            {this.state.showAppetiteInMarketSearchResults && (
              <DataTable value={this.state.marketSearchResults} selectionMode="single"
                         header="DataTable" selection={this.state.dataTableSelectValue}
                         responsive={true}
                         onSelectionChange={(e) => this.setState({dataTableSelectValue: e.data})}>
                  <Column field="parentCompanyName" header="Company" sortable={true}/>
                  <Column field="acceptBusiness" header="Accepts Business" sortable={true}/>
                  <Column field="ccDesc" header="Classification" sortable={true}/>
              </DataTable>
            )}
          </div>
        );
    }
}

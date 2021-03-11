import React, { Component } from 'react';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';

import classNames from 'classnames';
import '../../App.css';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import {DataGrid} from 'primereact/components/datagrid/DataGrid';
import {NinjaRaterService} from '../../service/NinjaRaterService';
import jQuery from 'jquery';
import $ from 'jquery';
import {Paginator} from 'primereact/components/paginator/Paginator';
import {Dialog} from 'primereact/components/dialog/Dialog';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'foundation-sites/dist/css/foundation.min.css'
import 'foundation-sites/dist/css/foundation-float.min.css'
import 'foundation-sites/dist/css/foundation-prototype.min.css'
import 'foundation-sites/dist/css/foundation-rtl.min.css'
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-bs/js/dataTables.bootstrap';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
import Utils from '../shared/Utils';
import * as Constants from '../../Constants';
import * as Msg from '../../UserMessages';
import NinjaProgressSpinnerSmall from '../shared/NinjaProgressSpinnerSmall';
import WcirbRangeExModClassCodeHistory from './WcirbRangeExModClassCodeHistory';

const utils = new Utils();

export default class WcirbRangeSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
          selectedCity: null,
            parentComponent: this.props.parentComponent,
            businessResponse: {},
            businessData: [],
            emptyMessage: Msg.MSG_EXMOD_SEARCH_NOTHING_FOUND,
            exModCcDataByBureauNumber: {},
            exModCcErrorsByBureauNumber: [],
            first: this.props.first, rows: this.props.rows, first2: this.props.first2,
            rows2: this.props.rows2, totalRecords: this.props.totalRecords,
            rowsPerPageOptions: this.props.rowsPerPageOptions
        };
        this.onPageChange = this.onPageChange.bind(this);
        this.onPageChange2 = this.onPageChange2.bind(this);

        this.setWcirbBusinessData = this.setWcirbBusinessData.bind(this);
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.onRowToggle = this.onRowToggle.bind(this);
        this.onSelectedRow = this.onSelectedRow.bind(this);
        this.showExModClassCodeHistorySuccess = this.showExModClassCodeHistorySuccess.bind(this);
        this.showExModClassCodeHistoryError = this.showExModClassCodeHistoryError.bind(this);
        this.getExModAndClassCodeHistoryByBureauNumber = this.getExModAndClassCodeHistoryByBureauNumber.bind(this);
        this.onResultsPerPageChange = this.onResultsPerPageChange.bind(this);
    }

    onResultsPerPageChange(e) {
      let currentResultsPerPage = e.value;
      this.state.parentComponent.setState({currentResultsPerPage: currentResultsPerPage});
      this.state.parentComponent.resultsPerPage = currentResultsPerPage;
      this.state.parentComponent.findBusiness(e);
    }

    onPageChange(event) {
        this.setState({
            first: event.first,
            rows: event.rows
        });
    }

    onPageChange2(event) {
        this.setState({
            first2: event.first,
            rows2: event.rows
        });
    }

    componentDidMount() {
      $('.ui-datatable-tablewrapper').css({'font-size': 'small'});
    }

    setWcirbBusinessData(totalRecords, businessData, businessResponse, rowsPerPageOptions, businessPartialName) {
      this.setState({ totalRecords: totalRecords });
      this.setState({ businessData: businessData });
      this.setState({ businessResponse: businessResponse });
      this.setState({ businessPartialName: businessPartialName });

      this.state.parentComponent.state.csv.data = [];
      businessData.forEach((b)=>{
       this.state.parentComponent.state.csv.data.push({
           //id: b.id, name: b.name, bureauNumber: b.bureauNumber, exModAndYear: b.exModAndYear, originalMatchingName: b.originalMatchingName, address: b.address
           id: b.id, name: b.name, bureauNumber: b.bureauNumber, exMod: b.exMod, exModYear: b.exModYear, originalMatchingName: b.originalMatchingName, address: b.address

       })
      });
    }

    onRowSelect(e, data) {
      //alert(data);
      //e.originalEvent.currentTarget.style.fontStyle = 'italic';
    }

    onRowUnselect(e, data) {
      //e.originalEvent.currentTarget.style.fontStyle = '';
    }

    onSelectedRow(e, data) {
      let bureauNumber = data && data.bureauNumber ? data.bureauNumber : null;
      if(!bureauNumber)
        return;
      this.setState({dataTableSelectValue: data});
      // this.setState({expandedRows: data});
      this.setState({expandedRows:[e.data]});

      this.getExModAndClassCodeHistoryByBureauNumber(bureauNumber);
    }

    onRowToggle(e, data) {
      let bureauNumber = data && data.length ? data[data.length-1].bureauNumber : null;
      if(!bureauNumber)
        return;
      this.setState({dataTableSelectValue: e.data});
      this.setState({expandedRows: e.data});

      this.getExModAndClassCodeHistoryByBureauNumber(bureauNumber);
    }

    getExModAndClassCodeHistoryByBureauNumber(bureauNumber) {
      this.setState({dialogError: false});
      if(!this.state.exModCcDataByBureauNumber[bureauNumber]) {
        let url = utils.getServicesUrl() + '/getExModAndClassCodeHistoryByBureauNumber';
        let data = { bureauNumber: bureauNumber };
        utils.ajaxRequest('POST', url, this.showExModClassCodeHistorySuccess, this.showExModClassCodeHistoryError, data, true);
      }
    }

    showExModClassCodeHistorySuccess(data, status, response) {
      //let listOfAssignedClassifications = data.listOfAssignedClassifications;
      //let listOfExMods = data.listOfExMods;
      data = JSON.parse(data);
      let exModCcDataByBureauNumber = this.state.exModCcDataByBureauNumber;
      exModCcDataByBureauNumber[data.bureauNumber] = data;
      this.setState({ exModCcDataByBureauNumber: exModCcDataByBureauNumber });
    }

    showExModClassCodeHistoryError(jqXHR, exception) {
      let errorResponse = utils.parseResponseError(jqXHR, exception);
      this.setState({dialogError: true});
      this.setState({dialogErrorMessage: errorResponse});
    }

    onRowClick(e, data) {
      /*
      let tr = e.originalEvent.currentTarget;
      if(tr) {
        let expander = $(tr).find(".ui-row-toggler");
        if(expander) {
          //$(expander).click();
        }
      }
      //alert('onSelectedRow: ' + JSON.stringify(data));
      this.setState({dataTableSelectValue: e.data});
      this.setState({expandedRows: e.data});

      //alert('onSelectedRow: ' + JSON.stringify(data));
      //this.onRowToggle(e, data);
      */
    }

    rowExpansionTemplate(data) {
      let bureauNumber = data.bureauNumber;
      if(this.state.exModCcDataByBureauNumber[bureauNumber]) {
        let innerGridData = this.state.exModCcDataByBureauNumber[bureauNumber];
        innerGridData = JSON.stringify(innerGridData);
        return <WcirbRangeExModClassCodeHistory parentComponent={this} data={innerGridData}  />;
      } else {
        return <NinjaProgressSpinnerSmall maxWidth="50px" maxHeight="50px" marginTop="0px" display="block" />;
      }
    }

    render() {
      let rowsPerPageOptions = [];
      for(let i = 0; i < this.state.parentComponent.state.rowsPerPageOptions.length; ++i) {
        let option = this.state.parentComponent.state.rowsPerPageOptions[i];
        rowsPerPageOptions.push( { label: option, value: option } );
      }

      let dialogFooter = <div className="ui-dialog-buttonpane ui-helper-clearfix">
            <Button icon="fa-check" onClick={()=>this.setState({ dialogError: false })} label="OK"/>
      </div>;

        return (
<div className="ui-g-12 no-padding" style={{width: '100%', marginTop: '15px'}}>

  <div className="ui-g ui-fluid no-padding" style={{width: '100%', marginTop: '15px'}}>
    <div className="ui-g-12 ui-md-2 no-padding">
      <Button className="amber-btn no-padding" onClick={this.state.parentComponent.goPrevious} type="button"
          style={{fontSize: '1em'}} disabled={this.state.parentComponent.state.disablePaging} label="<< Previous"></Button>
    </div>
    <div className="ui-g-12 ui-md-7 no-padding" style={{textAlign: 'center'}}>
      Results Per Page:
      <Dropdown value={this.state.parentComponent.state.currentResultsPerPage} options={rowsPerPageOptions} onChange={this.onResultsPerPageChange}
          style={{width:'50px', fontSize: '1em'}} />
    </div>
    <div className="ui-g-12 ui-md-2 no-padding">
      <Button className="amber-btn no-padding" onClick={this.state.parentComponent.goNext} type="button"
          style={{fontSize: '1em'}} disabled={this.state.parentComponent.state.disablePaging} label="Next >>"></Button>
    </div>
  </div>

              <Dialog header="Network Issue" visible={this.state.dialogError} modal={false} width="250px" footer={dialogFooter} onHide={()=>this.setState({ dialogError: false })}>
                  <p>{this.state.dialogErrorMessage}</p>
              </Dialog>


  <div className="ui-g ui-fluid no-padding" style={{width: '100%', marginTop: '15px'}}>
                    <DataTable ref="wcirbBusinessDataTable"
                            //scrollable={true} scrollHeight="700px"
                            header="WCIRB Business"
                            emptyMessage={this.state.emptyMessage}
                            selectionMode="single"
                            responsive={true}
                            value={this.state.businessData}
                            selection={this.state.dataTableSelectValue}
                            expandableRow={true}
                            loadingIcon="fa-circle-o-notch"
                            expandedRows={this.state.expandedRows}
                            onRowToggle={(e) => this.onRowToggle(e, e.data)}
                            onRowClick={(e) => this.onRowClick(e, e.data)}
                            onSelectionChange={(e) => this.onSelectedRow(e, e.data)}
                            rowExpansionTemplate={this.rowExpansionTemplate}>

                            <Column expander={true} style={{width: '2.3em', fontWeight: 'bald', fontSize: '1.5em'}} />
                            <Column field="count" header="#" sortable={false} style={{width:'4%'}} />
                            {/*<Column field="bureauNumber" header="Bureau #" sortable={true} style={{width:'7%'}} />*/}
                            <Column field="name" header="Bureau # - Business" sortable={true} style={{width:'41%'}}  />
                            <Column field="exMod" header="ExMod" sortable={true} style={{width:'5%'}} />
                            <Column field="exModYear" header="Year" sortable={true} style={{width:'5%'}} />
                            {/* <Column field="exModAndYear" header="ExMod/Year" sortable={true} style={{width:'16%'}} /> */}
                            <Column field="address" header="Address" sortable={true} style={{width:'45%'}} />
                    </DataTable>

                    {/*<Paginator first={this.state.first2} rows={this.state.rows2} totalRecords={this.state.totalRecords} rowsPerPageOptions={this.state.rowsPerPageOptions} onPageChange={this.onPageChange2}
    template="RowsPerPageDropdown PageLinks FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"></Paginator>*/}
    </div>

    <div className="ui-g ui-fluid no-padding" style={{width: '100%', marginTop: '15px'}}>
      <div className="ui-g-12 ui-md-2 no-padding">
        <Button className="amber-btn no-padding" onClick={this.state.parentComponent.goPrevious} type="button"
            style={{fontSize: '1em'}} disabled={this.state.parentComponent.state.disablePaging} label="<< Previous"></Button>
      </div>
      <div className="ui-g-12 ui-md-7 no-padding" style={{textAlign: 'center'}}>
        Results Per Page:
        <Dropdown value={this.state.parentComponent.state.currentResultsPerPage} options={rowsPerPageOptions} onChange={this.onResultsPerPageChange}
            style={{width:'50px', fontSize: '1em'}} />
      </div>
      <div className="ui-g-12 ui-md-2 no-padding">
        <Button className="amber-btn no-padding" onClick={this.state.parentComponent.goNext} type="button"
            style={{fontSize: '1em'}} disabled={this.state.parentComponent.state.disablePaging} label="Next >>"></Button>
      </div>
    </div>

  <br/><br/>
  <div className="ui-g-12 no-padding" style={{width: '100%', marginTop: '15px'}}>

</div>


              </div>
        );
    }
}

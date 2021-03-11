import React, { Component } from 'react';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import NumberFormat from 'react-number-format';

export default class ClassCodeGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parentComponent: this.props.parentComponent
    };
  }

  render() {
    let ID_CLASSCODE = 'ID_CLASSCODE_' + this.state.parentComponent.state.NUM_CLASS_CODES;
    let ID_SUBCODE = 'ID_SUBCODE_' + this.state.parentComponent.state.NUM_CLASS_CODES;
    //this.setState({ ['subCode_' + ID_SUBCODE + '_empty']: true });
    let ID_PAYROLL_INPUT = 'ID_PAYROLL_INPUT_' + this.state.parentComponent.state.NUM_CLASS_CODES;
    let ID_NUM_EMPLOYEES_INPUT = 'ID_NUM_EMPLOYEES_INPUT_' + this.state.parentComponent.state.NUM_CLASS_CODES;
    let ID_ZIPCODE_INPUT = 'ID_ZIPCODE_INPUT_' + this.state.parentComponent.state.NUM_CLASS_CODES;
    let ID_SICCODE = 'ID_SICCODE_' + this.state.parentComponent.state.NUM_CLASS_CODES;
    let ID_CC_GROUP = 'ID_CC_GROUP_' + this.state.parentComponent.state.NUM_CLASS_CODES;
    let ID_REMOVE_BTN = 'ID_REMOVE_BTN' + this.state.parentComponent.state.NUM_CLASS_CODES;

      return (<div id={ID_CC_GROUP} className="ui-g-12 ui-md-12" style={{border: '1px solid', borderRadius: '5px', padding: '1em'}}>
        <div className="ui-g-12 ui-md-12 no-padding">
          <div className="ui-g-12 ui-md-6 no-padding" style={{marginRight: '10px'}}>
              <span className="md-inputfield">
                  {/*<InputText style={{width: '100%', fontSize: '1.3em'}} className="ui-inputtext ui-corner-all ui-state-default ui-widget" />*/}

                  <AutoComplete minLength={1} placeholder="Class Code: Type 'a' or '9079'"
                        id={ID_CLASSCODE}
                        style={{width: '100%'}} dropdown={true}
                        size={this.state.parentComponent.state.ninjaClassData.length} field="longDescription"
                        suggestions={this.state.parentComponent.state['filteredClassCodes_' + ID_CLASSCODE]}
                        completeMethod={(e) => {this.state.parentComponent.filterClassCode([e], ID_CLASSCODE)}}
                        value={this.state.parentComponent.state['classCode_' + ID_CLASSCODE]}
                        onChange={(e) => {this.state.parentComponent.onClassCodeValueChange([e], ID_CLASSCODE, this.state.parentComponent.state.NUM_CLASS_CODES)}}
                        />

                  {/*<label style={{fontWeight: 'Bold'}, {fontSize: '1.3em'}}>Class Code</label>*/}
              </span>
          </div>


          <div className="ui-g-12 ui-md-1 no-padding" style={{marginRight: '10px'}}>
              {/*
              <AutoComplete minLength={1} placeholder="Sub Code"
                    id={ID_SUBCODE}
                    disabled={ this.state['subCode_' + ID_SUBCODE + '_empty'] == null ? true : this.state['subCode_' + ID_SUBCODE + '_empty']}
                    dropdown={true}
                    //size={this.state.subCodeData.length}
                    size={this.state['subCodeData_' + ID_SUBCODE] ? this.state['subCodeData_' + ID_SUBCODE].length : 0}
                    value={this.state['subCode_' + ID_SUBCODE]}
                    suggestions={this.state['subCodeData_' + ID_SUBCODE]} /> */}

              <Dropdown
                  id={ID_SUBCODE}
                  autoWidth={true}
                  value={this.state.parentComponent.state['subCode_' + ID_SUBCODE]}
                  options={this.state.parentComponent.state['subCodeData_' + ID_SUBCODE]}
                  placeholder="Sub Code"
                  disabled={ this.state.parentComponent.state['subCode_' + ID_SUBCODE + '_empty'] == null ? true : this.state.parentComponent.state['subCode_' + ID_SUBCODE + '_empty']}
                />
          </div>

          <div className="ui-g-12 ui-md-2 no-padding"  style={{marginRight: '10px'}}>
              <span className="md-inputfield">
                  {/* https://www.npmjs.com/package/react-number-format */}
                  <NumberFormat id={ID_PAYROLL_INPUT}
                        //value={this.state['payroll_' + ID_PAYROLL_INPUT]}
                        thousandSeparator={true} prefix={'$'} placeholder="Payroll"
                        style={{width: '100%', fontSize: '1.3em'}}
                        className="ui-inputtext ui-corner-all ui-state-default ui-widget payroll" />
              </span>
          </div>
          <div className="ui-g-12 ui-md-1 no-padding"  style={{marginRight: '10px'}}>
              <span className="md-inputfield">
                  <InputText id={ID_NUM_EMPLOYEES_INPUT}
                      //value={this.state['numberOfEmployees_' + ID_NUM_EMPLOYEES_INPUT]}
                      style={{fontSize: '1.3em', width: '100%'}} keyfilter="int"
                      className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                  <label style={{fontWeight: 'Bold'}}>Employees</label>
              </span>
          </div>
          <div className="ui-g-12 ui-md-1 no-padding">
            <span className="md-inputfield">
                <InputText id={ID_ZIPCODE_INPUT}
                  //value={this.state['zipCode_' + ID_ZIPCODE_INPUT]}
                  style={{width: '100%', fontSize: '1.3em'}} className="ui-inputtext ui-corner-all ui-state-default ui-widget"
                  keyfilter="int" size="5" />
                <label style={{fontWeight: 'Bold'}}>CA Zip Code</label>
            </span>
          </div>
        </div>


        <div className="ui-g-12 ui-md-12 no-padding">
          <div className="ui-g-12 ui-md-6 no-padding">
            <AutoComplete minLength={1} placeholder="Sic Code: Type 'a' or '5812'"
                  id={ID_SICCODE}
                  dropdown={true}
                  size={this.state.parentComponent.state.ninjaSicData.length} field="longDescription"
                  suggestions={this.state.parentComponent.state['filteredSicCodes_' + ID_SICCODE]}
                  completeMethod={(e) => {this.state.parentComponent.filterSicCode([e], ID_SICCODE)}}
                  value={this.state.parentComponent.state['sicCode_' + ID_SICCODE]}
                  onChange={(e) => {this.state.parentComponent.onSicCodeValueChange([e], ID_SICCODE)}}
                  />
          </div>
          <Button id={ID_REMOVE_BTN}
              //onClick={this.removeClassCode}
              onClick={(e) => {this.state.parentComponent.removeClassCode([e], ID_CC_GROUP)}}
              //onClick={this.parentComponent.removeClassCodeBTN.bind(this, ID_CC_GROUP)}
              className="red-btn no-padding remove-class-code-btn"
              style={{fontSize: '0.8em', fontWeight: 'bald', float: 'right', display: 'none'}}
              label="Remove Class Code" icon="ui-icon-remove"></Button>
        </div>
      </div>);
  }
}

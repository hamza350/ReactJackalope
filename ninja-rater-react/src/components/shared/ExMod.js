import React, { Component } from 'react';

import classNames from 'classnames';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import '../../App.css';

import {InputText} from 'primereact/components/inputtext/InputText';
import Utils from './Utils';


const utils = new Utils();
const EXMOD_DEFAULT            = '1.00';
const EXMOD_MIN                = '0.01';
const EXMOD_MAX                = '10';
const FONT_SIZE_DEFAULT        = '1.1em';
const FONT_SIZE_LABALE_DEFAULT = '1.3em';

export class ExMod extends React.Component {
    constructor(props) {
        super(props);
        this.id            = props.id || 'ID_EXMOD_INPUT_' + utils.RandomNumberInRange();
        this.label         = props.label || 'ExMod';
        this.fontSize      = props.fontSize || FONT_SIZE_DEFAULT;
        this.fontSizeLabel = props.fontSizeLabel || FONT_SIZE_LABALE_DEFAULT;
        this.state = {
            exModValue: props.exModValue || EXMOD_DEFAULT
        };
    }

    componentDidMount() {
    }

    getExModValue = () => {
        return this.state.exModValue;
    }

    checkAndCorrectExMod = (e) => {
        //e.preventDefault();
        let event = e;
        let target = e.target;
        if(!target) {
          event = e.originalEvent;
          target = e.originalEvent.target;
        }
        let exMod = target.value+'';
        exMod = exMod.trim();
        this.setState({ exModValue: exMod });
      }

    checkAndCorrectExModOnBlur = (event) => {
        try {
          let exModValue = this.state.exModValue;
          if(!exModValue || exModValue.trim() == '') {
            exModValue = EXMOD_DEFAULT;
          }
          let exMod = parseFloat(exModValue);
          if(exMod > 5) {
            exMod = exMod / 100;
          }
          if(exMod == 0) {
            exMod = parseFloat(EXMOD_DEFAULT);
          }
          exModValue = exMod.toFixed(2)+'';
          this.setState({ exModValue: exModValue });
        } catch(e) { }
      }

    render() {
        return (
            <div className="ui-g-12 no-padding">
                <span className="md-inputfield no-padding">
                    <InputText id={this.id} style={{verticalAlign: '-webkit-baseline-middle'}} 
                        defaultValue={this.state.exModValue}
                        type="text"
                        value={this.state.exModValue}
                        keyfilter="num"
                        onChange={(event) => this.checkAndCorrectExMod(event)}
                        //onKeyDown={(event) => this.checkAndCorrectExMod(event)}
                        onBlur={this.checkAndCorrectExModOnBlur}
                        style={{fontSize: this.fontSizeLabel, width: '100%', fontWeight: 'Bold'}}
                        className="ui-inputtext ui-corner-all ui-state-default ui-widget" />
                        <label htmlFor={this.id} style={{fontSize: this.fontSizeLabel, fontWeight: 'Bold'}}>{this.label}</label>
                </span>
            </div>
        )
    }
}
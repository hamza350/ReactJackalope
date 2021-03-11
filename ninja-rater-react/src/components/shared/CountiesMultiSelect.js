import React, { Component } from 'react';
import $ from 'jquery';

import classNames from 'classnames';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import '../../App.css';

import {MultiSelect} from 'primereact/components/multiselect/MultiSelect';
import Utils from './Utils';
import * as Constants from '../../Constants';

const utils = new Utils();
const themeColor = '#293891';

export class CountiesMultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.id            = props.id || 'ID_COUNTIES_' + utils.RandomNumberInRange();
        this.label         = props.label || 'Counties';
        this.fontSize      = props.fontSize || Constants.FONT_SIZE_DEFAULT;
        this.fontSizeLabel = props.fontSizeLabel || Constants.FONT_SIZE_LABALE_DEFAULT;
        this.state = {
            listOfCounties: props.listOfCounties || [],
            selectedCounties: []
        };
        this.getSelectedCounties = this.getSelectedCounties.bind(this);
        this.onMultiSelectCountyChange = this.onMultiSelectCountyChange.bind(this);
    }

    componentDidMount() {
        $(`#${this.id} input`).css({'color': 'black', 'font-weight': 'bold', 'font-size': this.fontSize, 'border-radius': '0.2em'});
        $(`#${this.id} label`).css({'color': themeColor, 'font-weight': 'bold', 'font-size': this.fontSize});
    }

    onMultiSelectCountyChange(event) {
        this.setState({selectedCounties: event.value});
    }

    getSelectedCounties() {
        return this.state.selectedCounties;
    }

    setListOfCounties = (listOfCounties) => {
        this.setState({ listOfCounties: listOfCounties });
    }

    render() {
        return (
        <div className="ui-g-12 no-padding">
            <MultiSelect id={this.id} name={this.id}
              value={this.state.selectedCounties} options={this.state.listOfCounties}
              onChange={this.onMultiSelectCountyChange}
              style={{width: 'auto', fontWeight: 'Bold', color: 'black'}}
              className="ui-inputtext ui-corner-all ui-state-default ui-widget"
              defaultLabel={this.label} filter={true} />
          </div>
        )
    }

}
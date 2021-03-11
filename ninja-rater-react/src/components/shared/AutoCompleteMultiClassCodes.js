import React, { Component } from 'react';
import classNames from 'classnames';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';

import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import TemplateUtility from './TemplateUtility';
import {NinjaRaterService} from '../../service/NinjaRaterService';
import $ from 'jquery';
import * as Constants from '../../Constants';
import '../../App.css';

const templateUtility = new TemplateUtility();

export class AutoCompleteMultiClassCodes extends React.Component {

  constructor(props) {
      super(props);
      this.config = {
        id: this.props.id,
        parentComponent: this.props.parentComponent,
        placeholder: this.props.placeholder,
        onValueChange: this.props.onValueChange
      };

      this.state = {
          ninjaClassData: [],
          filteredNinjaClassifications: [],
          selectedNinjaClasses: []
      };
      this.ninjaRaterService = new NinjaRaterService();
      this.onNinjaClassValueChange = this.onNinjaClassValueChange.bind(this);
      this.filterNinjaClass = this.filterNinjaClass.bind(this);
      this.getSelectedClasses = this.getSelectedClasses.bind(this);
  }

  compare(a, b) {
      try {
        a = a.split(" ")[0].trim();
        b = b.split(" ")[0].trim();
      } catch(e) {}

      let comparison = 0;

      if (a > b) {
          comparison = 1;
      } else if (b > a) {
          comparison = -1;
      }

      return comparison;
  }

  getSelectedClasses () {
    return this.state.selectedNinjaClasses;
  }

  componentDidMount() {
      this.ninjaRaterService.getStubbedNinjaClassifications().then(data => this.setState({ninjaClassData: data.sort(this.compare)}));
      //$(`#${this.config.id} text::placeholder`).css({'color': Constants.themeColor});
    }

  onNinjaClassValueChange(e) {
     this.setState({ ninjaClass: e.value, filteredNinjaClassifications: null });
     if(this.config.onValueChange) {
        this.config.onValueChange( {target: {value: e.value} }, this.config.id);
     } else {
      this.setState({selectedNinjaClasses: e.value});
     }
  }

  filterNinjaClass(event) {
      let results = this.state.ninjaClassData.filter((ninjaClass) => {
          return ninjaClass.toLowerCase().includes(event.query.toLowerCase());
      });
      this.setState({ filteredNinjaClassifications: results });
  }

  render() {
return (
  <AutoComplete id={this.config.id} minLength={1} placeholder={this.config.placeholder}
    size={this.state.ninjaClassData.length} dropdown={true} multiple={true}
    suggestions={this.state.filteredNinjaClassifications}
    completeMethod={this.filterNinjaClass.bind(this)}
    value={this.state.ninjaClass}
    onChange={this.onNinjaClassValueChange.bind(this)}
    itemTemplate={templateUtility.ninjaClassSearchMultipleItemTemplate.bind(this)}/>
);
  }
}

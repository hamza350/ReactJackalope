import React from 'react';
import NinjaDataTable from '../common/NinjaDataTable';
import Utils from '../shared/Utils';

const utils = new Utils();

export default class ExModHistDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.ExModChangeIndicator = {};
        this.ExModChangeIndicator['R'] = 'Revised Experience Modification';
        this.ExModChangeIndicator['I'] = 'Ineligible Due to Insufficient Premium';
    
        this.EXMOD_TYPE = {};
        this.EXMOD_TYPE['N'] = 'Newly issued experience modification';
        this.EXMOD_TYPE['P'] = 'Previously issued experience modification';
        this.title = "Experience Modification History";
        this.state = {
            data: this.transform(props.data)
        };
    }

    transform = (data) => {
        if(!data) {
            return { values: [], columns: [] };
        }
        let values = [];
        for(let i = 0; i < data.length; ++i) {
            const row = data[i];
            let exMod = utils.exModStringToDouble(row.exMod.split(' ')[0]);
            exMod = exMod && exMod != '' ? exMod  : 'DNQ';
            let year = '';
            if(row.inceptionOfMod && row.inceptionOfMod.trim() != '') {
                year = '20' + row.inceptionOfMod;
            } else { //if year not present, it's usually revision in the current year
                year = (new Date()).getFullYear(); 
            }
            let indicatorDesc = '';
            if(row.modChangeIndicator && row.modChangeIndicator.trim() != '') {
                indicatorDesc = this.ExModChangeIndicator[row.modChangeIndicator];
            }
            let typeOfExModDesc = '';
            if(row.typeOfExMod && row.typeOfExMod.trim() != '') {
                typeOfExModDesc = this.EXMOD_TYPE[row.typeOfExMod];
            }
            values.push({ "exMod": exMod, "year": year, "indicatorDesc": indicatorDesc, "typeOfExModDesc": typeOfExModDesc }); 
        }

        // Sort by year
        values.sort(function(a,b){
            if(a.year > b.year)
                return -1;
            if(a.year < b.year)
                return 1;
            return 0;
          });

        let columns = [
            { columnField: "exMod", columnHeader: "ExMod" },
            { columnField: "year", columnHeader: "Year" },
            { columnField: "indicatorDesc", columnHeader: "Indicator" },
            { columnField: "typeOfExModDesc", columnHeader: "Type" }
        ];
        return { values: values, columns: columns };
    }

    componentDidMount() {
    }

    render() {
        return (
            <NinjaDataTable header={this.title} values={this.state.data.values} columns={this.state.data.columns} />)
    }
}
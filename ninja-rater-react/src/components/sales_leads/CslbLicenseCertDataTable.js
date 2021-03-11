import React from 'react';
import NinjaDataTable from '../common/NinjaDataTable';

export default class CslbLicenseCertDataTable extends React.Component {

    constructor(props) {
        super(props);
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
            const classification = data[i];
            values.push({ "certification": classification }); 
        }
        let columns = [
            { columnField: "certification", columnHeader: "Certifications" }
        ];
        return { values: values, columns: columns };
    }

    componentDidMount() {
    }

    render() {
        return (
            <NinjaDataTable values={this.state.data.values} columns={this.state.data.columns} />)
    }
}
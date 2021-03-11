import React from 'react';
import NinjaDataTable from '../common/NinjaDataTable';

export default class WorkCompHistoryDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.title = "Workers' Compensation History";
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
            values.push({ "insuranceCompany": row.insuranceCompany, "policyNumber": row.policyNumber,
                          "effectiveDate": row.effectiveDate, "expirationDate": row.expirationDate }); 
        }
        let columns = [
            { columnField: "insuranceCompany", columnHeader: "Insurance Company" },
            { columnField: "policyNumber", columnHeader: "Policy #" },
            { columnField: "effectiveDate", columnHeader: "Effective Date" },
            { columnField: "expirationDate", columnHeader: "Expiration Date" }
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
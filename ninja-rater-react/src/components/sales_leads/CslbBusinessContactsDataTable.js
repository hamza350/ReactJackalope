import React from 'react';
import NinjaDataTable from '../common/NinjaDataTable';

export default class CslbBusinessContactsDataTable extends React.Component {

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
            const contact = data[i];
            const name = `${contact.nameSuffix} ${contact.firstName} ${contact.middleName} ${contact.lastName}`;
            values.push({ "name": name, "cslbClassCode": contact.cslbClassCode, "asbExamInd": contact.asbExamInd, 
                "lastUpdatedDate": contact.lastUpdatedDate, "associatedDate": contact.associatedDate, "disassociatedDate": contact.disassociatedDate }); 
        }
        let columns = [
            { columnField: "name", columnHeader: "Name" },
            { columnField: "lastUpdatedDate", columnHeader: "Last Updated" },
            { columnField: "associatedDate", columnHeader: "Associated" },
            { columnField: "disassociatedDate", columnHeader: "Disassociated" },
            { columnField: "cslbClassCode", columnHeader: "Classification" },
            { columnField: "asbExamInd", columnHeader: "ASB Exam Indicator" }
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
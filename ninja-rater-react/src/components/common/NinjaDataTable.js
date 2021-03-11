import React from 'react';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';

export default class NinjaDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            header: props.header,
            values:  props.values,
            columns: props.columns
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <DataTable value={this.state.values} header={this.state.header}>
                { this.state.columns.map(column =>
                    <Column field={column.columnField} header={column.columnHeader}/>
                )}
            </DataTable>)
    }
}
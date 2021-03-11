import React from 'react';
import NinjaDataTable from '../common/NinjaDataTable';
import Utils from '../shared/Utils';

const utils = new Utils();

export default class ClassCodeHistDataTable extends React.Component {

    constructor(props) {
        super(props);
        this.title = "Classification History";
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
            const classificationCode = row.classificationCode || '';
            const classificationDesc = row.classificationDesc || '';

            values.push({ "classificationCode": classificationCode, "classificationDesc": classificationDesc }); 
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
            { columnField: "classificationCode", columnHeader: "Class Code" },
            { columnField: "classificationDesc", columnHeader: "Description" }
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
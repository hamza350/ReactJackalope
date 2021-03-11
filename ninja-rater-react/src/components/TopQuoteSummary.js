
import React, { Component } from 'react';
import {Panel} from 'primereact/components/panel/Panel';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {Button} from 'primereact/components/button/Button';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import {InputText} from 'primereact/components/inputtext/InputText';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Schedule} from 'primereact/components/schedule/Schedule';
import {Chart} from 'primereact/components/chart/Chart';

export class TopQuoteSummary extends Component {

    constructor() {
        super();
        this.state = {
            tasks: [],
            city: null
        };
        this.onTaskChange = this.onTaskChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
    }

    onTaskChange(e) {
        let selectedTasks = [...this.state.tasks];
        if(e.checked)
            selectedTasks.push(e.value);
        else
            selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

        this.setState({tasks: selectedTasks});
    }

    onCityChange(e) {
        this.setState({city: e.value});
    }

    componentDidMount() {
    }

    render() {
        let cities = [
            {label:'New York', value:{id:1, name: 'New York', code: 'NY'}},
            {label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}},
            {label:'London', value:{id:3, name: 'London', code: 'LDN'}},
            {label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}},
            {label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}}
        ];

        let chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        };

        let scheduleHeader = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};

        let events = [
			{
				"id": 1,
				"title": "All Day Event",
				"start": "2017-02-01"
			},
			{
				"id": 2,
				"title": "Long Event",
				"start": "2017-02-07",
				"end": "2017-02-10"
			},
			{
				"id": 3,
				"title": "Repeating Event",
				"start": "2017-02-09T16:00:00"
			},
			{
				"id": 4,
				"title": "Repeating Event",
				"start": "2017-02-16T16:00:00"
			},
			{
				"id": 5,
				"title": "Conference",
				"start": "2017-02-11",
				"end": "2017-02-13"
			},
			{
				"id": 6,
				"title": "Meeting",
				"start": "2017-02-12T10:30:00",
				"end": "2017-02-12T12:30:00"
			},
			{
				"id": 7,
				"title": "Lunch",
				"start": "2017-02-12T12:00:00"
			},
			{
				"id": 8,
				"title": "Meeting",
				"start": "2017-02-12T14:30:00"
			},
			{
				"id": 9,
				"title": "Happy Hour",
				"start": "2017-02-12T17:30:00"
			},
			{
				"id": 10,
				"title": "Dinner",
				"start": "2017-02-12T20:00:00"
			},
			{
				"id": 11,
				"title": "Birthday Party",
				"start": "2017-02-13T07:00:00"
			},
			{
				"id": 12,
				"title": "Click for Google",
				"url": "http://google.com/",
				"start": "2017-02-28"
			}
		];

        return <div className="ui-g dashboard">
                    <div className="ui-g-12 ui-md-6 ui-lg-3">
                        <div className="card overview" style={{cursor: 'pointer'}}>
                            <div className="overview-content clearfix colorbox colorbox-1">
                                  <div className="ui-g-4">
                                      <i className="material-icons">check_circle</i>
                                  </div>
                                  <div className="ui-g-8">
                                      <img src="assets/ninja/images/CompanyLogosByParentId/27.png" style={{width: '100%'}} alt="Sales" />
                                      <div><span className="colorbox-name">State Fund</span></div>
                                      <div><span className="colorbox-count">$27,715</span></div>
                                  </div>
                            </div>
                        </div>
                    </div>

                    <div className="ui-g-12 ui-md-6 ui-lg-3">
                        <div className="card overview" style={{cursor: 'pointer'}}>
                            <div className="overview-content clearfix colorbox colorbox-5">
                                  <div className="ui-g-4">
                                      <i className="material-icons">live_help</i>
                                  </div>
                                  <div className="ui-g-8">
                                      <img src="assets/ninja/images/CompanyLogosByParentId/33.png" style={{width: '100%'}} alt="Sales" />
                                      <div><span className="colorbox-name">Berk Hath Direct</span></div>
                                      <div><span className="colorbox-count">$23,832</span></div>
                                  </div>
                            </div>
                        </div>
                    </div>

                    <div className="ui-g-12 ui-md-6 ui-lg-3">
                        <div className="card overview" style={{cursor: 'pointer'}}>
                            <div className="overview-content clearfix colorbox colorbox-5">
                                  <div className="ui-g-4">
                                      <i className="material-icons">live_help</i>
                                  </div>
                                  <div className="ui-g-8">
                                      <img src="assets/ninja/images/CompanyLogosByParentId/24.png" style={{width: '100%'}} alt="Sales" />
                                      <div><span className="colorbox-name">Preferred Emp Ins Co</span></div>
                                      <div><span className="colorbox-count">$28,215</span></div>
                                  </div>
                            </div>
                        </div>
                    </div>


                    <div className="ui-g-12 ui-md-6 ui-lg-3">
                        <div className="card overview" style={{cursor: 'pointer'}}>
                            <div className="overview-content clearfix colorbox colorbox-6">
                                  <div className="ui-g-4">
                                      <i className="material-icons">block</i>
                                  </div>
                                  <div className="ui-g-8">
                                      <img src="assets/ninja/images/CompanyLogosByParentId/18.png" style={{width: '100%'}} alt="Sales" />
                                      <div><span className="colorbox-name">ICW</span></div>
                                      <div><span className="colorbox-count">$33,795</span></div>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
    }
}

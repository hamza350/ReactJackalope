import React, { Component } from 'react';
import classNames from 'classnames';

import '../assets/ninja/theme/theme-indigo.css';
import '../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';
import { Constraints } from 'fullcalendar';
import {TabView, TabPanel} from 'primereact/components/tabview/TabView';
import {Panel} from 'primereact/components/panel/Panel';
import PodCasts from './PodCasts';
import * as Constants from '../Constants';

export default class Help extends React.Component {

  constructor() {
      super();
      this.state = {
      };
  }

  componentDidMount() {

  }


render() {

    return (
<div className="ui-g ui-fluid no-padding" style={{width: '100%', background: 'transparent'}}>
<TabView className="ui-g ui-fluid no-padding" style={{width: '100%', background: 'transparent'}}>
    <TabPanel header="Knowledge Center" leftIcon="ui-icon-ondemand-video" className="no-padding" style={{width: '100%', background: 'transparent'}}>
        <div className="ui-g-12 ui-md-6">
            <div className="ui-g-12" style={{width: '100%'}}>
                <font color={Constants.themeColor}><b>Ninja Rater v3.0 Overview</b></font>
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>           
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/QFfuYbQ4TT0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>
        <div className="ui-g-12 ui-md-6">
            <div className="ui-g-12" style={{width: '100%'}}>
                <font color={Constants.themeColor}><b>Resources</b></font>
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="https://www.ninjarater.com/ninja-faq/" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>question_answer</i> Ninja Rater - Frequently Asked Questions</a>
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="https://www.ninjarater.com/sales-leads-faq/" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>attach_money</i> Work Comp Sales Leads</a>
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="https://www.ninjarater.com/blogs/" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>speaker_notes</i> Ninja Rater Blog</a>
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="https://www.ninjarater.com/favorite-markets/" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>pie_chart</i> Market Info / Favorite Markets</a>
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="https://www.ninjarater.com/workcompetition-innovation/" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>show_chart</i> WorkCOMPetition & Sales Innovation</a> 
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="https://www.ninjarater.com/api/" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>settings_input_component</i> Ninja Rater APIs</a> 
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="https://www.ninjarater.com/contact/" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>contact_mail</i> Contact Us</a>
            </div>
            <div className="ui-g-12" style={{width: '100%'}}>
                <a href="tel:19253029348" target="_blank"><i className="material-icons" style={{verticalAlign: 'middle'}}>contact_phone</i> Call Us at (925) 302-9348</a>
            </div>
        </div>
        <div className="ui-g-12" style={{width: '100%'}}>
            <div className="ui-g-12 ui-md-6">
                <div className="ui-g-12" style={{width: '100%'}}>
                    <font color={Constants.themeColor}><b>Ninja Rater v3.0 Demo</b></font>
                </div>
                <div className="ui-g-12" style={{width: '100%'}}>           
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/Dj9Wsh2D8c8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6">
                <div className="ui-g-12" style={{width: '100%'}}>
                    <font color={Constants.themeColor}><b>Ninja Rater APIs</b></font>
                </div>
                <div className="ui-g-12" style={{width: '100%'}}>
                    <iframe width="100%" height="315" aria-label="NinjaRater APIs" src="https://www.youtube.com/embed/F71sNs3iE1Y" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>

        <div className="ui-g-12" style={{width: '100%'}}>
            <div className="ui-g-12 ui-md-6">
                <div className="ui-g-12" style={{width: '100%'}}>
                    <font color={Constants.themeColor}><b>Tague Alliance Insurance Services - NINJARATER FOR WORK COMP RATING</b></font>
                </div>
                <div className="ui-g-12" style={{width: '100%'}}>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/C8tlKqBa28w" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>

            <div className="ui-g-12 ui-md-6">
                <div className="ui-g-12" style={{width: '100%'}}>
                    <font color={Constants.themeColor}><b>California WC Rates in 10 seconds or less!</b></font>
                </div>
                <div className="ui-g-12" style={{width: '100%'}}>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/tQ9kANRRA_c" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>

        <div className="ui-g-12" style={{width: '100%'}}>
            <div className="ui-g-12 ui-md-6">
                <div className="ui-g-12" style={{width: '100%'}}>
                    <font color={Constants.themeColor}><b>InsNerds Attachment Point News Roundtable with Justin Fowler, MBA</b></font>
                </div>
                <div className="ui-g-12" style={{width: '100%'}}>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/bMlAbgzDZ4w" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div className="ui-g-12 ui-md-6">
                <div className="ui-g-12" style={{width: '100%'}}>
                    <font color={Constants.themeColor}><b>Ninja Rater v2.0 Tutorial</b></font>
                </div>
                <div className="ui-g-12" style={{width: '100%'}}>
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/hnD7BUqClNo" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    </TabPanel>
 
    <TabPanel header="Podcasts & Radio Shows" leftIcon="ui-icon-mic" style={{width: '100%', background: 'transparent'}}>
        <PodCasts />
    </TabPanel>

    {/* <TabPanel header="Resources" leftIcon="ui-icon-assignment-ind" className="no-padding" style={{width: '100%'}}>
        <div className="ui-g-12 ui-md-6">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/tQ9kANRRA_c" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className="ui-g-12 ui-md-6">
            <div className="ui-g-12 no-padding" style={{width: '100%'}}>
                <a href="" target="_blank">Frequently Asked Questions</a>
            </div>
            <div className="ui-g-12 no-padding" style={{width: '100%'}}>
                <a href="" target="_blank">NinjaRater Blogs</a>
            </div>
        </div>
    </TabPanel> */}

</TabView>
</div>
    );
}
}




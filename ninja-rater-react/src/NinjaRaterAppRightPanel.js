import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import jQuery from 'jquery';
import Utils from './components/shared/Utils';
import {NinjaContext} from './components/shared/Utils';
import styles from "./NinjaRaterApp.module.scss";
const utils = new Utils();

export class NinjaRaterAppRightPanel extends Component {

    static defaultProps = {
        onContentClick: null,
        expanded: false
    }

    static propTypes = {
        onContentClick: PropTypes.func.isRequired,
        expanded: PropTypes.bool
    }

    constructor (props) {
        super(props);
        this.state = {
            listOfUserActivitySummary: {
                numberOfPdfReports: 0,
                numberOfRateQuotes: 0,
                numberOfMarketSearches: 0,
                numberOfDetailedPdfReports: 0
            }
        };
    }

    componentDidMount() {
        let listOfUserActivitySummary = this.context.initialData.listOfUserActivitySummary;
        this.setState({listOfUserActivitySummary: listOfUserActivitySummary});
        jQuery(this.rightPanelMenuScroller).nanoScroller({flash: true});
    }

    componentWillUnmount() {
        jQuery(this.layoutMenuScroller).nanoScroller('destroy');
    }

    render() {
        let className = classNames('layout-rightpanel', {'layout-rightpanel-active': this.props.expanded});
        const {listOfUserActivitySummary} = this.state;
        return (
            <React.Fragment>
                {
                    listOfUserActivitySummary && (
                        <div className={className} onClick={this.props.onContentClick}>
                            <div ref={(el) => this.rightPanelMenuScroller = el} className="nano">
                                <div className={["nano-content", "right-panel-scroll-content", styles.nanoContent].join(' ')}>
                                    <div className="layout-rightpanel-header" style={{textAlign: 'center'}}>
                                        <div className="weather-day" style={{fontSize: '2em', fontFamily: "proximanova"}}>
                                            <br />
                                  My Activity
                                </div>
                                        <div className="weather-day" style={{fontSize: '1.7em'}}>
                                            <br />
                                            <i className="material-icons">gavel</i>
                                        </div>
                                    </div>

                                    <div className="layout-rightpanel-content">
                                        <ul className="weekly-weather">
                                            <li>
                                                <span style={{fontSize: '1.1em', fontFamily: 'proximanova'}}>Amount of Indications:</span>
                                                <span className={["weekly-weather-value", styles.positionUnset].join(" ")} style={{fontSize: '1.1em'}}>{utils.formatNumber(this.state.listOfUserActivitySummary.numberOfRateQuotes)}</span>
                                            </li>

                                            <li>
                                                <span style={{fontSize: '1.1em', fontFamily: 'proximanova'}}>Amount Downloaded:</span>
                                                <span className={["weekly-weather-value", styles.positionUnset].join(" ")} style={{fontSize: '1.1em'}}>{utils.formatNumber(this.state.listOfUserActivitySummary.numberOfMarketSearches)}</span>
                                            </li>

                                            <li>
                                                <span style={{fontSize: '1.1em', fontFamily: 'proximanova'}}>Amount Quoted:</span>
                                                <span className={["weekly-weather-value", styles.positionUnset].join(" ")} style={{fontSize: '1.1em'}}>
                                                    {utils.formatNumber(this.state.listOfUserActivitySummary.numberOfPdfReports + this.state.listOfUserActivitySummary.numberOfDetailedPdfReports)}
                                                </span>
                                            </li>

                                            {/*<li>
                                        <span style={{fontSize: '1.1em'}}>Market PDFs:</span>
                                        <span className="weekly-weather-value" style={{fontSize: '1.1em'}}>
                                          {this.state.listOfUserActivitySummary.numberOfMarketSearches}
                                        </span>
                                    </li>*/}
                                        </ul>
                                        <div style={{textAlign: 'center'}}>
                                            <br />
                                            {/* <img className="profile-image" src="assets/ninja/layout/images/img/nr/NinjaIcon.png" alt="NinjaRater" /> */}
                                            <img className="preload-me" src="https://myjackalope.com/wp-content/uploads/2020/10/OPT117x77.png"
                                                // srcset="https://myjackalope.com/wp-content/uploads/2020/10/OPT117x77.png 117w, https://myjackalope.com/wp-content/uploads/2020/10/OPT117x77.png 117w"
                                                width="117" height="77" sizes="117px" alt="Jackalope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>)
                }
            </React.Fragment>
        )
    }
}

NinjaRaterAppRightPanel.propTypes = {};
NinjaRaterAppRightPanel.contextType = NinjaContext;

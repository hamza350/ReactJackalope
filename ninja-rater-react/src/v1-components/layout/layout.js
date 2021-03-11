import React, {Component} from 'react'
import styles from "../register/register.module.scss";
export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="load" className="ring-loader">
                    <div className="load-wrap"></div>
                </div>
                <div id="page">
                    <div id="header"></div>
                </div>
                <div id="main" className="sidebar-none sidebar-divider-vertical">
                    <div className="main-gradient"></div>
                    <div className={["wf-wrap", styles.wfWrapCss].join(' ')}>
                        <div className="wf-container-main">
                            <div id="content" role="main">
                                <div className="vc_row wpb_row vc_row-fluid vc_custom_1601710370643 vc_row-o-equal-height vc_row-o-content-middle vc_row-flex">
                                    {this.props.children}
                                    <div className="vc_column-inner"></div>
                                </div>
                            </div>
                            <div className="upb_bg_img" data-ultimate-bg="url(https://myjackalope.com/wp-content/uploads/2020/10/OPTtrade10-1024x683-3_9b55709b4e367dcddc125ff35fa99b50.jpg)" data-image-id="id^57475|url^https://stage.nr.olivetech.com/wp-content/uploads/2020/10/OPTtrade10-1024x683-3_9b55709b4e367dcddc125ff35fa99b50.jpg|caption^null|alt^null|title^OPTtrade10-1024x683-3_9b55709b4e367dcddc125ff35fa99b50|description^null" data-ultimate-bg-style="vcpb-vz-jquery" data-bg-img-repeat="repeat" data-bg-img-size="cover" data-bg-img-position="" data-parallx_sense="40" data-bg-override="ex-full" data-bg_img_attach="scroll" data-upb-overlay-color="rgba(0,0,0,0.6)" data-upb-bg-animation="" data-fadeout="" data-bg-animation="left-animation" data-bg-animation-type="h" data-animation-repeat="repeat" data-fadeout-percentage="30" data-parallax-content="" data-parallax-content-sense="30" data-row-effect-mobile-disable="true" data-img-parallax-mobile-disable="true" data-rtl="false" data-custom-vc-row="" data-vc="6.4.1" data-is_old_vc="" data-theme-support="" data-overlay="true" data-overlay-color="rgba(0,0,0,0.6)" data-overlay-pattern="" data-overlay-pattern-opacity="0.8" data-overlay-pattern-size="" data-overlay-pattern-attachment="scroll"    ></div>
                            <span className="cp-load-after-post"></span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

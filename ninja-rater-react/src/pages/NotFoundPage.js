import React, { Component } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'
import jQuery from 'jquery';
import $ from 'jquery';

import ErrorDiv from './ErrorDiv';
import FooterSimple from '../components/FooterSimple';
import BrowserBackArrowForPage from '../components/navigation/BrowserBackArrowForPage'
import NinjaLogoMedium from '../components/logos/NinjaLogoMedium'

import '../assets/ninja/theme/theme-indigo.css';
import '../assets/ninja/layout/css/layout-indigo.css';
import 'primereact/resources/primereact.min.css';
import '../ripple.js';

import {Panel} from 'primereact/components/panel/Panel';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import Help from './Help';

export default class NotFoundPage extends React.Component {

  constructor() {
      super();
      this.state = {
        layoutMode: 'static',
        profileMode: 'inline',
        overlayMenuActive: false,
        staticMenuDesktopInactive: false,
        staticMenuMobileActive: false,
        rotateMenuButton: false,
        topbarMenuActive: false,
        activeTopbarItem: null,
        darkMenu: false,
        rightPanelActive: false,
        menuActive: false
      };
  }


  //componentWillMount() { }

  componentDidMount() {
      //jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
      var inputs = document.getElementsByTagName('input');

      var addClass = function(element, className) {
          if (element.classList)
              element.classList.add(className);
          else
              element.className += ' ' + className;
      },
      removeClass = function(element, className) {
          if (element.classList)
              element.classList.remove(className);
          else
              element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      };

      for(var i = 0; i < inputs.length; i++) {
          var input = inputs[i];

          input.addEventListener('blur', function(event) {
              if(this.value != '') {
                  addClass(this, 'ui-state-filled');
              }
              else {
                  removeClass(this, 'ui-state-filled');
              }
          });
      }

      this.redirectToMainPage();
    //   setTimeout(() => {
    //     this.redirectToMainPage();
    //   }, 3000);
  }

  redirectToMainPage() {
      window.location = '/';
  }



  isTablet() {
      let width = window.innerWidth;
      return width <= 1024 && width > 640;
  }

  isDesktop() {
      return window.innerWidth > 1024;
  }

  isMobile() {
      return window.innerWidth <= 640;
  }

  isOverlay() {
      return this.state.layoutMode === 'overlay';
  }

  isHorizontal() {
      return this.state.layoutMode === 'horizontal';
  }

  isSlim() {
      return this.state.layoutMode === 'slim';
  }

    render() {
        const errors = ["Yo! Error!", "Again Error"];
        return (
<div className="login-body">

    <BrowserBackArrowForPage />

    <div className="login-panel ui-fluid" style={{margin: '3px auto 0 auto'}}>
      <div className="ui-g">

        <NinjaLogoMedium />

        <div className="ui-g-12" style={{padding: 3+'px'}}>
          <center><h1><font color="white">404 - Not Found</font></h1></center>
        </div>

        <div className="ui-g-12" style={{padding: 3+'px'}}>
            <center><Link to="/" style={{fontSize: '1.3em'}} className="secondary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left">
                <i style={{float: 'left'}} className="ui-button-icon-left ui-c fa fa-fw ui-icon-home"></i>
                <span className="ui-button-text ui-c" style={{fontSize: '1.3em'}}>NinjaRater.com</span>
            </Link></center>
        </div>

      </div>
    </div>

    <Help />
    <FooterSimple />

</div>
        );
    }
}

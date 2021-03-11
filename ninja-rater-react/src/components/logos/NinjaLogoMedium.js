import React, { Component } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'

export default class NinjaLogoMedium extends React.Component {

  constructor(props) {
      super(props);
      const defaultLogoImage = 'NinjaRater-Logo-Login.png';
      const logoPath = 'assets/ninja/layout/images/img/nr/';
      const logoImage = logoPath + (props.logoImage && props.logoImage != '' ? props.logoImage : defaultLogoImage);
      this.state = {
        logoImage: logoImage
      };
  }

    render() {
        return (
          <div>
              <a href="https://www.ninjarater.com" target="_blank">
                  <img src={this.state.logoImage} />
              </a>
          </div>
        );
    }
}

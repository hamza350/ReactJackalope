import React, { Component } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom'

export default class NinjaIcon extends React.Component {

  constructor(props) {
      super(props);
      const defaultIconImage = 'NinjaRater-Logo-LoginWhite.png';
      const iconPath = 'assets/ninja/layout/images/img/nr/';
      const iconImage = logoPath + (props.iconImage && props.iconImage != '' ? props.iconImage : defaultIconImage);
      this.state = {
        logoImage: iconImage
      };
  }

    render() {
        return (
          <div>
              <Link to="/">
                  <img src={this.state.iconImage} />
              </Link>
          </div>
        );
    }
}

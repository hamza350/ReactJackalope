import React, {Component} from 'react';
import classNames from 'classnames';
import jQuery from 'jquery';
import $ from 'jquery';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import '../../App.css';

class ProgressSpinnerSmall extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      maxWidth: this.props.maxWidth,
      maxHeight: this.props.maxHeight,
      marginTop: this.props.marginTop,
      display: this.props.display && this.props.display.trim() != '' ? this.props.display.trim() : 'none',
      divHeight: this.props.divHeight && this.props.divHeight.trim() != '' ? this.props.divHeight.trim() : '60px'
    };
  }

  componentDidMount() {
  }

  render() {
    let listOfCssClasses = 'ui-g ui-fluid no-padding';
    return (
      <div id="NinjaProgressSpinnerSmall" className={listOfCssClasses} style={{
        borderTop: 0, borderRadius: '7px', height: this.state.divHeight,
        overflow: 'auto', display: 'block', margin: 'auto', marginLeft: 'auto', marginRight: 'auto',
        width: '50%', display: this.state.display
      }}>
        <div style={{display: 'table', margin: 'auto', textAlign: 'center'}}>
          <div className="ui-g-12 ui-md-2 no-padding"
            style={{
              opacity: 0.9, textAlign: 'center',
              position: 'relative', left: 0, top: 0,
              width: this.state.maxWidth, height: this.state.maxHeight, marginTop: this.state.marginTop
            }}>
            {/* Image Overlays http://www.corelangs.com/css/box/ontop.html */}
            {/* <img className="profile-image"
                  style={{position: 'absolute', left: 0, top: 0}}
                  src="assets/ninja/layout/images/spinners/spinner9.gif" alt="Sign-In Progress"/> */}
            <img className="profile-image"
              style={{relative: 'absolute', left: '10px', top: '25px', opacity: 0.9}}
              src="assets/ninja/layout/images/spinners/spinner1.gif" alt="Sign-In Progress" />
          </div>
        </div>
      </div>
    );
  }
}

export default ProgressSpinnerSmall;

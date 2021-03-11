import React, {Component} from 'react';
import classNames from 'classnames';
import jQuery from 'jquery';
import $ from 'jquery';
import 'primereact/resources/primereact.min.css';
import '../../assets/ninja/theme/theme-indigo.css';
import '../../assets/ninja/layout/css/layout-indigo.css';
import '../../App.css';

class NinjaProgressSpinner extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      maxWidth: this.props.maxWidth,
      maxHeight: this.props.maxHeight,
      marginTop: this.props.marginTop,
      display: this.props.display && this.props.display.trim() != '' ? this.props.display.trim() : 'none'
    };
  }

  componentDidMount() {
    let spinnerDiv = $('#ID_NINJA_SPINNER_IN_PROGRESS');
    if (this.state.maxWidth) {
      $(spinnerDiv).css({width: this.state.maxWidth});
    }
    if (this.state.maxHeight) {
      $(spinnerDiv).css({height: this.state.maxHeight});
    }
    if (this.state.marginTop) {
      $(spinnerDiv).css({height: this.state.marginTop});
    }
  }

  render() {
    return (
      <div style={{display: 'table', margin: 'auto', textAlign: 'center'}}>
        <div id="ID_NINJA_SPINNER_IN_PROGRESS" className="ui-g-12 ui-md-2 no-padding"
          style={{
            opacity: 0.9, display: this.state.display, textAlign: 'center',
            position: 'relative', left: 0, top: 0, zIndex: 9999
          }}>
          {/* Image Overlays http://www.corelangs.com/css/box/ontop.html */}
          {/* <img className="profile-image"
            style={{position: 'relative', left: 0, top: 0}}
            src="assets/ninja/layout/images/spinners/spinner9.gif" alt="Sign-In Progress" /> */}
          <img className="profile-image"
            style={{position: 'absolute', left: '30px', top: '75px', opacity: 0.9}}
            src="assets/ninja/layout/images/spinners/spinner1.gif" alt="Sign-In Progress" />
        </div>
      </div>
    );
  }
}

export default NinjaProgressSpinner;

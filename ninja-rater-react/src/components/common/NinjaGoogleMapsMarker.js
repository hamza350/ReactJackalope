import React from 'react';
import * as Constants from '../../Constants';

/* eslint-disable react/prefer-stateless-function */
class NinjaGoogleMapsMarker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { lat: props.lat, lng: props.lng, text: props.text };
    }

    render() {
        return <div style={{
            color: 'white',
            fontWeight: 'bold',
            background: Constants.themeColor,
            padding: '5px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.3em'
          }}>
            {this.state.text}
        </div>;
        // return <div>{this.state.text}</div>;
    }
}

NinjaGoogleMapsMarker.propTypes = {};

export default NinjaGoogleMapsMarker;

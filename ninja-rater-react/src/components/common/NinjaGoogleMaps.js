import React from 'react';
import GoogleMapReact from 'google-map-react';
import Utils from '../shared/Utils';

const utils = new Utils();

class NinjaGoogleMaps extends React.Component {

    constructor(props) {
        super(props);
        this.uniqueKey = props.uniqueKey || 1;
        let width = props.width || '100%';
        let height = props.height || '350px';
        this.state = { center: props.center, markers: props.markers, width: width, height: height };
        this.apiIsLoaded = this.apiIsLoaded.bind(this);
    }

    componentDidMount() {
    }

    apiIsLoaded(map, maps, places) {
        //alert("apiIsLoaded");
    }

    render() {
        const apiKey = utils.getGoogleApiKey();
        const defaultCenter = this.state.center ? [this.state.center.lat, this.state.center.lng] : [];
        return (
            <div style={{ height: this.state.height, width: this.state.width }}>
            {/* <div style={{ height: 'auto', width: '100%' }}> */}
                <GoogleMapReact key={this.uniqueKey}
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultZoom={8}
                    defaultCenter={defaultCenter}
                    // yesIWantToUseGoogleMapApiInternals
                    // onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
                >
                { this.state.markers ? this.state.markers.map( (marker) => {return marker;} ) : '' }
                </GoogleMapReact>
            </div>
        );
    }
};

NinjaGoogleMaps.propTypes = {};

export default NinjaGoogleMaps;

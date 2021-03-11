import React from 'react';
import Utils from '../shared/Utils';
import $ from 'jquery';

const utils = new Utils();

export default class CslbLiveDataHandler extends React.Component {

    fetchLicenseDetailsAsync = (cslbLicenseNumber, callback) => {
        $.ajax({
            url: 'http://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum='+cslbLicenseNumber,
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: callback
          });
    }

}

//
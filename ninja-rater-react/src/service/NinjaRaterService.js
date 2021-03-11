import axios from 'axios';

export class NinjaRaterService {

    getStubbedNinjaClassifications() {
        return axios.get('assets/demo/data/ninja-classifications.json')
                .then(res => res.data);
    }

    getStubbedMarketSearchResults() {
        return axios.get('assets/demo/data/ninja-market-search-results.json')
                .then(res => res.data);
    }

    getStubbedRateResults() {
        return axios.get('assets/demo/data/rates-result-sample.json')
                .then(res => res.data);
    }

    getStubbedClassCodes() {
        return axios.get('assets/demo/data/class-codes.json')
                .then(res => res.data);
    }

    getStubbedSicCodes() {
        return axios.get('assets/demo/data/sic-codes.json')
                .then(res => res.data);
    }

    getZipcodeCityCountyCA() {
        return axios.get('assets/demo/data/ZipcodeCityCountyCA.json')
                .then(res => res.data);
    }
}

/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/

import CoreService from "./CoreService";

export default class TheySadSoQuotesService extends CoreService {
    apiUrl = 'http://quotes.rest/qod.json';

    constructor() {
        super(...arguments);
    }

    getQuoteOfTheDay() {
        return super.makeRequest(this.apiUrl);
    }
}

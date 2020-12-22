/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/

import CoreService from "./CoreService";

export default class QuoteService extends CoreService {
    apiUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10';

    constructor() {
        super(...arguments);
    }

    getQuotes() {
        return super.makeRequest(this.apiUrl);
    }
}

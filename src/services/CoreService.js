/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/


export default class CoreService {
    constructor() {
    }

    makeRequest(url, _options) {
        return new Promise((resolve, reject) => {
            let options = {
                method: "GET"
            };

            if (_options) {
                options = this.mergeObjects({}, options, _options);
            }

            this._fetch(url, options).then((res) => {
                return resolve(res);
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    // refreshToken() {
    //     return new Promise((resolve, reject) => {
    //         AsyncStorage.getItem('token', (err, token) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //
    //             let options = {
    //                 method: 'GET',
    //                 withCredentials: true,
    //                 credentials: 'include',
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": "Bearer " + token
    //                 }
    //             };
    //
    //             this._fetch((config.apiUrl + 'admin/refresh-token'), options).then((res) => {
    //                 return resolve(res.access_token);
    //             }).catch((err) => {
    //                 return reject(err);
    //             });
    //         });
    //     });
    // }

    _fetch(requestUrl, options) {
        return new Promise((resolve, reject) => {
            //first then block is for handling errors if there is one or for converting response to JSON
            return fetch(requestUrl, options).then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        let res;

                        switch (response.status) {
                            case 400: //bad request
                                res = JSON.parse(text);
                                break;
                            case 401: //unauthorized
                                res = {
                                    message: 'Unauthorized',
                                    unauthorized: true
                                };
                                break;
                            case 403: //forbidden
                                res = JSON.parse(text);
                                break;
                            case 404: //not found
                                res = JSON.parse(text);
                                break;
                            default:
                                res = {message: 'There was an error. Please try again'};
                                break;
                        }

                        throw res;
                    }).catch((err) => {
                        throw {message: err.message, unauthorized: err.unauthorized};
                    });
                } else {
                    return response.json();
                }
            }).then((res) => {
                return resolve(res);
            }).catch((err) => {
                return reject({message: err.message, unauthorized: err.unauthorized});
            });
        });
    }

    mergeObjects(target) {
        let sources = [].slice.call(arguments, 1);

        // https://stackoverflow.com/a/14974931/8021607
        sources.forEach(function (source) {
            for (let propertyName in source) {
                if (target[propertyName] !== undefined && typeof target[propertyName] === 'object' && !(target[propertyName] instanceof Array)) {
                    target[propertyName] = {...target[propertyName], ...source[propertyName]};
                } else {
                    target[propertyName] = source[propertyName];
                }
            }
        });

        return target;
    }
}
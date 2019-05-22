/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import AppNavigation from './src/navigation/AppNavigator'

export default class App extends Component {

    state = {
        quote: null
    };

    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <View style={styles.container}>
                <AppNavigation/>
            </View>
        );
    }

    getQuote = async () => {
        // http://quotes.rest/qod.json


    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
});

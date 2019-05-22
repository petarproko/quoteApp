/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/

import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TheySadSoQuotesService from "../services/TheySadSoQuotesService";
import {ToastAndroid} from 'react-native';

export default class QuoteScreen extends React.Component {
    static navigationOptions = {
        title: 'They said so quotes',
        headerRight: (
            <View style={{marginRight: 20}}>
                <TouchableOpacity
                    activeOpacity={1}>
                    <Icon
                        name="reload"
                        size={30}
                        color="#900"
                    />
                </TouchableOpacity>
            </View>
        ),
    };

    state = {
        quote: null
    };

    constructor() {
        super(...arguments);
    }

    async componentDidMount() {
        await this.getSingleQuote();
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.quote ?
                        <TouchableOpacity
                            onPress={() =>{
                                Clipboard.setString(this.state.quote.author);
                                Clipboard.setString(this.state.quote.quote);

                                ToastAndroid.showWithGravity(
                                    'Quote copied to clipboard',
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER,
                                );
                            }}
                            style={styles.quoteContainer}>
                            <View style={styles.quoteAuthorContainer}>
                                <Text style={styles.quoteAuthor}>
                                    {this.state.quote.author}
                                </Text>
                            </View>

                            <Text style={styles.quoteText}>
                                {this.state.quote.quote}
                            </Text>
                        </TouchableOpacity>
                        :
                        <Text>TheySaidSo Quote Screen</Text>
                }
            </View>
        );
    }

    getSingleQuote = async () => {
        new TheySadSoQuotesService().getQuoteOfTheDay().then((quote) => {
            this.setState({
                quote: {
                    author: quote.contents.quotes[0].author,
                    quote: quote.contents.quotes[0].quote
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center'
    },
    quoteContainer: {
        flex: 1,
        padding: 20,
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C7FBE'
    },
    quoteAuthor: {
        fontSize: 24,
        width: '100%',
        color: '#785396',
        textAlign: 'center',
        marginBottom: 30
    },
    quoteAuthorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    quoteText: {
        flex: 1,
        fontSize: 18,
        width: '100%',
        color: '#F1EFEF',
        textAlign: 'center',
        // alignItems: 'flex-end'
    }
});


/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/

import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Clipboard, ToastAndroid, FlatList} from 'react-native';
import QuoteService from "../services/QuoteService";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import Svg, {G, Path} from 'react-native-svg';
import AsyncStorage from '@react-native-community/async-storage';

export default class QuoteListScreen extends React.Component {
    static navigationOptions = {
        title: 'List of quotes',
        headerRight: (
            <View style={{marginRight: 20}}>
                <TouchableOpacity>
                    <OcticonsIcon
                        size={28}
                        color={'#000000'}
                        name={'archive'}
                    />
                </TouchableOpacity>
            </View>
        ),
    };

    state = {
        quotes: [
            {
                id: 1,
                title: 'Petar Prokopenko',
                content: '<p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>'
            },
            {
                id: 2,
                title: 'Petar Prokopenko',
                content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem '
            },
            {
                id: 3,
                title: 'Petar Prokopenko',
                content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem '
            },
            {
                id: 4,
                title: 'Petar Prokopenko',
                content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem '
            },
            {
                id: 5,
                title: 'Petar Prokopenko',
                content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem '
            },
            {
                id: 6,
                title: 'Petar Prokopenko',
                content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem '
            },
            {
                id: 7,
                title: 'Petar Prokopenko',
                content: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem '
            }
        ]
    };

    constructor() {
        super(...arguments);
    }

    copyToClipboard(item) {
        Clipboard.setString(item.title);
        Clipboard.setString(item.content.replace(/(<([^>]+)>)/ig, ''));

        ToastAndroid.showWithGravity(
            'Quote copied to clipboard',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }

    componentWillMount() {
        // new QuoteService().getQuotes().then((quotes) => {
        //     this.setState({
        //         quotes: quotes
        //     });
        // }).catch((err) => {
        //     ToastAndroid.showWithGravity(
        //         err.message,
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER,
        //     );
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.quotes ?
                        <FlatList
                            data={this.state.quotes}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({item, index}) => {
                                return (
                                    <View style={styles.rowContainer}>
                                        <TouchableOpacity onPress={() => {
                                            this.copyToClipboard(item);
                                        }} style={styles.rowTextContainer}>
                                            <Text style={styles.rowTextTitle}>
                                                {item.title}
                                            </Text>

                                            <Text style={styles.rowContentText}>
                                                {item.content}
                                            </Text>
                                        </TouchableOpacity>

                                        <View style={styles.actionContainer}>
                                            <TouchableOpacity onPress={() => {
                                                this.addToArchive(item)
                                            }}>
                                                <Svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                                                     viewBox="0 0 49 49" style="enable-background:new 0 0 49 49;">
                                                    <G>
                                                        <Path stroke='#000000' strokeWidth='1'
                                                              d="M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5   V2h7v16h28V2h1.586L46.5,9.414V47z"/>
                                                        <Path stroke='#000000' strokeWidth='1'
                                                              d="M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z"/>
                                                        <Path stroke='#000000' strokeWidth='1'
                                                              d="M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z"/>
                                                        <Path stroke='#000000' strokeWidth='1'
                                                              d="M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37   c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z"/>
                                                        <Path stroke='#000000' strokeWidth='1'
                                                              d="M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z"/>
                                                    </G>
                                                </Svg>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                );
                            }}
                        />
                        :
                        <Text style={{justifyContent: 'center', alignSelf: 'center'}}>
                            List of quotes is loading...
                        </Text>
                }
            </View>
        );
    }

    async addToArchive(item) {
        try {
            let archiveQuotes = await AsyncStorage.getItem('archiveQuotes');

            archiveQuotes = archiveQuotes === null ? [] : JSON.parse(archiveQuotes);

            let quoteExistsInArchiveIndex = archiveQuotes.findIndex((quote) => {
                return quote.id === item.id
            });

            if (quoteExistsInArchiveIndex === -1) {
                archiveQuotes.push(item);
            } else {
                ToastAndroid.showWithGravity(
                    'Post is already added to archive.',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );

                return false;
            }

            AsyncStorage.setItem('archiveQuotes', JSON.stringify(archiveQuotes));

            ToastAndroid.showWithGravity(
                'Successfully added post to archive.',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } catch (err) {
            ToastAndroid.showWithGravity(
                'Error while trying to add item, err message: ' + err.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
    }
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
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1
    },
    rowTextContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    rowTextTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: '#000000'
    },
    rowContentText: {
        color: '#7D8896',
        fontSize: 13
    },
    actionContainer: {
        width: 50,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


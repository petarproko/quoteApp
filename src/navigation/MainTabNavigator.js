/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/

import React from 'react';
import QuoteScreen from "../screens/quoteScreen";
import QuoteListScreen from "../screens/quoteListScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

const quoteStack = createStackNavigator(
    {
        Quote: QuoteScreen,
    },
    {
        navigationOptions: {
            tabBarLabel: 'Quote',
            tabBarIcon: ({focused}) => (
                <Icon
                    focused={focused}
                    size={28}
                    name={'alpha-t-circle-outline'}
                />
            )
        }
    }
);

const quoteListStack = createStackNavigator(
    {
        QuoteList: QuoteListScreen,
    },
    {
        navigationOptions: {
            tabBarLabel: 'List',
            tabBarIcon: ({focused}) => (
                <FontAwesome5Icon
                    focused={focused}
                    size={28}
                    name={'th-list'}
                />
            )
        }
    }
);

export default createBottomTabNavigator({
    quoteStack,
    quoteListStack,
});

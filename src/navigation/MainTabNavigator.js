/*
* Created by Petar Prokopenko
* All right reserved. Do not use without permissions!
*/

import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import QuoteScreen from "../screens/quoteScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const quoteStack = createStackNavigator({
    Quote: QuoteScreen,
});

quoteStack.navigationOptions = {
    tabBarLabel: 'Quote',
    tabBarIcon: ({focused}) => (
        <Icon
            focused={focused}
            size={28}
            name={'alpha-t-circle-outline'}
        />
    )
};

export default createBottomTabNavigator({
    quoteStack,
    quoteStack,
});

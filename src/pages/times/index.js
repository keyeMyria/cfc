import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Times extends Component{
    
    static navigationOptions = {
        title: 'Organizações',
        tabBarIcon: ({ tintColor }) => <Icon name='building' size={20} color={tintColor} />
      }

    render(){
        return(
            <View>
                <Text>TIMES</Text>
            </View>
        )
    }
}
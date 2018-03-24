import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';


export default class Ligas extends Component{

    signOut = async () => {
        await AsyncStorage.clear();

        const resetAction = NavigationActions.reset({
            index:0,
            actions:[
              NavigationActions.navigate({ routeName: 'Welcome' })
            ]
          })

          this.props.navigation.dispatch(resetAction);

    }

    render(){
        return (
            <View>
                <Text>LIGAS</Text>
            <TouchableOpacity
                onPress={this.signOut}
            >
            <Text>SAIR</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
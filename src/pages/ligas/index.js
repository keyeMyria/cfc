import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Ligas extends Component{

    static navigationOptions = {
        title: 'Organizações',
        tabBarIcon: ({ tintColor }) => <Icon name='building' size={20} color={tintColor} />
      }

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
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';


export default class Parciais extends Component {

    static navigationOptions = {
         header:null, 
         drawerLabel:'Parciais',
      /*  drawerIcon: ({ tintColor }) => (
             <Image
              source={require('../../images/home.png')}
              style={[styles.icon, {tintColor: tintColor }]}
            />
            
          ),
          */
          
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
                <Text>Parciais</Text>
            <TouchableOpacity
                onPress={this.signOut}
            >
            <Text>SAIR</Text>
            </TouchableOpacity>
            </View>
        )
    }
}
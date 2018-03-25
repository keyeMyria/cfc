import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {View, Text, TouchableOpacity,AsyncStorage} from 'react-native';


export default class Contas extends Component{

        static navigationOptions = ({navigation}) => ({
            drawerLabel: 'Minhas Contas',
            title:'Minhas Contas'
          //  tabBarIcon: ({ tintColor }) => <Icon name='building' size={20} color={tintColor} />
          })

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
                    <Text>CONTAS</Text>
                <TouchableOpacity
                    onPress={this.signOut}
                >
                <Text>SAIR</Text>
                </TouchableOpacity>
                </View>
            )
        }
}
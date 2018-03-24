import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import createNavigator from './routes';
import './config/reactotronConfig';

import { View, Text } from 'react-native';

export default class App extends Component{
  
  state = {
    userChecked:false,
    userLogged: false,
  }
  
  async componentDidMount(){
    const token = await AsyncStorage.getItem('@ESCartolaFC:token');
 
     this.appLoaded(token);
   }

   appLoaded = (token) => {
    this.setState({ 
              userChecked: true,
              userLogged: !!token // retorna true
            });

  }

  render(){

    if(!this.state.userChecked)
    {return null};
    
   const Routes = createNavigator(this.state.userLogged);
    
    return (
      <Routes />
    )
  }
}

import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux'; // continua aqui
import { createStore, applyMiddleware } from 'redux'; // createStore sai desse arquivo
import ReduxThunk from 'redux-thunk';
// ===================================================================================
import reducers from './redux/reducers';
import createNavigator from './routes';
import './config/reactotronConfig';

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
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    )
  }
}

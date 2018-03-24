import React, {Component} from 'react';
import { View, 
         Text, 
         TouchableOpacity, 
         StatusBar, 
         TextInput, 
         ActivityIndicator, 
         AsyncStorage } from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './styles';
import {apiCartola} from '../../services';

import axios from 'axios';

export default class Welcome extends Component {

    static navigationOptions = {
        header:null,
      }

      state = {
        username:'souza.everthon@gmail.com',
        password:'souza123',
        loading:false,
        errorMessage:null,
        token: ''
      }
// ====================================================================================     
      saveToken = async (token) => {
        await AsyncStorage.setItem('@ESCartolaFC:token',token)
      }

// ====================================================================================
      checkUserExists = async (username, password) => {
        
        //const user = await apiAuth.post('/',{
        const user = await axios.post('https://login.globo.com/api/authentication',{
            payload:{
                email:username,
                password: password,
                serviceId: 438
                },
                captcha:'' 
        })
        .then(res => this.setState({ loading:false, token:res.data.glbId}) )
        .catch(err => this.setState({ loading: false, errorMessage:'Erro ao se conectar. Verifique seus dados e tente novamente', token:'' }))
        ;

        return user;
    
      }
// ====================================================================================
      signIn = async () => {

        const {username, password} = this.state;
    
        // se nao foi digitado um usuario, saimos da funcao
        if(username.length === 0 || password.length === 0) return;
    
        this.setState({ loading:true, errorMessage:null });
        
    
        try{
        
        await this.checkUserExists(username, password);

        const {token} = this.state;
        
         await this.saveToken(token);
    
          // deu certo.. direciona para a pagina
          const resetAction = NavigationActions.reset({
            index:0,
            actions:[
              NavigationActions.navigate({ routeName: 'User' })
            ]
          })
      
          this.props.navigation.dispatch(resetAction);
    
        }catch(err){
         // erro
         this.setState({ loading: false, errorMessage:'Usuário não existe'+err })
        }
    
        
      }

    render(){
        return(
            <View style={styles.container}>
            <StatusBar barStyle='light-content'/>
                <Text style={styles.title} >Bem-vindo, Cartoleiro</Text>
                <Text style={styles.text} >Para continuar, precisamos que você informe seu usuário e senha no CartolaFC</Text>
                { !!this.state.errorMessage && <Text style={styles.error} >{this.state.errorMessage}</Text> }
                <View style={styles.form}>
                  <TextInput 
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu usuário"
                    underlineColorAndroid="transparent"
                    value={this.state.username}
                    onChangeText={text=>this.setState({username : text})}
                  />
                  <TextInput 
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite sua senha"
                    underlineColorAndroid="transparent"
                    value={this.state.password}
                    onChangeText={text=>this.setState({password : text})}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.signIn} >
                  { this.state.loading 
                  ? <ActivityIndicator size='small' color="#FFF" />
                  :
                  <Text style={styles.buttonText} >Prosseguir</Text>
                  }
                  
                  
                </TouchableOpacity>
            </View>
        )
    }
}
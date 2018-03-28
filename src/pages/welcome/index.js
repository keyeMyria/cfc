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

// TESTE PARA SALVAR UM JSON NO ASYNCSTORAGE AS INFORMACOES DA API
_saveApiAsyncStorage = async (token) => {

  try{
    const response = await apiCartola.get(`/auth/time`, {headers: {'X-GLB-Token' : token}} ) // meu time

    console.tron.log(response.data);
    console.tron.log('vou salvar no storage');
    const apiFormat = await JSON.stringify(response);
    await AsyncStorage.setItem('@ESCartolaFC:jsonApiData',apiFormat);
    const jsonApiData = await AsyncStorage.getItem("@ESCartolaFC:jsonApiData");
    console.tron.log(jsonApiData);

    console.tron.log('vamos pegar do storage e formatar para JSON');
    const jsonApiDataPARSE = await JSON.parse(jsonApiData);
    console.tron.log(jsonApiDataPARSE)
  //  console.tron.log(jsonApiDataPARSE.data)
  //  console.tron.log(jsonApiDataPARSE.data.time)

    this.setState({ loading:false });


  }catch(err){
    console.tron.log('erro no _saveApiAsyncStorage : '+err)
    this.setState({ loading:false });

  }
  

}
// ====================================================================================     
      saveToken = async (token) => {
        await AsyncStorage.setItem('@ESCartolaFC:token',token)
      }

// ====================================================================================
      checkUserExists = async (username, password) => {
        
      try{
            const user = await axios.post('https://login.globo.com/api/authentication',{
              payload:{
                  email:username,
                  password: password,
                  serviceId: 438
                  },
                  captcha:'' 
          });
        
          this.setState({  token:user.data.glbId})
          return user;
      }catch(err){
          return user
      }  
    }
// ====================================================================================
      signIn = async () => {

    try{

        const {username, password} = this.state;
        
        // se nao foi digitado um usuario, saimos da funcao
        if(username.length === 0 || password.length === 0) return;
    
        this.setState({ loading:true, errorMessage:null });
    
        await this.checkUserExists(username, password);

        const {token} = this.state;
        
        await this.saveToken(token);


        // MEU TESTE PARA SALVAR O RESULTADO DA API NO ASYNCSTORAGE =============
        await this._saveApiAsyncStorage(token);
        // ======================================================================

          // deu certo.. direciona para a pagina
          /* 
           aqui podemos mudar para que o app busque as informações necessarias nas APIs e salve no redux ou storage
           e só depois disso enviamos o usuario para dentro da aplicacao. Assim, as telas serao renderizadas
           com informações locais e quando houver a necessidade de atualizar, manualmente o usuario solicita
           a nova buscar na API
          */
       
         const resetAction = NavigationActions.reset({
            index:0,
            actions:[
              NavigationActions.navigate({ routeName: 'User' })
            ]
          })
      
          this.props.navigation.dispatch(resetAction);
        
        }catch(err){
         // erro
         this.setState({ loading: false, errorMessage:'Usuário ou senha inválidos' })

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
                  <Text style={styles.buttonText} >Entrar</Text>
                  }
                                    
                </TouchableOpacity>
            </View>
        )
    }
}
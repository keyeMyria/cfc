import React, {Component} from 'react';

import {View, Text, FlatList, ActivityIndicator, AsyncStorage, Image} from 'react-native';
import styles from './styles';
import { apiCartola } from '../../services';

export default class Meutime extends Component{

    state = {
        data:[],
        loading:true,
      }

      componentDidMount(){
        this.loadOrganizations();
      }
    
      loadOrganizations = async () => {
        const token = await AsyncStorage.getItem("@ESCartolaFC:token");
        const response = await apiCartola.get(`/auth/time`, {headers: {'X-GLB-Token' : token}} )
          //  .then(res => {this.setState({data : res.data, loading: false})})
          //  .catch(err => alert(err))
    
        this.setState({ data: response.data.atletas , loading: false })
        console.tron.log(this.state.data.atletas)
      }
    
     renderListItem = ({ item }) => (

        <View style={styles.lista} >
            <Image style={{width: 50, height: 50}} source={{uri:item.foto.replace("FORMATO","140x140")}} />
            <Text>{item.apelido}</Text> 
            <Text> Preço: {item.preco_num}</Text>
        </View>
    )
    
      renderList = () => (
        <FlatList
          data={this.state.data}
          keyExtractor={item => String(item.atleta_id)}
          renderItem={this.renderListItem}
         // numColumns={2}
        // columnWrapperStyle={styles.columnContainer}
        />
      );


    render(){
        return(
            <View style={styles.container}  >
                { this.state.loading 
                ? <ActivityIndicator style={styles.loading} /> 
                :  this.renderList() 
                }
            </View>
        )
    }
}
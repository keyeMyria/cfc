import React, {Component} from 'react';

import {View, Text, FlatList, ActivityIndicator, AsyncStorage, Image} from 'react-native';
import Styles from './styles';
import { apiCartola } from '../../services';
import MeuTimeItem from './components';

export default class Meutime extends Component{

    static navigationOptions = ({navigation}) => ({
        drawerLabel: 'Minha Escalação',
        title: "Minha Escalação"
      //  tabBarIcon: ({ tintColor }) => <Icon name='building' size={20} color={tintColor} />
      })

    state = {
        data:[],
        atletasOrder:[],
        final:[],
        partidas:[],
        loading:false,
      }

      componentDidMount(){
        this.loadMeuTime();
      }
    
      loadMeuTime = async () => {
        
    try{

        this.setState({loading:true})

        const token = await AsyncStorage.getItem("@ESCartolaFC:token");
        const response = await apiCartola.get(`/auth/time`, {headers: {'X-GLB-Token' : token}} ) // meu time

        // ordernar minhas lista
           const orderData = response.data.atletas.sort((a,b) => {
                return b.posicao_id - a.posicao_id
            })

      /*  const partidas = await apiCartola.get(`/partidas`); // proximas partidas
           
        { // realizar um map no obj para pegar apenas os ids de clube da casa e clue visitante
            partidas.data.partidas.map(part => (
                this.setState({
                            partidas: [
                                {
                                    timeCasa: part.clube_casa_id,
                                    timeVisitante: part.clube_visitante_id
                                },
                                ...this.state.partidas
                            ]
                })
            ))
        }

        console.tron.log(this.state.partidas)
        */
                
            this.setState({data: response.data, atletasOrder : orderData, loading:false})
            
            {   
                this.state.atletasOrder.map(atletas =>(
                 
                    this.setState({ final: [ {  atletaId: atletas.atleta_id,
                                                apelido:atletas.apelido, 
                                                posicaoId:atletas.posicao_id, 
                                                posicao: this.state.data.posicoes[atletas.posicao_id].abreviacao,
                                                foto: atletas.foto,
                                                status: atletas.status_id,
                                                preco: atletas.preco_num,
                                                media: atletas.media_num,
                                                variacao: atletas.variacao_num,
                                                ultima: atletas.pontos_num,
                                                jogos: atletas.jogos_num,                                                
                                                clube: this.state.data.clubes[atletas.clube_id].nome,
                                                escudo: this.state.data.clubes[atletas.clube_id].escudos['60x60']                     
                                            }
                                                , ...this.state.final
                                            ]
                    })    
                ))
            }

            console.tron.log(this.state.data)            
            console.tron.log(this.state.final)
    
    }catch(err){
      return// return alert(err)
    }
        
}
    
     renderListItem = ({ item }) => (
        // <Text>meu time</Text>
        <MeuTimeItem MeuTime = {item} />
    )
    
      renderList = () => (
        <FlatList
          data={this.state.final}
          keyExtractor={item => String(item.atletaId)}
          renderItem={this.renderListItem}
         // numColumns={2}
        // columnWrapperStyle={styles.columnContainer}
        />
      );


    render(){
        return(
            <View style={Styles.container}  >
                { this.state.loading 
                ? <ActivityIndicator style={Styles.loading} /> 
                :  this.renderList() 
                }
            </View>
        )
    }
}
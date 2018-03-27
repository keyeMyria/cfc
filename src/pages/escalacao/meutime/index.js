import React, {Component} from 'react';
import {View, 
        Text, 
        FlatList, 
        ActivityIndicator, 
        AsyncStorage, 
        Image,
        TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {NavigationActions} from 'react-navigation';

// =======================================================================
import Styles from './styles';

import { apiCartola } from '../../../services';
import MeuTimeItem from './components';
import {enviarEscalacao, testeBotao} from '../../../redux/actions/controleTimeAction'
import { colors } from '../../../styles';

class Meutime extends Component{

    static navigationOptions = ({navigation}) => ({
        drawerLabel: 'Minha Escalação',
        title: "Escalação",
       // header:null
      //  tabBarIcon: ({ tintColor }) => <Icon name='building' size={20} color={tintColor} />
      })
      

    state = {
        data:[],
        atletasOrder:[],
        final:[],
        partidas:[],
        loading:false,
        infoTime: 
                    {
                        nomeTime:'',
                        nomeCartola:'',
                        escudo:null,
                        patrimonio:'',
                        valorTime:''
                    }
        ,
    }

// na montagem da pagina, buscaremos as informacoes da API do meu time montado
componentWillMount(){
    this.loadMeuTime();
}

// buscando informacoes do meu time ==========================================
loadMeuTime = async () => {
        
    try{

        this.setState({loading:true})

        const token = await AsyncStorage.getItem("@ESCartolaFC:token");
        const response = await apiCartola.get(`/auth/time`, {headers: {'X-GLB-Token' : token}} ) // meu time

        // ordernar minha lista pela posicao dos jogadores==================================================
           const orderData = response.data.atletas.sort((a,b) => {
                return b.posicao_id - a.posicao_id
            })
        // no data fica o response original, atletasOrder ficam os atletas ordenados =======================
            this.setState({data: response.data, atletasOrder : orderData, loading:false})
        
        // alguns valores que serao mostrados no header ====================================================
            this.setState({infoTime: {
                                        nomeTime:this.state.data.time.nome,
                                        nomeCartola:this.state.data.time.nome_cartola,
                                        escudo:this.state.data.time.url_escudo_png,
                                        patrimonio:this.state.data.patrimonio,
                                        valorTime: this.state.data.valor_time
                                        }
                         });
            
            // "varrer" os atletas ordenados para montar a lista na lista ==================================
                this.state.atletasOrder.map( atletas => (
                    
                   this.setState({ final: [ {   esquemaId: this.state.data.time.esquema_id,
                                                atletaId: atletas.atleta_id,
                                                apelido:atletas.apelido, 
                                                posicaoId:atletas.posicao_id, 
                                                posicao: this.state.data.posicoes[atletas.posicao_id].nome,
                                                foto: atletas.foto,
                                                status: atletas.status_id,
                                                preco: atletas.preco_num,
                                                media: atletas.media_num,
                                                variacao: atletas.variacao_num,
                                                ultima: atletas.pontos_num,
                                                jogos: atletas.jogos_num,                                                
                                                clube: this.state.data.clubes[atletas.clube_id].nome,
                                                escudo: this.state.data.clubes[atletas.clube_id].escudos['60x60'],
                                                capitao: this.state.data.capitao_id,
                                           }
                                                , ...this.state.final
                                           ]
                    })    
                ))
            
    }catch(err){
      return
    }
}

// renderizando meu componente que mostra o time =============================================
renderListItem = ({ item }) => (
        <MeuTimeItem MeuTime = {item}/>
);
    
renderList = () => (

        <FlatList
          data={this.state.final}
          keyExtractor={item => String(item.atletaId)}
          renderItem={this.renderListItem}
        />
);
// ============================================================================================
  
render(){
        return(
            <View style={Styles.container}>
                    {
                        this.state.infoTime.nomeTime ? // se já tivermos valores no estate de informacoes sobre time, tenderizamos o cabeçalho
                                
                        <View style={Styles.cabecalho}>
                            <View style={Styles.escudoContainer} >
                                <Image style={{width: 50, height: 50}} source={{uri:this.state.infoTime.escudo }} />
                            </View>
                            <View style={Styles.infosHeader} >
                                <View style={Styles.infosHeader1} >
                                    <Text style={{fontWeight:'500', color:'#FFF', fontSize:15}} >{this.state.infoTime.nomeTime}</Text>
                                </View>
                                <View style={Styles.infosHeader2} >
                                    <Text style={{color:'#FFF'}}>Patrimonio: </Text>
                                    <Text style={{fontWeight:'500', color:'#FFF', fontSize:12}} >C$ {this.state.infoTime.patrimonio.toFixed(2)}</Text>
                                </View>
                                <View style={Styles.infosHeader3}>
                                    <Text style={{color:'#FFF'}} >Preço do time: </Text>
                                    <Text style={{fontWeight:'500', color:'#FFF', fontSize:12}} >C$ {this.state.infoTime.valorTime.toFixed(2)}</Text>
                                </View>
                            </View>
                            <View style={{justifyContent:'center', marginRight:10, marginLeft:20}} >
                                <Icon name='navicon' size={20} color='#FFF' onPress={() => {this.props.navigation.navigate('DrawerOpen'); }} />
                            </View>
                        
                        </View>
                        :
                        null
                    }
                    
           {    this.state.infoTime.nomeTime && !this.props.timeSalvo ? // renderizar botao de salvar time
               
                <View style={Styles.btnSalvar} >
                 <TouchableOpacity 
                            style={{flex:1,flexDirection:'row', }} 
                            onPress={() => null}
                >    
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                        <Text style={{color:'#FFF'}} >SALVAR TIME</Text>
                    </View> 
                 </TouchableOpacity>
                 </View>
                :
                null
           }  

            <View style={{flex:10, justifyContent:'center'}} >
                { this.state.loading 
                ? <View>
                    <ActivityIndicator style={Styles.loading} size='large' />
                  </View>
                    
                :  this.renderList()
                }
                
            </View>
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        timeSalvo: state.controleTimeReducer.timeSalvo,   
    }
)

export default connect(mapStateToProps,{enviarEscalacao, testeBotao})(Meutime)

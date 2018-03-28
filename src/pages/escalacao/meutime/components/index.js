import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import {NavigationActions} from 'react-navigation';

// ===================================================================
import Styles from './styles';
import {
        URI_STATUS_PROVAVEL, 
        URI_STATUS_CONTUNDIDO, 
        URI_STATUS_DUVIDA, 
        URI_STATUS_SUSPENSO,
        URI_CAPITAO_SIM,
        URI_CAPITAO_NAO,
        URI_REMOVER
        } from '../../../../config/urls';

import {modificaTime, trocaCapitao, salvaEscalacaoJson} from '../../../../redux/actions/controleTimeAction';

class MeuTime extends Component{

componentDidMount(){

// atualizar state do redux que contem meu time montado ====================================
this.props.modificaTime( // dados recebidos da pagina inicial como props
                        this.props.MeuTime.apelido,
                        this.props.MeuTime.atletaId,
                        this.props.MeuTime.esquemaId,
                        this.props.MeuTime.capitao,
                        );
}

_montarDados = async () => {

    console.tron.log('entrei no montar dados')
    
    var newAtletas = [...new Set(this.props.atletas)]; // retira duplicados do array

    let dadosInsert = {
        "esquema": this.props.esquemaId,
        "capitao": this.props.capitao,
        "atletas":newAtletas
    }

    let convertidos = JSON.stringify(dadosInsert);

    this.props.salvaEscalacaoJson(convertidos); // action que salva o json formatado
}
// ==========================================================================================
_enviarTime = async () => {
        
        const escalacao = this.props.escalacaoJson;
       
       // colocar este trecho em uma action  passando os dados da escalacao por parametro ==== 
        const token = await AsyncStorage.getItem("@ESCartolaFC:token");

        try{

            const response = await axios.post('https://api.cartolafc.globo.com/auth/time/salvar',
                  
                escalacao//  JSON.stringify(escalacao)
                 ,
                 { 
                     headers:{'X-GLB-Token': token}                 
                 }
                );
            alert('Time Escalado')
            return response;
        }catch(err){
            alert(err)
         //   return response
        }  
      }

// ==========================================================================================

    render(){

       _imageStatus = () => {
            switch(this.props.MeuTime.status){
                case 2:
                return <Image style={{ width: 20, height: 20}} source={require('../../../../assets/imgs/duvida.png')} />
                case 3:
                return <Image style={{ width: 20, height: 20}} source={require('../../../../assets/imgs/suspenso4.png')} />
                case 5:
                return <Image style={{ width: 20, height: 20}} source={require('../../../../assets/imgs/contundido.png')} />
                case 7:
                return <Image style={{ width: 20, height: 20}} source={require('../../../../assets/imgs/provavel.png')} />
            }   
       }
        
        return(
            
            <View style={Styles.container} >
                <View style={Styles.jogadores} >
                    <View style={Styles.containerFoto} >
                        <Image style={Styles.foto} source={{uri:this.props.MeuTime.foto.replace("FORMATO","140x140")}} />
                    </View>
                    <View style={Styles.infoContainer} >
                        <View style={Styles.statusContainer} >
                            {_imageStatus()}
                            <View style={{flex:1, justifyContent:'center'}} >
                                <Image style={{width: 20, height: 20}} source={{uri:this.props.MeuTime.escudo}} />
                            </View>
                        </View>
                        <View style={Styles.infoAB} >
                        <View style={Styles.infoA} >
                            <Text style={Styles.txtNomeJogador} >{this.props.MeuTime.apelido}</Text>
                            <View style={{flexDirection:'row'}} >
                                <Text style={Styles.txtPosicao} >{this.props.MeuTime.posicao.toUpperCase()}</Text>
                             <TouchableOpacity 
                                    onPress={() => this.props.trocaCapitao(this.props.MeuTime.atletaId)}
                                    //onPress ={()=> this._enviarTime() } // chamar botao de salvar e no botao nos vamos enviar os dados
                             >
                              { // se o id do jogador for igual ao id do capitao, mostramos a bracadeira
                               (  
                                 ( 
                                     this.props.MeuTime.atletaId == this.props.MeuTime.capitao &&
                                     this.props.MeuTime.atletaId == this.props.capitao)
                                  ||
                                 ( this.props.MeuTime.atletaId == this.props.capitao )
                               )    ? 
                                  <Image style={{width: 20, height: 20}} source={require('../../../../assets/imgs/capitaFCSIM.png')} />
                                  :
                                  <Image style={{width: 20, height: 20}} source={require('../../../../assets/imgs/capitaFCNAO.png')} />
                               } 
                            </TouchableOpacity>
                               <Image style={{width: 20, height: 20}} source={require('../../../../assets/imgs/excluir.png')} />
                            </View>
                        </View>
                        <View style={Styles.infoB} >
                            <View style={Styles.valoresContainer} >
                                <View style={Styles.valores} >
                                    <Text style={{fontWeight:'500', color:'#000', fontSize:12}} >{this.props.MeuTime.preco.toFixed(2)}</Text>
                                    <Text style={Styles.txtValores} >PREÇO</Text>
                                </View>
                                <View style={Styles.valores} >
                                    <Text style={this.props.MeuTime.variacao >= 0 ? Styles.valPositivo : Styles.valNegativo} >{this.props.MeuTime.variacao.toFixed(2)}</Text>
                                    <Text style={Styles.txtValores} >VAR.(C$)</Text>
                                </View>
                                <View style={Styles.valores} >
                                    <Text style={this.props.MeuTime.variacao >= 0 ? Styles.valPositivo : Styles.valNegativo} >{this.props.MeuTime.media.toFixed(2)}</Text>
                                    <Text style={Styles.txtValores} >MÉDIA</Text>
                                </View>
                                <View style={Styles.valores} >
                                    <Text style={this.props.MeuTime.variacao >= 0 ? Styles.valPositivo : Styles.valNegativo} >{this.props.MeuTime.ultima.toFixed(2)}</Text>
                                    <Text style={Styles.txtValores} >ÚLTIMA</Text>
                                </View>
                                <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}} >
                                    <Text style={{fontWeight:'bold', color:'#000'}}>{this.props.MeuTime.jogos}</Text>
                                    <Text style={Styles.txtValores} >JOGOS</Text>
                                </View>
                            </View>
                        </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => (
    {
        atletas: state.controleTimeReducer.atletas,
        capitao:state.controleTimeReducer.capitao,
        esquemaId: state.controleTimeReducer.esquemaId,
        timeSalvo: state.controleTimeReducer.timeSalvo,
        escalacaoJson: state.controleTimeReducer.escalacaoJson
        
    }
)

export default connect(mapStateToProps,{
    modificaTime, trocaCapitao, salvaEscalacaoJson
})(MeuTime)

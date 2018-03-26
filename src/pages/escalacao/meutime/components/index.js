import React, {Component} from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';

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

export default class MeuTime extends Component{

    render(){
       
       _imageStatus = () => {
            switch(this.props.MeuTime.status){
                case 2:
                return <Image style={{ width: 20, height: 20}} source={{uri:URI_STATUS_DUVIDA}} />
                case 3:
                return <Image style={{ width: 20, height: 20}} source={{uri:URI_STATUS_SUSPENSO}} />
                case 5:
                return <Image style={{ width: 20, height: 20}} source={{uri:URI_STATUS_CONTUNDIDO}} />
                case 7:
                return <Image style={{ width: 20, height: 20}} source={{uri:URI_STATUS_PROVAVEL}} />
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
                             <TouchableOpacity onPress={() => alert(this.props.MeuTime.atletaId)}  >
                              { // se o id do jogador for igual ao id do capitao, mostramos a bracadeira
                                  this.props.MeuTime.atletaId == this.props.MeuTime.capitao ? 
                                  <Image style={{width: 20, height: 20}} source={{uri:URI_CAPITAO_SIM}} />
                                  :
                                  <Image style={{width: 20, height: 20}} source={{uri:URI_CAPITAO_NAO}} />
                               } 
                            </TouchableOpacity>
                               <Image style={{width: 20, height: 20}} source={{uri:URI_REMOVER}} />
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

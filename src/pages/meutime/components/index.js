import React, {Component} from 'react';

import {View, Text, Image} from 'react-native';

import Styles from './styles';
import {
        URI_STATUS_PROVAVEL, 
        URI_STATUS_CONTUNDIDO, 
        URI_STATUS_DUVIDA, 
        URI_STATUS_SUSPENSO} from '../../../config/urls';

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
                            <Image style={{width: 20, height: 20}} source={{uri:this.props.MeuTime.escudo}} />
                        </View>
                        <View style={Styles.infoAB} >
                        <View style={Styles.infoA} >
                            <Text style={Styles.txtNomeJogador} >{this.props.MeuTime.apelido}</Text>
                            <Text style={Styles.txtPosicao} >{ this.props.MeuTime.posicao.toUpperCase()}</Text>
                        </View>
                        <View style={Styles.infoB} >
                            <Text style={{fontSize:15, marginLeft:5}} >infoB</Text>
                        </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

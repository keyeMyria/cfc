import React from 'react';
import { StyleSheet } from 'react-native';
import {general, metrics, colors} from '../../../styles';

const styles = StyleSheet.create({
   
    container: {
        ...general.box,
        marginHorizontal: metrics.baseMargin,
        marginTop: metrics.baseMargin /4,
        padding: metrics.basePadding /4,
    }
   ,
    jogadores:{
        flex:1,
        flexDirection:'row',
    },
    foto: {
        width: 50, 
        height: 50
    },
    containerFoto:{
      //  borderWidth:1,
       
    },
    infoContainer:{
        flex:1,
        flexDirection:'row',
        marginLeft:5,
     //   borderWidth:1
    },
    statusContainer:{
        justifyContent:'flex-start'
    },
    infoAB:{
        flex:1,
        flexDirection:'column'
    },
    infoA:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
      //  borderWidth:1
    },
    infoB:{
        flex:1,
        flexDirection:'row',
        marginLeft:10,
       // borderWidth:1
    },
    txtNomeJogador:{
        fontSize:15,
        fontWeight:'bold',
        color: colors.black,
    },
    txtPosicao:{
        fontSize:10,
        marginLeft:7,
    },
    partidaContainer:{
        borderWidth:0.6,
        borderColor: colors.light
    },
    valores:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-end',
       // borderWidth:1
    },
    txtValores:{
        fontSize:8,
        fontWeight:'bold',
        
    },
    valoresContainer:{
        flex:5,
        flexDirection:'row',
        borderWidth:1,
        borderColor: colors.light
    },
    valNegativo: {
        color: 'red',
        fontWeight:'bold'
    },
    valPositivo:{
        color:'green',
        fontWeight:'bold'
    }
});

export default styles;
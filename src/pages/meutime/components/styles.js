import React from 'react';
import { StyleSheet } from 'react-native';
import {general, metrics, colors} from '../../../styles';

const styles = StyleSheet.create({
   
    container: {
        ...general.box,
        marginHorizontal: metrics.baseMargin,
        marginBottom: metrics.baseMargin /4,
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
        justifyContent:'space-between',
        marginLeft:10,
       // padding:5,
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
        marginRight:5,
        textAlignVertical:'center'
    },
    partidaContainer:{
      //  borderWidth:0.6,
      //  borderColor: colors.light
    },
    valores:{
        flex:1,
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'flex-end',
       // borderWidth:1
    },
    txtValores:{
        fontSize:9,
        fontWeight:'bold',
        
    },
    valoresContainer:{
        flex:10,
        flexDirection:'row',
        borderWidth:1,
        borderColor: colors.light
    },
    valNegativo: {
        color: 'red',
        fontWeight:'bold',
        fontSize:12
    },
    valPositivo:{
        color:'green',
        fontWeight:'bold',
        fontSize:12
    }
});

export default styles;
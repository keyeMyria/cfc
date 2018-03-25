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
        justifyContent:'space-between'
    },
    infoAB:{
        flex:1,
        flexDirection:'column'
    },
    infoA:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
      //  borderWidth:1
    },
    infoB:{
        flex:1,
        flexDirection:'row',
    },
    txtNomeJogador:{
        marginLeft:5,
        fontSize:17,
        fontWeight:'bold',
        color: colors.black,
    },
    txtPosicao:{
        marginLeft:5,
        fontSize:10,

    }
});

export default styles;
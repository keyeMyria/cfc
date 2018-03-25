import { StyleSheet } from 'react-native';
import { metrics, general, colors } from '../../styles';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.light
    },
    loading:{
        marginTop: metrics.basePadding
    },
    columnContainer:{
        marginHorizontal: metrics.basePadding,
        justifyContent:'space-between'
    },
    lista:{
        flexDirection:'row',
        borderBottomWidth: 0.5,
        borderBottomColor:colors.darkTransparent
    },
    cabecalho: {
        ...general.box,
        flex:1,
        flexDirection:'row',
        marginBottom: metrics.baseMargin,
        margin: metrics.baseMargin / 4,
        padding: metrics.basePadding /4,
    },
    escudoContainer:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:10,
       // borderWidth:1
    },
    infosHeader:{
        flex:6,
        flexDirection:'column',
      //  borderWidth:1
    },
    infosHeader1:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
       // borderWidth:1
    },
    infosHeader2:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
       // borderWidth:1
    }
    
});

export default styles;
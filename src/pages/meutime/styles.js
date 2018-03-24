import { StyleSheet } from 'react-native';
import { metrics, general, colors } from '../../styles';

const styles = StyleSheet.create({
    container:{
        flex:1,
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
    }
});

export default styles;
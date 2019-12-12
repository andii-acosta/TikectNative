import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

export default function WelcomeSecondStep(props){

    return(
        <View style={styles.viewBody} centerContent={true}>
             <Image
             source={require("../../../assets/dvd.png")}
             style={styles.image}
             resizeMode="contain"
             > 
             </Image>
             <Text style={styles.title}>
                 Consulta tu perfil de restaurantes
             </Text>
             <Text style={styles.subtitle}>
                 ¿Como describirias tu mejor rerstaurante? Busca y visualiza
                 los mejores restaurantes de una forma sencilla.
                 Ejemplo Texto 
             </Text>
        </View>
    );
} 

const styles = StyleSheet.create({

    viewBody:{
        marginLeft:AppStyles.MARGIN_TOP,
        marginRight: AppStyles.MARGIN_TOP
    },
    image:{
        height:300,
        width:AppStyles.WIDTH,
        marginBottom:AppStyles.MARGIN_TOP,
    },
    title:{
        marginBottom:10,
        fontWeight:"bold",
        fontSize:19,
        textAlign:AppStyles.CENTRADO
    },
    subtitle:{
        marginBottom:AppStyles.MARGIN_TOP,
        fontSize:12,
        textAlign:AppStyles.CENTRADO
    },
    viewBoton:{
        flex:1,
        alignItems:AppStyles.CENTRADO
    },
    btnContainer:{
        marginTop:AppStyles.MARGIN_TOP,
        width:AppStyles.WIDTH
    },
    btnStyle:{
        backgroundColor:AppStyles.SECONDARY_COLOR
    },


})
import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet } from 'react-native';
import AppStyles from '../../../utils/css/theme.style';
import AppText from '../../../utils/text/text.all';


export default function Pay(props){

    return(
        <View style={styles.viewBody}>
            <Text>
                  Pagina Metodos de pago ...
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:AppStyles.PRIMARY_COLOR,
        paddingTop:AppText.PADDING_HEADER
      }
})
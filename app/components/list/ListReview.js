import React,{useState,UseEffect} from 'react';
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native'; 
import {Button,Avatar,Rating} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';


export default function ListReview(props){

    const {navigation,idRestaurante,id}=props;


    return(
        <View style={styles.containerList}>
            <TouchableOpacity style={styles.btnDetalle} >
                <View style={styles.btnContainer2}>
                    <Text style={styles.btnStyle2}>{AppText.TEXT_COMENT}</Text>
                </View> 
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    
      btnContainer2: {
        marginTop:AppStyles.MARGIN_5,
        backgroundColor: "transparent",
        borderColor: AppStyles.GREEN_COLOR,
        borderWidth:AppStyles.BORDER_DEFAULT,
        borderRadius: AppStyles.BORDER_RADIUS
      },
      btnStyle2: {
        margin: AppStyles.MARGIN_10,
        paddingHorizontal: AppStyles.MARGIN_10,
        textAlign: AppStyles.CENTRADO,
        backgroundColor: "transparent",
        color: AppStyles.GREEN_COLOR,
        fontSize: AppText.PARRAFO_GRANDE
      },
      btnDetalle:{
          margin:AppStyles.MARGIN_10
      },
      containerList:{
          backgroundColor:AppStyles.WHITE_COLOR
      }
      

})
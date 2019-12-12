import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,ScrollView,Dimensions } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import WelcomeFirstStep from '../../screens/welcome/WelcomeFirstStep';
import WelcomeSecondStep from '../../screens/welcome/WelcomeSecondStep';
import WelcomeThirdStep from '../../screens/welcome/WelcomeThirdStep';

export default function CardLogingInit(props){

  const {title,typeList,maxResult,minresult} = props;

  return (
      <ScrollView style={styles.container}>
        { typeList == 1
            ? 
            <WelcomeFirstStep/>
               : ( typeList == 2
            ? 
            <WelcomeSecondStep/>
                : ( typeList == 3
            ? 
            <WelcomeThirdStep/>
                : <Text>No hay formulario</Text>
                  )
                  )
        }
        
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppStyles.GREEN_COLOR
  },
  viewCenter:{
    alignItems:"center",
    justifyContent:"center"
  }
});
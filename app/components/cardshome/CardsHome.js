import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,ScrollView,Dimensions } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

export default function CardsHome(props){

  const {title,typeList,maxResult,minresult} = props;

  return (
      <ScrollView style={styles.container}>
        <View style={styles.viewCenter}>
             <Text>{title}-{typeList}-{maxResult}-{minresult}</Text>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppStyles.GREEN_COLOR,
    borderRadius:AppText.BORDER_RADIUS
  },
  viewCenter:{
    alignItems:"center",
    justifyContent:"center"
  }
});
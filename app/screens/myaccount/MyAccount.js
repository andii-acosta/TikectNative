import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,Dimensions,ScrollView } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import CardsLoginInit from '../../components/cardshome/CardsLoginInit';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let imageWidth = dimensions.width
let paddingContainer = Math.round(dimensions.width * AppText.PADDING_CARDS_HOME);

export default function MyAccount(props){


    console.log("ancho: "+ imageWidth + "  " + "alto: " + dimensions.height);
    const cards = [
           {
             title:"Bienvenida",
             typeList:1,
             maxResult:10,
             minresult:10,
             index:1
           },
           {
            title:"Cualidades",
            typeList:2,
            maxResult:10,
            minresult:10,
            index:2
          },
          {
            title:"Loging",
            typeList:3,
            maxResult:10,
            minresult:10,
            index:3
          }
    ];
  
    //console.log(cards);
  
    return (
      <View >
        <ScrollView horizontal={true} style={styles.contentStyle}>
  
              {cards && cards.map(card => (
                <View style={styles.scrollHorizontal}
                key={card.index}>
                <CardsLoginInit
                key={card.index}
                title={card.title}
                typeList={card.typeList}
                maxResult={card.maxResult}
                minresult={card.minresult}
                width={imageWidth}
                />
                </View>
              ))}
            
        </ScrollView>
      </View>
    );
  }
  
  
  const styles = StyleSheet.create({
  
    scrollHorizontal:{
      height: imageHeight, 
      width: imageWidth,
      paddingLeft:paddingContainer,
      paddingRight:paddingContainer
  
    },
    contentStyle:{
        paddingTop:AppText.PADDING_HEADER
    }
  });
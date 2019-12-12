import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,ScrollView,Dimensions,Image } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardsHome from '../../components/cardshome/CardsHome';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_CARDS_HOME);
let imageWidth = dimensions.width
let paddingContainer = Math.round(dimensions.width * AppText.PADDING_CARDS_HOME);

export default function Home(props){


  console.log("ancho: "+ imageWidth + "  " + "alto: " + dimensions.height);
  const cards = [
         {
           title:"Destacados",
           typeList:1,
           maxResult:10,
           minresult:10,
           index:1
         },
         {
          title:"Promociones",
          typeList:2,
          maxResult:10,
          minresult:10,
          index:2
        },
        {
          title:"General",
          typeList:3,
          maxResult:10,
          minresult:10,
          index:3
        }
  ];

 // console.log(cards);

  return (
    <View style={styles.contentStyle}>
      <Text style={styles.headerText}>BANNER DE PUBLICIDAD</Text>
      <ScrollView horizontal={true} >

            {cards && cards.map(card => (
              <View style={styles.scrollHorizontal}
              key={card.index}>
              <CardsHome
              key={card.index}
              title={card.title}
              typeList={card.typeList}
              maxResult={card.maxResult}
              minresult={card.minresult}
              />
              </View>
            ))}
          
      </ScrollView>
      <CreateEventButton/>
    </View>
  );
}


function CreateEventButton(props){
    return(

        <ActionButton buttonColor={AppStyles.ACCENT_COLOR} >
          <ActionButton.Item buttonColor={AppStyles.PURPLE_COLOR} title={AppText.CREATE_EVENT} onPress={() => {console.log("Crear evento")}}>
            <Icon name={AppText.CREATE_EVENT_ICON} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={AppStyles.BLUE_COLOR} title={AppText.CALL_ME} onPress={() => {console.log("llamar")}}>
            <Icon name={AppText.CALL_ME_ICON} style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={AppStyles.GREEN_COLOR} title={AppText.WHATSAPP} onPress={() => {console.log("whatsapp")}}>
            <Icon name={AppText.WHATSAPP_ICON} style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
    );
}

const styles = StyleSheet.create({

  headerText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor:AppStyles.BLUE_COLOR,
    marginBottom:10
  },
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
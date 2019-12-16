import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,ScrollView,Dimensions,Image } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils//text/text.all';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardsHome from '../../components/cardshome/CardsHome';
import PautaHome from '../../components/bannercarousel/PautaHome';
import {withNavigation} from 'react-navigation';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_CARDS_HOME);
let imageWidth = dimensions.width
let paddingContainer = Math.round(dimensions.width * AppText.PADDING_CARDS_HOME);
let padding = dimensions.height*0.04;

function Home(props){

  const {navigation} = props;

  const cards = [
         {
           title:"D",
           typeList:1,
           maxResult:10,
           minresult:10,
           index:1
         },
         {
          title:"P",
          typeList:2,
          maxResult:10,
          minresult:10,
          index:2
        },
        {
          title:"G",
          typeList:3,
          maxResult:10,
          minresult:10,
          index:3
        }
  ];


  return (
    <View style={styles.contentStyle}>
      <View>
           <PautaHome />
      </View>
      <View style={styles.marginStyleCards}>

      <ScrollView horizontal={true} >
           {cards && cards.map((card)=>(
              <CardsHome
              key={card.index}
              typeList={card.typeList}
              maxResult={card.maxResult}
              minresult={card.minresult}
              navigation={navigation}
              type={card.title}
              />
           ))
           }
      </ScrollView>
      </View>
      <CreateEventButton/>
    </View>
  );
}

export default withNavigation(Home);

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

  contentStyle:{
    paddingTop:padding
  },
  marginStyleCards:{
    marginTop:AppStyles.MARGIN_5
  }
});
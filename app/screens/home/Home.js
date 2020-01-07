import React,{useState,useEffect,useRef} from 'react';
import {Text, View,StyleSheet,ScrollView,Dimensions,Image } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils//text/text.all';
import ActionButton from 'react-native-action-button';
import Toast from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingGeneral from '../../components/loading/LoadingGeneral';
import CardsHome from '../../components/cardshome/CardsHome';
import PautaHome from '../../components/bannercarousel/PautaHome';
import {withNavigation} from 'react-navigation';

import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let padding = dimensions.height*0.04;

function Home(props){

  const {navigation} = props;
  const toastRef = useRef();

  const [isLoading,setIsloading] = useState(false);
  const [userIds,setUserIds] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user ? setUserIds(user.uid) : setUserIds(null)
    })
},[]);


  const cards = [
         {
           title:"D",
           typeList:1,
           maxResult:10,
           minresult:10,
           index:1,
           name:"DESTACADOS"
         },
         {
          title:"P",
          typeList:2,
          maxResult:10,
          minresult:10,
          index:2,
          name:"RECOMENTADOS"
        },
        {
          title:"G",
          typeList:3,
          maxResult:10,
          minresult:10,
          index:3,
          name:"TODOS"
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
              toastRef={toastRef}
              userIds={userIds}
              setIsloading={setIsloading}
              />
           ))
           }
      </ScrollView>
      <Toast position={AppStyles.CENTRADO} opacity={0.7} ref={toastRef}/>
      <LoadingGeneral
            isvisible={isLoading}
            textshow={AppText.TEXT_SHOW_PROCESS}
            />
      </View>
      <CreateEventButton/>
    </View>
  );
}

export default withNavigation(Home);

function CreateEventButton(props){
    return(
      <View style={styles.btnViewAccion}>
        <ActionButton style={styles.btnAccion} buttonColor={AppStyles.ACCENT_COLOR} >
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
      </View>
        
    );
}

const styles = StyleSheet.create({

  contentStyle:{
    paddingTop:padding,
    backgroundColor:AppStyles.PURPLE_COLOR
  },
  marginStyleCards:{
    marginTop:AppStyles.MARGIN_5
  },
  btnAccion:{
    position:'absolute',
    zIndex:3,
  }
});
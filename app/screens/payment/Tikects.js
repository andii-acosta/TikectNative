import React,{useState,useEffect, Fragment,useRef} from 'react';
import {Text, View,StyleSheet,Dimensions,ScrollView,Alert} from 'react-native';
import { ListItem,Divider } from 'react-native-elements'
import AppStyles from '../../utils/css/theme.style';
import PautaHome from '../../components/bannercarousel/PautaHome';
import LoadingGeneral from '../../components/loading/LoadingGeneral';
import AppText from '../../utils/text/text.all';
import ModalTieckt from '../../components/modals/ModalTikect';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebaseApp} from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let padding = dimensions.height*0.04;

export default function Tikects(props){

   
    const [userInfo,setUserInfo] = useState({});
    const [userdata,setUserdata] = useState({});
    const [items,setItems] = useState([]);
    const [isLoading,setIsloading] = useState(false);
    const [renderComponent,setRenderComponent] = useState(false);
    const [isVisible,setIsVisible] = useState(false);

    
  //console.log("---items----");
  //console.log(JSON.stringify(items));
  useEffect(() => {
    setIsloading(true);
    (async() => {
        const user = await firebase.auth().currentUser;
          setUserInfo(user.providerData[0]);
          const userID = user.uid;
          const ref = db.collection("App/User/Account").where('createBy', '==', userID);

          await ref.get().then(response => {
           response.forEach(doc => {
               let user = doc.data();
               user.id= doc.id;
               setUserdata(doc.data());
                });
             });

          if(userID != null){
            (async() => {
              let resultItems = [];
              let citiesRef = db.collection("App/Info/Tikects");
              let queryRef = citiesRef.where('userId', '==',userID);
         
           await queryRef.get().then(response => {
     
             response.forEach(doc => {
                 let tikect = doc.data();
                 tikect.id = doc.id;
                 resultItems.push(tikect);
     
             });
             setItems(resultItems);
             setIsloading(false);
         });
          
          })();
          }
    })();
    
}, [])


const selectedComponent= (l) => {
  setRenderComponent(l);
  setIsVisible(true);
}

const alertUsed= (l) => {
  Alert.alert(
    l.event_name,
    'Esta entrada id: ' + l.code+ 'ya fue usada',
    [
      {text: AppText.TEXT_ERROR, onPress: () => console.log('Ask me later pressed')},
      {text: AppText.OK, onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
}


    return(
        <View style={styles.contentStyle}>
          
          <View>
             <PautaHome />
        </View>
        <View style={styles.titleStyle}>
             <Text style={styles.titletextstyle}>{AppText.TEXT_PAGE_PAYMENT}</Text>
        </View>
        <Divider style={styles.dividerstyle} />
        {renderComponent && (
                <ModalTieckt
                isVisible={isVisible} 
                setIsVisible={setIsVisible}
                renderComponent={renderComponent}
                userInfo={userdata}
               // setReloadData={setReloadData}
                />
           )}
        <ScrollView>
        <View style={styles.listcontenstyle}>
        {items != null ? 
        (items.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={{backgroundColor: l.status == AppText.ACTIVE ? AppStyles.GREEN_COLOR_LT : AppStyles.SECUNDARY_TEXT_COLOR_LT}}
            leftAvatar={{ source: { uri: l.img },size:AppStyles.INPUT_SIZE_ICON_XL }}
            rightAvatar={<Icon 
                     name={AppText.LIST_ITEM_SELECTED}
                     size={AppStyles.INPUT_SIZE_ICON_M}
                     color={AppStyles.SECUNDARY_TEXT_COLOR}
                       /> }
            title={l.event_name}
            titleStyle={styles.titulostyle}
            subtitle={
              <View style={styles.viewConten}>
              <View style={{flexDirection:'row'}}>
              <Icon 
                    name={AppText.NAME_ICON_PAGE_HOME}
                     size={AppStyles.INPUT_SIZE_ICON_M}
                    color={AppStyles.SECUNDARY_TEXT_COLOR}
                             /> 
                  <Text style={styles.textstyle}>{l.type} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon 
                    name={AppText.NAME_ICON_MODAL_LOCATION}
                    size={AppStyles.INPUT_SIZE_ICON_M}
                    color={AppStyles.SECUNDARY_TEXT_COLOR}
                             /> 
                  <Text style={styles.textstyle}>{l.location} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon 
                    name={AppText.NAME_ICON_CALENDAR}
                    size={AppStyles.INPUT_SIZE_ICON_M}
                    color={AppStyles.SECUNDARY_TEXT_COLOR}
                             /> 
                  <Text style={styles.textstyle}>{l.date} </Text>
              </View>
            </View>
            }
            bottomDivider
            onPress={ l.status != AppText.ACTIVE ? () => alertUsed(l) : () => selectedComponent(l)}
           />
           ))) 
           : 
           (<Fragment/>)
           
        }
        </View>
          </ScrollView>
          <LoadingGeneral
            isvisible={isLoading}
            textshow={AppText.TEXT_SHOW_PROCESS}
            />
      </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:AppStyles.PRIMARY_COLOR,
        paddingTop:AppText.PADDING_HEADER
      },
      contentStyle:{
        paddingTop:padding,
        backgroundColor:AppStyles.PURPLE_COLOR
      },
      titleStyle:{
        marginTop:AppStyles.MARGIN_10,
        alignItems:"center"
      },
      titletextstyle:{
        color:AppStyles.WHITE_COLOR,
        fontWeight:"bold",
        fontSize:AppText.PARRAFO_GRANDE
      },
      dividerstyle:{
        backgroundColor:AppStyles.WHITE_COLOR,
        marginTop:AppStyles.MARGIN_5,
        marginRight:AppStyles.MARGIN_10,
        marginLeft:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_5
      },
      listcontenstyle:{
        marginTop:AppStyles.MARGIN_10
      },
      textstyle:{
        fontWeight:'bold',
        marginLeft:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_5
    },
    titulostyle:{
      color:AppStyles.ACCENT_COLOR,
      fontWeight:'bold',
      fontSize:AppText.PARRAFO_GRANDE,
      marginBottom:AppStyles.MARGIN_10
  },
})
import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,ScrollView,Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../../../components/loading/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStyles from '../../../utils/css/theme.style';
import AppText from '../../../utils/text/text.all';
import ModalPqrs from '../../../components/modals/ModalPqrs';
import {firebaseApp} from '../../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let marginHeight = dimensions.height*0.05;

export default function Questionyresponse(props){

        const [items,setItems] = useState([]);
        const [isLoading,setIsloading] = useState(false);
        const [renderComponent,setRenderComponent] = useState(false);
        const [isVisible,setIsVisible] = useState(false);
        
      useEffect(() => {
        setIsloading(true);
            (async() => {
                  let resultItems = [];
                  let citiesRef = db.collection("App/Info/Pqrs");
                  let queryRef = citiesRef.where('state', '==',AppText.ACTIVE);
             
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
        
    }, [])
    
    
    const selectedComponent= (l) => {
      setRenderComponent(l);
      setIsVisible(true);
    }

        return(
            <View style={styles.contentStyle}>
            {renderComponent && (
                <ModalPqrs
                isVisible={isVisible} 
                setIsVisible={setIsVisible}
                renderComponent={renderComponent}
                />
           )}
            <ScrollView>
            <View style={styles.listcontenstyle}>
            {items != null ? 
            (items.map((l, i) => (
              <ListItem
                key={i}
                containerStyle={{backgroundColor: l.state == AppText.ACTIVE ? AppStyles.GREEN_COLOR_LT : AppStyles.SECUNDARY_TEXT_COLOR_LT}}
                rightAvatar={<Icon 
                         name={AppText.LIST_ITEM_SELECTED}
                         size={AppStyles.INPUT_SIZE_ICON_M}
                         color={AppStyles.SECUNDARY_TEXT_COLOR}
                           /> }
                title={l.title}
                titleStyle={styles.titulostyle}
                subtitle={
                  <View style={styles.viewConten}>
                  <View >
                      <Text style={styles.textstyle}>{l.body.substr(0,20)}... </Text>
                  </View>
                </View>
                }
                bottomDivider
                onPress={() => selectedComponent(l)}
               />
               ))) 
               : 
               (<Fragment/>)
               
            }
            </View>
              </ScrollView>
              <Loading
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
            color:AppStyles.SECUNDARY_TEXT_COLOR,
            marginLeft:AppStyles.MARGIN_10,
            marginBottom:AppStyles.MARGIN_5
        },
        titulostyle:{
          color:AppStyles.ACCENT_COLOR,
          fontWeight:'bold',
          fontSize:AppText.SUB_TITULO,
          marginBottom:AppStyles.MARGIN_10
          
      },
    })
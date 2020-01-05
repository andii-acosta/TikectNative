import React,{useState,useRef,useEffect} from 'react';
import {Text, View,StyleSheet,Dimensions,ScrollView } from 'react-native';
import {Tooltip,ListItem} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../../components/loading/Loading';
import FormWork from '../../../components/forms/FormWork';
import ModalPqrs from '../../../components/modals/ModalPqrs';
import AppStyles from '../../../utils/css/theme.style';
import AppText from '../../../utils/text/text.all';

import {firebaseApp} from '../../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let widthtool = dimensions.width*0.8;

export default function Working(props){

    const {navigacion} = props;
    const [visibleLoadin,setVisibleLoading] = useState(false);
    const toastRef = useRef();

    const [items,setItems] = useState([]);
    const [renderComponent,setRenderComponent] = useState(false);
    const [isVisible,setIsVisible] = useState(false);
    
  useEffect(() => {
    setVisibleLoading(true);
        (async() => {
              let resultItems = [];
              let citiesRef = db.collection("App/Contact/WorkTypes");
              let queryRef = citiesRef.where('state', '==',AppText.ACTIVE);
         
           await queryRef.get().then(response => {
     
             response.forEach(doc => {
                 let tikect = doc.data();
                 tikect.id = doc.id;
                 resultItems.push(tikect);
     
             });
             setItems(resultItems);
             setVisibleLoading(false);
         });
          
          })();
    
}, []);

const selectedComponent= (l) => {
    setRenderComponent(l);
    setIsVisible(true);
  }

    return(
        
        <View style={styles.viewBody}>
        <View style={styles.formstyle}>
            <Tooltip 
            backgroundColor={AppStyles.PRIMARY_COLOR}
            width={widthtool}
            
            popover={<Text>Aqui puedes contactarnos para trabajar con nosotros</Text>}>
              
              <View style={styles.btnContainer}>
                <Text style={styles.btnStyle}>{AppText.TITLE_CUPONS}</Text>
              </View> 
           </Tooltip>
        </View>
        <ScrollView>
        <View style={styles.contentStyle}>
            {renderComponent && (
                <ModalPqrs
                isVisible={isVisible} 
                setIsVisible={setIsVisible}
                renderComponent={renderComponent}
                />
           )}
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
          </View>
          <View style={styles.formstyle}>
             <FormWork
               navigacion={navigacion}
               toastRef={toastRef}
               items={items}
             />
          </View>
        </ScrollView>
        
        <Toast
            ref={toastRef}
            position ="center"
            opacity = {0.7}
            />
            <Loading
            textshow={AppText.TEXT_SHOW_PROCESS}
            isvisible={visibleLoadin}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:AppStyles.PRIMARY_COLOR,
        alignItems:'center'
      },
      btnContainer: {
          marginTop:AppStyles.MARGIN_20,
          backgroundColor: "transparent",
          borderColor: AppStyles.ACCENT_COLOR,
          borderWidth:AppStyles.BORDER_DEFAULT,
          borderRadius: AppStyles.BORDER_RADIUS
        },
        btnStyle: {
          margin: AppStyles.MARGIN_10,
          paddingHorizontal: AppStyles.MARGIN_10,
          textAlign: "center",
          backgroundColor: "transparent",
          color: AppStyles.ACCENT_COLOR,
          fontSize: AppText.PARRAFO_GRANDE
        },
          contentStyle:{
            backgroundColor:AppStyles.PURPLE_COLOR
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
      formstyle:{
          marginBottom:AppStyles.MARGIN_10
      }
})
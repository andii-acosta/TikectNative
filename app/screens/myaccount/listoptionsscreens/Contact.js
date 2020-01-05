import React,{useState,useEffect,useRef} from 'react';
import {View,StyleSheet,ScrollView,Dimensions,Linking } from 'react-native';
import {SocialIcon} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../../../components/loading/Loading';
import FormContact from '../../../components/forms/FormContact';
import AppStyles from '../../../utils/css/theme.style';
import AppText from '../../../utils/text/text.all';

import {firebaseApp} from "../../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let Widthbtn = dimensions.width * 0.8;

export default function Contact(props){

    const {navigacion} = props;
    const [listBtn,setListBtn] = useState([]);
    const [listBtnReload,setListBtnReload] = useState(false);
    const [visibleLoadin,setVisibleLoading] = useState(false);
    const toastRef = useRef();

    useEffect(() => {
        setVisibleLoading(true);
            (async() => {
                  let resultItems = [];
                  let citiesRef = db.collection("App/Contact/PointContact");
                  let queryRef = citiesRef.where('state', '==',AppText.ACTIVE);
             
               await queryRef.get().then(response => {
         
                 response.forEach(doc => {
                     let btn = doc.data();
                     btn.id = doc.id;
                     resultItems.push(doc.data());
         
                 });
                 setListBtn(resultItems);
                 setVisibleLoading(false);
             });
              
              })();
              setListBtnReload(false);
    }, [listBtnReload]);

    return(
        <View style={styles.viewBody}>
            <View style={styles.formstyle}>
            <FormContact
            navigacion={navigacion}
            toastRef={toastRef}
            />
            </View>
            
            
            <ScrollView>
            <View style={styles.containerstylesbtn}>
            
             {listBtn ? 
                 listBtn.map((item,i) => (
                    <SocialIcon
                    key={i}
                    title={item.title}
                    button
                    style={{backgroundColor:item.backColor}}
                    type={item.name}
                    onPress={() => Linking.openURL(item.link)}
                  />
                  ))
                 : 
                 (<SocialIcon
                    title='Sign In With youtube'
                    button
                    type='youtube'
                  />)
             }
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
      formstyle:{
          marginBottom:AppStyles.MARGIN_10
      },
      containerstylesbtn:{
          width:Widthbtn
      }
})
import React,{useState} from 'react';
import {View,StyleSheet,Dimensions,TouchableOpacity,Text} from 'react-native';
import {Icon,Input} from 'react-native-elements';
import Loading from '../loading/Loading';
import {withNavigation} from 'react-navigation';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let formHeight = dimensions.height * 0.05;
let inputWidth = dimensions.width * 0.8;

 function FormCoupns(props){

   const [cuponnew,setCupon] = useState("");
   const [visibleLoadin,setVisibleLoading] = useState(false);
   const [cuponExist,setCuponExist] = useState(false);
   const { toastRef,navigation } = props;


const redimircupon = async () =>{
    setVisibleLoading(true);
    setCuponExist(false);
    if(!cuponnew){
        toastRef.current.show("Ingresa el cupon",2000);
    }else{
        console.log("****cupon: " + cuponnew); 
        (async() => {
            const ref = db.collection("App/Info/Promos").where('code', '==', cuponnew);
  
              await ref.get().then(response => {
               response.forEach(doc => {
                   let cupon = doc.data();
                   cupon.id= doc.id;
                   console.log("-----------------");
                   console.log(JSON.stringify(cupon));
                   setCuponExist(doc.data());
                    });
                 });
                 console.log("**********************");
                 console.log(JSON.stringify(cuponExist));
                 if(cuponExist == false){
                    toastRef.current.show("El cupon no esta activo",2000);
                 }else{
                    if(cuponExist.status==AppText.ACTIVE && cuponExist.code == cuponnew && cuponExist != false){
                        toastRef.current.show("Ya redimiste este cupon",2000);
                        
                      }else if(cuponExist.status==AppText.ACTIVE && cuponExist.code != cuponnew && cuponExist != false){
                        toastRef.current.show("Cupon redimido OK",2000);
                        
                      }
                 }
                     
        })();
    }
    setVisibleLoading(false);
}

    return(
        <View style={styles.viewcontainer}>
            <Input
            placeholder={AppText.INPUT_COUPONS}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_COUPONS_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setCupon(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                type={AppText.ICON_TYPE}
                name={AppText.LIST_ITEM_ICON_3}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
            <View style={styles.viewBoton}>
             <TouchableOpacity onPress={redimircupon}>
               <View style={styles.btnContainer}>
                    <Text style={styles.btnStyle}>{AppText.BOTON_COUPONS}</Text>
               </View> 
             </TouchableOpacity>
            </View>
            <Loading
            textshow={AppText.TEXT_SHOW_PROCESS}
            isvisible={visibleLoadin}
            />
        </View>
    );
}

export default withNavigation(FormCoupns)


const styles = StyleSheet.create({
    viewcontainer:{
        alignContent:"center",
        justifyContent:"center",
        marginTop:formHeight,
        marginBottom:AppStyles.MARGIN_20
    },
    inputForm:{
        width:inputWidth,
        marginTop:AppStyles.MARGIN_TOP  
    },
    iconRight:{
       color:AppStyles.ICON_RIGTH_COLOR
    },
    labelStyles:{
        color:AppStyles.INPUT_LABEL_COLOR
    },

    viewBoton:{
        alignItems:AppStyles.CENTRADO
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
        fontSize: AppText.SUB_TITULO
      },
})
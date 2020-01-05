import React,{useState} from 'react';
import {View,StyleSheet,Dimensions,Text,TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
let inputWidth = dimensions.width * 0.8;

 function FormContact(props){

   const { navigation,toastRef } = props;
   const [nombre,setNombre] = useState("");
   const [mensaje,setMensaje] = useState("");
   const [visibleLoadin,setVisibleLoading] = useState(false);

   const user = navigation.state.params.userdata;
   const {name,email,cell} = user;
   const userKey = navigation.state.params.userIds;

const SendMessege = async () =>{
    if(!mensaje){
        toastRef.current.show("Datos incompletos");
    }else{
        setVisibleLoading(true);
        db.collection("App/Contact/Messege").add({
            name: nombre ? nombre :name,
            email: email,
            cell: cell,
            messege:mensaje,
            status:"A",
            createAt: new Date(),
            createBy:userKey
        }).then(() =>{
            setVisibleLoading(false);
            navigation.goBack();
           }
        ).catch((error) =>{
            setVisibleLoading(false);
            toastRef.current.show("Error creando la cuenta");
            console.log(error);
        });
    }
}

    return(
        <View >
            <Input
            placeholder={name ? name :AppText.INPUT_NAME_CONTACT}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_NAME_CONTACT_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setNombre(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.NAME_ICON_NAME_CONTACT}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                color={AppStyles.ICON_RIGTH_COLOR}
                /> }
             />
             <Input
            placeholder={AppText.INPUT_MENSAJE_CONTACT}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_MENSAJE_CONTACT_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setMensaje(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.NAME_ICON_MESSEGE_CONTACT}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                color={AppStyles.ICON_RIGTH_COLOR}
                /> }
             />

           <View style={styles.viewBoton}>
             <TouchableOpacity onPress={SendMessege}>
               <View style={styles.btnContainer}>
                    <Text style={styles.btnStyle}>{AppText.BOTON_CONTACT}</Text>
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

export default withNavigation(FormContact)


const styles = StyleSheet.create({
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
    inputForm:{
        width:inputWidth,
        marginTop:AppStyles.MARGIN_TOP  
    },
    iconRight:{
       color:AppStyles.COLOR_ICON_DEFAULT
    },
    labelStyles:{
        color:AppStyles.INPUT_LABEL_COLOR
    },
    viewBoton:{
        alignItems:AppStyles.CENTRADO
    },
})
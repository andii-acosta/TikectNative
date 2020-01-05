import React,{useState} from 'react';
import {View,StyleSheet,Dimensions,Text,TouchableOpacity,Picker} from 'react-native';
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

 function FormWork(props){

   const { navigation,toastRef,items} = props;
   const [nombre,setNombre] = useState("");
   const [celular,setCelular] = useState("");
   const [type,setType] = useState("");
   const [web,setWeb] = useState("");
   const [mensaje,setMensaje] = useState("");
   const [visibleLoadin,setVisibleLoading] = useState(false);

   const user = navigation.state.params.userdata;
   const {name,email,cell} = user;
   const userKey = navigation.state.params.userIds;

const SendMessege = async () =>{
    if(!mensaje || !celular || !web || !type ){
        toastRef.current.show("Datos incompletos");
    }else{
        setVisibleLoading(true);
        db.collection("App/Contact/Work").add({
            name: nombre ? nombre :name,
            cell: celular ? celular : cell,
            email: email,
            web: web,
            workerType:type,
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
             <Picker
              selectedValue={type}
              style={{height: 50, width: inputWidth, backgroundColor:AppStyles.ACCENT_COLOR,marginTop:AppStyles.MARGIN_10}}
              onValueChange={(itemValue, itemIndex) =>
                setType(itemValue)
                }>
                    {items ? (items.map((item,i) =>(
                        <Picker.Item key={i} label={"Selecciona : "+item.title} value={item.title} />
                    )))
                    :
                    (<Picker.Item label='Promotor' value='Promotor'/>)
                    }
              </Picker>
             <Input
            placeholder={AppText.INPUT_CELULAR}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_CELULAR_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setCelular(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.NAME_ICON_CELL}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                color={AppStyles.ICON_RIGTH_COLOR}
                /> }
             />
             <Input
            placeholder={AppText.INPUT_WEB}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_WEB_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setWeb(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.NAME_ICON_WEB}
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
            multiline = {true}
            numberOfLines = {4}
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

export default withNavigation(FormWork)


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
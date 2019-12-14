import React, {useState} from 'react';
import {StyleSheet,View,TouchableHighlight,Text,Dimensions,ScrollView} from 'react-native';
import {Button,Input,ButtonGroup} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {validateEmail} from '../../utils/validation/Validation';
//import * as firebase from 'firebase';
import Loading from '../loading/Loading';
import {withNavigation} from 'react-navigation';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import { RadioButton } from 'react-native-paper';

import uuid from 'uuid/v4';
import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let formHeight = dimensions.height * 0.1;
let inputWidth = dimensions.width * 0.8;

function FormRegister(props){

    const buttons = ['Mujer', 'Hombre', 'Otro'];

    const { toastRef,navigation } = props;
    const [hidePassword,sethidePassword] = useState(true);
    const [hidePasswordtwo,sethidePasswordtwo] = useState(true);
    const [selectedIndex,setSelectedIndex]=useState(null);
    const [name,setName] = useState("");
    const [celular,setCelular] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");

    const [isVisibleLoadin,setisvisibleLoading] = useState(false);

    const crearcuenta = async () =>{
        setisvisibleLoading(true);
         if(!email || !password || !repeatPassword || !name || !selectedIndex || !celular ){

            toastRef.current.show("Todos los campos son obligatorios");
            console.log("datos: "+ "nombre: " + name+ "celular: " + celular+ "tipopersona: " + selectedIndex+ "email: " + email+ "pasw: " + password );
         }else{

            if(validateEmail(email)){
                if(password!==repeatPassword){
                    toastRef.current.show("Las contraseñas no coinciden");
                }else{
                    console.log("datos: "+ "nombre: " + name+ "celular: " + celular+ "tipopersona: " + selectedIndex+ "email: " + email+ "pasw: " + password );
                    await firebase.auth()
                    .createUserWithEmailAndPassword(email,password)
                    .then(() => {
                        db.collection("App/User/Account").add({
                            name: name,
                            email: email,
                            password:password,
                            typeperson:selectedIndex,
                            location: "default...",
                            cell: celular,
                            bio: "biografia...",
                            typeuser:"P",
                            isadmin:false,
                            creteAt: new Date(),
                            createBy:firebaseApp.auth().currentUser.uid
                        }).then(() =>{
                            setIsVisibleLoading(false);
                            //navigation.navigate("MyAccount");
                           }
                        ).catch((error) =>{
                            setIsVisibleLoading(false);
                            toastRef.current.show("Error creando la cuenta");
                            console.log(error);
                        });
                    })
                    .catch(() =>{
                        toastRef.current.show("no se puede crear la cuenta");
                    }) 


                }
            }else{
                toastRef.current.show("El email no es correcto");
            }
         }
         setisvisibleLoading(false);
    }

    return(
        <ScrollView>
        <View style={styles.viewcontainer} >

           <Input
            placeholder={AppText.INPUT_NAME}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_NAME_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setName(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                selectedBackgroundColor={AppStyles.ACCENT_COLOR}
                name={AppText.INPUT_NAME_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                /> }
             />
                <RadioButton.Group
                    onValueChange={value => setSelectedIndex(value)}
                    value={selectedIndex}
                    
                     >
                    <View style={{flexDirection: 'row',justifyContent:"center",marginTop:AppStyles.MARGIN_20}}>
                      {
                           buttons.map((name,k) => (
                           <Text style={{marginLeft:AppStyles.MARGIN_5,marginRight:AppStyles.MARGIN_5,color:AppStyles.ACCENT_COLOR}} key={k} >{name}</Text>
                           ))
                       }
                   </View>
                   <View style={{flexDirection: 'row',justifyContent:"center",marginTop:AppStyles.MARGIN_5}}>
                       {
                           buttons.map((name,k) => (
                            <RadioButton value={name} key={k} />
                           ))
                       }
                   </View>
               </RadioButton.Group>
               <Input
            placeholder={AppText.INPUT_CELULAR}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_CELULAR_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setCelular(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={"mobile"}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                /> }
             />
            <Input
            placeholder={AppText.INPUT_CORREO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_CORREO_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setEmail(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.INPUT_CONTRASENA_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                /> }
             />
             <Input
            placeholder={AppText.INPUT_CONTRASENA}
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={hidePassword}
            label={AppText.INPUT_CONTRASENA_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setPassword(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={hidePassword ? "eye-slash":"eye"}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                onPress={()=> {sethidePassword(!hidePassword)}}
                /> }
             />

         <Input
            placeholder={AppText.INPUT_CONTRASENA_CONFIRMACION}
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={hidePasswordtwo}
            label={AppText.INPUT_CONTRASENA_CONFIRMACION_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setRepeatPassword(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={hidePasswordtwo ? "eye-slash":"eye"}
                size={AppStyles.INPUT_SIZE_ICON}
                iconStyle={styles.iconRight}
                onPress={()=> {sethidePasswordtwo(!hidePasswordtwo)}}
                /> }
             />

           <View style={styles.viewBoton}>
             
             <TouchableHighlight onPress={crearcuenta}>
               <View style={styles.btnContainer}>
                    <Text style={styles.btnStyle}>{AppText.BOTON_CREAR_CUENTA}</Text>
               </View> 
             </TouchableHighlight>
            </View>

             <Loading
             textshow ={AppText.TEXT_SHOW_PROCESS}
             isvisible={isVisibleLoadin}
             />

        </View>
        </ScrollView>
    );

}

export default withNavigation(FormRegister);


const styles = StyleSheet.create({
    btnContainer: {
        marginTop:AppStyles.MARGIN_20,
        backgroundColor: "transparent",
        borderColor: AppStyles.ACCENT_COLOR,
        borderWidth:AppStyles.BORDER_DEFAULT,
        borderRadius: AppText.BORDER_RADIUS
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
       color:AppStyles.ICON_RIGTH_COLOR
    },
    labelStyles:{
        color:AppStyles.INPUT_LABEL_COLOR
    },
    viewBoton:{
        alignItems:AppStyles.CENTRADO
    },
    viewcontainer:{
        alignContent:"center",
        justifyContent:"center",
        marginTop:formHeight,
        marginBottom:AppStyles.MARGIN_20
    }

})
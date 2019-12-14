import React,{useState} from 'react';
import {View,StyleSheet,Dimensions,TouchableHighlight,Text} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import {validateEmail} from '../../utils/validation/Validation';
import Loading from '../loading/Loading';
import {withNavigation} from 'react-navigation';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';


let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let imageWidth = dimensions.width;

let inputWidth = dimensions.width * 0.8;


 function FormLogin(props){

   const [hidePassword,setHidePassword] = useState(true);
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");

   const [visibleLoadin,setVisibleLoading] = useState(false);
   const { toastRef,navigation } = props;


const login = async () =>{
    setVisibleLoading(true);
    console.log("email: " + email+ " contra: "+ password); 
    if(!email || !password){
        console.log("complete los datos");
        toastRef.current.show("Datos incompletos");
    }else{
        if(validateEmail(email)){
             await  firebase.auth()
             .signInWithEmailAndPassword(email,password)
             .then(() => {
                navigation.navigate("Init");
                console.log("se inicio session"); 
             })
             .catch(() => {
                console.log("no se inicion session");
                toastRef.current.show("Error al iniciar session");
             })
        }else{
            toastRef.current.show("Email incorrecto");
        console.log("incorrecto");
        }
    }
    setVisibleLoading(false);
}

    return(
        <View >
            <Input
            placeholder={AppText.INPUT_USUARIO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_USUARIO_LABEL}
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
                onPress={()=> {setHidePassword(!hidePassword)}}
                /> }
             />

           <View style={styles.viewBoton}>
             
             <TouchableHighlight onPress={login}>
               <View style={styles.btnContainer}>
                    <Text style={styles.btnStyle}>{AppText.BOTON_LOGIND}</Text>
               </View> 
             </TouchableHighlight>
            </View>

            <Loading
            textshow={AppText.TEXT_SHOW_PROCESS}
            isvisible={visibleLoadin}
            />
        </View>
    );
}

export default withNavigation(FormLogin)


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
})
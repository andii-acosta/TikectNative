import React,{useState} from 'react';
import {View,StyleSheet,Dimensions,TouchableOpacity,Text} from 'react-native';
import {Button,Icon,Input} from 'react-native-elements';
import * as firebase from 'firebase';
import {validateEmail} from '../../utils/validation/Validation';
import Loading from '../loading/Loading';
import {withNavigation} from 'react-navigation';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let formHeight = dimensions.height * 0.05;
let inputWidth = dimensions.width * 0.8;

 function FormReturnPassword(props){

   const [email,setEmail] = useState("");

   const [visibleLoadin,setVisibleLoading] = useState(false);
   const { toastRef,navigation } = props;


const resetpassword = async () =>{
    setVisibleLoading(true);
    console.log("email: " + email); 
    if(!email){
        toastRef.current.show("Ingresa el email",2000);
        console.log("complete los datos");
    }else{
        if(validateEmail(email)){
             await  firebase.auth()
             .sendPasswordResetEmail(email)
             .then(() => {
                toastRef.current.show("Se envio el correo con exito",2000);
                navigation.navigate("login");
                console.log("se a enviado el correo"); 
                
             })
             .catch(() => {
                console.log("no se envio el corrreo");
                toastRef.current.show("no se pudo enviar el correo",2000);
             })
        }else{
         
        console.log("incorrecto");
        }
    }
    setVisibleLoading(false);
}

    return(
        <View style={styles.viewcontainer}>
            <Input
            placeholder={AppText.INPUT_USUARIO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_USUARIO_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setEmail(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                type={AppText.ICON_TYPE}
                name={AppText.INPUT_CONTRASENA_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
            <View style={styles.viewBoton}>
             <TouchableOpacity onPress={resetpassword}>
               <View style={styles.btnContainer}>
                    <Text style={styles.btnStyle}>{AppText.BOTON_LOGIND}</Text>
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

export default withNavigation(FormReturnPassword)


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
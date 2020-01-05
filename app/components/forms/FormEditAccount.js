import React, {useState} from 'react';
import {StyleSheet,View,TouchableOpacity,Text,Dimensions,ScrollView} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {validateEmail} from '../../utils/validation/Validation';
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
let formHeight = dimensions.height * 0.1;
let inputWidth = dimensions.width * 0.8;

function FormEditAccount(props){

    const { toastRef,navigation} = props;
    const user = navigation.state.params.userdata;
    const userKey = navigation.state.params.userIds;
    const setReloadData = navigation.state.params.setReloadData;
    const {bio,cell,name,email,location,document} = user;
    const [nameNew,setNameNew] = useState("");
    const [celular,setCelular] = useState("");
    const [emailNew,setEmailNew] = useState("");
    const [direccion,setDireccion] = useState("");
    const [documento,setDocumento] = useState("");
    const [bioNew,setBioNew] = useState("");
    const [isVisibleLoadin,setisvisibleLoading] = useState(false);

    //console.log("userKey : "+userKey);

    const Actualizarcuenta = () => {
        setisvisibleLoading(true);
         if(!emailNew || !nameNew || !celular ){
            toastRef.current.show("El nombre, email y celular son obligatorios",3000);
         }else{
            if(validateEmail(email)){
                    setisvisibleLoading(true);
                    console.log("datos: "+ "nombre: " + nameNew+ "celular: " + celular+ "direccion: " + direccion+ "email: " + emailNew+ " bio: " + bioNew+ " documento: " + documento );
                    updateAccount();
                }else{
                toastRef.current.show("El email no es correcto");
            }
         }
         setisvisibleLoading(false);
    };

    const updateAccount = () => {
          const refEvent = db.collection("App/User/Account/").doc(userKey);
                    var newUserData = {
                        "name": nameNew ? nameNew : name,
                        "email": emailNew ? emailNew : email,
                        "location": direccion ? direccion : location,
                        "cell": celular ? celular : cell,
                        "bio": bioNew ? bioNew : bio,
                        "document": documento ? documento : 0,
                        "dateUpdate": new Date(),
                      };
                      refEvent.update(newUserData).then(() =>{
                        toastRef.current.show("Actualizado OK");
                        setisvisibleLoading(false);
                        setReloadData(true);
                        navigation.goBack();
                      }).catch(() =>{
                        toastRef.current.show("Error actualizando los datos"); 
                      });
    };

    return(
        <ScrollView>
        <View style={styles.viewcontainer} >

           <Input
            placeholder={name ? name :AppText.INPUT_NAME}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_NAME_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setNameNew(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                selectedBackgroundColor={AppStyles.ACCENT_COLOR}
                name={AppText.INPUT_NAME_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
            <Input
            placeholder={cell ? cell : AppText.INPUT_CELULAR}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_CELULAR_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setCelular(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={"mobile"}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
            <Input
            placeholder={email? email : AppText.INPUT_CORREO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_CORREO_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setEmailNew(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.INPUT_CONTRASENA_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
            <Input
            placeholder={location ? location : AppText.INPUT_DIRECCION}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_DIRECCION_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setDireccion(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.INPUT_DIRECCION_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
             <Input
            placeholder={document ? document : AppText.INPUT_DOCUMENTO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_DOCUMENTO_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setDocumento(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.INPUT_DOCUMENTO_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
             <Input
            placeholder={bio ? bio : AppText.INPUT_BIO}
            containerStyle={styles.inputForm}
            label={AppText.INPUT_BIO_LABEL}
            labelStyle={styles.labelStyles}
            onChange={e => setBioNew(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                name={AppText.INPUT_BIO_ICON}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />
           <View style={styles.viewBoton}>
             <TouchableOpacity onPress={Actualizarcuenta}>
               <View style={styles.btnContainer}>
                    <Text style={styles.btnStyle}>{AppText.BOTON_ACTUALIZA}</Text>
               </View> 
             </TouchableOpacity>
            </View>
             <Loading
             textshow ={AppText.TEXT_SHOW_PROCESS}
             isvisible={isVisibleLoadin}
             />

        </View>
        </ScrollView>
    );

}

export default withNavigation(FormEditAccount);

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
        marginTop:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_20
    },
    viewcontainertyc:{
        alignContent:"center",
        justifyContent:"center",
        marginTop:AppStyles.MARGIN_10
    },
    btnRegister:{
    color:AppStyles.ACCENT_COLOR,
    fontWeight:"bold"
    },
    comentStyle:{
        color:AppStyles.SECUNDARY_TEXT_COLOR,
        textAlign:'justify'
    } 

})
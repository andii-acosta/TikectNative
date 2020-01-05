import React,{useRef} from 'react';
import {StyleSheet, View,Text,ScrollView} from 'react-native';
import {Divider} from 'react-native-elements';
import FormLogin from '../../components/forms/FormLogin';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';


export default function Login (props) {

const {navigation}= props;

const toastRef = useRef();

    return(
        <View style={styles.containerStyle}>
        <View style={styles.viewcontainer}>
          <FormLogin
          toastRef={toastRef}
          />
          <CreateAccount navigation={navigation}/> 
          <ForgetAccount navigation={navigation}/> 
        </View>

        <Divider style={styles.containerDivider}/>
               <Toast
                  ref={toastRef} position="center" opacity={0.7}
               />
         </View>
    
    );
}

function ForgetAccount(props){

    const {navigation} = props;

    return(
        <View style={styles.viewcontainer}>
        <Text style={styles.Register}>
            <Text 
            style={styles.btnRegister}
            onPress={() => {navigation.navigate("Recuperarpassword")}}
            >
                Recuperar
            </Text>
             {" "}mi contraseña.
        </Text>
        </View>
    );
};

function CreateAccount(props){

    const {navigation} = props;

    return(
        <View style={styles.viewcontainer}>
        <Text style={styles.Register}>

            Crea tu cuenta aqui{" "}
            <Text 
            style={styles.btnRegister}
            onPress={() => {navigation.navigate("Register")}}
            >
                Registrate.
            </Text>
        </Text>

        </View>
    );
};



const styles = StyleSheet.create({
viewcontainer:{
    alignContent:"center",
    justifyContent:"center"
},
containerDivider: {
 backgroundColor:AppStyles.ORAGE_COLOR
},
Register:{
    marginTop:AppStyles.MARGIN_10,
    alignItems:'center',
    color:AppStyles.WHITE_COLOR
},
btnRegister:{
    color:AppStyles.ACCENT_COLOR,
    fontWeight:"bold"
},
containerStyle:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:AppStyles.PRIMARY_COLOR
}
})
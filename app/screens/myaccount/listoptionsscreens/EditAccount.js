import React,{useRef} from 'react';
import {StyleSheet,View,Text,ScrollView} from 'react-native';
import FormEditAccount from '../../../components/forms/FormEditAccount';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../../utils/css/theme.style';
import AppText from '../../../utils/text/text.all';
import {withNavigation} from 'react-navigation';

export default function Register(props){

    const {navigation}=props;

    const user = navigation.state.params.userdata;
    const {bio,cell,name,email,location,document} = user;
    const toastRef = useRef();
    //console.log(user);

    return(<ScrollView>
            <View  style={styles.viewForm}>
                <View style={styles.datastyle}>
                    <Text style={styles.titlestyle}> DATOS ACTUALES</Text>
    <Text style={styles.datatyle}>Nombre: {name}</Text>
    <Text style={styles.datatyle}>Celular: {cell}</Text>
    <Text style={styles.datatyle}>Email: {email}</Text>
    <Text style={styles.datatyle}>Direccion: {location ? location : "..."}</Text>
    <Text style={styles.datatyle}>Documento: {document ? document : "..."}</Text>
    <Text style={styles.datatyle}>Biografia: {bio ? bio : "..."}</Text>

                </View>
               <FormEditAccount
               toastRef={toastRef}
               navigation={navigation}/>
            </View>
            
           <Toast position={AppStyles.CENTRADO} opacity={0.7} ref={toastRef}/>
    </ScrollView>
        
    );

}



const styles = StyleSheet.create({
    viewForm:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:AppStyles.PRIMARY_COLOR
        },
        alignItemsdatastyle:{
            marginTop:AppStyles.MARGIN_10
        },
        titlestyle:{
            fontSize:AppText.SUB_TITULO,
            color:AppStyles.ACCENT_COLOR,
            fontWeight:"bold"
        },
        datatyle:{
            fontSize:AppText.PARRAFO,
            color:AppStyles.WHITE_COLOR,
            fontWeight:"bold"
        }
});
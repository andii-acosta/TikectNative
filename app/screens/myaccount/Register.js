import React,{useRef} from 'react';
import {StyleSheet,View,Image,ScrollView} from 'react-native';
import FormRegister from '../../components/forms/FormRegister';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../utils/css/theme.style';


export default function Register(){


    const toastRef = useRef();

    return(<ScrollView>
            <View  style={styles.viewForm}>
               <FormRegister
               toastRef={toastRef}/>
            </View>
           <Toast position={AppStyles.CENTRADO} opacity={0.7} ref={toastRef}/>
    </ScrollView>
        
    );


}

const styles = StyleSheet.create({
    viewForm:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
        }
});
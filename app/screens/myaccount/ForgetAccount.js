import React,{useRef} from 'react';
import {StyleSheet,View,ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../utils/css/theme.style';
import FormReturnPassword from '../../components/forms/FormReturnPassword';

export default function ForgetAccount(props){

    const {navigation}=props;

    const toastRef = useRef();

    return(<View style={styles.containerStyle}>
            <View 
            style={styles.viewForm}>
                   <FormReturnPassword
                   navigation={navigation}
                   toastRef={toastRef}
                   />
            </View>
            <Toast position={AppStyles.CENTRADO} opacity={0.7} ref={toastRef}/>
    </View>
    );
}

const styles = StyleSheet.create({
    viewForm:{
            alignItems:AppStyles.CENTRADO,
            justifyContent:AppStyles.CENTRADO
        },
    containerStyle:{
            flex:1,
            alignItems:"center",
            justifyContent:"center"
        }
});
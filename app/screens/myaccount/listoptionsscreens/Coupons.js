import React,{useRef} from 'react';
import {StyleSheet,View,Dimensions,Text} from 'react-native';
import {Tooltip} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import AppStyles from '../../../utils/css/theme.style';
import FormCoupns from '../../../components/forms/FormCoupns';
import AppText from '../../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let widthtool = dimensions.width*0.8;

export default function Coupons(props){

    const {navigation}=props;

    const toastRef = useRef();

    return(<View style={styles.containerStyle}>
            <View>
            <Tooltip 
            backgroundColor={AppStyles.PRIMARY_COLOR}
            width={widthtool}
            
            popover={<Text>Ingresa el codigo y presiona redimir</Text>}>
              
              <View style={styles.btnContainer}>
                <Text style={styles.btnStyle}>{AppText.TITLE_CUPONS}</Text>
              </View> 
           </Tooltip>
           </View>
            <View  style={styles.viewForm}>
                   <FormCoupns
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
            justifyContent:"center",
            backgroundColor:AppStyles.PRIMARY_COLOR
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
            fontSize: AppText.PARRAFO_GRANDE
          },
          titlestyle:{
              marginRight:AppStyles.MARGIN_10,
              marginLeft:AppStyles.MARGIN_10
          }
});
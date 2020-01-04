import React from 'react';
import {StyleSheet,Text,Dimensions,View,TouchableOpacity,Linking} from 'react-native';
import {Overlay} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let heightModal = dimensions.height*0.7;
let widthModal = dimensions.width*0.8;
let widthImageModal = dimensions.width*0.6;
let heightImageModal = dimensions.height*0.4;


export default function ModalPqrs(props){
   
   const {isVisible,setIsVisible,renderComponent} =props;
   const {title,body,link} = renderComponent;


   const claseModal = () => setIsVisible(false);

    return(
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0,0,0,.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.OverlayStyle}
        onBackdropPress={claseModal}
        >
            { renderComponent ?
            <View style={styles.viewConten}>
              <View> 
                  <Text style={styles.titulostyle}>{title} </Text>
              </View>
              <View >
                  <Text style={styles.textstyle}>{body} </Text>
              </View>
              <TouchableOpacity style={styles.linkstylebtn} onPress={() => Linking.openURL(link)}>
                <View style={styles.btnContainer}>
                 <Text style={styles.btnStyle}>{AppText.TEXT_BTN_PQRS}</Text>
                </View> 
             </TouchableOpacity>
            </View>
            :
            <View >
                <Text>
                   NO SE OBTUVIERON DATOS
                </Text>
            </View>

            }
        </Overlay>
    );
}

const styles = StyleSheet.create({
    OverlayStyle:{
        height:heightModal,
        width:widthModal,
        backgroundColor:AppStyles.WHITE_COLOR       
    },
    viewImage:{
        width:widthImageModal,
        height:heightImageModal
    },
    viewConten:{
        flex:1,
        alignItems:AppStyles.CENTRADO
    },
    titulostyle:{
        color:AppStyles.ACCENT_COLOR,
        fontWeight:'bold',
        fontSize:AppText.PARRAFO_GRANDE,
        marginBottom:AppStyles.MARGIN_10
    },
    textstyle:{
        fontWeight:'bold',
        marginLeft:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_5
    },
    linkstylebtn:{
      marginTop:AppStyles.MARGIN_5
    },
    btnContainer: {
      marginTop:AppStyles.MARGIN_5,
      backgroundColor: "transparent",
      borderColor: AppStyles.ACCENT_COLOR,
      borderWidth:AppStyles.BORDER_DEFAULT,
      borderRadius: AppStyles.BORDER_RADIUS
    },
    btnStyle: {
      margin: AppStyles.MARGIN_10,
      paddingHorizontal: AppStyles.MARGIN_10,
      textAlign: AppStyles.CENTRADO,
      backgroundColor: "transparent",
      color: AppStyles.ACCENT_COLOR,
      fontSize: AppText.PARRAFO_GRANDE
    },
})
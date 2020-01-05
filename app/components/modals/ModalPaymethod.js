import React from 'react';
import {StyleSheet,Text,Dimensions,Image,View,ActivityIndicator,TouchableOpacity,Linking} from 'react-native';
import {Overlay} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let heightModal = dimensions.height*0.8;
let widthModal = dimensions.width*0.9;
let widthImageModal = dimensions.width*0.6;
let heightImageModal = dimensions.height*0.4;


export default function ModalpayMethod(props){
   
   const {isVisible,setIsVisible,renderComponent} =props;
   const {title,body,link,features,multimedia} = renderComponent;

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
              <View>
                  <Text style={styles.textbodystyle}> {body} </Text>
              </View>
              <View>
                  <Text style={{marginTop:AppStyles.MARGIN_10,textAlign:'left',justifyContent:'flex-start',color:AppStyles.ACCENT_COLOR,fontSize:AppText.SUB_TITULO,fontWeight:'bold'}}>CARACTERISTICAS</Text>
                  {features.map((f,i) =>(
                      <Text style={styles.textfeaturestyle} key={i}> {f} </Text>
                  ))
                  }
              </View>
              <View>
              <Text style={{marginTop:AppStyles.MARGIN_10,textAlign:'left',justifyContent:'flex-start',color:AppStyles.ACCENT_COLOR,fontSize:AppText.SUB_TITULO,fontWeight:'bold'}}>MAS DETALLES</Text>
              </View>
              <View style ={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.btnDetalle} onPress={() => Linking.openURL(link)} >
                   <View style={styles.btnContainer}>
                       <Text style={styles.btnStyle}>{AppText.BOTON_LINK}</Text>
                   </View> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnDetalle} onPress={() => Linking.openURL(multimedia)}>
                   <View style={styles.btnContainer}>
                       <Text style={styles.btnStyle}>{AppText.BOTON_MULTIMEDIA}</Text>
                   </View> 
                </TouchableOpacity>
            </View>
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
        fontSize:AppText.TITULO,
        marginBottom:AppStyles.MARGIN_10,
        textTransform:'uppercase'
    },
    textstyle:{
        fontWeight:'bold',
        marginLeft:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_5
    },
    textbodystyle:{
        textAlign:'justify'
    },
    textfeaturestyle:{
        textAlign:'left',
        fontSize:AppText.PARRAFO_GRANDE,
        fontWeight:'bold',
        color:AppStyles.GREEN_COLOR,
        textTransform:'uppercase'
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
      color: AppStyles.ACCENT_COLOR
    },
    btnDetalle:{
        margin:AppStyles.MARGIN_10
    },
})
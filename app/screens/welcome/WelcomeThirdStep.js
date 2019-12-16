import React from 'react';
import {View,Text,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';


let botonWidth = 300;

function WelcomeThirdStep(props){

    const {navigation,imageHeight,imageWidth} = props;

    return (
          <ImageBackground
            source={require('../../../assets/statics/image/thrid_step.jpg')}
            style={{
              width: imageWidth,
              height: imageHeight,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text style={{ color: AppStyles.WHITE_COLOR, fontSize: 50, fontWeight: "bold"  }}>
              Hola
            </Text>
            <Text style={{ color: AppStyles.WHITE_COLOR, fontSize: 20,fontWeight: "bold",borderColor:AppStyles.ORAGE_COLOR }}>
              Bienvenido a TikectNative
            </Text>

            <View style={styles.viewBoton}>
             
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <View style={styles.btnContainer}>
                   <Text style={styles.btnStyle}>{AppText.BOTON_TENGO_CUENTA}</Text>
              </View> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <View style={styles.btnContainer}>
                   <Text style={styles.btnStyle}>{AppText.BOTON_CREAR_CUENTA}</Text>
              </View> 
            </TouchableOpacity>
               </View>
          </ImageBackground>
      );
  }

  export default withNavigation(WelcomeThirdStep);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewBoton:{
        alignItems:AppStyles.CENTRADO
    },
    btnContainer: {
      marginTop:AppStyles.MARGIN_20,
      backgroundColor: "transparent",
      borderColor: AppStyles.PRIMARY_COLOR,
      borderWidth:AppStyles.BORDER_DEFAULT,
      borderRadius: AppText.BORDER_RADIUS
    },
    btnStyle: {
      margin: AppStyles.MARGIN_10,
      paddingHorizontal: AppStyles.MARGIN_10,
      textAlign: "center",
      backgroundColor: "transparent",
      color: AppStyles.PRIMARY_COLOR,
      fontSize: AppText.TITULO
    }
  });
                

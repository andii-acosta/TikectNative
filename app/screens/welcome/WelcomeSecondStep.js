import React from 'react';
import {View,Text,StyleSheet,Image,ImageBackground} from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

export default function WelcomeSecondStep(props){

    const {imageHeight,imageWidth} = props;

    return (
          <ImageBackground
            source={require('../../../assets/statics/image/first_step.jpg')}
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
          </ImageBackground>
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
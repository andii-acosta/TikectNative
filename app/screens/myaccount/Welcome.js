import React from 'react';
import {View,Dimensions } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import CardsLoginInit from '../../components/cardshome/CardsLoginInit';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let imageWidth = dimensions.width;

export default function Welcome(){


    console.log("ancho: "+ imageWidth + "  " + "alto: " + dimensions.height);
  
    return (
             <View >
                <CardsLoginInit
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                />
             </View>
    );
  }
  
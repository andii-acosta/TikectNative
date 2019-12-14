import React,{useState,useEffect} from 'react';
import {View,StyleSheet } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import Carousel from 'react-native-banner-carousel';
import WelcomeFirstStep from '../../screens/welcome/WelcomeFirstStep';
import WelcomeSecondStep from '../../screens/welcome/WelcomeSecondStep';
import WelcomeThirdStep from '../../screens/welcome/WelcomeThirdStep';

export default function CardLogingInit(props){

  const {imageHeight,imageWidth} = props;

  return (
        <View >
        <Carousel
        autoplay
        autoplayTimeout={5000}
        loop={false}
        index={0}
        pageSize={imageWidth}
        pageIndicatorStyle={styles.indicator}
        activePageIndicatorStyle={styles.indicatorActive}
        >
           <WelcomeFirstStep
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            />
            <WelcomeSecondStep
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            /> 
            <WelcomeThirdStep
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            />
        </Carousel>
        </View>
  );
}

const styles = StyleSheet.create({

  indicator: {
      backgroundColor: AppStyles.ORAGE_COLOR,
  },
  indicatorActive:{
      backgroundColor:AppStyles.ACCENT_COLOR
  }
})
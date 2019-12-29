import React from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import Carousel from 'react-native-banner-carousel';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_CARDS_HOME);
let imageWidth = dimensions.width
let paddingContainer = Math.round(dimensions.width * AppText.PADDING_CARDS_HOME);
let padding = dimensions.height*0.04;

export default function CarouselDetalle (props) {

    const {imageRestaurant,width,height} = props;

    return(
        <Carousel
        autoplay
        autoplayTimeout={AppText.TIME_LOOP_HOME_PAUTA}
        loop
        index={0}
        pageSize={width}
        pageIndicatorStyle={styles.indicator}
        activePageIndicatorStyle={styles.indicatorActive}
        >

          {imageRestaurant.map(img => (

             <View  st key={img}>
                 <Image 
                 style={{width,height}}
                 source={{uri: img}}
                 />
             </View>
          ))
          }

        </Carousel>
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
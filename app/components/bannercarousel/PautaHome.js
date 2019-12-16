import React,{useEffect,useState} from 'react';
import {StyleSheet,View,Text,Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import Carousel from 'react-native-banner-carousel';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

import {firebaseApp} from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_CARDS_HOME);
let imageWidth = dimensions.width
let paddingContainer = Math.round(dimensions.width * AppText.PADDING_CARDS_HOME);
let pautaHeight = dimensions.height*0.1;

export default function PautaHome () {

    const [imgpautahome,setImgpautahome]= useState([]);
    //console.log("___________________________");
    //console.log(JSON.stringify(imgpautahome));
  useEffect(() => {
    (async () => {
        const ref = db.collection("App/Pauta/Home/");
    await ref.get().then(response => {
        response.forEach(doc => {
            let image = doc.data().img;
            image.id = doc.id;
            setImgpautahome(image);
        });
        
    })
    })();
}, []);

    return(
        <Carousel
        autoplay
        autoplayTimeout={AppText.TIME_LOOP_HOME_PAUTA}
        loop
        index={0}
        pageSize={imageWidth}
        pageIndicatorStyle={styles.indicator}
        activePageIndicatorStyle={styles.indicatorActive}
        >

          {imgpautahome && imgpautahome.map(img => (

             <View key={img}>
                 <Image 
                 style={{width: imageWidth,height: pautaHeight}}
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
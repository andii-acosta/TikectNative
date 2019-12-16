import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,ScrollView,Dimensions } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import ListItems from '../../components/list/ListItems';

import {firebaseApp} from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_CARDS_HOME);
let imageWidth = dimensions.width *0.97;
let paddingContainer = Math.round(dimensions.width * AppText.PADDING_CARDS_HOME);
let pautaHeight = dimensions.height*0.2;

export default function CardsHome(props){

  const {navigation,type,typeList,maxResult,minresult} = props;

  const [items,setItems] = useState({});
  const [startItems,setStartItems] = useState(null);
  const [isLoading,setIsloading] = useState(false);
  const [totalItems,setTotalItems] = useState(false);
  const [isreload,setIsreload] = useState(false);
  const limiteItems = maxResult;

    // console.log("___________________________");
    // console.log(JSON.stringify(items));
    //console.log("tipo: "+type );

  useEffect(() => {
    db.collection("App/Info/Detalle")
    .get()
    .then(snap => {
        setTotalItems(snap.size);
    });

    (async () => {
         let resultItems = [];

            let citiesRef = db.collection("App/Info/Detalle");
            let queryRef = citiesRef.where('type', '==', type).limit(limiteItems);
    
    await queryRef.get().then(response => {
        setStartItems(response.docs[response.docs.length -1]);

        response.forEach(doc => {
            let restautant = doc.data();
            restautant.id = doc.id;
            resultItems.push({restautant});

        });
        setItems(resultItems);
        
    });
    })();
    setIsreload(false);
}, [isreload])

const handlerLoadMore = async () => {

  const resultRestaurantes = [];
   
  items.length < totalItems && setIsloading(true);

  const restaurantDb = db.collection()
  .orderBy("creteAt","desc")
  .startAfter(startItems)
  .limit(limiteItems);
  
  await restaurantDb.get()
  .then(response => {
      if(response.length > 0){
           setStartItems(Response.docs[response.docs.length - 1]);

      } else {
          setIsloading(false);
      }

      response.forEach(doc => {
          let restaurant= doc.data();
          restaurant.id = dioc.id;
          resultRestaurantes.push({restaurant});
      });

      setItems([...items,...resultRestaurantes]);
  })

}

  return (
      <ScrollView style={styles.container}>

        <View style={styles.viewCenter}>
        <ListItems
            items={items}
            isLoading={isLoading}
            handlerLoadMore={handlerLoadMore}
            navigation={navigation}
            />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppStyles.PURPLE_COLOR,
    borderRadius:AppText.BORDER_RADIUS,
    marginLeft:AppStyles.MARGIN_5,
    marginRight:AppStyles.MARGIN_5,
    width:imageWidth
  },
  viewCenter:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:pautaHeight

  }
});
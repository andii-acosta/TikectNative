import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,FlatList,ActivityIndicator,TouchableOpacity,Dimensions} from 'react-native';
import {Image} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

import * as firebase from 'firebase';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_CARDS_HOME);
let imageWidth = dimensions.width*0.95;
let paddingContainer = Math.round(dimensions.width * AppText.PADDING_CARDS_HOME);
let imgHeight = dimensions.height*0.2;

export default function ListItems(props){

 const {items,isLoading,handlerLoadMore,navigation} = props;

    return(
         <View>
             {items ? (
                 <FlatList
                 data={items}
                 renderItem={restaurant =>  <Mycard restaurant={restaurant} navigation={navigation} /> }
                 keyExtractor={(itm,index) =>{index.toString()}}
                 onEndReached={handlerLoadMore}
                 onEndReachedThreshold={0}
                // ListFooterComponent={<FooterList isLoading={isLoading}/>}
                 />
             ) : (
                 <View style={styles.loaderRestaurant}>
                     <ActivityIndicator size="large" />
                     <Text>
                         Cargando restaurantes ...
                     </Text>
                 </View>
             )} 
         </View>
    );
}


function Mycard (props){

    const {restaurant,navigation} = props;
     
    const {name,location,image,description} = restaurant.item.restautant;

    const [imageRestaurant,setImageRestaurant] = useState(null);

    useEffect(() => {
        
        const images= image[0];
        firebase.storage().ref(`Photos/Galeria/Detalle/${images}`).getDownloadURL()
        .then(result => {
           // console.log(result);
            setImageRestaurant(result);
        })
    }, [])

    //console.log(restaurant);

    return(
        <TouchableOpacity style={styles.touchablestyles}
        onPress={() => navigation.navigate("Detalle",{restaurant})}
        >
            <View style={styles.viewCard}>
                 
                 <View style={styles.viewCardImage}>
                     <Image
                     resizeMode="cover"
                     source={{uri:imageRestaurant}}
                     style={styles.cardImage}
                     PlaceholderContent={<ActivityIndicator color ="#fff"/>}
                     ></Image>
                 </View>
                 <View>
                         <Text style={styles.titleCard}>
                                  {name}
                         </Text>
                         <Text style={styles.locationCard}>
                                  {location}
                         </Text>
                         <Text style={styles.descriptionCard}>
                                  {description.substr(0,60)}...
                         </Text>
                 </View>
                  
            </View>
        </TouchableOpacity>
    );
}

function FooterList(props){

    const {isLoading} = props;

    return(
        <View>
            <Text>
                    No hay mas Eventos
                 </Text>
        </View>
    );
    /*if(isLoading){
        return(
            <View style={styles.loadingItems}>
                    <ActivityIndicator size="large"/>
            </View>
            );
    } else {
        return(
            <View style={styles.notFound}>
                 <Text>
                    No hay mas restaurantes
                 </Text>
            </View>
            );
    }*/
}


const styles = StyleSheet.create({
    
    loadingItems:{
        marginTop:AppStyles.MARGIN_20,
        alignItems:"center"
    },
    viewCard:{
        margin:AppStyles.MARGIN_5,
        backgroundColor:AppStyles.WHITE_COLOR,
        borderRadius:AppText.BORDER_RADIUS
    },
    touchablestyles:{
        borderRadius:AppText.BORDER_RADIUS,
        alignItems:"center",
        justifyContent:"center",
    },
    viewCardImage:{
        width:imageWidth,
        height:imgHeight,
        borderRadius:AppText.BORDER_RADIUS
    },
    cardImage:{
        width:imageWidth,
        height:imgHeight,
        borderRadius:AppText.BORDER_RADIUS,
        marginLeft:AppStyles.MARGIN_10
    },
    titleCard:{
        fontWeight:"bold",
        color:AppStyles.ACCENT_COLOR
    },
    locationCard:{
        paddingTop:2,
        color:AppStyles.PRIMARY_TEXT_COLOR
    },
    descriptionCard:{
        paddingTop:2,
        color:AppStyles.PRIMARY_TEXT_COLOR,
        width:imageWidth
    },
    notFound:{
        marginTop:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_20,
        alignItems:"center"
    },
    loaderRestaurant:{
        marginTop:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_10
    }

})
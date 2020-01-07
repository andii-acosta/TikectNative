import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,FlatList,ActivityIndicator,TouchableOpacity,Dimensions} from 'react-native';
import {Image,Rating} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import Icon from 'react-native-vector-icons/FontAwesome';

import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let imageWidth = dimensions.width*0.95;
let imgHeight = dimensions.height*0.2;

export default function ListItems(props){

 const {items,setIsloading,handlerLoadMore,navigation,toastRef,userIds,userdata} = props;


 //console.log(JSON.stringify(items));
    return(
         <View style={{borderRadius:AppStyles.BORDER_RADIUS_10}}>
             {items ? (
                 <FlatList
                 style={{borderRadius:AppStyles.BORDER_RADIUS_10}}
                 data={items}
                 renderItem={eventos =>  <Mycard userdata={userdata} userIds={userIds} eventos={eventos} setIsloading={setIsloading} navigation={navigation} toastRef={toastRef}/> }
                 keyExtractor={(item, index) => {return index.toString()}}
                 onEndReached={handlerLoadMore}
                 onEndReachedThreshold={0}
                // ListFooterComponent={<FooterList isLoading={isLoading}/>}
                 />

             ) : (
                 <View style={styles.loaderRestaurant}>
                     <ActivityIndicator size="large" />
                     <Text>
                         Cargando eventos ...
                     </Text>
                 </View>
             )} 
         </View>
    );
}


function Mycard (props){

    const {eventos,navigation,setIsloading,toastRef,userIds} = props;
     
    const {name,location,image,city,rating,price,typeTicket,publico,date,id} = eventos.item.restautant;

    const [imageRestaurant,setImageRestaurant] = useState(null);
    const [isFavorite,setIsFavorite] = useState(false);

    useEffect(() => {
        db.collection("App/Info/Favorites").where("eventId","==",id).where("userId","==",userIds)
        .get()
        .then((response)=>{
            if(response.docs.length == 1){
                setIsFavorite(true);
            }
        })
    }, [])

    useEffect(() => {
        
        const images= image[0];
        firebase.storage().ref(`Photos/Galeria/Detalle/${images}`).getDownloadURL()
        .then(result => {
            setImageRestaurant(result);
        })
        setIsloading(false);
    }, [])

    const addFavorite = () => {

        const favload ={
            userId : userIds,
            eventId :id,
            createAt: new Date()
        }
        if(userIds != null){
            db.collection("App/Info/Favorites").add(favload)
            .then(() => {
                setIsFavorite(true);
                toastRef.current.show(name+ " Agregado a favoritos",2000);
            })
            .catch((error)=>{
                console.log("error:"+ error);
                setIsFavorite(false);
                toastRef.current.show("No se pudo agregar a favoritos",2000);
            }  
            );
        }else{
            toastRef.current.show("En este moemnto no es posible, intenta mas tarde",2000);
        }
        
    }
    
    const removeFavorite = () => {

        db.collection("App/Info/Favorites").where("eventId","==",id).where("userId","==",userIds)
        .get().then((response) => {
            response.forEach(doc => {
                const idevent = doc.id;
                db.collection("App/Info/Favorites").doc(idevent).delete().then(()=>{
                   setIsFavorite(false);
                   toastRef.current.show(name+ " removido de favoritos",2000);
                }).catch((error)=>{
                    console.log(error);
                    toastRef.current.show("En este moemnto no es posible, intenta mas tarde",2000);
                });
            });
        })
        
    }

    return(
        <TouchableOpacity style={styles.touchablestyles}
        onPress={() => navigation.navigate("Detalle",{eventos})}
        >
            <View style={styles.viewCard}>
                <View style={styles.favorites}>
                     <TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite}>
                     <Icon 
                            name={AppText.NAME_ICON_LIKE}
                            size={AppStyles.INPUT_SIZE_ICON_L}
                            iconStyle={styles.iconLike}
                            color={isFavorite ? AppStyles.ACCENT_COLOR : AppStyles.SECUNDARY_TEXT_COLOR_LT}
                             /> 
                         </TouchableOpacity>
                
                </View>
                 
                 <View style={styles.viewCardImage}>
                     <Image
                     resizeMode="cover"
                     borderRadius={AppStyles.BORDER_RADIUS_10}
                     source={{uri:imageRestaurant}}
                     style={styles.cardImage}
                     PlaceholderContent={<ActivityIndicator color ={AppStyles.WHITE_COLOR}/>}
                     ></Image>
                 </View>
                 <View style={styles.contenidocard_1}>
                         <Text style={styles.titleCard}>
                                  {name}
                         </Text>
                 </View>
                 <View style={styles.contenidocard_2}>
                    <View style={{flexDirection:'row'}}>
                            <Text style={styles.locationCard}>
                              {city}, {location}
                            </Text>
                            <Rating
                             style={styles.stylesRaiting}
                             imageSize={20}
                             readonly
                              startingValue={parseFloat(rating)}
                              />
                    </View>
                 </View>
                 <View style={styles.contenidocard_2}>
                        
                         <View style={{flexDirection:'row'}}>
                             <Icon 
                            name={AppText.NAME_ICON_PAGE_PAYMENT}
                            size={AppStyles.INPUT_SIZE_ICON_M}
                            color={AppStyles.SECUNDARY_TEXT_COLOR}
                             />    
                            <Text style={{color:AppStyles.GREEN_COLOR,fontWeight:"bold",fontSize:AppText.PARRAFO_GRANDE, textAlign: 'left',marginLeft:AppStyles.MARGIN_5}}>
                                Aporte:  ${price}
                         </Text>
                         </View>
                         <View style={{flexDirection:'row'}}>
                             <Icon 
                            name={AppText.NAME_ICON_PAGE_HOME}
                            size={AppStyles.INPUT_SIZE_ICON_M}
                            color={AppStyles.SECUNDARY_TEXT_COLOR}
                             />    
                            <Text style={{color:AppStyles.SECUNDARY_TEXT_COLOR,fontWeight:"bold",fontSize:AppText.PARRAFO_GRANDE, textAlign: 'left',marginLeft:AppStyles.MARGIN_5}} >
                                     {typeTicket}
                             </Text>
                         </View>
                         <View >
                             <View style={{flexDirection:'row'}}>
                             <Icon 
                            name={AppText.NAME_ICON_CALENDAR}
                            size={AppStyles.INPUT_SIZE_ICON_M}
                            color={AppStyles.SECUNDARY_TEXT_COLOR}
                             />    
                         <Text style={{color:AppStyles.PRIMARY_TEXT_COLOR,fontWeight:"bold",fontSize:AppText.PARRAFO_GRANDE, textAlign: 'left',marginLeft:AppStyles.MARGIN_5}}>
                                  {date}
                         </Text>
                         
                             </View>
                             <View style={{flexDirection:'row-reverse'}}>
                         <Text style={{color:AppStyles.SECUNDARY_TEXT_COLOR,fontWeight:"bold",fontSize:AppText.PARRAFO_GRANDE, textAlign: 'right',alignSelf: 'stretch',marginRight:AppStyles.MARGIN_5}}>
                                  {publico}
                         </Text>
                         <Icon 
                            name={AppText.NAME_ICON_AGE}
                            size={AppStyles.INPUT_SIZE_ICON_M}
                            color={AppStyles.SECUNDARY_TEXT_COLOR}
                            style={{marginRight:AppStyles.MARGIN_10}}
                             /> 
                             </View>
                         </View>
                         
                 </View>
                 <View style={styles.contenidocard_1}>
                 <View style={styles.contenidocard_2}>
                 <View style={{flexDirection:'row'}}>
                     <View>
                     <TouchableOpacity style={styles.btnDetalle} onPress={() => navigation.navigate("Detalle",{eventos})}>
                         <View style={styles.btnContainer}>
                         <Text style={styles.btnStyle}>{AppText.BOTON_DETALLE}</Text>
                         </View> 
                         </TouchableOpacity>
                     </View>
                     <View>
                     <TouchableOpacity style={styles.btnDetalle} onPress={() => navigation.navigate("Payment",{eventos})}>
                         <View style={styles.btnContainer2}>
                          <Text style={styles.btnStyle2}>{AppText.BOTON_COMPRAR}</Text>
                         </View> 
                         </TouchableOpacity>
                     </View>
                 </View>
                 </View>
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
        alignItems:AppStyles.CENTRADO
    },
    viewCard:{
        margin:AppStyles.MARGIN_5,
        backgroundColor:AppStyles.WHITE_COLOR,
        borderRadius:AppStyles.BORDER_RADIUS_10
    },
    touchablestyles:{
        borderRadius:AppStyles.BORDER_RADIUS_10,
        alignItems:AppStyles.CENTRADO,
        justifyContent:AppStyles.CENTRADO,
    },
    viewCardImage:{
        width:imageWidth,
        height:imgHeight,
        borderRadius:AppText.BORDER_RADIUS_10
    },
    cardImage:{
        width:imageWidth,
        height:imgHeight,
        borderRadius:AppStyles.BORDER_RADIUS_10,
        marginLeft:AppStyles.MARGIN_10
    },
    titleCard:{
        fontWeight:"bold",
        fontSize:AppText.TITULO,
        color:AppStyles.ACCENT_COLOR
    },
    locationCard:{
        fontWeight:"bold",
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
        alignItems:AppStyles.CENTRADO
    },
    loaderRestaurant:{
        marginTop:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_10
    },
    contenidocard_1:{
        alignItems:AppStyles.CENTRADO
    },
    contenidocard_2:{
        marginLeft:AppStyles.MARGIN_10,
        marginRight:AppStyles.MARGIN_10
    },
    contenidocard_3:{
        marginLeft:AppStyles.MARGIN_10,
        marginRight:AppStyles.MARGIN_10
    },
    stylesRaiting:{
        position:'absolute',
        right:0
    },
    btnContainer: {
        marginTop:AppStyles.MARGIN_5,
        backgroundColor: "transparent",
        borderColor: AppStyles.ACCENT_COLOR,
        borderWidth:AppStyles.BORDER_DEFAULT,
        borderRadius: AppStyles.BORDER_RADIUS
      },
      btnContainer2: {
        marginTop:AppStyles.MARGIN_5,
        backgroundColor: "transparent",
        borderColor: AppStyles.GREEN_COLOR,
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
      btnStyle2: {
        margin: AppStyles.MARGIN_10,
        paddingHorizontal: AppStyles.MARGIN_10,
        textAlign: AppStyles.CENTRADO,
        backgroundColor: "transparent",
        color: AppStyles.GREEN_COLOR,
        fontSize: AppText.PARRAFO_GRANDE
      },
      btnDetalle:{
          margin:AppStyles.MARGIN_10
      },
      iconLike:{
        marginTop:AppStyles.MARGIN_15,
        borderColor:AppStyles.WHITE_COLOR,
        borderWidth:5,
     },
     favorites:{
         position:'absolute',
         zIndex:2,
         top:0,
         right:0,
         backgroundColor:AppStyles.PRIMARY_COLOR,
         borderBottomLeftRadius:30,
         paddingTop:5,
         paddingBottom:5,
         paddingLeft:15,
         paddingRight:5
     }
})
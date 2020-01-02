import React,{useState,useEffect, Fragment} from 'react';
import {StyleSheet,ScrollView,View, Text,Dimensions,TouchableOpacity,Linking} from 'react-native';
import * as firebase from 'firebase';
import {Rating,PricingCard,SocialIcon,Divider} from 'react-native-elements';
import CarouselDetalle from '../../components/bannercarousel/CarouselDetalle';
import LoadingGeneral from '../../components/loading/LoadingGeneral';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_GALERY_DETAIL);
let padding = dimensions.height*0.04;
let widthScreen = dimensions.width*0.9;

const anchodisplay = Dimensions.get("window").width;

export default function Detalle(props){

    const {navigation}= props;
    const [isLoading,setIsloading] = useState(false);
    
     const evento = navigation.state.params.eventos.item;
     const img = navigation.state.params.eventos.item.restautant.image;
     const name = navigation.state.params.eventos.item.restautant.name;
     const rating = navigation.state.params.eventos.item.restautant.rating;
     const description = navigation.state.params.eventos.item.restautant.description;
     //-------------------------------------------------------------------
     const direccion = navigation.state.params.eventos.item.restautant.location;
     const fecha = navigation.state.params.eventos.item.restautant.date;
     const ciudad = navigation.state.params.eventos.item.restautant.city;
     const precio = navigation.state.params.eventos.item.restautant.price;
     const publico = navigation.state.params.eventos.item.restautant.publico;
     const caracteristicas = navigation.state.params.eventos.item.restautant.features;
     const tipo = navigation.state.params.eventos.item.restautant.typeTicket;
     //-------------------------------------------------------------------
     const urlfacebook = navigation.state.params.eventos.item.restautant.urlfacebook;
     const urltwitter = navigation.state.params.eventos.item.restautant.urltwitter;
     const urlyoutube = navigation.state.params.eventos.item.restautant.urlyoutube;
     const urlinstagram = navigation.state.params.eventos.item.restautant.urlinstagram;
     //------------------------------------------------------------------
     const artistas = navigation.state.params.eventos.item.restautant.artistas;

     const [imageRestaurant,setImageRestaurant]= useState([]);
     const [ratingState,setRatingState] = useState(rating);

   useEffect(() => {
       const arryUrl= [];
       setIsloading(true);
       (async () =>{
           await Promise.all(
            img.map(async idImage => {
                   await firebase
                   .storage()
                   .ref(`Photos/Galeria/Detalle/${idImage}`)
                   .getDownloadURL()
                   .then(imageUrl => {
                    arryUrl.push(imageUrl);
                   });
               })
           )
           setImageRestaurant(arryUrl);
           setIsloading(false);
       })();

   }, []);


    return(
        <ScrollView style={styles.viewBody}>
            <View style={styles.contentStyle}>
            <CarouselDetalle
            imageRestaurant={imageRestaurant}
            width={anchodisplay}
            height={imageHeight}
            />
            <TitleRestaurante
            name={name}
            fecha={fecha}
            direccion={direccion}
            rating={ratingState}
            />
            <InfoGeneral
            ciudad={ciudad}
            precio={precio}
            tipo={tipo}
            publico={publico}
            />
            <PricingCard
               color={AppStyles.ACCENT_COLOR}
               title={tipo}
               price={precio}
               info={caracteristicas}
               onButtonPress={() => navigation.navigate("Payment",{evento})}
               button={{ title:AppText.BOTON_COMPRAR,titleStyle:styles.btnStyle3 }}
            />
            <SocialIconDetalle
            urlfacebook={urlfacebook}
            urltwitter={urltwitter}
            urlyoutube={urlyoutube}
            urlinstagram={urlinstagram}
            urlweb={null}
            />
            <View style={{flexDirection:'row'}}>
                     <View>
                     <TouchableOpacity style={styles.btnDetalle} onPress={() => navigation.navigate("PyRPage",{evento})}>
                         <View style={styles.btnContainer2}>
                         <Text style={styles.btnStyle2}>{AppText.TEXT_PYR}</Text>
                         </View> 
                         </TouchableOpacity>
                     </View>
                     <View>
                     <TouchableOpacity style={styles.btnDetalle} onPress={() => navigation.navigate("Coments",{evento,setRatingState})}>
                         <View style={styles.btnContainer2}>
                          <Text style={styles.btnStyle2}>{AppText.TEXT_COMENT}</Text>
                         </View> 
                         </TouchableOpacity>
                     </View>
            </View>
            <Divider style={styles.dividerstyle} />
            <DataArtistas
            data={artistas}
            />
            <DescripcionDetail
            description={description}
            />
            </View>
            <LoadingGeneral
            isvisible={isLoading}
            textshow={AppText.TEXT_SHOW_PROCESS}
            />
        </ScrollView>
    );
}

function TitleRestaurante(props){
    const {name,fecha,direccion,rating} = props;

    return(
      <View>
            <View  style={styles.viewrestaurantTitle}>
               <Text style={styles.nameRestaurant}>{name}</Text>
               <View style={{flexDirection:'column'}}>
               <Rating
               style={styles.stylesRaiting}
               imageSize={AppText.SUB_TITULO}
               readonly
               startingValue={parseFloat(rating)}
               />
             <Text style={styles.nameRestaurant2}>{fecha}, {direccion}</Text>
            </View>
            </View>
      </View>
    );
}

function SocialIconDetalle(props){

  const {urlfacebook,urltwitter,urlinstagram,urlyoutube,urlweb} = props;

  return(
    <View>
          <View style={styles.viewrestaurantTitle} >
             <View style={{flexDirection:'row'}}>
               {urlfacebook ?
               ( <View>
                   <SocialIcon
                    type='facebook'
                    onPress={() => Linking.openURL(urlfacebook)}
                    />
                 </View>) :(<Fragment/>)}
                {urltwitter ? 
                (<View>
                   <SocialIcon
                    type='twitter'
                    onPress={() => Linking.openURL(urltwitter)}
                    />
                 </View>):(<Fragment/>)} 
                 {urlinstagram ? 
                 (<View>
                   <SocialIcon
                    type='instagram'
                    onPress={() => Linking.openURL(urlinstagram)}
                    />
                 </View>) : (<Fragment/>)}
                 {urlyoutube ? 
                 (<View>
                   <SocialIcon
                    type='youtube'
                    onPress={() => Linking.openURL(urlyoutube)}
                    />
                 </View>) : (<Fragment/>)}
                 {urlweb ? 
                 (<View>
                   <SocialIcon
                    type='gitlab'
                    onPress={() => Linking.openURL(urlweb)}
                    />
                 </View>) : (<Fragment/>)}
                 
          </View>
          </View>
    </View>
  );
}

function InfoGeneral(props){
    const {ciudad,publico} = props;

    return(
      <View>
            <View  style={styles.viewrestaurantInfo}>
            <View style={{flexDirection:'row'}}>
            <Text > Ciudad del evento: </Text>
            <Text style={styles.InfoEvent}> {ciudad}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text > Este evento es para mayores de: </Text>
            <Text style={styles.InfoEvent}> {publico}</Text>
            </View>
            </View>
      </View>
    );
}

function DataArtistas(props){
  const {data} = props;
  return(
    <View style={styles.artStyle}>
       <Text style={styles.titleartistas}>{AppText.TITLE_ARTIST}</Text>
          {data.map(art => (
             <TouchableOpacity style={styles.btnArt} onPress={() => Linking.openURL(art.urlWeb)}>
                <View style={styles.btnContainer4}>
                   <Text style={styles.btnStyle4}>{art.name}</Text>
                </View> 
             </TouchableOpacity>
          ))
          }
    </View>
  );
}

function DescripcionDetail(props){
    const {description} = props;

    return(
      <View style={styles.viewrestaurantTitle}>
            <Text style={styles.descriptionStyles}>{description}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    },
    viewrestaurantTitle:{
       alignItems:AppStyles.CENTRADO
    },
    viewrestaurantInfo:{
        alignItems:'center',
        justifyContent:"flex-start"
     },
    viewDescription:{
        alignItems:AppStyles.CENTRADO
     },
     InfoEvent:{
        fontSize:AppText.PARRAFO_GRANDE,
        fontWeight:'bold',
        color:AppStyles.GREEN_COLOR,
        textAlign: 'left',
        alignSelf: 'stretch'
      },
    nameRestaurant:{
      fontSize:AppText.TITULO,
      fontWeight:'bold',
      color:AppStyles.ACCENT_COLOR
    },
    nameRestaurant2:{
        fontSize:AppText.PARRAFO_GRANDE,
        fontWeight:'bold',
        color:AppStyles.PRIMARY_TEXT_COLOR,
        marginRight:AppStyles.MARGIN_10,
        marginLeft:AppStyles.MARGIN_10
      },
    stylesRaiting:{
        backgroundColor:AppStyles.WHITE_COLOR,
        marginLeft:AppStyles.MARGIN_10,
        marginRight:AppStyles.MARGIN_10
    },
    descriptionStyles:{
        color: AppStyles.PRIMARY_TEXT_COLOR,
        margin:AppStyles.MARGIN_10,
        textAlign:"justify"
    },
    contentStyle:{
        paddingTop:padding,
        backgroundColor:AppStyles.WHITE_COLOR
      },
      btnContainer2: {
        marginTop:AppStyles.MARGIN_5,
        backgroundColor: "transparent",
        borderColor: AppStyles.GREEN_COLOR,
        borderWidth:AppStyles.BORDER_DEFAULT,
        borderRadius: AppStyles.BORDER_RADIUS
      },
      btnStyle2: {
        margin: AppStyles.MARGIN_10,
        paddingHorizontal: AppStyles.MARGIN_10,
        textAlign: AppStyles.CENTRADO,
        backgroundColor: "transparent",
        color: AppStyles.GREEN_COLOR,
        fontSize: AppText.PARRAFO_GRANDE
      },
      btnStyle3: {
        color: AppStyles.WHITE_COLOR,
        fontSize: AppText.SUB_TITULO
      },
      btnDetalle:{
          margin:AppStyles.MARGIN_10
      },
      artStyle:{
        alignItems:"center"
      },
      titleartStyle:{
        color:AppStyles.PRIMARY_COLOR,
        fontSize:AppText.SUB_TITULO,
        fontWeight:"bold",
        textAlign:"left",
        textAlignVertical:'center'
      },
      titleartistas:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:AppText.SUB_TITULO,
        color:AppStyles.ACCENT_COLOR
      },
      dividerstyle:{
        backgroundColor:AppStyles.ACCENT_COLOR,
        marginTop:AppStyles.MARGIN_5,
        marginRight:AppStyles.MARGIN_10,
        marginLeft:AppStyles.MARGIN_10
      },
      btnArt:{
        marginTop:AppStyles.MARGIN_5
      },
      btnContainer4: {
        marginTop:AppStyles.MARGIN_5,
        backgroundColor: "transparent",
        borderColor: AppStyles.ACCENT_COLOR,
        borderWidth:AppStyles.BORDER_DEFAULT,
        borderRadius: AppStyles.BORDER_RADIUS
      },
      btnStyle4: {
        margin: AppStyles.MARGIN_10,
        paddingHorizontal: AppStyles.MARGIN_10,
        textAlign: AppStyles.CENTRADO,
        backgroundColor: "transparent",
        color: AppStyles.ACCENT_COLOR,
        fontSize: AppText.PARRAFO_GRANDE
      },
})
import React,{useState,useEffect} from 'react';
import {StyleSheet,ScrollView,View, Text,Dimensions,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import {Rating,PricingCard} from 'react-native-elements';
import CarouselDetalle from '../../components/bannercarousel/CarouselDetalle';
import LoadingGeneral from '../../components/loading/LoadingGeneral';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_GALERY_DETAIL);
let padding = dimensions.height*0.04;

const anchodisplay = Dimensions.get("window").width;

export default function Detalle(props){

    const {navigation}= props;
    const [isLoading,setIsloading] = useState(false);
    
     const img = navigation.state.params.eventos.item.restautant.image;
     const name = navigation.state.params.eventos.item.restautant.name;
     const rating = navigation.state.params.eventos.item.restautant.rating;
     const description = navigation.state.params.eventos.item.restautant.description;
     const id = navigation.state.params.eventos.item.restautant.id;
     //-------------------------------------------------------------------
     const direccion = navigation.state.params.eventos.item.restautant.location;
     const fecha = navigation.state.params.eventos.item.restautant.date;
     const ciudad = navigation.state.params.eventos.item.restautant.city;
     const precio = navigation.state.params.eventos.item.restautant.price;
     const publico = navigation.state.params.eventos.item.restautant.publico;
     const caracteristicas = navigation.state.params.eventos.item.restautant.features;
     const tipo = navigation.state.params.eventos.item.restautant.typeTicket;

     const [imageRestaurant,setImageRestaurant]= useState([]);

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
            rating={rating}
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
               onButtonPress={console.log("comprar ...")}
               button={{ title:AppText.BOTON_COMPRAR,titleStyle:styles.btnStyle3 }}
            />
            <View style={{flexDirection:'row'}}>
                     <View>
                     <TouchableOpacity style={styles.btnDetalle} >
                         <View style={styles.btnContainer2}>
                         <Text style={styles.btnStyle2}>{AppText.TEXT_PYR}</Text>
                         </View> 
                         </TouchableOpacity>
                     </View>
                     <View>
                     <TouchableOpacity style={styles.btnDetalle} >
                         <View style={styles.btnContainer2}>
                          <Text style={styles.btnStyle2}>{AppText.TEXT_COMENT}</Text>
                         </View> 
                         </TouchableOpacity>
                     </View>
            </View>
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
})
import React,{useState,useRef, useEffect} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Dimensions,FlatList} from 'react-native'; 
import {Input,AirbnbRating,Avatar,Rating} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import Toast from 'react-native-easy-toast';
import AppText from '../../utils/text/text.all';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../loading/Loading';
import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

 let widthScreen = Dimensions.get("window").width;
 let heightScreen = Dimensions.get("window").height;
 let widthInput = widthScreen*0.9;
 let heightInput = heightScreen*0.1;

export default function ListReview(props){

    const {navigation,event,setRatingState}=props;
    const {name,city,id,ratingTotal,quantityVote} = event;
    const [coment,setComent] = useState("");
    const [ratingOk,setratingOk] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [reviews,setReviews] = useState([]);
    const [reviwesReload,setReviewsReload] = useState(false);
     
    const toastRef = useRef();

    const addReview =() =>{
            if(!coment || !ratingOk){
                toastRef.current.show("Tienes que puntuar y agregar tu experiencia");
            }else{
                setIsLoading(true);
                const user = firebase.auth().currentUser;
                const payload ={
                    userId:user.uid,
                    avatarUser: user.photoURL,
                    idEvent:id,
                    coment:coment,
                    nameEvent:name,
                    ciudad:city,
                    rating:ratingOk,
                    createAt: new Date(),
                }
                db.collection("App/Info/Coments").add(payload).then(() => {
                    updateReview();
                })
                .catch(() => {
                    updateReview();
                });
            }
    };
    

    const updateReview = () => {
        const refEvent = db.collection("App/Info/Detalle").doc(id);
             const total =  ratingTotal+ratingOk;
             const VoteTotal = quantityVote + 1;
             const ratingResult = total/VoteTotal;

             if(ratingResult > 0){
                refEvent.update({
                    rating:ratingResult,
                    quantityVote:VoteTotal,
                    ratingTotal:total
                }).then(() => {
                    setIsLoading(false);
                    setRatingState(ratingResult);
                    navigation.goBack();
                }).catch(() => {
                    toastRef.current.show("Error al actualizar la puntuacion");
                });
              }       
    }

    useEffect(() =>{
        setIsLoading(true);
      (async () =>{
          const resultReview = [];
          const arrayRating = [];
          db.collection("App/Info/Coments").where("idEvent","==",id).get()
          .then(response => {
              response.forEach(doc => {
                  const review = doc.data();
                  resultReview.push(review);
                  arrayRating.push(review.rating);
              });
              let numSum = 0;
              arrayRating.map(value => {
                  numSum= numSum+value;
              });
              const countRating = arrayRating.length;
              const resultRating = numSum/countRating;
              const resultRatingFinish = resultRating ? resultRating : 0;
              setReviews(resultReview);
              setIsLoading(false);
            
          })
          .catch();



      })()

        setReviewsReload(false);
    },[reviwesReload]);

    return(
        <View style={styles.containerList}>
           <AirbnbRating
             count={5}
             reviews={["Malo","Normal","Bueno","Genial","Excelente"]}
             defaultRating={0}
             size={35}
             onFinishRating={value => setratingOk(value)}
             />
          
          <Input
            placeholder={AppText.INPUT_COMENT}
            containerStyle={styles.inputForm}
            style={styles.textStyleInp}
            inputContainerStyle={styles.styleArea}
            label={AppText.INPUT_COMENT_LABEL}
            multiline={true}
            onChange={e => setComent(e.nativeEvent.text)}
            rightIcon={
                <Icon 
                type={AppText.ICON_TYPE}
                name={AppText.NAME_ICON_COMENT}
                size={AppStyles.INPUT_SIZE_ICON}
                color={AppStyles.ICON_RIGTH_COLOR}
                iconStyle={styles.iconRight}
                /> }
             />

            <TouchableOpacity style={styles.btnDetalle} onPress={addReview} >
                <View style={styles.btnContainer2}>
                    <Text style={styles.btnStyle2}>{AppText.TEXT_COMENT_ADD}</Text>
                </View> 
            </TouchableOpacity>
            <FlatList
            data={reviews}
            renderItem={ review => <ReviewList review={review}/>}
            keyExtractor={(item, index) => {return index.toString()}}

            />
            <Toast
            ref={toastRef}
            position="center"
            opacity={0.7}
            />
            <Loading
            isvisible={isLoading}
            textshow={AppText.TEXT_SHOW_PROCESS}
            />
        </View>
    );

}

function ReviewList(props){

    const {nameEvent,coment,rating,createAt,avatarUser} = props.review.item;

    const createReview = new Date(createAt.seconds * 1000);
    return(
        <View style={styles.viewReviewStyle}>
           <View style={styles.viewAvatar}>
               <Avatar
               size={AppStyles.INPUT_SIZE_ICON_XL}
               rounded
               containerStyle={styles.imageAatarStyle}
               source={{uri: avatarUser ? avatarUser : AVATAR_DEFAULT}}
               />
           </View>
           <View style={styles.viewInfo}>
               <Text style={styles.styleTitle}>{nameEvent}</Text>
               <Text style={styles.styleComent}>{coment}</Text>
               <Rating
               imageSize={15}
               startingValue={rating}
               readonly
               />
<Text style={styles.dateStyle}>{createReview.getDate()}/{createReview.getMonth()+1}/{createReview.getFullYear()} hora: {createReview.getHours()}:{createReview.getMinutes() < 10 ? "0": ""}{createReview.getMinutes()}</Text>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
      btnContainer2: {
        marginTop:AppStyles.MARGIN_5,
        backgroundColor: "transparent",
        borderColor: AppStyles.ACCENT_COLOR,
        borderWidth:AppStyles.BORDER_DEFAULT,
        borderRadius: AppStyles.BORDER_RADIUS
      },
      btnStyle2: {
        margin: AppStyles.MARGIN_10,
        paddingHorizontal: AppStyles.MARGIN_10,
        textAlign: AppStyles.CENTRADO,
        backgroundColor: "transparent",
        color: AppStyles.ACCENT_COLOR,
        fontSize: AppText.PARRAFO_GRANDE
      },
      btnDetalle:{
          margin:AppStyles.MARGIN_10
      },
      containerList:{
          backgroundColor:AppStyles.PRIMARY_COLOR,
          marginTop:AppStyles.MARGIN_10,
          alignItems:"center",
          flex:1
      },
      inputForm:{
          backgroundColor:AppStyles.PURPLE_COLOR,
          marginTop:AppStyles.MARGIN_10,
          justifyContent:"center"
      },
      styleArea:{
         height:heightInput,
         width:widthInput,
         padding:0,
         margin:0
      },
      iconRight:{
        color:AppStyles.ICON_RIGTH_COLOR
     },
     textStyleInp:{
         color:AppStyles.WHITE_COLOR
     },
     stylesScroll:{
         marginTop:AppStyles.MARGIN_10
     },
     viewReviewStyle:{
         flexDirection:"row",
         margin:AppStyles.MARGIN_10,
         paddingBottom:AppStyles.MARGIN_20,
         borderBottomColor:AppStyles.ACCENT_COLOR,
         borderBottomWidth:AppStyles.BORDER_1PX,
         width:widthInput
     },
     viewAvatar:{
         marginRight:AppStyles.MARGIN_15
     },
     imageAatarStyle:{
         width:50,
         height:50
     },
     viewInfo:{
         flex:1,
         width:"70%",
         alignItems:"flex-start",
     },
     styleTitle:{
         fontSize:AppText.PARRAFO_GRANDE,
         color:AppStyles.ACCENT_COLOR,
         fontWeight:"bold",
        
     },
     dateStyle:{
         marginTop:AppStyles.MARGIN_5,
         color:AppStyles.SECUNDARY_TEXT_COLOR_LT,
         position:"absolute",
         right:0,
         bottom:0
     },
     styleComent:{
        color:AppStyles.WHITE_COLOR,
        justifyContent:"center",
        marginBottom:AppStyles.MARGIN_5
    },


})
import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,FlatList,Dimensions,ActivityIndicator,TouchableOpacity } from 'react-native';
import {Image} from 'react-native-elements';
import AppStyles from '../../../utils/css/theme.style';
import AppText from '../../../utils/text/text.all';
import Loading from '../../../components/loading/Loading';
import ModalpayMethod from '../../../components/modals/ModalPaymethod';
import {firebaseApp} from "../../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let cardHeight = dimensions.height * 0.35;
let cardtWidth = dimensions.width * 0.45;

export default function Pay(props){

     const {navigation} = props;

     const [payMethod,setPayMethod] = useState([]);
     const [payReload,setPayReload] = useState(false);
     const [visibleLoading,setVisibleLoading] = useState(false);
     const [renderComponent,setRenderComponent] = useState(false);
     const [isVisible,setIsVisible] = useState(false);

     useEffect(() => {
        setVisibleLoading(true);
            (async() => {
                  let resultItems = [];
                  let citiesRef = db.collection("App/Info/PayMethod");
                  let queryRef = citiesRef.where('state', '==',AppText.ACTIVE);
             
               await queryRef.get().then(response => {
         
                 response.forEach(doc => {
                     let pay = doc.data();
                     pay.id = doc.id;
                     resultItems.push(pay);
         
                 });
                 setPayMethod(resultItems);
                 setVisibleLoading(false);
             });
              
              })();
              setPayReload(false);
    }, [payReload]);


    return(
        <View style={styles.viewBody}>
            <FlatList
                contentContainerStyle={styles.grid}
                numColumns={2}
                data={payMethod}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (<CardPys navigation={navigation} item={item} setRenderComponent={setRenderComponent} setIsVisible={setIsVisible}/> )} />
            {renderComponent && (
                <ModalpayMethod
                isVisible={isVisible} 
                setIsVisible={setIsVisible}
                renderComponent={renderComponent}
                />
           )}
            <Loading
            textshow={AppText.TEXT_SHOW_PROCESS}
            isvisible={visibleLoading}
            />
        </View>
    );


function CardPys(props){
    const {navigation,item,setRenderComponent,setIsVisible} = props;
    console.log(item);

    const selectedComponent= (l) => {
        setRenderComponent(l);
        setIsVisible(true);
      }

    return (
        <View style={styles.viewitem}>
             <Text style={styles.titlestyle}>{item.title}</Text>
             <Image
                     resizeMode="cover"
                     borderRadius={AppStyles.BORDER_RADIUS_10}
                     source={{uri:item.img}}
                     style={styles.cardImage}
                     PlaceholderContent={<ActivityIndicator color ={AppStyles.WHITE_COLOR}/>}
                     ></Image>
            <View>
                <TouchableOpacity style={styles.btnDetalle} onPress={() => selectedComponent(item)}>
                   <View style={styles.btnContainer}>
                       <Text style={styles.btnStyle}>{AppText.BOTON_DETALLE}</Text>
                   </View> 
                </TouchableOpacity>
            </View>
        </View>
    );
}

}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:AppStyles.PRIMARY_COLOR,
        paddingBottom:AppStyles.MARGIN_10
      },
      viewitem: {
        backgroundColor: AppStyles.WHITE_COLOR,
        margin: AppStyles.MARGIN_5,
        width: cardtWidth,
        height:cardHeight,
        padding: AppStyles.MARGIN_10,
        borderRadius:AppStyles.BORDER_RADIUS_10,
        alignItems:'center',
        justifyContent:'center'
      },
      grid: {
        marginBottom: AppStyles.MARGIN_10,
        marginTop: AppStyles.MARGIN_10,
        alignItems: 'center'
      },
      titlestyle:{
          textAlign:'center',
          color:AppStyles.ACCENT_COLOR,
          fontSize:AppText.PARRAFO_GRANDE,
          fontWeight:'bold',
          marginBottom:AppStyles.MARGIN_10
      },
      cardImage:{
        width:cardtWidth*0.7,
        height:cardHeight*0.5
    },
      btnContainer: {
        marginTop:AppStyles.MARGIN_5,
        backgroundColor: "transparent",
        borderColor: AppStyles.ACCENT_COLOR,
        borderWidth:AppStyles.BORDER_DEFAULT,
        borderRadius: AppStyles.BORDER_RADIUS
      },
      btnStyle: {
        margin: AppStyles.MARGIN_10,
        paddingHorizontal: AppStyles.MARGIN_10,
        textAlign: AppStyles.CENTRADO,
        backgroundColor: "transparent",
        color: AppStyles.ACCENT_COLOR
      },
      btnDetalle:{
          margin:AppStyles.MARGIN_10
      },
})
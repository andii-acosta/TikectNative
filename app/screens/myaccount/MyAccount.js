import React,{useState,useEffect,useRef}  from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import InfoUser from '../../components/userinfo/UserInfo';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/loading/Loading';
import ListGeneralOptions from '../../components/list/ListGeneralOptions';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import {withNavigation} from 'react-navigation';
import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

let dimensions = Dimensions.get("window");
let imageHeight = Math.round(dimensions.height * AppText.SIZE_HOME_INIT);
let marginHeight = dimensions.height*0.05;

 function MyAccount(props){
    
    const {navigation}=props;
  
    const [userInfo,setUserInfo] = useState({});
    const [reloadData,setReloadData] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [textLoading,setTextLoading] = useState("");
    const [userdata,setUserdata] = useState({});
    const [userIds,setUserIds] = useState("");
    const toastRef = useRef();

    //console.log("---userIds----");
    //console.log(JSON.stringify(userdata));
    //console.log(userIds);
    useEffect(() => {
      (async() => {
          const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
            const userID = user.uid;
            const ref = db.collection("App/User/Account").where('createBy', '==', userID);

            await ref.get().then(response => {
             response.forEach(doc => {
                 let user = doc.data();
                 user.id= doc.id;
                 setUserIds(doc.id);
                 setUserdata(doc.data());
                  });
             
               });
      })();
      setReloadData(false);
  }, [reloadData])

    return(
        <ScrollView >
          <View style={styles.viewUserinfo}>
          <InfoUser 
           navigation={navigation}
           setIsLoading={setIsLoading}
            userInfo ={userInfo}
            userdata={userdata}
            userIds={userIds}
            setReloadData={setReloadData}
            toastRef={toastRef}/>
            <ListGeneralOptions
            userdata={userdata}
            setReloadData={setReloadData}
            toastRef={toastRef}
            navigation={navigation}
            userIds={userIds}
            />
            <View style={styles.viewBoton}>
             
             <TouchableOpacity onPress={()=>{firebase.auth().signOut()}}>
               <View style={styles.btnContainer}>
                    <Text style={styles.btnStyle}>{AppText.BOTON_EXIST}</Text>
               </View> 
             </TouchableOpacity>
            </View>
            <Toast
            ref={toastRef}
            position ="center"
            opacity = {0.7}
            />
            <Loading
            isvisible={isLoading}
            textshow={textLoading}
            />
          </View>
            
        </ScrollView>
    )
} 

export default withNavigation(MyAccount);

const styles = StyleSheet.create({
    
    viewUserinfo:{
        flex:1,
        minHeight:"100%",
        backgroundColor:AppStyles.WHITE_COLOR,
        marginTop:marginHeight,
        marginBottom:AppStyles.MARGIN_20
    },
    titleSession:{
        backgroundColor:AppStyles.SECONDARY_COLOR
    },
    viewBoton:{
        alignItems:AppStyles.CENTRADO
    },
    btnContainer: {
      marginTop:AppStyles.MARGIN_20,
      backgroundColor: "transparent",
      borderColor: AppStyles.ACCENT_COLOR,
      borderWidth:AppStyles.BORDER_DEFAULT,
      borderRadius: AppStyles.BORDER_RADIUS
    },
    btnStyle: {
      margin: AppStyles.MARGIN_10,
      paddingHorizontal: AppStyles.MARGIN_10,
      textAlign: "center",
      backgroundColor: "transparent",
      color: AppStyles.ACCENT_COLOR,
      fontSize: AppText.SUB_TITULO
    },
})
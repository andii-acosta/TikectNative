import React from 'react';
import {StyleSheet,Text,Dimensions,Image,View,ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import Icon from 'react-native-vector-icons/FontAwesome';

let dimensions = Dimensions.get("window");
let heightModal = dimensions.height*0.7;
let widthModal = dimensions.width*0.8;
let widthImageModal = dimensions.width*0.6;
let heightImageModal = dimensions.height*0.4;


export default function ModalTieckt(props){
   
   const {isVisible,setIsVisible,renderComponent,userInfo} =props;
   const {event_name,price,typeTcket,date,img,features,type,location,code,codeqr} = renderComponent;
   const {name,email,cell,id} = userInfo;


   //console.log("___user___");
   //console.log(userInfo);
   //console.log(price);

   const claseModal = () => setIsVisible(false);

    return(
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0,0,0,.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.OverlayStyle}
        onBackdropPress={claseModal}
        >
            { renderComponent ?
            <View style={styles.viewConten}>
                   <Image
                       source={{ uri: codeqr }}
                       style={styles.viewImage}
                    PlaceholderContent={<ActivityIndicator />}
                    />
               
              <View> 
                  <Text style={styles.titulostyle}>{event_name} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon 
                    name={AppText.NAME_ICON_PAGE_HOME}
                     size={AppStyles.INPUT_SIZE_ICON_M}
                    color={AppStyles.SECUNDARY_TEXT_COLOR}
                             /> 
                  <Text style={styles.textstyle}>{type} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon 
                    name={AppText.NAME_ICON_MODAL_LOCATION}
                    size={AppStyles.INPUT_SIZE_ICON_M}
                    color={AppStyles.SECUNDARY_TEXT_COLOR}
                             /> 
                  <Text style={styles.textstyle}>{location} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon 
                    name={AppText.NAME_ICON_CALENDAR}
                    size={AppStyles.INPUT_SIZE_ICON_M}
                    color={AppStyles.SECUNDARY_TEXT_COLOR}
                             /> 
                  <Text style={styles.textstyle}>{date} </Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon 
                    name={AppText.NAME_ICON_PAGE_MYACCOUNT}
                    size={AppStyles.INPUT_SIZE_ICON_M}
                    color={AppStyles.SECUNDARY_TEXT_COLOR}
                             /> 
                  <Text style={styles.textstyle}>{name} </Text>
              </View>
              <View>
                  <Text style={styles.textstyle}>Documento: {id} </Text>
              </View>
              <View>
                  <Text style={styles.textstyle}>Codigo unico: {code} </Text>
              </View>
            </View>
            :
            <View >
                <Text>
                   NO SE OBTUVIERON DATOS
                </Text>
            </View>

            }
        </Overlay>
    );
}

const styles = StyleSheet.create({
    OverlayStyle:{
        height:heightModal,
        width:widthModal,
        backgroundColor:AppStyles.WHITE_COLOR       
    },
    viewImage:{
        width:widthImageModal,
        height:heightImageModal
    },
    viewConten:{
        flex:1,
        alignItems:AppStyles.CENTRADO
    },
    titulostyle:{
        color:AppStyles.ACCENT_COLOR,
        fontWeight:'bold',
        fontSize:AppText.PARRAFO_GRANDE,
        marginBottom:AppStyles.MARGIN_10
    },
    textstyle:{
        fontWeight:'bold',
        marginLeft:AppStyles.MARGIN_10,
        marginBottom:AppStyles.MARGIN_5
    }
})
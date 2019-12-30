import React from 'react';
import {StyleSheet,View,Text,ActivityIndicator,Dimensions} from 'react-native';
import { Overlay} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

let dimensions = Dimensions.get("window");
let imageHeight = dimensions.height;
let imageWidth = dimensions.width;

export default function Loading(props){

    const {isvisible,textshow} = props;

    return(
        <Overlay
        isVisible={isvisible}
        windowBackgroundColor="rgba(0,0,0, .5)"
        overlayBackgroundColor="transparent"
        overlayStyle={style.overlay}
        >
            <View style={style.view}>
                  <ActivityIndicator
                  size="large"
                  color={AppStyles.PURPLE_COLOR}
                  />
            {textshow && (<Text style={style.textshow}>{textshow}</Text>)}
            </View>
        </Overlay>
    );

}

const style= StyleSheet.create({
    overlay:{
        height:imageHeight,
        width:imageWidth,
        backgroundColor:AppStyles.WHITE_COLOR,
        borderColor:AppStyles.ORAGE_COLOR,
        borderWidth:AppStyles.BORDER_1PX,
        borderRadius:AppStyles.BORDER_RADIUS_5
    },
    view:{
        flex:1,
        alignContent:AppStyles.CENTRADO,
        justifyContent: AppStyles.CENTRADO
    },
    textshow:{
        textAlign:AppStyles.CENTRADO,
        color:AppStyles.PURPLE_COLOR,
        fontWeight:'bold',
        fontSize:AppText.SUB_TITULO,
        textTransform: "uppercase",
        marginTop:AppStyles.MARGIN_10
    }
})



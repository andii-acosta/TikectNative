import React from 'react';
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native';
import { Overlay} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

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
                  color={AppStyles.ORAGE_COLOR}
                  />
                     {textshow && (<Text style={style.textshow}>{textshow}</Text>)}
            </View>
        </Overlay>
    );

}

const style= StyleSheet.create({
    overlay:{
        height:100,
        width:200,
        backgroundColor:AppStyles.WHITE_COLOR,
        borderColor:AppStyles.ORAGE_COLOR,
        borderWidth:AppStyles.BORDER_1PX,
        borderRadius:AppStyles.BORDER_RADIUS_5
    },
    view:{
        flex:1,
        alignContent:"center",
        justifyContent: "center"
    },
    textshow:{
        color:AppStyles.ACCENT_COLOR,
        textTransform: "uppercase"
    }
})



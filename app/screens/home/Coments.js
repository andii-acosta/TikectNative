import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet } from 'react-native';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import ListReview from '../../components/list/ListReview';

export default function Coments(props){

    const  {navigation}= props;
    const event = navigation.state.params.evento.restautant;
    const setRatingState = navigation.state.params.setRatingState;
    
    return(
        <View style={styles.viewBody}>
            <ListReview
            navigation={navigation}
            event={event}
            setRatingState={setRatingState}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:AppStyles.PRIMARY_COLOR,
        paddingTop:AppText.PADDING_HEADER
      }
})
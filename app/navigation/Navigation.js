import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React,{useState,useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStyles from '../utils/css/theme.style';
import AppText from '../utils/text/text.all';
import * as firebase from 'firebase';
import  HomeScreenStack from './HomeStacks';
import  PaymentScreenStacks from './PaymentStacks';
import  MiAccountScreenStacks from './MyAccountStacks';

const NavigationStacks = createBottomTabNavigator(

   {
    Home: {
        screen: HomeScreenStack,
        navigationOptions: () => ({
            tabBarLabel: AppText.TITLE_PAGE_HOME,
            tabBarIcon: ({tintColor}) =>(
              <Icon
              name={AppText.NAME_ICON_PAGE_HOME}
              size={22}
              color={tintColor}/>
            ),
            tabBarVisible:true

        })
    },
     MyAccount:{
       screen: MiAccountScreenStacks,
       navigationOptions: () => ({
           tabBarLabel: AppText.TITLE_PAGE_MYACCOUNT,
           tabBarIcon: ({tintColor}) =>(
             <Icon
             name={AppText.NAME_ICON_PAGE_MYACCOUNT}
             size={22}
             color={tintColor}/>
           ),
           tabBarVisible:true
       })
      },
      Payment:{
        screen: PaymentScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: AppText.TITLE_PAGE_PAYMENT,
            tabBarIcon: ({tintColor}) =>(
              <Icon
              name={AppText.NAME_ICON_PAGE_PAYMENT}
              size={22}
              color={tintColor}/>
            ),
            tabBarVisible:true
        })
       }
   },

   {
     initialRouteName: AppText.NAME_PAGE_DEFAULT,
     order: ["MyAccount","Home","Payment"],
     tabBarOptions:{
       inactiveTintColor: AppStyles.WHITE_COLOR,
       activeTintColor: AppStyles.ACCENT_COLOR,
       style:{
         backgroundColor:AppStyles.PRIMARY_COLOR
       }
     }
   }
   
);

export default createAppContainer(NavigationStacks);

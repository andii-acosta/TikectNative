import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStyles from '../utils/css/theme.style';
import AppText from '../utils/text/text.all';
import  HomeScreenStack from './HomeStacks';
import  PaymentScreenStacks from './PaymentStacks';
import  MiAccountScreenStacks from './MyAccountStacks';

const NavigationStacks = createBottomTabNavigator(

   {
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
           tabBarVisible:false
       })
      },
      Home:{
        screen: MiAccountScreenStacks,
        navigationOptions: () => ({
            tabBarLabel: AppText.TITLE_PAGE_MYACCOUNT,
            tabBarIcon: ({tintColor}) =>(
              <Icon
              name={AppText.NAME_ICON_PAGE_MYACCOUNT}
              size={22}
              color={tintColor}/>
            ),
            tabBarVisible:false
        })
       }
   },

   {
     initialRouteName: AppText.NAME_PAGE_DEFAULT,
     order: [AppText.NAME_PAGE_ORDER1],
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

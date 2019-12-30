import React,{useState} from 'react';
import {StyleSheet,View,Text,ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import ModalEditAccount from '../modals/ModalEditAccount';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';

export default function ListGeneralOptions (props){

    const {userInfo,setReloadData,toastRef,navigation}=props;

const menuOptions =[
    {
        title:AppText.LIST_ITEM_2,
        iconType:AppText.ICON_TYPE,
        iconnameLeft: AppText.LIST_ITEM_ICON_2,
        iconColorLeft:AppStyles.COLOR_ICON_DEFAULT,
        iconNameRight: AppText.LIST_ITEM_SELECTED,
        iconColorRigth:AppStyles.COLOR_ICON_DEFAULT,
        onPress:() => navigation.navigate(AppText.NAVIGATE_ITEM_2)
    },
    {
        title:AppText.LIST_ITEM_3,
        iconType:AppText.ICON_TYPE,
        iconnameLeft: AppText.LIST_ITEM_ICON_3,
        iconColorLeft:AppStyles.COLOR_ICON_DEFAULT,
        iconNameRight:AppText.LIST_ITEM_SELECTED,
        iconColorRigth:AppStyles.COLOR_ICON_DEFAULT,
        onPress:() => navigation.navigate(AppText.NAVIGATE_ITEM_3)
    },
    {
        title:AppText.LIST_ITEM_4,
        iconType:AppText.ICON_TYPE,
        iconnameLeft: AppText.LIST_ITEM_ICON_4,
        iconColorLeft:AppStyles.COLOR_ICON_DEFAULT,
        iconNameRight: AppText.LIST_ITEM_SELECTED,
        iconColorRigth:AppStyles.COLOR_ICON_DEFAULT,
        onPress:() => navigation.navigate(AppText.NAVIGATE_ITEM_4)
    },
    {
        title:AppText.LIST_ITEM_5,
        iconType:AppText.ICON_TYPE,
        iconnameLeft: AppText.LIST_ITEM_ICON_5,
        iconColorLeft:AppStyles.COLOR_ICON_DEFAULT,
        iconNameRight: AppText.LIST_ITEM_SELECTED,
        iconColorRigth:AppStyles.COLOR_ICON_DEFAULT,
        onPress:() => navigation.navigate(AppText.NAVIGATE_ITEM_5)
    },
    {
        title:AppText.LIST_ITEM_6,
        iconType:AppText.ICON_TYPE,
        iconnameLeft: AppText.LIST_ITEM_ICON_6,
        iconColorLeft:AppStyles.COLOR_ICON_DEFAULT,
        iconNameRight: AppText.LIST_ITEM_SELECTED,
        iconColorRigth:AppStyles.COLOR_ICON_DEFAULT,
        onPress:() => navigation.navigate(AppText.NAVIGATE_ITEM_6)
    },
    {
        title:AppText.LIST_ITEM_7,
        iconType:AppText.ICON_TYPE,
        iconnameLeft: AppText.LIST_ITEM_ICON_7,
        iconColorLeft:AppStyles.COLOR_ICON_DEFAULT,
        iconNameRight: AppText.LIST_ITEM_SELECTED,
        iconColorRigth:AppStyles.COLOR_ICON_DEFAULT,
        onPress:() => navigation.navigate(AppText.NAVIGATE_ITEM_7)
    }
];

    return(
            <View>
            {
               menuOptions.map((menu,index)=>(
                <ListItem
                   key={index}
                   title={menu.title}
                   leftIcon={{
                       type: menu.iconType,
                       name: menu.iconnameLeft,
                       color: menu.iconColorLeft
                   }}
                   rightIcon={{
                    type: menu.iconType,
                    name: menu.iconNameRight,
                    color: menu.iconColorRigth
                   }}
                   onPress={menu.onPress}
                   containerStyle={styles.MenuItemStyle}
                   />
               ))
           }
            </View>
    );
}

const styles = StyleSheet.create({
    MenuItemStyle:{
        borderBottomWidth:1,
        borderBottomColor: "#e3e3e3"
    }
})
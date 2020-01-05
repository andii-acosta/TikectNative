import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import AppStyles from '../../utils/css/theme.style';
import AppText from '../../utils/text/text.all';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import {firebaseApp} from "../../utils/Firebase";
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);


export default function InfoUser(props){

    const {navigation,userInfo,setReloadData,toastRef,setIsLoading,userdata,userIds} = props; 

    const {uid,displayName,email,photoURL} = userInfo;
    const {name} =userdata;


const changeAvatar=async () =>{
        
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

    if(resultPermissionCamera === "denied"){
        toastRef.current.show("Es necesario otorgar permisos");
    }else{
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3]
        });

        if(result.cancelled){
            toastRef.current.show("Galeria Cerrada");
        }else{
            uploadImage(result.uri,uid).then(() => { 
                updatePhotourl(uid);
            })
        }

    }

}

const uploadImage =  async (uri,nameImage) => {
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log(uri+"  " + nameImage);
    const ref = firebase
    .storage()
    .ref()
    .child(`Photos/Users/Avatar/${nameImage}`);
    setIsLoading(false);
    return ref.put(blob);
};

const updatePhotourl = uid => {
    setIsLoading(true);
    firebase.storage()
    .ref(`Photos/Users/Avatar/${uid}`)
    .getDownloadURL()
    .then(async result => {
      const update ={photoURL:result}
      await firebase.auth().currentUser.updateProfile(update);
      setReloadData(true);
      setIsLoading(false);
      toastRef.current.show("Se actualizo el Avnatar");
    }).catch(() => {
        setIsLoading(false);
        toastRef.current.show("Error al actualizar el Avatar");
    })
}


    return(

        <View style={styles.viewuserInfo}>
            <Avatar
            rounded
            size='large'
            showEditButton
            onEditPress={changeAvatar}
            containerStyle={styles.userInfoAvatar}
            source={{
                uri:photoURL ? photoURL : AppText.AVATAR_DEFAULT
            }}
            />

            <View>
                <Text
                style={styles.displayName}
                >
                 {displayName ? displayName : name ? name : "Actualiza tu nombre"}

                </Text>
                <Text
                style={styles.displayName}
                >
                 {email ? email : "Session Facebook"}
                </Text>
            </View>
               

        </View>

    );
}


const styles = StyleSheet.create({
    container:{
       flex:1
    },
    viewuserInfo:{
        alignItems:AppStyles.CENTRADO,
        justifyContent:AppStyles.CENTRADO,
        flexDirection:"row",
        backgroundColor:AppStyles.PRIMARY_COLOR,
        paddingTop:AppStyles.MARGIN_TOP,
        paddingBottom: AppStyles.MARGIN_TOP
        
    },
    userInfoAvatar:{
        marginRight:AppStyles.MARGIN_TOP
    },
    displayName:{
        fontWeight:"bold",
        color:AppStyles.WHITE_COLOR,
        fontSize:AppText.PARRAFO_GRANDE

    }
})
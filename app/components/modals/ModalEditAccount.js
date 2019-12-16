import React from 'react';
import {StyleSheet,Text} from 'react-native';
import {Overlay} from 'react-native-elements';


export default function ModalEditAccount (props){
   
   const {isVisible,setIsVisible,renderComponent,userInfo,setIsVisibleModal,toastRef,setReloadData} =props;


   const claseModal = () => setIsVisible(false);

    return(
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(0,0,0,.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.OverlayStyle}
        onBackdropPress={claseModal}
        >


        </Overlay>
    );
}

const styles = StyleSheet.create({
    OverlayStyle:{
        height:400,
        width:"90%",
        backgroundColor:"#fff"        
    }
})
import React,{useState,useEffect} from 'react';
import * as firebase from 'firebase';
import Loading from '../../components/loading/Loading';
import AppText from '../../utils/text/text.all';
import MyAccount from './MyAccount';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';

export default function Init(){

const [login,setLogin] = useState(null);

useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
        !user ? setLogin(false) :  setLogin(true);
    })
},[]);

if(login==null){
return (
    <Loading  isvisible={true} textshow={AppText.TEXT_SHOW_PROCESS} />
)
}

return login ? <MyAccount/> : <Register/>

}




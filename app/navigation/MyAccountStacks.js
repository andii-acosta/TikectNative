import {createStackNavigator} from 'react-navigation-stack';
import MyAccountScreem from '../screens/myaccount/MyAccount';
import LoginScreen from '../screens/myaccount/Login';
import RegisterScremm from '../screens/myaccount/Register';
import RecuperarScremm from '../screens/myaccount/ForgetAccount';

const MyAccountScreemStacks = createStackNavigator(
    {
        MyAccount: {
            screen: MyAccountScreem,
            navigationOptions:()=>({
                  header:null
            })
        },
        login:  {
            screen: LoginScreen,
            navigationOptions: () => ({
                header:null
               })
            },
        Register:  {
            screen: RegisterScremm,
            navigationOptions: () => ({
                header:null
                   })
                },
        Recuperarpassword:  {
            screen: RecuperarScremm,
             navigationOptions: () => ({
                header:null
                       })
                    }
    }
);

export default MyAccountScreemStacks;


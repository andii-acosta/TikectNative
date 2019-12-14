import {createStackNavigator} from 'react-navigation-stack';
import MyAccountScreem from '../screens/myaccount/MyAccount';
import LoginScreen from '../screens/myaccount/Login';
import RegisterScremm from '../screens/myaccount/Register';
import RecuperarScremm from '../screens/myaccount/ForgetAccount';
import InitScrenn from '../screens/myaccount/Init';
import WelcomeScreem from '../screens/myaccount/Welcome';

const MyAccountScreemStacks = createStackNavigator(
    {
        Init:{
            screen:InitScrenn,
            navigationOptions:()=>({
                header:null
            })
        },
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
            },
        Welcome:  {
                screen: WelcomeScreem,
                 navigationOptions: () => ({
                    header:null
                           })
                }
    }
);

export default MyAccountScreemStacks;


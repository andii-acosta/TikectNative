import {createStackNavigator} from 'react-navigation-stack';
import MyAccountScreem from '../screens/myaccount/MyAccount';
import LoginScreen from '../screens/myaccount/Login';
import RegisterScremm from '../screens/myaccount/Register';
import RecuperarScremm from '../screens/myaccount/ForgetAccount';
import InitScrenn from '../screens/myaccount/Init';
import WelcomeScreem from '../screens/myaccount/Welcome';
import SearchScreen from '../screens/myaccount/listoptionsscreens/Search';
import MyEventsScreen from '../screens/myaccount/listoptionsscreens/MyEvents';
import CouponsScreen from '../screens/myaccount/listoptionsscreens/Coupons';
import PayScreen from '../screens/myaccount/listoptionsscreens/Pay';
import EditAccountScreen from '../screens/myaccount/listoptionsscreens/EditAccount';
import ContactScreen from '../screens/myaccount/listoptionsscreens/Contact';
import WorkingScreen from '../screens/myaccount/listoptionsscreens/Working';
import AppStyles from '../utils/css/theme.style';
import AppText from '../utils/text/text.all';

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
            },
        Search:  {
            screen: SearchScreen,
            navigationOptions: () => ({
                title:AppText.LIST_ITEM_1
                       })
            },
         MyEvents: {
            screen: MyEventsScreen,
             navigationOptions: () => ({
                title: AppText.LIST_ITEM_2
                    })
            },
        Coupons:  {
            screen:CouponsScreen,
            navigationOptions: () => ({
                title: AppText.LIST_ITEM_3
                   })
            },
        Pay:  {
            screen: PayScreen,
            navigationOptions: () => ({
                title: AppText.LIST_ITEM_4
                  })
            },
        EditAccount:  {
            screen: EditAccountScreen,
            navigationOptions: () => ({
                title: AppText.LIST_ITEM_5
                                       })
            },
        Contact:  {
            screen: ContactScreen,
            navigationOptions: () => ({
                title: AppText.LIST_ITEM_6
                     })
             },
        Working:  {
            screen: WorkingScreen,
            navigationOptions: () => ({
                title: AppText.LIST_ITEM_7
                })
            }
    }
);

export default MyAccountScreemStacks;


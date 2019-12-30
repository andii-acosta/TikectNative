import {createStackNavigator} from 'react-navigation-stack';
import HomeScreem from '../screens/home/Home';
import DetalleScreem from '../screens/home/Detalle'
import PaymentScreen from '../screens/home/Payment';
import ComentsScreen from '../screens/home/Coments';
import PyRPageScreen from '../screens/home/PyRPage';
import {StyleSheet} from 'react-native';
import AppStyles from '../utils/css/theme.style';
import AppText from '../utils/text/text.all';

const HomeScreemStacks = createStackNavigator(
    {
        Home: {
            screen: HomeScreem,
            navigationOptions:()=>({
              header:null
            })
        },
        Detalle: {
            screen: DetalleScreem,
            navigationOptions:props =>({
                header:null
            })
        },
        Payment: {
            screen: PaymentScreen,
            navigationOptions:props =>({
                header:null
            })
        },
        Coments: {
            screen: ComentsScreen,
            navigationOptions:props =>({
                header:null
            })
        },
        PyRPage: {
            screen: PyRPageScreen,
            navigationOptions:props =>({
                header:null
            })
        },
    }
)

export default HomeScreemStacks;


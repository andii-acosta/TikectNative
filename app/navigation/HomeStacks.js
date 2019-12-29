import {createStackNavigator} from 'react-navigation-stack';
import HomeScreem from '../screens/home/Home';
import DetalleScreem from '../screens/home/Detalle'
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
    }
)

export default HomeScreemStacks;


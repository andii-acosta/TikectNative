import {createStackNavigator} from 'react-navigation-stack';
import HomeScreem from '../screens/home/Home';
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
        }
    }
)

export default HomeScreemStacks;


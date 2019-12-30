import {createStackNavigator} from 'react-navigation-stack';
import TikectsScreem from '../screens/payment/Tikects';
import AppStyles from '../utils/css/theme.style';
import AppText from '../utils/text/text.all';

const PaymentScreenStacks = createStackNavigator(
    {
        Payment: {
            screen: TikectsScreem,
            navigationOptions:()=>({
              header:null
            })
        }
    }
);

export default PaymentScreenStacks;

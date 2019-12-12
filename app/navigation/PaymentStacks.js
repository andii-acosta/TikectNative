import {createStackNavigator} from 'react-navigation-stack';
import PaymentScreem from '../screens/payment/Payment';
import AppStyles from '../utils/css/theme.style';
import AppText from '../utils/text/text.all';

const PaymentScreenStacks = createStackNavigator(
    {
        Payment: {
            screen: PaymentScreem,
            navigationOptions:()=>({
              header:null
            })
        }
    }
);

export default PaymentScreenStacks;

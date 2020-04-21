import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Home from '../Screens/Home';
import Register from '../Screens/Register';


// navigation prop is passed down to all our screen components.
const HomeStack = createStackNavigator({
// Top Screen is showed by default
    HomeScreen: {
        screen: Home,
    },

    RegisterScreen: {
        screen: Register
    }
})

export default createAppContainer(HomeStack);
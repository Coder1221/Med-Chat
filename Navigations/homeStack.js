import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'

import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';


import Main from '../Screens/Main';
import Chat from '../Screens/Chat';
import Profile from '../Screens/Profile';


// navigation prop is passed down to all our screen components.
const HomeStack = createStackNavigator({
    // Top Screen is showed by default
    
    Login: {
        screen: Login,
    },
    
    Register: {
        screen: Register
    },
    Home: {
        screen: Home
    },
    Main:{
        screen:Main
    },
    Chat:{
        screen:Chat,
    },
    Profile:{
        screen:Profile
    },

})

export default createAppContainer(HomeStack);
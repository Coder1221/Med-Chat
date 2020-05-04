import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Main from '../Screens/Main';
import Chat from '../Screens/Chat';
import Profile from '../Screens/Profile';
import Channel_Profile from '../Screens/Channel_profile'
// navigation prop is passed down to all our screen components.
const HomeStack = createStackNavigator({
    // Top Screen is showed by default
    Login: {
        screen: Login,
    },
    Main:{
        screen:Main
    },
    Register: {
        screen: Register
    },
    Profile:{
        screen:Profile
    },
    Chat:{
        screen:Chat
    },
    Channel_Profile:{
        screen:Channel_Profile
    },

})
export default createAppContainer(HomeStack);
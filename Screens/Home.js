import React, {useState, }from 'react'
import { Text, View, Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';


// navigation is an obj passed by the NavigationStack to all it's screen
function Home({ navigation }){
    console.log("Params Sent to Home: ",navigation.state.params)
    return(
        <View>
            <Text> This is the Home Page</Text>
            <Text>Welcome Unknown fellow need response fron server!</Text>
            {/* <Text>{typeof(navigation.state.params)==='object'?navigation.state.params.message: navigation.state.params}  </Text> */}
        </View>
    )
}

export default Home
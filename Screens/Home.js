import React from 'react'
import { Text, View, Button} from 'react-native'


function Home({ navigation }){
    console.log(navigation)
    return(
        <View>
            <Text> This is the Home Page</Text>
            <Text>Welcome Unknown fellow need response fron server!</Text>
            {/* <Text>{typeof(navigation.state.params)==='object'?navigation.state.params.message: navigation.state.params}  </Text> */}
        </View>
    )
}

export default Home
import React from 'react'
import { Text, View, Button} from 'react-native'


function Home({ navigation }){
    console.log(navigation)
    return(
        <View>
            <Text> This is the Home Page</Text>
            <Text>This is the object passed "{navigation.state.params}" </Text>
        </View>
    )
}

export default Home
import React from 'react'
import { Text, View, Button} from 'react-native'


function Home({ navigation }){
    return(
        <View>
            <Text> This is the Home Page</Text>
            <Text>user name {navigation.state.params.number}</Text>
        </View>
    )
}

export default Home
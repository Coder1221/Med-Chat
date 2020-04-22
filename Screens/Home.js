import React from 'react'
import { Text, View, Button} from 'react-native'


function Home({ navigation }){
    console.log(navigation)
    return(
        <View>
            <Text> This is the Home Page</Text>
            <Text>user name UserName</Text>
        </View>
    )
}

export default Home
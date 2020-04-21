import React from 'react'
import { Text, View, Button} from 'react-native'


function Home({ navigation }){
    return(
        <View>
            <Text> This is the Home Page</Text>
            <Button title="Why am i here?" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

export default Home
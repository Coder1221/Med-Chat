import React from 'react'
import {View, Text, Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


// navigation prop is passed down to all our screen components frfom the stack container
function homeScreen({ navigation }){

    const handleLogin = () => {
        console.log('handle login')
    }

    return(
        <View>
            <Text>Home Screen/ Login Screen</Text>
            <TextInput placeholder='Username'></TextInput>
            <TextInput placeholder='Phone'></TextInput>
            <Button title="LogIn" onPress={() => handleLogin()}/>
            <Button title="Register" onPress={() => navigation.navigate("RegisterScreen")}/>
            {/* <Button title="abdul login" onPress={() => console.log("buttonPressed")}/> */}
        </View>
    )
}

export default homeScreen;
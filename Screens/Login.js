import React, { useState, useEffect } from 'react';
import {View, Text, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import Home from './Home'


// phone number must be in complete format.
const phoneNumber = '+923458726553'

// navigation prop is passed down to all our screen components frfom the stack container
function Login({ navigation }){
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);

    }
    async function confirmCode() {
        try {
        await confirm.confirm(code);
        } catch (error) {
        console.log('Invalid code.');
        }
    }

    if (!confirm){
        return(
            <View>
                <Text>Login Screen</Text>
                <TextInput placeholder='Username'></TextInput>
                <TextInput placeholder='Phone'></TextInput>
                <Button title="LogIn" onPress={() => console.log('Not Implemented!')}/>
                <Button title="Register" onPress={() => navigation.navigate("Register")}/>
                <Button
                title="Phone Number Sign In"
                onPress={() => signInWithPhoneNumber(phoneNumber)}
                />
    
            </View>
        );
    }
    else{
        return(
            // If the user is already logged IN? re route to HomeScreen
            // CallHome Screen here and do all this in HomeScreen
            <View>
                <Text>Implement Home Screen!</Text>
                <Button title='Signout' onPress={()=>setConfirm(false)} />
            </View>
        )
    }   
}
export default Login
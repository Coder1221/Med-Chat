import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

// import firebase from '../Screens/firebase_auth'

import Home from './Home'


// phone number must be in complete format.
// const phoneNumber = '+923458726553'  
// const phoneNumber = '+923054658422'


// navigation prop is passed down to all our screen components frfom the stack container
function Login({ navigation }){
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);

    const [phoneNumber ,setphne]=useState('+16505551234')
    const [code, setCode] = useState('123456');
    
    const [ouput  , setoutput]= useState(null)

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        console.log(phoneNumber)
        try{
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        }catch(err){
            console.log('fuck mwww')
            console.log(err)

        }
    }
    async function confirmCode() {
        try {
            const conf =  await confirm.confirm(code);
            console.log(conf)
            setoutput(conf)
        } catch (error) {
            console.log('Invalid code.');
            navigation.navigate("Login")
        }
    }


        function code_retunr(){
            confirmCode()
            if(!ouput){
                console.log('hereerere')
                navigation.navigate("Home",{'number' :phoneNumber})
            }
        }

    if (!confirm){
        return(
            <View>
                <Text>Login Screen</Text>

                <TextInput placeholder='Username'></TextInput>
                <TextInput placeholder='Phone'></TextInput>
                <Button title="LogIn" onPress={() => console.log('Not Implemented!')}/>      
                <TextInput placeholder='Enter your number' value= {phoneNumber} onChangeText = {Text=>setphne(Text) } />
                <Button title="Phone Number Sign In" onPress={() => signInWithPhoneNumber(phoneNumber)} />
                {/* <Button title="Register" onPress={() => navigation.navigate("Register")}/> */}
            </View>
        );
    }
    else{
        return(
            // If the user is already logged IN? re route to HomeScreen
            // CallHome Screen here and do all this in HomeScreen
            <View>
                <Text>Implement Home Screen!</Text>
                <TextInput placeholder = 'Enter the code' value ={code} onChangeText={text=>setCode(text)}/>
                <Button title = 'Submit code' onPress={()=>code_retunr() }/>
                <Button title='Signout' onPress={()=>setConfirm(false)} />
            </View>
        )
    }   
}
export default Login






// {"displayName": null, "email": null, "emailVerified": false, "isAnonymous": false, "metadata": {"creationTime": 1587561585973, "lastSignInTime": 1587561585974}, "phoneNumber": "+923054658422", "photoURL": null, "providerData": [[Object]], "providerId": "firebase", "uid": "4RQr0BjOkvgYb1R3RWTyviTywDt2"}
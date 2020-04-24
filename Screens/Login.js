import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


// navigation prop is passed down to all our screen components frfom the stack container
function Login({ navigation }){
    // If null, no SMS has been sent
    const [phoneNumber ,setPhoneNumber]=useState('+16505551234')    //Phone Number
    const [confirm, setConfirm] = useState(null);   //confirm code for phone Number
    const [code, setCode] = useState('123456'); // confirmation code (phone) from the user
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
        try{
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
            console.log('ConfirmationReturn: ', confirmation)
        }catch(err){
            console.log('Error in SignInWithPhoneNumber: ')
            console.log(err)
        }
    }

    async function confirmCode() {
        try {
            const conf =  await confirm.confirm(code);
            console.log('Conf Code: ', conf)
            if(conf){
                navigation.navigate('Home', { "number": phoneNumber })
            }
        } catch (error) {
            alert('Invalid code.')
            console.log('Invalid code.');
        }
    }


    if (!confirm){
        return(
            <View>
                <Text>Login Screen</Text>
                <TextInput 
                    placeholder='Username'
                    onChangeText={(text) => setUserName(text)}
                    value={userName}    
                    />
                <TextInput 
                    placeholder='Password' 
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}    
                    />
                <TextInput 
                    placeholder='PhoneNumber("+16505551234")'
                    value= {phoneNumber} 
                    onChangeText = {Text=>setPhoneNumber(Text) } 
                    />                
                <Button 
                    title="LogIn" 
                    onPress={() => console.log(userName, password)}
                    />
                <Button 
                    title="Register" 
                    onPress={() => navigation.navigate("Register")}
                    />
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
                <TextInput placeholder = 'Enter the code' value ={code} onChangeText={text=>setCode(text)}/>
                <Button title = 'Submit code' onPress={()=>confirmCode() }/>
                <Button title='Back' onPress={()=>{setConfirm(false); console.log('confirm set to false')}} />
            </View>
        )
    }   
}

async function LoginMongoDB(method='server', username, password){
    try{
        let response = await fetch('https://medchatse.herokuapp.com/login')
    } catch{

    }
 }

export default Login

import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


// navigation prop is passed down to all our screen components frfom the stack container
function Login({ navigation }){
    // If null, no SMS has been sent
    const [phoneNumber ,setPhoneNumber]=useState('+16505551234')  //Phone Number
    const [confirm, setConfirm] = useState(null);   //onfirms the phone  for phone Number
    const [code, setCode] = useState('123456'); // confirmation code (phone) from the user
    const [userName, setUserName] = useState('tester')
    const [password, setPassword] = useState('godmodefortestingservershouldbeon')


    // Method to fetch our own apis
async function LoginMongoDB(method, username=null, password=null, phone=null){
    try{
        
        let packet = {
            'method' : method,
        }
        if(method=='phone')
            packet.phoneNumber = phone

        else{
            packet.username = username
            packet.password = password
        }
        console.log(packet)
        const response = await fetch('https://medchatse.herokuapp.com/login', {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(packet)
        })
        const respJson = await response.json()
        console.log("JSON Returned: ", respJson)
        if(!respJson.message)
            navigation.navigate('Main', respJson)
        else
            alert("ResponseFromServer: ",respJson)
    }catch(error){
        alert("Error from Server: ",error)
        console.log(error)
    }
}

    // Used for PhoneAuth
    async function signInWithPhoneNumber(phoneNumber){
        try{
            const verification = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(verification);
        }catch(err){
            alert(err)
            console.log('signInPhoneERR: ', err)
        }
    }

    async function confirmCode() {
        try {
            const conf =  await confirm.confirm(code);
            console.log('confirmed', conf)
            //Phone Number Verified so a request can be sent to the server to fetch data
            if (conf){
                await LoginMongoDB('phone','user','pass', phoneNumber)

                // The user is signed in after verfying the confirm code.
                // So we need to sign out the user from fire_base.
                auth().signOut().then(console.log('sigend_out...?'))
            }
            else{
                alert('Invalid Verification Code')
            }             
            
        } catch (err) {
            alert(err)
            console.log('confirmCodeERR: ', err)
        }
    }

    // Assuming the user is signed out, if there is no display name...?
    if (!confirm){
        return(
            <View>
                <Text>Login Screen</Text>
                <TextInput 
                    placeholder='Username'
                    onChangeText={(text) => setUserName(text)}
                    value={userName}
                    style={styles.inputBox}
                    />
                <TextInput 
                    placeholder='Password' 
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    style={styles.inputBox}
                    />
                <TextInput 
                    placeholder='phone("+16505551234")'
                    value= {phoneNumber} 
                    onChangeText = {Text=>setPhoneNumber(Text)} 
                    style={styles.inputBox}
                    />        
                <Button 
                    title="LogIn" 
                    onPress={() => LoginMongoDB('server', userName, password)}
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
    
    // Only phone is authentic 
    return(
        // If the user is already logged IN? re route to HomeScreen
        // CallHome Screen here and do all this in HomeScreen
        <View>
            <Text>Enter the code below!</Text>
            <TextInput placeholder = 'Enter the code' value={code} onChangeText={text=>setCode(text)}/>
            <Button title = 'Submit code' onPress={()=>confirmCode() }/>
            <Button title='Back' onPress={()=>{setConfirm(null)}} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox : {
        borderWidth:1,
        marginBottom: 1,
    }
})

export default Login

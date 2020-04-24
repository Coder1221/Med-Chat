import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


// navigation prop is passed down to all our screen components frfom the stack container
function Login({ navigation }){
    // If null, no SMS has been sent
    const [phoneNumber ,setPhoneNumber]=useState('+16505551234')  //Phone Number
    const [confirm, setConfirm] = useState(null);   //onfirms the phone  for phone Number
    const [code, setCode] = useState('123456'); // confirmation code (phone) from the user
    const [userName, setUserName] = useState('tester')
    const [password, setPassword] = useState('givenpassword')
    const [user, setUser] = useState(null);  //   Gets the current signed in user


    // Method to fetch our own apis
async function LoginMongoDB(method, username=null, password=null, phone=null){
    try{
        console.log('Db')

        let packet = {
            'method' : method,
        }
        if(method=='phone')
            packet.phoneNumber = phone

        else{
            packet.username = username
            packet.password = password
        }

        const response = await fetch('https://medchatse.herokuapp.com/login', {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(packet)
        })
        const json = await response.json()
        console.log("JSON Returned: ", json)
        console.log("Type of json: ", typeof(json))
        setUser(json)
        navigation.navigate('Home', response)
    } catch(error){
        console.log(error)
    }
}

    // Used for PhoneAuth
    async function signInWithPhoneNumber(phoneNumber){
        try{
            const verification = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(verification);
            setUser({'phoneNumber': phoneNumber})
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
                LoginMongoDB('phone','user','pass', phoneNumber)
            }
            else{
                alert('Invalid Verification Code')
            }             
            
        } catch (err) {
            alert(err)
            console.log('confirmCodeERR: ', err)
        }
    }

    // This function keeps updating user values (whenever auth() is called)
    function onAuthStateChanged(user) {
        console.log('settingUser: ', user)
        setUser(user);
      }

    // UseEffect is run after each render...?
    //The same componentWillUnmount job can be achieved by optionally returning
    // a function from our useEffect() parameter:
    useEffect(()=>{
        console.log('UseEffect ', user)
        // setPhoneNumber('+16505551234')
        // console.log("UserEffect-->user.displayName:", user.displayName)
        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // return subscriber; // unsubscribe on unmount
    }, [user])

    // Assuming the user is signed out, if there is no display name...?
    if (!user){
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
                    placeholder='phone("+16505551234")'
                    value= {phoneNumber} 
                    onChangeText = {Text=>setPhoneNumber(Text) } 
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
            <Button title='Back' onPress={()=>{setUser(null)}} />
        </View>
    )
    
}

function signOut(){
    auth()
        .signOut()
        .then(() => console.log('User signed out!: '))
}



export default Login

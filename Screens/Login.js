import React, { useState, useEffect, Component } from 'react';
import {View, Text, Button, Image, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';


// navigation prop is passed down to all our screen components frfom the stack container
function Login({ navigation }){
    // If null, no SMS has been sent
    const [phoneNumber ,setPhoneNumber]=useState('+16505551234')  //Phone Number +16505551234
    const [confirm, setConfirm] = useState(null);   //onfirms the phone  for phone Number
    const [code, setCode] = useState('123456'); // confirmation code (phone) from the user 123456
    const [userName, setUserName] = useState('') // tester
    const [password, setPassword] = useState('') // godmodefortestingservershouldbeon


    // Method to fetch our own apis
async function LoginMongoDB(method){
    try{
        if(method=="server" && !userName)
            return false
        console.log(confirm)
        let packet = {
            'method' : method,
        }
        if(method=='phone')
            packet.phoneNumber = phoneNumber

        else{
            packet.username = userName
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
            alert(respJson.message)
    }catch(error){
        alert(error.message)
        console.log(error.message)
    }
}

    // Used for PhoneAuth
    async function signInWithPhoneNumber(phoneNumber){
        try{
            const verification = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(verification);
            console.log("verification: ", verification)
        }catch(err){
            alert(err.message)
            console.log('signInPhoneERR: ', err.message)
        }
    }

    async function confirmCode() {
        try {
            const conf =  await confirm.confirm(code);
            console.log('confirmed', conf)
            //Phone Number Verified so a request can be sent to the server to fetch data
            if (conf){
                console.log("UserStatusBefore: ", auth().currentUser)
                await auth().signOut().then(console.log("UserStatus: ", auth().currentUser))
                await LoginMongoDB('phone','user','pass', phoneNumber)
                // The user is signed in after verfying the confirm code.
                // So we need to sign out the user from fire_base.
            }
            else{
                alert('Invalid Verification Code')
            }
            
        } catch (err) {
            alert(err.message)
            console.log(err.message)
        }
    }

    // Assuming the user is signed out, if there is no display name...?
    if (!confirm){
        return(
            <View style={styles.initial}>
                <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
                    <Image
                        style = {styles.logo}
                        source={require('../imgs/logo.jpeg')}
                    />
                    <ScrollView >
                        <Text style={styles.textformat}>Log In</Text>
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
                        {/* <View style={styles.separator} />  */}
                        <View style={styles.buttonview}>       
                            <Button 
                                title="LogIn" 
                                onPress={() => LoginMongoDB('server')}
                                color="#8155BA"
                            />
                        </View>
                        {/* <View style={styles.separator} />
                        <View style={styles.separator} /> */}
                        <View style={styles.buttonview}>
                            <Button 
                                title="Register" 
                                onPress={() => navigation.navigate("Register")}
                                color="#8155BA"
                                />
                        </View>
                        <TextInput 
                            placeholder='phone("+16505551234")'
                            value= {phoneNumber} 
                            onChangeText = {Text=>setPhoneNumber(Text)} 
                            style={styles.inputBox}
                            />
                        <View style={styles.buttonview}>
                            <Button
                                title="Sign In With Phone Number"
                                onPress={() => signInWithPhoneNumber(phoneNumber)}
                                color="#8155BA"
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
            
           
           
        );
    }
    // Only phone is authentic 
    return(
        // If the user is already logged IN? re route to HomeScreen
        // CallHome Screen here and do all this in HomeScreen
        <View style={styles.initial}>
            <ImageBackground source={require('../imgs/login_background.jpeg')} style={styles.image}>
                <TextInput placeholder = 'Enter the code' value={code} onChangeText={text=>setCode(text)}/>
                <View style={styles.buttonview}>
                    <Button title = 'Submit code' onPress={()=>confirmCode()} color="#8155BA"/>
                </View>
                <View style={styles.buttonview}>
                    <Button title='Back' onPress={()=> setConfirm(null)} color="#8155BA" />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
        
      },
    inputBox : {
        marginTop:10,
        // justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#A49393',
        // backgroundColor:'#EED6D3',
    },
    initial : {
        // backgroundColor:'#EED6D3',
        flex:1
    },
    logo : {
        width:125,
        height:125,
        marginLeft:125
    },
    textformat : {
        textAlign:'left',
        fontSize: 30, 
        fontStyle:'normal',
        // marginTop:100
    },
    // separator: {
    //     marginVertical: 0,
    //   },
    buttonview: {
        borderRadius: 50,
        overflow:'hidden',
        width:'80%',
        marginLeft:40,
        marginBottom:5,
        marginTop: 10
    }
})

export default Login;

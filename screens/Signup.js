import React, { Component } from 'react';
import { TextInput,Button, Text, View ,Alert} from 'react-native';
import * as Facebook from 'expo-facebook';

class Signup extends Component {
  static navigationOptions = {
    title: 'Sign UP',
  };
  render() {
    let state = {
      user :'',
      pass :'',
      name:''
    };
  
    async function logIn() {
      try {
        await Facebook.initializeAsync('1956864841113341');
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile' , 'email'],
        });
        if (type === 'success') {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const resp =await response.json()
          // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          Alert.alert('Logged in!', `Hi ${resp.name}!`);
          console.log(resp)
        } else {
          console.log('cancled')
        }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


    return (
      <View>
        <Button title ='Login with facebok'onPress={()=>logIn()}/>
        <TextInput placeholder= 'Name' />
        <TextInput placeholder= 'Email' />
        <TextInput placeholder= 'Password'/>
        <TextInput placeholder= 'Confirm Password'/>
        <Button title ='Sign-up'/>
      </View>
    );
  }
}
export default Signup;
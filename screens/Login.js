import React, { Component } from "react";
import { TextInput, Text, View, StyleSheet, Button } from 'react-native';

class Login extends Component{
  static navigationOptions = {
    title:"Enter your credentials"
  };
  render(){
    let state = {
      user :'',
      pass :''
    };
    return(
    <View>
        <TextInput placeholder= 'Email' />
        <TextInput placeholder= 'Password'/>
        <Button title ='Sign-up'/>
    </View>
    );
  }
}
export default Login
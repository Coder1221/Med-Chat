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
export default Login;

// import React, { Component ,useState} from "react";
// import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
// import fetch from 'cross-fetch';

// function app(){
//     const [default_user ,user ] = useState('');
//     const [default_pass ,pass] = useState('');
 
//     function autentication(){
//       let url = "https://medchatse.herokuapp.com/login"
//       let dict= {}
//       dict['method']='gmail'
//       dict['gmailID'] =String(default_user)
//       let pkg=JSON.stringify(dict)
//       fetch("https://medchatse.herokuapp.com/login" , {method:'post', body:pkg})
//       .then((response) => {
//         console.log(response.json())
//       })
      
 
//     }
//     return(
//     <View>
//         <TextInput placeholder= 'Email'    value = {default_user} onChangeText = {text=>user(text)}/>
//         <TextInput placeholder= 'Password' value = {default_pass} onChangeText = {text=>pass(text)}/>
//         <Button title ='Sign-up' onPress = {autentication}/>
//     </View>
//     );
  
// }
// export default app
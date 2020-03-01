import React, { Component } from 'react';
import { TextInput, Button, Text, View, Alert, StyleSheet } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from "expo-google-app-auth";
// import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import { GoogleSignin } from 'react-native-google-signin';
// import firebase from 'react-native-firebase';

class Signup extends Component {
  static navigationOptions = {
    title: 'Sign UP',
  };
  render() {
    let state = {
      isSignedIn : false,
      name: '',
      photoURL: '',
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
          permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );
          const resp = await response.json();
          // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          Alert.alert('Logged in!', `Hi ${resp.name}!`);
          console.log(resp);
        } else {
          console.log('cancled');
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }

    // Calling this function will open Google for login.
    // async function googleLogin() {
    //   try {
    //     // add any configuration settings here:
    //     await GoogleSignin.configure();

    //     const data = await GoogleSignin.signIn();

    //     // create a new firebase credential with the token
    //     const credential = firebase.auth.GoogleAuthProvider.credential(
    //       data.idToken,
    //       data.accessToken
    //     );
    //     // login with credential
    //     const firebaseUserCredential = await firebase
    //       .auth()
    //       .signInWithCredential(credential);

    //     console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }

    // This implements the google login system
    const IOS_CLIENT_ID =
      "601730024711-1umv9ae2optd0hs2bh7f5amfvfgb07aq.apps.googleusercontent.com";
    const ANDROID_CLIENT_ID =
      "601730024711-uobm6u8u7cf8m2o91pf6i21j7do55eie.apps.googleusercontent.com";
    async function signInWithGoogle () {
      console.log("Google func called");
      try {
        const result = await Google.logInAsync({
          iosClientId: IOS_CLIENT_ID,
          androidClientId: ANDROID_CLIENT_ID,
          scopes: ["profile", "email"]
        });

        if (result.type === "success") {
          console.log("LoginScreen.js.js 21 | ", result.user.givenName);
          //after Google login redirect to Profile
          // return result.accessToken;
        } else {
          console.log("login Failed")
          // return { cancelled: true };
        }
      } catch (e) {
        console.log('LoginScreen.js.js 30 | Error with login', e);
        // return { error: true };
      }
    }
    function SignOut(){
      this.setState({
        "isSignedIn" : false ,
      })
    }

    return (
      <View>
          <Button title="Login with Facebook" onPress={() => logIn()} />
          <Button title="Login with Google" onPress={()=> signInWithGoogle()} />
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" />
          <TextInput placeholder="Confirm Password" />
          <Button title="Sign-up" />
      </View>
    );
  }
}

export default Signup;
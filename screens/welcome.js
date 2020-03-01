import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import Navigation from '../navigation';

const { width, height } = Dimensions.get('window');

class welcome extends Component {
    static navigationOptions = {
      title: 'Welcome to Ehsaas',
    };

  render() {
    const { navigate } = this.props.navigation;
 
    return (
      <View>
      <Button title="LOGIN" onPress={() => navigate('Login')} />
      <Button title="SIGNUP" onPress={() => navigate('Signup')} />
    </View>
    );
  }
}
export default welcome;
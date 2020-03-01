import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native';
import Navigation from "./navigation";

export default class App extends React.Component {
  render() {
      return(
        <Navigation />
      );
  }
}
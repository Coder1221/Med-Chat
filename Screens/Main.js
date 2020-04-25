
import React, { useState, useEffect, Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function Main({ navigation }) {

  state = {
    name: 'Johnss',
  };

  const [name,setName] =useState('')

 function  onPress(){
  console.log('navigated')
  navigation.navigate('Chat', { name: name });
}

    return (
    <View>
      <Text style={styles.title}>Enter your name:</Text>
      <TextInput
        style={styles.nameInput}
        placeHolder="John Cen1a"
        onChangeText={txt=>setName(txt)}
        value={name}
      />
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const offset = 24;

const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
});

export default Main;
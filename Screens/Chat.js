import React, { useState, useEffect, Component } from 'react';
import {Text, Button} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import Fire from '../Fire';
import { cond } from 'react-native-reanimated';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);

export default class Chat extends Component<props>{

  state = {
    messages: [],
  };

  get user() {
    return {
      name:'Guest1' , //name of user get from db
      _id: 'testing-1',  //unique id of each user get from db
    };
  }

  
  componentDidMount() {  /// this compent will fetch all prevoius messages from chat
 
    Fire.shared.on(message =>
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
    }))
    ); 
  }
  

  componentWillUnmount() {
    Fire.shared.off(); // 
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      /> 
    );
  }
}
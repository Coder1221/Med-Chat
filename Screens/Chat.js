import React, { useState, useEffect, Component } from 'react';
import {Text, Button ,ActivityIndicator} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';
import { cond } from 'react-native-reanimated';
GiftedChat.renderLoading=true

export default class Chat extends Component<props>{
  state = {
    messages: [],
    database:'',
    user:'',
    unique_id:'',
    loading:true
  };

  componentDidMount() {  /// this compent will fetch all prevoius messages from chat
   
    GiftedChat.renderLoading=true
    this.database=this.props.navigation.state.params.channel_name
    this.user=this.props.navigation.state.params.name
    this.unique_id =this.props.navigation.state.params.id
    

    // Fire.shared.select_data_base(this.database)
    Fire.shared.select_data_base('messages_1_1')

    Fire.shared.on(message =>this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        loading:  false
    })));
    
    console.log(this.state.messages)
  }


  componentWillUnmount() {
    Fire.shared.off();
  }

  render() {
    if (this.state.loading) {
        this.state.loading == true ? <ActivityIndicator size="large" color="#0000ff" /> :<ActivityIndicator />
    }
    return (
      <GiftedChat
        renderLoading={() =>  <ActivityIndicator size="large" color="#0000ff" />}
        // onLoadEarlier={() =>  <ActivityIndicator size="large" color="#0000ff" />}
        messages={this.state.messages}
        renderLoading={() => this.state.loading == true ? <ActivityIndicator size="large" color="#0000ff" /> :<ActivityIndicator />}
        onSend={Fire.shared.send}
        onPressAvatar={(user)=>this.props.navigation.navigate('Profile',{us:user})}
        isTyping
        renderTime
        // showUserAvatar
        renderUsernameOnMessage
        user={ {name:'dd1',_id:'testing_2',avatar: 'https://placeimg.com/140/140/any'} }  //change this line
        
      /> 
    );
  }
}
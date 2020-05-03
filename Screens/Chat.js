import React, { useState, useEffect, Component,setState } from 'react';
import {Text, Button ,ActivityIndicator} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';
import { cond } from 'react-native-reanimated';
GiftedChat.renderLoading=true

import {  StyleSheet ,View} from 'react-native';

export default class Chat extends Component<props>{
  
  static navigationOptions = ({ navigation }) => {  
    return {  
        title: navigation.state.params.channel_name,  
        headerStyle: {  
                backgroundColor: '#8155BA',  
        },  
        headerTitleStyle: {  
              fontWeight: 'bold',  
        },
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate('Channel_Profile',{channel_name:navigation.state.params.channel_name})}
            title="Info"
            color="#8155BA"
          />
        )
    };  
  };  

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
    
    console.log(this.props.navigation.state.params)
    // Fire.shared.select_data_base(this.database)
    Fire.shared.select_data_base('messages_1_1')
    
    Fire.shared.on(message =>this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message),
      loading:  false
    })));
  

  }

  componentWillUnmount() {
    Fire.shared.off();
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }
  render() {
    return (
      <GiftedChat
        renderLoading={this.renderLoading}x
        messages={this.state.messages}
        onSend={Fire.shared.send}
        onPressAvatar={(user)=>this.props.navigation.navigate('Profile',{us:user})}
        isTyping
        renderTime
        showUserAvatar
        renderUsernameOnMessage
        user={ {name:'dd1',_id:'testing_1',avatar: 'https://placeimg.com/140/140/any'} }  //change this line        
      />
    );
  }
}


const styles = StyleSheet.create({
  // rest remains same
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
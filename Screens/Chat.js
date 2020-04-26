import React, { useState, useEffect, Component } from 'react';
import {Text, Button} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';
import { cond } from 'react-native-reanimated';


function Chat({navigation}){
  const[message_of_channels , set_mg]=useState(['test','test2'])
  const[_id ,setid]=useState('testing-1') //dummy
  const[name,setname]=useState('')
  const[channel ,setchannel]=useState('messages')//dummy
  
  useEffect(()=>{
    // setid(navigation.state.params.unique_id)
    // setname(navigation.state.params.name)
    // setchannel(navigation.state.params.selected_channel)
     
      Fire.shared.select_data_base(channel)
     
      Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
      );

  
  })
  function user() {
    return {
      name:'Guest1' , //name of user get from db
      _id: 'testing',  //unique id of each user get from db
    };
  }
    

  return(
    <>
    <Text>we are here</Text>
 
    <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={user}/>
  </>
  );
}
export default Chat;

// export default class Chat extends Component<props>{
//   state = {
//     messages: [],
//   };

//   get user() {
//     return {
//       name:'Guest1' , //name of user get from db
//       _id: 'testing',  //unique id of each user get from db
//     };
//   }

  
//   componentDidMount() {  /// this compent will fetch all prevoius messages from chat
   
//     Fire.shared.select_data_base('messages')

//     Fire.shared.on(message =>
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, message),
//     }))
//     ); 
//   }
  

//   componentWillUnmount() {
//     Fire.shared.off(); // 
//   }
//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={Fire.shared.send}
//         user={this.user}
//       /> 
//     );
//   }
// }


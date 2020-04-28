
import React, { useState, useEffect, Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Button,
  ScrollView,
} from 'react-native';

function Main({ navigation }) {

  const [name,setName] =useState('')
  const [unique_id ,setid]=useState('')
  const [user_State , setState]= useState(['0','1','1','1','0','1','1','1','0','0','1','1']) // o and 1 wether a user is a part of that channel or not

  const [count,setCount]=useState(['1','1','91','1','1','100','1','1','1','190','1','1']) // count of each channel
  const [selected_channel , set_channel]=useState('')
  const [Channels ,setChannels]=useState(['Cancer', 'Asthma', 'Diabetes' ,'Cough', 'Bood Pressure' , 'Teeth Cavity','Heart' , 'Acane','Depression' ,'Lungs Infection','Vision','Ear_Pain'])


  useEffect(()=>{
    // handle all hooks here
    // name hook
    // unique id hook
    // each channel count how many members are there
    // list of channelse which user have joined 
    
    // setName(navigation.state.prams.name)
    console.log('effect caled')
  })
  
 
  function handle_database(x, index){
    set_channel(x)
    // handle here wether the  user that seleted the cahnnel is part of that or not 
    // x is the name of the channel 
    // handle user wann join it then commit to data base
   
    if(user_State[index]==='0'){ //not a part of channels
        alert('WANNA join this channel')
        // commit this user to data base

      // NAvigate them to chat screen
      // navigation.navigate('Chat', {name: name , id :unique_id , channel_number : selected_channel}); 
    }else{
      navigation.navigate('Chat', {name: name , id :unique_id , channel_name : selected_channel});
    }

    
  }
  
  return (
    <>
    <ScrollView>
    <View style={styles.initial}>
    <View style={styles.buttonview}>{Channels.map((item, index)=>(
      <Button title={item+' ->  '+count[index]+'JOINED STATE->'+user_State[index]}  onPress ={()=>handle_database(item ,index)}
      color="#8155BA"
      marginTop='10'
      />
      
    ))}
    <View style={styles.separator} />
    </View>
  </View>
  </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  
  initial : {
      backgroundColor:'#EED6D3',
      flex:1
  },
  
  separator: {
      marginVertical: 8,
    },
  buttonview: {
      borderBottomLeftRadius:50,
      borderTopLeftRadius:50,
      borderBottomRightRadius:50,
      borderTopRightRadius:50,
      overflow:'hidden',
      width:'80%',
      marginLeft:40,
      marginBottom:10,
      marginTop:10,
      marginVertical: 8,
  }
})

export default Main;
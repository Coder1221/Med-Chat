import React, { useState, useEffect, Component } from 'react';
import {Text, Button ,ActivityIndicator} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';
import { cond, exp } from 'react-native-reanimated';

function Profile({navigation}){
    return(
        
    <Text> Profile screen{navigation.state.params.us._id}</Text>
    );
}
export default Profile;
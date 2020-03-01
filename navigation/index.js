import {createStackNavigator} from "react-navigation-stack";
import React from "react";
import { Image } from "react-native";
import {createAppContainer} from "react-navigation";
import welcome from "../screens/welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup"

const screens= createStackNavigator(
  {welcome,Login, Signup}
);

export default createAppContainer(screens)
import React, {useState, }from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';


function Register({ navigation }){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName]= useState('')
    const [userName, setUserName]= useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [pic, setPic] = useState('')
    const [diseaseHist, setDiseaseHist]= useState('')
    const [bday, setBday]= useState('')
    const [validFName, setValidFName] = useState(true)
    const [validLName, setValidLName] = useState(true)
    const [validUName, setValidUName] = useState(true)
    const [validPass, setValidPass] = useState(true)
    const [validPhone, setValidPhone] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validBday, setValidBday] = useState(true)
    const [validAll, setValidAll] = useState(false)
 


    
    // validates all inputs before sending to Server
    function ValidateAndSend(){
        validateInput(firstName, 'fName')
        validateInput(lastName, 'lName')
        validateInput(userName, 'userName')
        validateInput(password, 'password')
        validateInput(phoneNumber, 'phoneNumber')
        validateInput(email, 'email')
        validateInput(bday, 'bday')
        if( validEmail && 
            validFName &&
            validLName &&
            validUName &&
            validPass &&
            validPhone &&
            validBday ) setValidAll(true)
        else setValidAll(false)

        if(validAll){

        }
    }

    // Checks the input at client side before sending it to the server
    function validateInput(text, type){
        // starts with a letter, can contain alphanumeric afterwards
        if(type == 'userName'){
            setUserName(text)
            const check = /^[a-zA-Z]\w*$/
            setValidUName(check.test(text))
        }
        // contains only letters
        else if(type == 'fName'){
            setFirstName(text)
            const check = /[a-zA-Z]+$/
            setValidFName(check.test(text))
        }
        // contains only letters
        else if(type == 'lName'){
            setLastName(text)
            const check = /[a-zA-Z]+$/
            setValidLName(check.test(text))
        }
        // must be atleast 5 chars long
        else if(type=='password'){
            setPassword(text)
            const check = /.{5,}/
            setValidPass(check.test(text))
        }
        // covers valid email styles
        else if(type=='email'){
            setEmail(text)
            // Taken from internet
            const check = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            setValidEmail(check.test(text))
        }
        // for now +92[PakistaniNumbers]
        else if(type=='phoneNumber'){
            setPhoneNumber(text)
            const check = /\+92[0-9]{10}/
            setValidPhone(check.test(text))
        }
        else if(type=='bday'){
            setBday(text)
            const check = /[0-9]{4}-[0-9]{2}-[0-9]/
            setValidBday(check.test(text))
        }
    }

    return(
        <View >
            <Text>Welcome to RegisterScreen</Text>
            <TextInput 
                placeholder='First Name (start with a letter, can contain alphanumeric afterwards)' 
                value={firstName} 
                onChangeText={(text)=> validateInput(text, 'fName')}
                style={validFName?styles.inputBox:styles.error}
                />
            <TextInput 
                placeholder='Last Name (letters only)' 
                value={lastName}
                onChangeText={(text)=> validateInput(text, 'lName')}
                style={validLName?styles.inputBox:styles.error}
                />
            <TextInput 
                placeholder='User Name (letters only)' 
                style={validUName?styles.inputBox:styles.error}
                value={userName}
                onChangeText={(text)=> validateInput(text, 'userName')}
                />
            <TextInput 
                placeholder='Password (Atleast 5 digits long)' 
                secureTextEntry={true} 
                value={password}
                onChangeText={(text)=> validateInput(text, 'password')}
                style={validPass?styles.inputBox:styles.error}
                />
            <TextInput 
                placeholder='Phone Number (+92[10 more digits])' 
                value={phoneNumber}
                onChangeText={(text)=> validateInput(text, 'phoneNumber')}
                style={validPhone?styles.inputBox:styles.error}
                />
            <TextInput 
                placeholder='Email'
                value={email}
                onChangeText={(text)=> validateInput(text, 'email')}
                style={validEmail?styles.inputBox:styles.error}
                />
            <TextInput 
                placeholder='Birth Day (yyyy-mm-dd)'
                value={bday}
                onChangeText={(text)=> validateInput(text, 'bday')}
                style={validBday?styles.inputBox:styles.error}
                />
            
            <Button 
                title='Register'
                onPress={()=> ValidateAndSend()}
            />
            {validAll ? null : <Text>Atleast One of the blocks above ahs an error</Text>}
        </View>
    )

}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 1,
    },
    error: {
        borderWidth: 1,
        borderColor: 'red',
        marginBottom: 1,
    }
})

export default Register;
import React, {useState, }from 'react'
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import CheckBox from '@react-native-community/checkbox';


function Register(){
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName]= useState('')
    const [userName, setUserName]= useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [pic, setPic] = useState('none')
    const [drDisease, setDrDisease]= useState('') //Diseases the person has helped other people with
    const [patientDisease, setPatientDisease]= useState('') // Diseases the person wants help with
    const [bday, setBday]= useState('')
    // booleans for dynamic changes in the borders of the input (No time for a better workaround)
    const [validFName, setValidFName] = useState(true)
    const [validLName, setValidLName] = useState(true)
    const [validUName, setValidUName] = useState(true)
    const [validPass, setValidPass] = useState(true)
    const [validPhone, setValidPhone] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validBday, setValidBday] = useState(true)
    const [validDoctor, setValidDoctor] = useState(false)
    const [validPatient, setValidPatient] = useState(false)
    const [validAll, setValidAll] = useState(true)
 
    
    // validates all inputs before sending to Server
    async function ValidateAndSend(){
        validateInput(firstName, 'fName')
        validateInput(lastName, 'lName')
        validateInput(userName, 'userName')
        validateInput(password, 'password')
        validateInput(phoneNumber, 'phoneNumber')
        validateInput(email, 'email')
        validateInput(bday, 'bday')
        if( validEmail && validFName && validLName && validUName && validPass && validPhone && validBday){
            setValidAll(true)
        }else{
            setValidAll(false)
        }

        // if all of the conditions are fulfilled we can send the packet to hte server
        if (validAll){
            let packet = {
                "firstName" : firstName,
                "lastName" : lastName,
                "username" : userName,
                "password" : password,
                "profilePicture" : pic,
                "email" : "",
                "phoneNumber" : phoneNumber,
                "birthday" : bday,
                "diseaseHistory" : {
                    "isPatient" : validPatient,
                    "isDoctor" : validDoctor,
                    "doctorDiseases" : [drDisease],
                    "patientDisease" : [patientDisease]
                }
            }
            console.log(packet)
            const response = await fetch('https://medchatse.herokuapp.com/signUp', {
                method: 'POST',
                headers:{
                    Accept : 'application/json',
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify(packet)
            })
            const respJson = await response.json()
            console.log("JSON returned: ", respJson)
            try{
                alert(respJson.message)
            }catch(err){
                alert(err)
            }   
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
            const check = /\+92[0-9]{10}$/
            setValidPhone(check.test(text))
        }
        else if(type=='bday'){
            setBday(text)
            const check = /^\d{4}(\-)(((0)[0-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$/
            setValidBday(check.test(text))
        }
    }

    return(
        <View>
            <ScrollView>
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
                    value={userName}
                    onChangeText={(text)=> validateInput(text, 'userName')}
                    style={validUName?styles.inputBox:styles.error}
                    />
                <TextInput 
                    placeholder='Password (Atleast 5 digits long)' 
                    // secureTextEntry={true} 
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
                
                <TextInput 
                    placeholder='* Diseases you can help with * (Optional Entry)'
                    value={drDisease}
                    onChangeText={text => setDrDisease(text)}
                    style={styles.inputBox}
                    />
                <TextInput 
                    placeholder='* Diseases you have * (Optional Entry)'
                    value={patientDisease}
                    onChangeText={text => setPatientDisease(text)}
                    style={styles.inputBox}
                    />
                <Text> For now the value of pic is '{pic}'</Text>
                <Text>Join the Community as:</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CheckBox value={validDoctor} onChange={() => setValidDoctor(!validDoctor)} />
                    <Text style={{marginTop: 5}}>Doctor</Text>
                    <CheckBox value={validPatient} onChange={() => setValidPatient(!validPatient)} />
                    <Text style={{marginTop: 5}}>Patient</Text>
                </View>
                <Button 
                    title='Register'
                    onPress={()=> ValidateAndSend()}
                />
                {validAll ? null : <Text>The values in red blocks are not in correct format!</Text>}
            </ScrollView>
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
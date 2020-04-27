import React, {useState, }from 'react'
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';

function Register({ navigation }){
    // String array ==> fName, lName, uName, password, phone, email, bday --> 
    const [profile, setProfile] = useState(['','','','','','',''])
    // const [firstName, setFirstName] = useState(null)
    // const [lastName, setLastName]= useState('')
    // const [userName, setUserName]= useState('')
    // const [password, setPassword] = useState('')
    // const [phoneNumber, setPhoneNumber] = useState('')
    // const [email, setEmail] = useState('')
    // const [bday, setBday]= useState('')
    const [isDoctor, setIsDoctor] = useState(false)
    const [isPatient, setIsPatient] = useState(false)
    const [drDisease, setDrDisease]= useState('') //Diseases the person has helped other people with
    const [patientDisease, setPatientDisease]= useState('') // Diseases the person wants help with
    const [pic, setPic] = useState(false) // picture val
    // boolean array ==> fName, lName, uName, password, phone, email, bday,
    const [validStates, setValidStates] = useState([1,1,1,1,1,1,1])
    const [validAll, setValidAll] = useState(true) // This becomes tru when all required elements are true 
    
    // validates all inputs before sending to Server
    async function ValidateAndSend(){
        let valArr = []
        valArr.push(validateInput(firstName, 'fName'))
        valArr.push(validateInput(lastName, 'lName'))
        valArr.push(validateInput(userName, 'userName'))
        valArr.push(validateInput(password, 'password'))
        valArr.push(validateInput(phoneNumber, 'phoneNumber'))
        // validateInput(email, 'email') ---> made optional
        valArr.push(validateInput(bday, 'bday'))
        
        // Check Validity of all inputs. If any input doesn't match the format return from the function
        valArr.forEach(val => {
            if(!val){
                setValidAll(false)
                return
            }
        })
        setValidAll(true)
        // if all of the conditions are fulfilled we can send the packet to the server
        
        let packet = {
            "firstName" : profile[0],
            "lastName" : profile[1],
            "username" : profile[2],
            "password" : profile[3],
            "phoneNumber" : profile[4],
            "email" : profile[5],
            "birthday" : profile[6],
            "profilePicture" : pic,
            "diseaseHistory" : {
                "isPatient" : isDoctor,
                "isDoctor" : isPatient,
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
            navigation.pop() // will move back to Login Screen after a succesful Registration
        }catch(err){
            alert(err)
        }
    }
    // Checks the input at client side before sending it to the server
    function validateInput(text, type){
        let prevValidArr = validStates.slice()
        let prevProfileArr = profile.slice()
                
        // fName
        if(type == 0){
            const check = /[a-zA-Z]+$/ // contains only letters 
            prevProfileArr[0] = text
            prevValidArr[0] = check.test(text)
        }
        // lName
        else if(type == 1){
            const check = /[a-zA-Z]+$/  // contains only letters
            prevProfileArr[1] = text
            prevValidArr[1] = check.test(text)
        }
        // 'userName'
        else if(type == 2){
            const check = /^[a-zA-Z]\w*$/
            prevProfileArr[2] = text
            prevValidArr[2] = check.test(text)
        }
        // 'password'
        else if(type== 3){
            const check = /.{5,}/   // must be atleast 5 chars long
            prevProfileArr[3] = text
            prevValidArr[3] = check.test(text)
        }

        // 'phoneNumber' for now +92[PakistaniNumbers]
        else if(type== 4){
            const check = /\+92[0-9]{10}$/
            prevProfileArr[4] = text
            prevValidArr[4] = check.test(text)
        }
        
        // 'email'
        else if(type==5){
            // Taken from internet covers valid email styles
            const check = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            prevProfileArr[5] = text
            prevValidArr[5] = check.test(text)
        }

        // 'bday'
        else if(type== 6){
            const check = /^\d{4}(\-)(((0)[0-9])|((1)[0-2]))(\-)([0-2][0-9]|(3)[0-1])$/
            prevProfileArr[6] = text
            prevValidArr[6] = check.test(text)
        }

        setProfile(prevProfileArr)
        setValidStates(prevValidArr)
        return prevValidArr[type]
    }

    function UploadImage() {
        // An options obj need to be passed to the img lib.
        const options = {
            noData : true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log('Response: ', response)
            if(response.uri){
                setPic(response)
            }
            else if (response.error){
                alert(response.error)
            }
        })
        
    }

    return(
        <View>
            <ScrollView>
                <Text>Welcome to RegisterScreen</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        style={{width:100, height:100, borderRadius:100, resizeMode:'cover'}} 
                        source={pic? {uri : pic.uri} : require('../imgs/empty_profile.png')}
                    />
                    <Button
                        style={{flex:1, textAlign:'center', color:'blue'}}
                        onPress={()=>UploadImage()}
                        title='Upload Image'
                    ></Button>
                </View>
                <TextInput
                    placeholder='First Name (letters only)'
                    value={profile[0]} 
                    onChangeText={(text)=> validateInput(text, 0)}
                    style={validStates[0]?styles.inputBox:styles.error}
                />
                <TextInput
                    placeholder='Last Name (letters only)'
                    value={profile[1]}
                    onChangeText={(text)=> validateInput(text, 1)}
                    style={validStates[1]?styles.inputBox:styles.error}
                />
                <TextInput 
                    placeholder='User Name (start with a letter, can contain alphanumeric afterwards)' 
                    value={profile[2]}
                    onChangeText={(text)=> validateInput(text, 2)}
                    style={validStates[2]?styles.inputBox:styles.error}
                />
                <TextInput 
                    placeholder='Password (Atleast 5 digits long)' 
                    secureTextEntry={true} 
                    value={profile[3]}
                    onChangeText={(text)=> validateInput(text, 3)}
                    style={validStates[3]?styles.inputBox:styles.error}
                />
                <TextInput 
                    placeholder='Phone Number (+92[10 more digits])' 
                    value={profile[4]}
                    onChangeText={(text)=> validateInput(text, 4)}
                    style={validStates[4]?styles.inputBox:styles.error}
                />
                <TextInput 
                    placeholder='* Email * (Optional)'
                    value={profile[5]}
                    onChangeText={(text)=> validateInput(text, 5)}
                    style={validStates[5]?styles.inputBox:styles.error}
                />
                <TextInput 
                    placeholder='Birth Day (yyyy-mm-dd)'
                    value={profile[6]}
                    onChangeText={(text)=> validateInput(text, 6)}
                    style={validStates[6]?styles.inputBox:styles.error}
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
                <Text>Join the community as:</Text>
                <View style={{ flexDirection: 'row'}}>
                    <CheckBox value={isDoctor} onChange={() => setisDoctor(!isDoctor)} />
                    <Text style={{marginTop: 5}}>Doctor</Text>
                    <CheckBox value={isPatient} onChange={() => setisPatient(!isPatient)} />
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
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// //import "firebase/messaging";
import firebase from 'firebase'; // 4.8.1

    
var firebaseConfig = {
  apiKey: "AIzaSyCKECd_gDdmw1nDmyBqYbGHgOW4DatIhUU",
  authDomain: "medchat-e1838.firebaseapp.com",
  databaseURL: "https://medchat-e1838.firebaseio.com",
  projectId: "medchat-e1838",
  storageBucket: "medchat-e1838.appspot.com",
  messagingSenderId: "79684443301",
  appId: "1:79684443301:web:0ed026f2532de3ea52014c",
  measurementId: "G-TV7P7E63F8"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
export default firebase;

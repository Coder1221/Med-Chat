import firebase from './Screens/firebase_auth'
class Fire {
  constructor() {
    this.observeAuth();
    this.DataBase= ''
  }
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    firebase.auth().signInAnonymously();
  };

  ref_database = ()=>{
    return firebase.database().ref(this.DataBase); 
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  select_data_base= text=>{
    this.DataBase=text
  }

  on = callback =>
    this.ref_database().on('child_added', snapshot => callback(this.parse(snapshot)));
  
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };
  append = message => this.ref_database(this.DataBase).push(message);

  // close the connection to the Backend
  off() {
    this.ref_database(this.DataBase).off();
  }
}
Fire.shared = new Fire();
export default Fire;
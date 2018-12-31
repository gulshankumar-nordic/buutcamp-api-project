import * as firebase from 'firebase'  ;
  // Initialize Firebase
var config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxxx.firebaseio.com",
  projectId: "buutcampapi",
  storageBucket: "xxxxxx.appspot.com",
  messagingSenderId: "8xxxxxxxx9"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('kartta')
export const auth  = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

import firebase from "firebase/app";
import 'firebase/auth'
import "firebase/database"; // or other Firebase services you're using
import "firebase/storage"; // Import Firebase Storage module

const config = {
  // apiKey: "AIzaSyDVBBt5F1LzzM6vnVEwM6Bm-hxmW8H_6CE",
  // authDomain: "smarthydroponics-40d1f.firebaseapp.com",
  // databaseURL: "https://smarthydroponics-40d1f-default-rtdb.firebaseio.com",
  // projectId: "smarthydroponics-40d1f",
  // storageBucket: "smarthydroponics-40d1f.appspot.com",
  // messagingSenderId: "817281014244",
  // appId: "1:817281014244:web:56911ac4f1b5114d914ff1",
  apiKey: "AIzaSyACOIdJxX5kxPOjR4ihE1rXIWrGvAZ_85k",
  authDomain: "smarthydroponics-2458a.firebaseapp.com",
  databaseURL: "https://smarthydroponics-2458a-default-rtdb.firebaseio.com",
  projectId: "smarthydroponics-2458a",
  storageBucket: "smarthydroponics-2458a.appspot.com",
  messagingSenderId: "123807413870",
  appId: "1:123807413870:web:d1b4d391c2a2cc4517d87f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;

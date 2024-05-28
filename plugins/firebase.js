import firebase from "firebase/app";
import 'firebase/auth'
import "firebase/database"; // or other Firebase services you're using

const config = {
  // apiKey: "AIzaSyDVBBt5F1LzzM6vnVEwM6Bm-hxmW8H_6CE",
  // authDomain: "smarthydroponics-40d1f.firebaseapp.com",
  // databaseURL: "https://smarthydroponics-40d1f-default-rtdb.firebaseio.com",
  // projectId: "smarthydroponics-40d1f",
  // storageBucket: "smarthydroponics-40d1f.appspot.com",
  // messagingSenderId: "817281014244",
  // appId: "1:817281014244:web:56911ac4f1b5114d914ff1",
  apiKey: "AIzaSyCzfx0X_TYCJAeDC38KFN448ndICzRtCug",
  authDomain: "smarthydroponics-3a31d.firebaseapp.com",
  databaseURL: "https://smarthydroponics-3a31d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarthydroponics-3a31d",
  storageBucket: "smarthydroponics-3a31d.appspot.com",
  messagingSenderId: "732433331388",
  appId: "1:732433331388:web:c1851e887ba4f049ac0cb9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;

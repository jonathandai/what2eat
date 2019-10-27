import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCF8hw3_HjWCv6Z7n7vzJXeyNR4OKWzxEU",
    authDomain: "what2eat-266ce.firebaseapp.com",
    databaseURL: "https://what2eat-266ce.firebaseio.com",
    projectId: "what2eat-266ce",
    storageBucket: "what2eat-266ce.appspot.com",
    messagingSenderId: "681623133231",
    appId: "1:681623133231:web:841fac42ae6d01f2577ada",
    measurementId: "G-NTC7JFZZGW"
  };
  
const app = firebase.initializeApp(firebaseConfig);
// const database = app.database();

export default app;

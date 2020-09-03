import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';  
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCusq-73V62nv7YERT3fvP9tKuMORuuFrA",
    authDomain: "udrs-649a2.firebaseapp.com",
    databaseURL: "https://udrs-649a2.firebaseio.com",
    projectId: "udrs-649a2",
    storageBucket: "udrs-649a2.appspot.com",
    messagingSenderId: "105562741081",
    appId: "1:105562741081:web:b44c730754e1316e759448",
    measurementId: "G-3TBX8R9N06"
  };
  // Initialize Firebase
  export const db=firebase.initializeApp(firebaseConfig).firestore();
  
  
  export const storage = firebase.storage();
  const  Timestamp  = firebase.firestore
  export {Timestamp}

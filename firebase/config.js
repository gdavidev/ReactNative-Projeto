import Firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

if (!Firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyCzJAR_o1D5ZvzaSGv5gU3IZDYbJ9Y5tIY",
    authDomain: "pokedex-61261.firebaseapp.com",
    projectId: "pokedex-61261",
    storageBucket: "pokedex-61261.firebasestorage.app",
    messagingSenderId: "109481571474",
    appId: "1:109481571474:web:571bc5d7b32dc4e060224b"
  };

  Firebase.initializeApp(firebaseConfig);
}

export default Firebase;


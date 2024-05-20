import firebase from 'firebase/compat/app'; // Import the main Firebase module (compat mode)
import 'firebase/compat/auth'; // Import the authentication module
import 'firebase/compat/firestore'; // Import the Firestore module
import 'firebase/compat/storage'; // Import the Firebase Storage module
const firebaseConfig = {
  apiKey: "AIzaSyBxtvuqdhboIkvHpb848Igez6n-cQWXlUk",
  authDomain: "medicalwebsite2-5089f.firebaseapp.com",
  projectId: "medicalwebsite2-5089f",
  storageBucket: "medicalwebsite2-5089f.appspot.com",
  messagingSenderId: "708320186291",
  appId: "1:708320186291:web:3559abde4ac0f199a185c6"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
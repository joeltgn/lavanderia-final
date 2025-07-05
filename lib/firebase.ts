import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCBYzbMzRLjfZX0tzGk3k2AxnTohEp9RY",
  authDomain: "lavanderia-app-e9c9a.firebaseapp.com",
  projectId: "lavanderia-app-e9c9a",
  storageBucket: "lavanderia-app-e9c9a.appspot.com",
  messagingSenderId: "600759406343",
  appId: "1:600759406343:web:992b84075f4c0224557fa2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

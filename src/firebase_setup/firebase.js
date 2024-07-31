import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj0a45NBBTNrjxVIFCzQkZnO39Sb0cT1Y",
  authDomain: "week12-6b1f4.firebaseapp.com",
  projectId: "week12-6b1f4",
  storageBucket: "week12-6b1f4.appspot.com",
  messagingSenderId: "790447664045",
  appId: "1:790447664045:web:33565ce1b1d1904ccfcf24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
    });
    return true;
  } catch (error) {
    return { error: error.message }
  }
};
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return true;
  } catch (error) {
    return { error: error.message }
  }
};
const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};
export { app, signUp, signIn, signOut };


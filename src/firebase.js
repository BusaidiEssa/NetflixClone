import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyAinb6LFYXjLcUtc7MdrmPg7xiSBPhvNHU",
  authDomain: "netflix-clone-e5b68.firebaseapp.com",
  projectId: "netflix-clone-e5b68",
  storageBucket: "netflix-clone-e5b68.appspot.com",
  messagingSenderId: "931416648411",
  appId: "1:931416648411:web:d97d6b3412cc673646bafe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("User registered successfully");
  } catch (error) {
    console.log(error);
    toast.error(`${error.code.split('/')[1].split('-').join(" ")}. Please try again.`);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("User logged in successfully");
  } catch (error) {
    console.log(error);
    toast.error(`${error.code.split('/')[1].split('-').join(" ")}. Please try again.`);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("User logged out successfully");
  } catch (error) {
    console.log(error);
    toast.error(`${error.code.split('/')[1].split('-').join(" ")}. Please try again.`);
  }
};

export { auth, db, login, signup, logout };

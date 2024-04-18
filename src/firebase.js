import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL6tkTaCsbktTi5vGHFh1qgSABUQkou2I",
  authDomain: "factura-4fbc5.firebaseapp.com",
  projectId: "factura-4fbc5",
  storageBucket: "factura-4fbc5.appspot.com",
  messagingSenderId: "657797568582",
  appId: "1:657797568582:web:835b616b823848b2385247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
try {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;
  const q = query(collection(db, "users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
  }
} catch (err) {
  console.error(err);
  alert(err.message);
}
};

const logInWithEmailAndPassword = async (email, password) => {
try {
  await signInWithEmailAndPassword(auth, email, password);
} catch (err) {
  console.error(err);
  alert(err.message);
}
};

const registerWithEmailAndPassword = async (name, email, password) => {
try {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
  });
} catch (err) {
  console.error(err);
  alert(err.message);
}
};

const sendPasswordReset = async (email) => {
try {
  await sendPasswordResetEmail(auth, email);
  alert("Password reset link sent!");
} catch (err) {
  console.error(err);
  alert(err.message);
}
};

const logout = () => {
signOut(auth);
};

export {
auth,
db,
signInWithGoogle,
logInWithEmailAndPassword,
registerWithEmailAndPassword,
sendPasswordReset,
logout,
};

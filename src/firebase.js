import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDYw80QKr9CLEeq9PYomtPyYtYgO-5DTk",
  authDomain: "cp-fb-messenger-clone.firebaseapp.com",
  projectId: "cp-fb-messenger-clone",
  storageBucket: "cp-fb-messenger-clone.appspot.com",
  messagingSenderId: "935046178079",
  appId: "1:935046178079:web:331114201b841a78513c2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;

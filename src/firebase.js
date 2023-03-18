// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDB3ym0-Vkh6pE_9b1qS04-2oCsQqrukP8",
  authDomain: "manga-app-617a2.firebaseapp.com",
  projectId: "manga-app-617a2",
  storageBucket: "manga-app-617a2.appspot.com",
  messagingSenderId: "914708101390",
  appId: "1:914708101390:web:c8745ffb4cfa5df0a0bf5f",
  measurementId: "G-D8QLQH4Z74"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
        console.log(error);
    });
};


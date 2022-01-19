import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBSos-LjxHI_veeDl6q28FOJ0FGw6Cg7TM",
	authDomain: "clone-30348.firebaseapp.com",
	projectId: "clone-30348",
	storageBucket: "clone-30348.appspot.com",
	messagingSenderId: "189434551470",
	appId: "1:189434551470:web:88955b234cb10838f7213f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// setup database f9r app
const db = getFirestore(app);

// setup eamil and password configuration
const auth = getAuth();

export { db, auth };

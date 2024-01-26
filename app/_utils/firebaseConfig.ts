import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTvp8xuIL6CHzciwAgQL2I7jCWkR_HmwI",
    authDomain: "chaotic-url-shortener.firebaseapp.com",
    databaseURL: "https://chaotic-url-shortener-default-rtdb.firebaseio.com",
    projectId: "chaotic-url-shortener",
    storageBucket: "chaotic-url-shortener.appspot.com",
    messagingSenderId: "489084798653",
    appId: "1:489084798653:web:1ee9361cd24591d84c99d4",
    measurementId: "G-7K5L05Z6LW"
};
const app =  initializeApp(firebaseConfig);
export const db = getFirestore(app);
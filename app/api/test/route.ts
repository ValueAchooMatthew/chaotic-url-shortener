// import { NextResponse } from "next/server"
// import { initializeApp } from "firebase/app";
// import { collection, addDoc, getFirestore } from "firebase/firestore";
// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

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
const db = getFirestore(app);

export async function GET(request: NextRequest) {
    const time =`${new Date().getTime()}`;
    const submit = {
        [time]: `${request.url}`
    }
    const snapshot = doc(db, "websites/shortened sites");
    updateDoc(snapshot, submit)
    return {submit}
}
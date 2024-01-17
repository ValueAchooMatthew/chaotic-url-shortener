"use client";

import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore"; 
import {collection, getDocs} from "firebase/firestore";
import Link from "next/link";
import { BaseSyntheticEvent, useEffect, useState } from "react"

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default function Home() {

  const [links, setLinks] = useState<{original: string, shortened: string}[]>()

  const createURL = (website: string): URL | null => {
    try{
      const url = new URL(website);
      return url
    }catch(error){
      console.log("Please enter a valid URL " + error)
      return null;
    }
  }

  const handleSubmit = async (event: BaseSyntheticEvent)=>{
    event.preventDefault();
    if(event.target instanceof HTMLFormElement){
      if(event.target[0] instanceof HTMLInputElement){
        const submitted_text: string = event.target[0].value;
        const response = createURL(submitted_text);
        if(response){
          const snapshot = doc(db, "websites/shortened sites");
          console.log(snapshot);
          const time =`${new Date().getTime()}`;
          const submit = {
            [time]: `${response}`
          }
          updateDoc(snapshot, submit)
          setLinks((prevLinks) => {
            if(prevLinks){
              return [...prevLinks, {original: submit[time], shortened: time} ];
            }else{
              return [{original: submit[time], shortened: time}];
            }
          });
        }
      }
    }
  }
  return (
    <main className="p-14 ">
      <h1 className="text-center text-4xl font-semibold">
        Chaotic Url Generator
      </h1>
      <div className="w-[48rem] h-16 mx-auto mt-24">
        <form onSubmit={handleSubmit} className="w-full h-full">
          <input className="w-full h-full rounded-lg text-3xl px-3" type="text" />
        </form>
      </div>
      <div className="text-center mt-12">
        {links?
          <div className="">
            {
            links.map((link, index)=>{
              return(
                <div className="flex text-3xl justify-center" key={index}>
                  <Link className="inline-block" href={link.original}>
                    {link.original}:    
                  </Link>
                  <Link className="inline-block font-semibold" href={link.original}>
                    {link.shortened}
                  </Link>
                </div>
              )})
            }
          </div>
          :
          null
        }
      </div>

    </main>
  )
}

"use client";

// import { db } from "../api/test/route";
import { doc, updateDoc } from "firebase/firestore"; 
import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react"
import { GET } from "../api/test/route";
import { NextRequest } from "next/server";


export default function Home() {

  const [links, setLinks] = useState<{original: string, shortened: string}[]>()

  const createURL = (website: string): URL | null => {
    try{
      const url = new URL(website);
      return url
    }catch(error){
      return null;
    }
  }

  const handleSubmit = async (event: BaseSyntheticEvent)=>{
    event.preventDefault();
    if(event.target instanceof HTMLFormElement){
      if(event.target[0] instanceof HTMLInputElement){
        const submitted_text: string = event.target[0].value;
        const request = createURL(submitted_text);
        if(request){
          const response = await GET(new NextRequest(request))
          console.log(response)
          
          // const snapshot = doc(db, "websites/shortened sites");
          // const submit = {
          //   [time]: `${response}`
          // }
          setLinks((prevLinks) => {
            if(prevLinks){
              return [...prevLinks, {original: response[time], shortened: time} ];
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

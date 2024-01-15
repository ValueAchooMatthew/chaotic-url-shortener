"use client";

import { BaseSyntheticEvent } from "react"

export default function Home(props: any) {
  
  

  const createURL = (website: string): URL | null => {
    try{
      const url = new URL(website);
      return url
    }catch(error){
      console.log("Please enter a valid URL " + error)
      return null;
    }
  }

  const handleSubmit = (event: BaseSyntheticEvent)=>{
    event.preventDefault();
    if(event.target instanceof HTMLFormElement){
      if(event.target[0] instanceof HTMLInputElement){
        const submitted_text: string = event.target[0].value;
        const response = createURL(submitted_text);
        if(response){
          console.log(response)
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
    </main>
  )
}

"use client";

import { BaseSyntheticEvent, useState } from "react"
import { POST } from "../api/test/route";
import { NextRequest } from "next/server";
import Link from "next/link";
import About from "../_components/about";

export default function Home() {

  const forbiddenChars = [";", "/", "~", "*", "[", "]", ",", ".", "@", "'", "%", "&"]

  const [link, setLink] = useState<URL>()
  const [word, setword] = useState<string>();
  const [wordDisplay, setwordDisplay] = useState<boolean>(false);
  const [QTE, setQTE] = useState<boolean>(false);
  const [buttonDisplay, setButtonDisplay] = useState<boolean>(false);
  const [startQTETime, setQTETime] = useState<number>(0);
  const [offset, setOffset] = useState<[number, number]>();
  const [response, setResponse] = useState<[string, string]>();
  const [notification, setNotification] = useState<string>();

  const randomTimer = (): void =>{
    const randomTime = Math.random()*3000 + 500;
    const xO = Math.floor(Math.random()*100);
    const yO = Math.floor(Math.random()*100);
    setTimeout(()=>{
      setQTETime(new Date().getUTCMilliseconds());
      setButtonDisplay(true);
      setOffset([xO, yO]);
    }, randomTime)

  }

  const createURL = (website: string): URL | null => {
    try{
      const url = new URL(website);
      return url
    }catch(error){
      return null;
    }
  }

  const scrambleString = (word: string): string => {
    function sorter(a: string, b: string): number{
      const randNum = Math.floor(Math.random()*10)
      if(randNum <= 4){
        return 1;
      }else{
        return -1;
      }
    }
    return word.split("").sort(sorter).join("");
  }

  const handleWordSubmit = (event: BaseSyntheticEvent)=>{
    event.preventDefault();
    if(event.target instanceof HTMLFormElement){
      if(event.target[0] instanceof HTMLInputElement){
        const word = event.target[0].value;
        if(forbiddenChars.some((char)=>word.includes(char))){
          setNotification("Invalid word, please type a word without any of the following characters: ; / ~ * [ ]");
          setTimeout(()=>{setNotification(undefined)}, 3000);
          return;
        }
        // console.log(word);
        const scrambledword = scrambleString(word);
        setword(scrambledword);
        setQTE(true);
        randomTimer();
        
      }
    }
  }
  const handleSiteSubmit = async (event: BaseSyntheticEvent)=>{
    event.preventDefault();
    if(event.target instanceof HTMLFormElement){
      if(event.target[0] instanceof HTMLInputElement){
        const submitted_text: string = event.target[0].value;
        const url = createURL(submitted_text);
        if(url){
          setButtonDisplay(false);
          setLink(url);
          setwordDisplay(true);
          setQTE(false);
          setResponse(undefined);
        }else{
          setNotification("Invalid URL, please provide a complete URL starting with http or https");
          setTimeout(()=>{
            setNotification(undefined);
          }, 3000)
        }
      }
    }
  }
  return (
    <>
      <main className="p-14 h-screen w-full">
      <h1 className="text-center text-4xl font-semibold">
        Chaotic Url Generator
      </h1>
      <div className="w-[48rem] h-16 mx-auto mt-24">
        <form onSubmit={handleSiteSubmit} className="w-full h-full">
          <input className="w-full h-full rounded-lg text-3xl px-3" type="text" />
        </form>
      </div>
      <div>
        {notification?
          <div className="text-center text-red-600 mt-2">
            {notification}
          </div>
          :
          null
        }
      </div>
      {wordDisplay?
        <>
          <h2 className="text-3xl text-center mt-6">
            Okay, now type any word
          </h2>
          <div className="w-[48rem] h-16 mx-auto mt-10">
            <form onSubmit={handleWordSubmit} className="w-full h-full">
              <input className="w-full h-full rounded-lg text-3xl px-3" type="text" />
            </form>
          </div>
          {
        QTE?
        <>
          <h2 className="text-3xl text-center mt-6">
            Good, last step! Click the button...
          </h2>
          {
            (buttonDisplay && offset)?
            <>
              <h3 className="text-2xl text-center mt-2">
              Now!
              </h3>
              <div className="mt-8 w-full h-96">
                <button
                onClick={()=>{
                  if(word && link){
                    const currentTime = new Date().getUTCMilliseconds();
                    const timeDiff = (currentTime - startQTETime).toString();
                    const randomCharOne = link.toString().charAt(Math.random()*link.toString().length);
                    const randomCharTwo = link.toString().charAt(Math.random()*link.toString().length);
                    const shortenedURL =  scrambleString(
                      (forbiddenChars.includes(randomCharOne)? "":randomCharOne) + timeDiff + word + (forbiddenChars.includes(randomCharTwo)? "":randomCharTwo) 
                    )
                    POST(new NextRequest(link), shortenedURL);
                    setResponse([link.toString(), shortenedURL]);
                    setwordDisplay(false)
                  }
                }}
                style={{
                  marginLeft: `${offset[0]}%`,
                  marginTop: `${offset[1]}&`

                }} 
                className={"px-2 py-1.5 text-lg font-semibold text-gray-950 rounded-lg bg-red-300 "}>
                  Click here! :P
                </button>
              </div>

            </>

            :
            null
          }
        </>

        :
        null
      }
        </>
      :
      null
      }
      {
        response?
        <div className=" flex flex-col justify-center align-middle mt-8">
          <h1 className="text-3xl text-center">
            Congrats, your new shortened URL is: 
          </h1>
          <div className="flex justify-center mt-6 text-xl">
            <Link className="text-blue-800 underline" target="_" href={response[0]}>
              {response[0] +":"}
            </Link>
            <Link className="mx-2 text-green-800 underline" target="_" href={window.location.protocol+"//"+window.location.host +"/"+response[1]}>
              {window.location.host+"/"+response[1]}
            </Link>
          </div>
        </div>
        :
        null

      }
      <div className="text-center mt-12 ">
        View your saved URLs <Link className="text-blue-800 underline" href="/saved-urls">here</Link>
      </div>

    </main>
    <About></About>
    
    </>

  )
}

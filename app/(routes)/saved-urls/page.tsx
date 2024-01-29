"use client";

import About from "@/app/_components/about";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(){

    const [shortenedSites, setShortenedSites] = useState<([string, string] | undefined)[]>();

    useEffect(()=>{
        const savedSites = {...window.localStorage}
        const dataArray = Object.keys(savedSites).map((originalSite): [string, string] | undefined=>{
            if(originalSite.startsWith("http")){
                return [originalSite, savedSites[originalSite]];
            }else{
                return undefined;
            }
        });
        setShortenedSites(dataArray);

    }, [])

    return (
    
    <>
        <div className="h-screen w-full">
            <h1 className="text-5xl text-center mt-12 font-semibold">
                Your Shortened Sites    
            </h1>
            <div className="flex justify-center">
                <table className="mt-8 table-fixed ">
                    <thead className="">
                        <tr className="text-3xl w-full">
                            <th>
                                Original Sites
                            </th>
                            <th>
                                Shortened Sites
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {shortenedSites?.map((ss, index)=>{
                            if(!ss){
                                return;
                            }
                            const [originalSite, shortenedSite] = ss;
                            return(
                                <tr className="border-2 border-black text-center w-50" key={index}>
                                    <td className="px-8 py-2 w-45">
                                        <Link className="text-blue-800 underline" target="_" href={originalSite}>
                                            {originalSite}
                                        </Link>
                                    </td>
                                    <td className=" px-8 py-2 w-45 text-center">
                                        <Link className="text-green-800 underline" target="_" href={shortenedSite}>
                                            {shortenedSite}
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <p className="text-center mt-6">
                Go back to main page <Link className="text-blue-800 underline" href="/">here</Link>
            </p>
        </div>
        <About></About>
    </>

    )
}
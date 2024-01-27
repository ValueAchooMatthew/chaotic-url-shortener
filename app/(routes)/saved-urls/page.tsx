"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(){

    const [shortenedSites, setShortenedSites] = useState<([string, string] | undefined)[]>();

    useEffect(()=>{
        const savedSites = {...window.localStorage}
        const dataArray = Object.keys(savedSites).map((originalSite): [string, string] | undefined=>{
            if(originalSite != "debug"){
                return [originalSite, savedSites[originalSite]];
            }else{
                return undefined;
            }
        });
        setShortenedSites(dataArray);

    }, [])

    return (
        <>
            <h1 className="text-5xl text-center mt-12 font-semibold">
                Your Shortened Sites    
            </h1>
            <div className="flex justify-center">
                <table className="mt-8 table-fixed">
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
                        {shortenedSites?.map((element: [string, string] | undefined, index)=>{
                            if(!element){
                                return;
                            }
                            const originalSite = element[0];
                            const shortenedSite = element[1];
                            return(
                                <tr className="border-2 border-black text-center" key={index}>
                                    <td className="px-8 py-2 md:w-96 w-60">
                                        <Link className="text-blue-800 underline py-1.5" href={originalSite}>
                                            {originalSite}
                                        </Link>
                                    </td>
                                    <td className="px-8 py-2 md:min-w-96 w-60">
                                        <Link className="text-green-800 underline py-1.5" href={shortenedSite}>
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



        </>


    )

}
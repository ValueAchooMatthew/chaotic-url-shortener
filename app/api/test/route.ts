import { doc, updateDoc } from "firebase/firestore";
import { NextRequest } from "next/server";
import { db } from "@/app/_utils/firebaseConfig";

export function POST(request: NextRequest, shortenedURL: string){
    const submit = {
        [shortenedURL]: `${request.url}`
    };
    const snapshot = doc(db, "websites/shortenedURLs");
    updateDoc(snapshot, submit);
    window.localStorage.setItem(request.url, window.location.protocol+"//"+window.location.host +"/"+shortenedURL);
}
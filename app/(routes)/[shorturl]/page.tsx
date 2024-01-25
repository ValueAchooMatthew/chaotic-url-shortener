"use client";
import { useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore"; 
import { database } from '../../api/test/route';

export default function ShortUrlPage({params}: { params: {shorturl: string}}) {
  const url = params.shorturl;

  useEffect(() => {
    if (url) {
      const fetchUrl = async () => {
        const websiteDoc = doc(database, "websites/shortenedURLs");
        const websiteData = await getDoc(websiteDoc);
        const sites = websiteData.data();
        if (websiteData.exists() && sites && sites[url]) {
          const originalUrl = sites[url];
          window.location.href = originalUrl;
        } else {
          // Handle the case where the short URL does not exist in your database
        }
      };
      fetchUrl();
    }
  }, [url]);

  return null; // This page does not need to render anything because it just redirects the user
}
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Footer() {

  // useEffect(() => {
  //   const lastPopupTime = localStorage.getItem('lastPopupTime');
  //   if (!lastPopupTime || Date.now() - Number(lastPopupTime) >= 7 * 24 * 60 * 60 * 1000) {
  //     setshowAlert(true);
  //     localStorage.setItem('lastPopupTime', String(Date.now()));
  //   }
  // }, []);


  return (
    <footer className="w-full  h-1/12 text-center  bg-slate-200  flex flex-col justify-center items-center">
      <div >
        <p className="text-xs text-gray-500">Copyright Ⓒ 2024 All rights reserved. 请勿上传违反中国法律的图片，违者后果自负。 本程序基于Telegraph，开源于
          <Link 
          href="https://github.com/x-dr/telegraph-Image"
          className="text-blue-300  hover:text-red-900 ml-1"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub Telegraph-Image</Link> </p>
      </div>
    </footer>
  );
}

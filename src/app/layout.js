

"use client";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './styles/globals.css'
import { Prompt } from 'next/font/google'
import { AppWrapper } from '@/hotelContext';
import { NextAuthProvider } from "./provider";
import AlertPopup from "./components/AlertPopup";
import { AlertContextProvider } from '@/AlertContext';
import { Suspense } from 'react'
import Loading from './loading';

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"]
});

export default async function RootLayout(props) {

  return (
    <html lang="en">
      <head>

      </head>
      <body className={prompt.className}>
        <AppWrapper>
          <NextAuthProvider>
            <AlertContextProvider>
              <AlertPopup xs={{ position: 'absolute',top:'50%',left:0 }} />
              <Navbar />
                <Suspense fallback={<Loading/>}>
                    {props?.children}
               </Suspense>
              <Footer />
            </AlertContextProvider>
          </NextAuthProvider>
        </AppWrapper>
      </body>
    </html>
  )
}

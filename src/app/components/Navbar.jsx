"use client";
import React, { useState, useRef } from "react";
import styles from "../styles/style";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackdropComponent } from "./BackdropComponent";
import { CircularProgress } from "@mui/material";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session,"session")
  const [nav, setNav] = useState(false);
  const [clickedOutside, setClickedOutside] = useState(false);
  const router = useRouter();
  const [backdrop, setBackdrop] = useState(false);
  const [content, setContent] = useState("");
  const [display, setDisplay] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      <BackdropComponent
        backdrop={backdrop}
        setBackdrop={setBackdrop}
        content={content}
      />
      <div className={`${styles.width} flex justify-between items-center py-8`}>
        <div className="flex gap-16 items-center">
          <Link href="/">
            <h4 className="font-semibold text-2xl">NIfty Travels</h4>
          </Link>

          {/* <div className="">
            <ul className="hidden md:flex gap-10 items-center font-light">
              <li>
                <a href="/">Properties</a>
              </li>
              <li>
                <a href="/">Attractions</a>
              </li>
              <li>
                <a href="/">Popular</a>
              </li>
            </ul>
          </div>*/}
        </div> 
        {session !== null ? 
        
        
        session == undefined ?
        
        <CircularProgress size={20} color="inherit" />

        :
        (
          <div className="hidden md:flex gap-5" id="navbar-dropdown">
            <ul>
              <li>
                <div
                  onClick={() => {
                    setDisplay(!display);
                  }}
                  style={{ cursor: "pointer" }}
                  className="relative inline-flex items-center border-[1px] justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                >
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {session?.token?.firstName.substring(0, 1)}
                    {session?.token?.lastName.substring(0, 1)}
                  </span>
                </div>

                <div
                  onMouseLeave={() => {
                    setDisplay(!display);
                  }}
                  style={{ display: display ? "block" : "none" }}
                  id="dropdownNavbar"
                  className="z-10 absolute right-[100px] font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-center text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="/bookings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        My Bookings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setContent("Logging Out ....");
                        setBackdrop(true);
                        signOut({
                          redirect: false,
                        });

                        setTimeout(() => {
                          setBackdrop(false);
                        }, 5000);
                        router.push(process.env.NEXTAUTH_URL);
                      }}
                      className="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Sign out
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex gap-5">
            <a href="/signup">
              <button className="text-primary text-sm px-8 py-2 rounded-3xl border-[1px] border-solid border-primary">
                Sign Up
              </button>
            </a>
            <a href="/login">
              <button className="text-white text-sm px-8 py-2 rounded-3xl bg-primary">
                Log in
              </button>
            </a>
          </div>
        )}

        {/* Hamburger Icon */}
        <div onClick={handleNav} className="md:hidden">
          <HiOutlineMenuAlt3
            className="cursor-pointer text-[#030303]"
            size={32}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      <div className="relative z-[200]">
        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70"
              : ""
          }
        >
          {/* Side Drawer Menu */}
          <div
            className={
              nav
                ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-primary p-10 ease-in duration-500"
                : "fixed left-[-100%] top-0 p-10 ease-in duration-500 h-screen"
            }
          >
            <div>
              <div className="flex w-full items-center justify-between">
                <Link href="/">
                  <h4 className="font-semibold text-2xl text-white">
                  NIfty Travels
                  </h4>
                </Link>
                <div
                  onClick={handleNav}
                  className="rounded-full shadow-md shadow-gray-800 p-3 cursor-pointer"
                >
                  <AiOutlineClose className="text-white" />
                </div>
              </div>
            </div>
            <div className="py-14 flex flex-col justify-center gap-5">
             
              {session?.token?.email ? (
                <>
                  <li
                    onClick={() => {
                      setNav(false);
                      router.push("/bookings");
                    }}
                    className="py-4 text-sm text-white list-none"
                  >
                    My Bookings
                  </li>
                  <li
                    onClick={() => {
                      setNav(false);
                      setContent("Logging Out ....");
                      setBackdrop(true);
                      signOut({
                        redirect: false,
                      });

                      setTimeout(() => {
                        setBackdrop(false);
                      }, 5000);
                      router.push(process.env.NEXTAUTH_URL);
                    }}
                    className="py-4 text-sm text-white list-none"
                  >
                    Sign Out
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={() => {
                      setNav(false);
                      router.push("/signup");
                    }}
                    className="py-4 text-sm text-white list-none"
                  >
                    Sign Up
                  </li>
                  <li
                    onClick={() => {setNav(false);router.push('/login')}}
                    className="py-4 text-sm text-white list-none"
                  >
                    Log in
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

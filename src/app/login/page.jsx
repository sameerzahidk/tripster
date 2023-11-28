"use client";
import React, { useState } from "react";
import style from "../styles/Index.module.css";
import { signIn } from "next-auth/react";
import { useAppContext } from "@/hotelContext";
import { useRouter } from "next/navigation";
import { useAlertContext } from "@/AlertContext";
import { BackdropComponent } from "../components/BackdropComponent";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const LoginForm = () => {
  const { setAlert } = useAlertContext();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { hotel } = useAppContext();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [backdrop, setBackdrop] = useState(false);
  const [content, setContent] = useState("");
  function login(e) {
    setBackdrop(true);
    e.preventDefault();
    signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    }).then((response) => {
      if (response.ok) {
        setContent("Redirecting to details page.....");
        let bookingFlag = localStorage.getItem("bookingFlag");
        if (
          bookingFlag !== undefined &&
          bookingFlag !== "" &&
          bookingFlag !== null
        ) {
          setTimeout(() => {
            setBackdrop(false);
          }, 6000);
          localStorage.removeItem("bookingFlag");
          router.push("/hotel-details/" + bookingFlag);
        } else {
          setContent("Logging in...");
          setTimeout(() => {
            setBackdrop(false);
          }, 6000);

          router.push("/bookings");
        }
      } else {
        setBackdrop(false);
        setAlert("Wrong emailId or password", "error");
      }
    });
  }

  return (
    <div className="py-5 md:border-r-[1px] border-solid border-[#DEDEDE]">
      <BackdropComponent
        backdrop={backdrop}
        setBackdrop={setBackdrop}
        content={content}
      />
      <div className="w-[90%] md:w-[50%] h-auto m-auto text-left ">
        <h4 className="text-xl font-semibold mt-2 mb-4">LOGIN</h4>

        <form className="">
          <div>
            <div className="flex flex-col gap-3 mt-4">
              <div>
                <label className="text-sm mb-1 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="john.late@gmail.com"
                  className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Password</label>
                <div className="flex">
                  <input
                    type={showPassword ?'text':"password"}
                    name="password"
                    id=""
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder=""
                    className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                  />

                  <div onClick={()=>{setShowPassword(!showPassword)}}
                    style={{
                      marginLeft: "-30px",
                      marginTop: "9px",
                      cursor: "pointer",
                    }}
                  >
                   {
                    showPassword ? <BsFillEyeFill className="text-xl font-bold" /> : <BsFillEyeSlashFill className="text-xl font-bold" />

                   } 
                    
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  disabled={!email || !password}
                  onClick={(e) => {
                    login(e);
                  }}
                  className={`bg-primary px-6 py-1.5 text-sm text-white mt-2 rounded-3xl w-[30%] py-3`}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

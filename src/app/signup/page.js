"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useAlertContext } from "@/AlertContext";
import { BackdropComponent } from "../components/BackdropComponent";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const signupForm = () => {
    const router = useRouter();
    const { setAlert } = useAlertContext();
    var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
    var passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/);
    const [backdrop, setBackdrop] = useState(false)
    const [content, setContent] = useState('')
    const { data: session } = useSession()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirst] = useState()
    const [lastName, setLast] = useState()
    const [mobile, setMobile] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const submitData = async (e) => {
        setBackdrop(true)
        e.preventDefault();
        if (email !== undefined && password !== undefined && mobile !== undefined && firstName !== undefined && lastName !== undefined) {
            //Validation
            if (!email || !email.includes('@') || !password) {
                alert('Invalid details');
                return;
            }
            //POST form values
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    mobile: mobile,
                    firstName: firstName,
                    lastName: lastName
                }),
            });
            //Await for data for any desirable next steps
            const data = await res.json();
            console.log(res, data, "response")
            if (res.ok) {


                setContent("Redirecting to login page.....");
                setTimeout(() => {
                    setBackdrop(false)
                }, 6000);
                router.push('/login', { shallow: true })
            }
            else {
                setBackdrop(false)
                setAlert(data.message, "error");
            }
        }
        else {
            setAlert("fill all details", "error")
        }


    };

    return (
        <div className="py-5 md:border-r-[1px] border-solid border-[#DEDEDE]">
            <BackdropComponent backdrop={backdrop} setBackdrop={setBackdrop} content={content} />

            <div className=" w-[90%] md:w-[50%] h-auto m-auto text-left ">

                <h4 className="text-xl font-semibold mt-2 mb-4">
                    SIGNUP
                </h4>
                <form className="">

                    <div>
                        <div className="flex flex-col gap-3 mt-4">
                            <div>
                                <label className="text-sm mb-1 block">
                                    First name
                                </label>
                                <input

                                    name="password"
                                    id=""
                                    onChange={(e) => {
                                        setFirst(e.target.value)
                                    }}
                                    placeholder="Jhon"
                                    className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                                />
                            </div>
                            <div>
                                <label className="text-sm mb-1 block">
                                    Last name
                                </label>
                                <input

                                    name="password"
                                    id=""
                                    onChange={(e) => {
                                        setLast(e.target.value)
                                    }}
                                    placeholder="Late"
                                    className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                                />
                            </div>
                            <div>
                                <label className="text-sm mb-1 block">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    maxLength="12"
                                    value={mobile}
                                    id=""
                                    onChange={(e) => {
                                        console.log(pattern.test(e.target.value))
                                        if (pattern.test(e.target.value)) {
                                            setMobile(e.target.value)
                                        }
                                        else {
                                            setMobile('')
                                        }
                                    }}
                                    placeholder=""
                                    className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                                />
                            </div>
                            <div>
                                <label className="text-sm mb-1 block">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id=""
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    placeholder="john.late@gmail.com"
                                    className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                                />
                            </div>
                            <div>
                                <label className="text-sm mb-1 block">
                                    Password
                                </label>
                                <div className="flex">
                                    <input
                                        type={showPassword ? 'text' : "password"}
                                        name="password"
                                        id="" value={password}
                                        onBlur={(e) => {
                                            console.log(passwordPattern.test(e.target.value), "test")
                                            if (passwordPattern.test(e.target.value)) {
                                                console.log(e.target.value, "true")

                                                setPassword(e.target.value)
                                            }
                                            else {
                                                console.log(e.target.value, "false")

                                                setAlert("A minimum 8 characters password contains a combination of uppercase and lowercase letter and special character and number are required.", "error")
                                                setPassword('')
                                            }
                                        }}
                                        onChange={(e) => {
                                            console.log(e.target.value, 'on chnage')
                                            setPassword(e.target.value)
                                        }
                                        }
                                        placeholder=""
                                        className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                                    />
                                    <div onClick={() => { setShowPassword(!showPassword) }}
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
                                <button disabled={!email || !password || !mobile || !firstName || !lastName} onClick={(e) => { submitData(e) }} className={`bg-primary px-6 py-1.5 text-sm text-white mt-2 rounded-3xl w-[30%] py-3`}>Submit</button>
                            </div>


                        </div>
                    </div>


                </form>



            </div>
        </div>
    );
};

export default signupForm;

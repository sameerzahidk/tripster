"use client";
import React, { useState, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FaClock, FaDog } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { MdSmokeFree, MdNoDrinks } from "react-icons/md";
import style from "../../styles/Index.module.css";
import { useAppContext } from "@/hotelContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdultsInformation = ({ adultsCount }) => {
  const {
    adultsData,
    setAdultsData,
    personalData,
    setPersonalData,
    childsData,
    setChildsData,
    filterData,
  } = useAppContext();
  const components = [];

  const handleChange = (e, i) => {
    e.preventDefault();
    setAdultsData({
      ...adultsData,
      [i]: { ...adultsData[i], [e.target.name]: e.target.value },
    });
  };

  for (let i = 0; i < adultsCount; i++) {
    components.push(
      <div className="flex flex-col gap-3 mt-4  relative ${style.formBorder} py-6 ">
        Adult :
        <div>
          <label className="text-sm mb-1 block">First name *</label>
          <input
            type="text"
            name="firstName"
            value={adultsData[i]?.firstName}
            id=""
            onChange={(e) => handleChange(e, i)}
            placeholder="e.g. Maria Lost"
            className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
          />
        </div>
        <div>
          <label className="text-sm mb-1 block">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={adultsData[i]?.lastName}
            id=""
            onChange={(e) => handleChange(e, i)}
            className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
          />
        </div>
      </div>
    );
  }

  return <div>{components}</div>;
};
const ChildsInformation = ({ childsCount }) => {
  const {
    adultsData,
    setAdultsData,
    personalData,
    setPersonalData,
    childsData,
    setChildsData,
    filterData,
  } = useAppContext();
  const components = [];

  const handleChange = (e, i) => {
    e.preventDefault();
    setChildsData({
      ...childsData,
      [i]: { ...childsData[i], [e.target.name]: e.target.value },
    });
  };
  for (let i = 0; i < childsCount; i++) {
    components.push(
      <div className="flex flex-col gap-3 mt-4  relative ${style.formBorder} py-6 ">
        Children :
        <div>
          <label className="text-sm mb-1 block">First name </label>
          <input
            type="text"
            name="firstName"
            value={childsData?.[i]?.firstName}
            id=""
            onChange={(e) => handleChange(e, i)}
            placeholder="e.g. Maria Lost"
            className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
          />
        </div>
        <div>
          <label className="text-sm mb-1 block">Last Name </label>
          <input
            type="text"
            name="lastName"
            value={childsData?.[i]?.lastName}
            id=""
            onChange={(e) => handleChange(e, i)}
            className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
          />
        </div>
        <div>
          <label className="text-sm mb-1 block">Age *</label>
          <input
            type="number"
            maxLength="2"
            name="age"
            value={childsData?.[i]?.age}
            id=""
            onChange={(e) => handleChange(e, i)}
            className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
          />
        </div>
      </div>
    );
  }

  return <div>{components}</div>;
};
const BookingForm = ({ hotel, hotelDetails }) => {
  const {
    adultsData,
    setAdultsData,
    personalData,
    setPersonalData,
    childsData,
    setChildsData,
    filterData,
  } = useAppContext();
  const [childError, setChildError] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  var pattern = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i
  );
  console.log(hotelDetails,hotel,"hotel deets")
  useEffect(() => {
    if (session) {
      setPersonalData({
        name: session?.token?.firstName + " " + session?.token?.lastName,
        email: session?.token?.email,
        phone: session?.token?.mobile,
      });
    }
  }, []);

  console.log(personalData, "personal");
  return (
    <div className="py-5 md:border-r-[1px] border-solid border-[#DEDEDE]">
      <div className="md:pr-28">
        <div onClick={()=>{router.go(-1)}}>
          <BsArrowLeftShort className="text-4xl font-bold" />
        </div>
        <h4 className="text-xl font-semibold mt-2 mb-4">Book {hotel?.name}</h4>

        {/* STEP-1 */}
        {/* <h5 className="text-xl font-medium mt-6 mb-4">Step 1:</h5>

        <div>
          <p className="text-sm mb-2">Property amenities</p>
          <div className="flex gap-3 flex-wrap">
            {hotelDetails !== undefined &&
              hotelDetails.facilities
                .filter((item, index) => index < 8)
                .map((facility) => (
                  <div className="flex gap-3 items-center text-sm font-light">
                    <span>{facility.description.content}</span>
                  </div>
                ))}
          </div>
        </div>
        
        <form className="">
          <fieldset className="pb-8">
            <label className="text-sm mb-2 block">Choose Room Option</label>
            <div className="w-full relative text-sm bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl">
              <select
                className="w-full inline-block  bg-transparent cursor-pointer"
                name=""
                id=""
              >
                <option>  2 separate beds</option>
              </select>
            </div>
          </fieldset> */}

          {/* STEP-2 */}
          <div >
            <h5 className="text-xl font-medium pb-4">Step 1: Personal data</h5>
            <div className="flex flex-col gap-3 mt-4">
              <div>
                <label className="text-sm mb-1 block">
                  First and Last name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={session?.token?.firstName}
                  id=""
                  onChange={(e) => {
                    setPersonalData({
                      ...personalData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="e.g. Maria Lost"
                  className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Email address *</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  value={session?.token?.email}
                  onChange={(e) => {
                    setPersonalData({
                      ...personalData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="john.late@gmail.com"
                  className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Phone number *</label>
                <input
                  type="text"
                  name="phone"
                  id=""
                  value={session?.token?.mobile}
                  onChangeCapture={(e) => {
                    setPersonalData({
                      ...personalData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  onChange={(e) => {
                    setPersonalData({
                      ...personalData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="+123 001 234 567"
                  className="w-full text-sm font-light bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-2 rounded-3xl"
                />
              </div>
            </div>
          </div>

          {/* STEP-3 */}
          <div className={`relative  py-6`}>
            <h5 className="text-xl font-medium mb-4">Step 2: Room details</h5>
            {
              <React.Fragment>
                <AdultsInformation
                  adultsCount={
                    filterData !== undefined && filterData !== ""
                      ? filterData.adults
                      : 0
                  }
                />
                <ChildsInformation
                  childsCount={
                    filterData !== undefined && filterData !== ""
                      ? filterData.children
                      : 0
                  }
                />
              </React.Fragment>
            }
          </div>

        <div className={`relative py-6`}>
          <h5 className="text-xl font-medium mb-4">House rules</h5>
          <div className="flex gap-28">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <FaClock />
                <span className="text-sm">Check-in time</span>
              </div>
              <span className="text-base font-light">
                From{" "}
                {hotelDetails !== undefined &&
                  hotelDetails.facilities?.filter(
                    (deets) => deets.description.content == "Check-in hour"
                  )?.[0]?.timeFrom}{" "}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1">
                <TiDelete className="text-xl" />
                <span className="text-sm">Check-out time</span>
              </div>
              <span className="text-base font-light">
                Until{" "}
                {hotelDetails !== undefined &&
                  hotelDetails.facilities?.filter(
                    (deets) => deets.description.content == "Check-out hour"
                  )?.[0]?.timeTo}
              </span>
            </div>
          </div>
        </div>
{/* 
        <div className="mb-8">
          <span className="text-sm mb-2 block">Beware</span>
          <div className="flex gap-8">
            <div className="flex gap-2 items-center text-sm font-light">
              <span className="text-lg">
                <FaDog />
              </span>
              <span>No pets allowed</span>
            </div>

            <div className="flex gap-2 items-center text-sm font-light">
              <span className="text-lg">
                <MdSmokeFree />
              </span>
              <span>No smoking</span>
            </div>

            <div className="flex gap-2 items-center text-sm font-light">
              <span className="text-lg">
                <MdNoDrinks />
              </span>
              <span>No partying</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BookingForm;

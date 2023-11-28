"use client";
import React, { useState, useEffect } from "react";
import ImgGallery from "../../components/HotelDetails/ImgGallery";
import HotelDescription from "../../components/HotelDetails/HotelDescription";
import Rooms from "../../components/HotelDetails/Rooms";
import Reviews from "../../components/HotelDetails/Reviews";
import { Auth } from "@/authorize";
import { useAppContext } from "@/hotelContext";
import { BackdropComponent } from "@/app/components/BackdropComponent";

const HotelDetails = ({ params }) => {
  const { hotelCode = '' } = params;
  const {
    filterData,
    setFilterData,
    states,
    setStates,
    childsData,
    setChildsData, nearHotels, setNearHotels, setIsLoading, setDefaultHotels, defaultHotels
  } = useAppContext();
  const [hotelDetails, setHotelDetails] = useState()
  const [hotelBookingData, setHotelBookingData] = useState()
  const [content, setContent] = useState()
  const [backdrop, setBackdrop] = useState(false);
  var storedItem;
  useEffect(()=>{
    console.log("here in filterData")
   

    if(filterData?.length == undefined){
      setContent("Loading")
      setBackdrop(true)
      storedItem = sessionStorage.getItem('filterData')
      if (storedItem) {
        // Parse the stored JSON string back into an object
        setFilterData(JSON.parse(storedItem));
      }
     }
   

  },[])
console.log(filterData,"filterData")
  const getDetailsHotels = async () => {
    setBackdrop(true)
    setContent('Loading Details')
    var signature = await Auth();
    let paxes = [];
    if (childsData !== undefined && Object.keys(childsData).length > 0) {
      Object.values(childsData)
        .filter((item, index) => index < filterData?.children)
        .map((item) => {
          paxes.push({
            type: "CH",
            age: item.age,
          });
        });
    }
    const reponse = await fetch("/api/hotel/" + hotelCode, {
      method: "POST",
      headers: {
        "X-Signature": signature,
      },
      body: JSON.stringify({
        checkIn: filterData?.checkIn,
        checkOut: filterData?.checkOut,
        rooms: filterData?.rooms,
        adults: filterData?.adults,
        children: filterData?.children,
        destinationCode: filterData?.destinationCode,
        shiftDays: filterData?.shiftDays,
        boards: filterData?.popular,
        reviews: filterData?.rating,
        price: filterData?.price,
        paxes: paxes,
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res?.data, "merged hotel details")

        setHotelBookingData(res?.data?.[0])
        setHotelDetails(res?.data?.[1])
        setBackdrop(false)
      });
  };

  useEffect(() => {
    console.log("hotel code")
    if(filterData !== undefined){
      console.log("inside")
      setBackdrop(false)
      getDetailsHotels()

    }
  }, [filterData]);
 
  return (
    <div>
            <BackdropComponent backdrop={backdrop} setBackdrop={setBackdrop} content={content} />

      <ImgGallery hotelDetails={hotelDetails}  />
      <HotelDescription hotelDetails={hotelDetails}  />
      <Rooms hotelDetails={hotelDetails} hotelBookingData={hotelBookingData} />
      {/* <Reviews /> */}
    </div>
  );
};

export default HotelDetails;

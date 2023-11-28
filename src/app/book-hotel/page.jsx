"use client";
import React, { useEffect } from "react";
import BookingForm from "../components/BookHotel/BookingForm";
import RoomDetails from "../components/BookHotel/RoomDetails";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/hotelContext";

const page = () => {
  const { selectedHotel,setSelectedHotel, selectedRooom ,setSelectedRoom} = useAppContext()
  const router = useRouter();

  useEffect(() => {
    if(selectedHotel.length < 1)
    {
      router.push('/search');
    }



  },[])
  
useEffect(()=>{
  if(selectedRooom == null && selectedHotel == []){
    const room = sessionStorage.getItem('selectedRoom')
    setSelectedRoom(JSON.parse(room))

    const hotel = sessionStorage.getItem('selectedHotel')
    setSelectedHotel(JSON.parse(hotel))

  }

},[])
  return (
    <div className="border-t-[1px] border-solid border-[#DEDEDE]">
      <div className={`w-[90%] m-auto md:flex gap-10`}>
        <div className="basis-1/2">
          <BookingForm hotel={selectedHotel[0]} hotelDetails={selectedHotel[1]}/>
        </div>

        <div className="basis-1/2 md:pl-[3%]">
          <RoomDetails hotel={selectedHotel[0]} hotelDetails={selectedHotel[1]} selectedRooom={selectedRooom} />
        </div>
      </div>
    </div>
  );
};

export default page;

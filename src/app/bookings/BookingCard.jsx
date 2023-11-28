"use client";
import React from "react";

const BookingCard = ({data}) => {
  return (
    <div className="bg-white md:flex w-[100%] md:w-[320px] justify-between rounded-2xl shadow-[0_0px_10px_0px_#dedede] p-4">
      <div className="md:flex gap-4 w-full h-200px] md:h-[200px]">
        
        <div className="text-center md:text-left py-3 md:py-0 "style={{display:'flex', flexDirection:'column',justifyContent:'space-evenly'}}>
          <div className="flex flex-row items-center mt-1">
          <h1 >Name :  </h1> <h4 className="font-medium text-medium"> {data?.hotel?.name}</h4>

          </div>
          <div className="flex flex-col mt-1 text-left">
            <span className="text-sm font-light text-gray flex md:flex">
            <h1 > Check In : </h1> {data?.hotel?.checkIn}
            </span>
            <span className="text-sm font-light text-gray flex md:flex">
            <h1 > Check Out : </h1> {data?.hotel?.checkOut}
            </span>
          </div>

          <div className="my-4 mb-1 text-left">
            <h6 className="font-medium text-sm">Status : {data?.status}</h6>
            <span className="font-light text-sm">
              Price : {data?.currency} {data?.totalNet} 
            </span>
          </div>

        
        </div>
      </div>

   
    </div>
  );
};

export default BookingCard;

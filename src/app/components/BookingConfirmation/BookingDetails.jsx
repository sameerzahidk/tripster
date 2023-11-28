"use client";
import React from "react";

const BookingDetails = ({checkIn, checkOut, hotelDetails}) => {
  return (
    <div className="mt-5 md:mt-10 md:h-full">
      <div className="bg-white p-6 rounded-2xl shadow-[0_5px_10px_0px_#dedede]">
        <div className={`basis-1/2 hotelDetailImg w-full md:h-full `}>
          {
            hotelDetails?.image !== undefined ? 
            <img className="w-full rounded-2xl " src={process.env.HOTELBEDS_LARGE_IMAGE_PATH + hotelDetails?.image} />


            :
            <div className={`w-full rounded-2xl ${ hotelDetails?.image == undefined ? "hotel hotel1 h-[300px]" : ""}`}  />

          }
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-xl flex items-center gap-2">
            {hotelDetails && hotelDetails?.name}
          </h4>
        </div>
        <div className="flex flex-col gap-1 pt-5 pb-4  border-solid border-[#DEDEDE]">
          <div className="flex gap-3">
            <h6 className="text-sm font-medium w-[100px]">Check-in</h6>
            <span className="font-light text-sm">
              {checkIn !== undefined ? new Date(checkIn).toDateString() : ''}
            </span>
          </div>
          <div className="flex gap-3">
            <h6 className="text-sm font-medium w-[100px]">Check-out</h6>
            <span className="font-light text-sm">
              {checkOut !== undefined ? new Date(checkOut).toDateString() : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

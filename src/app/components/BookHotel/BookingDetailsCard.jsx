"use client";
import { useAppContext } from "@/hotelContext";
import React from "react";
const BookingDetailsCard = ({ children, hotelDetails }) => {
  const { filterData } = useAppContext();
  var stars =
    hotelDetails && hotelDetails.category.description?.content?.match(/\d+/g);

  const StarsComponent = () => {
    const components = [];
    for (let i = 0; i < stars; i++) {
      components.push(
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Second star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }

    return <div className="flex items-center mb-5">{components}</div>;
  };

  return (
    <div className="mt-5 md:mt-10 md:h-full">
      <div className="bg-white p-6 rounded-2xl shadow-[0_5px_10px_0px_#dedede]">
        <div className={`basis-1/2 hotelDetailImg w-full md:h-full `}>
          {
            hotelDetails?.images == undefined ?
            <img
            className="w-full hotel1 h-[300px] rounded-2xl"
            
          />
            :
            <img
            className="w-full rounded-2xl"
            src={
              process.env.HOTELBEDS_LARGE_IMAGE_PATH +
              hotelDetails?.images?.[0]?.path
            }
          />
          }
         
        </div>
        <div className="mt-4">
          <h4 className="font-medium text-xl flex items-center gap-2">
            {hotelDetails && hotelDetails.name?.content}
          </h4>
          <p className="text-sm font-light">
            <StarsComponent />
          </p>
        </div>
        <div className="flex flex-col gap-1 pt-5 pb-4 border-b-[1px] border-solid border-[#DEDEDE]">
          <div className="flex gap-3">
            <h6 className="text-sm font-medium w-[100px]">Check-in</h6>
            <span className="font-light text-sm">
              {filterData !== undefined
                ? new Date(filterData.checkIn).toDateString()
                : ""}
            </span>
          </div>
          <div className="flex gap-3">
            <h6 className="text-sm font-medium w-[100px]">Check-out</h6>
            <span className="font-light text-sm">
              {filterData !== undefined
                ? new Date(filterData.checkOut).toDateString()
                : ""}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BookingDetailsCard;

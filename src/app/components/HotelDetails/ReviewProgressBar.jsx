"use client";
import React from "react";

const ReviewProgressBar = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-light text-[28px] text-primary mt-5">9.6/10</span>
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex justify-between text-xs font-light mb-1">
            <span>Cleanliness</span>
            <span className="text-gray">10/10</span>
          </div>
          <div className="h-2 w-full bg-[#EDEDED] rounded-md">
            <div className="h-full bg-primary w-[100%] rounded-md"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-light mb-1">
            <span>Amenities</span>
            <span className="text-gray">7/10</span>
          </div>
          <div className="h-2 w-full bg-[#EDEDED] rounded-md">
            <div className="h-full bg-primary w-[70%] rounded-md"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-light mb-1">
            <span>Location</span>
            <span className="text-gray">9/10</span>
          </div>
          <div className="h-2 w-full bg-[#EDEDED] rounded-md">
            <div className="h-full bg-primary w-[90%] rounded-md"></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-light mb-1">
            <span>Comfort</span>
            <span className="text-gray">8/10</span>
          </div>
          <div className="h-2 w-full bg-[#EDEDED] rounded-md">
            <div className="h-full bg-primary w-[80%] rounded-md"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-light mb-1">
            <span>WiFi Connection</span>
            <span className="text-gray">9/10</span>
          </div>
          <div className="h-2 w-full bg-[#EDEDED] rounded-md">
            <div className="h-full bg-primary w-[90%] rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewProgressBar;

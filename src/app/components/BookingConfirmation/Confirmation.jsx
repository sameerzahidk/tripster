"use client";
import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAppContext } from "@/hotelContext";
const Confirmation = (props) => {
  const { bookingData, setBookingData, isLoading } = useAppContext();
  console.log(bookingData, "data")

  return (
    <React.Fragment>
      {
        bookingData.length !== 0 ?

        bookingData?.status == "CONFIRMED" ? (
          <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
            <div className="flex justify-center">
              <FaCheck className="text-[#009D52] bg-[#E1FFD7] text-[66px] p-[18px] rounded-full" />
            </div>
            <h4 className="text-sm md:text2xl lg:text-2xl  font-semibold">
              Your booking is now confirmed!
            </h4>
          </div>
        ) :
          bookingData?.status == "NOT CONFIRMED" ? (
            <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
              <div className="flex justify-center">
                <FaTimes className="text-[#de0a26] bg-[#f69697] text-[66px] p-[18px] rounded-full" />
              </div>
              <h4 className="text-sm md:text2xl lg:text-2xl  font-semibold">
                Your booking is not confirmed!
              </h4>
            </div>
          ) :
            bookingData?.message ? (
              <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
                <div className="flex justify-center">
                  <FaTimes className="text-[#de0a26] bg-[#f69697] text-[66px] p-[18px] rounded-full" />
                </div>
                <h4 className="text-small">
                  {bookingData?.message == 'Insufficient allotment' ? 'Room is no longer available' : bookingData?.message }
                </h4>
              </div>
            )
           : <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
               <div className="flex justify-center">
                   <div
                   className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                   role="status"
                  >
                 <span className="text-white !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
                  </div>
               <h4 className="text-2xl font-semibold">Booking In Progress...</h4>
                  </div>

                : (
             <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
    <div className="flex justify-center">
    <div className="flex justify-center">
                <FaTimes className="text-[#de0a26] bg-[#f69697] text-[66px] p-[18px] rounded-full" />
              </div>
    </div>
    <h4 className="text-2xl font-semibold">Booking Failed</h4>
  </div>
)


              
              
      }




    </React.Fragment>
  );
};

export default Confirmation;

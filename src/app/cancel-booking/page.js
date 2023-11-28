"use client";
import React ,{useEffect}from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useAppContext } from "@/hotelContext";
import { useRouter } from "next/navigation";

const Cancel = (props) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-[500px]">
      
        <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
          <div className="flex justify-center">
            <FaTimes className="text-[#de0a26] bg-[#f69697] text-[66px] p-[18px] rounded-full" />
          </div>
          <h4 className="text-2xl font-semibold">
            Payment Cancelled !
          </h4>
        </div>
     
      <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
          <div className="flex justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="text-white !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
          </div>
          <h4 className="text-2xl font-semibold">Redirecting To Home...</h4>
        </div>
   
    </div>
  );
};

export default Cancel;

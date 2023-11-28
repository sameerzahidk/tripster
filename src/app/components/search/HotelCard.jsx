"use client";
import React from "react";
import styles from "../../styles/style";
import Link from "next/link";
import { useAppContext } from "@/hotelContext";

const HotelCard = ({ data, staying = "" }) => {
  const { setSelectedHotel } = useAppContext();
  console.log("in hotel card")

  const hotel = data[0];
  const hotelDetails = data[1];
  return (
    <div className="bg-white md:flex justify-between rounded-2xl shadow-[0_0px_10px_0px_#dedede] p-4">
      <div className="md:flex gap-4 w-full  md:h-[200px]">
        <div
          className={`cs-flex bedroomBg  w-full md:w-[200px] md:h-full  `}
        >
          {
             hotelDetails?.images?.[0]?.path == undefined  ?
             <div  className ={ hotelDetails?.images?.[0]?.path == undefined ? "hotel hotel1 w-[200px]" : ""}
            
         
          />
             :
             <img  
            src={
              process.env.HOTELBEDS_IMAGE_PATH + hotelDetails?.images?.[0]?.path
            }
         
          />
          }
          
        </div>
        <div className="text-left  grid md:text-left py-3 md:py-0">
          <div className="flex justify-between md:justify-between ">
            <div>
              <h4 className="font-medium text-xl">{hotel?.name}</h4>
              <div className="flex flex-col mt-1">
                <span className="text-sm font-light text-gray">
                  {hotelDetails?.address?.content},{" "}
                  {hotelDetails?.city?.content} - {hotelDetails?.postalCode}
                </span>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-center md:justify-end">
              <div className=" flex md:hidden">
                <h5
                  className={` ${
                    data?.rating === "Excellent"
                      ? "text-[#009D52]"
                      : data?.rating === "Average"
                      ? "text-[#E1A200]"
                      : "text-primary"
                  } font-medium text-base`}
                >
                  {data?.rating}
                </h5>
                <span className="text-xs flex md:hidden font-light text-gray">
                  {data?.reviews}
                </span>
              </div>

              <div>
                <span
                  className={` ${
                    data?.rating === "Excellent"
                      ? "text-[#009D52] bg-[#E1FFD7]"
                      : data?.rating === "Average"
                      ? "text-[#E1A200] bg-[#FFF8D3]"
                      : "text-primary bg-[#E1EAFC]"
                  } py-1 px-4 text-sm rounded-3xl flex md:hidden`}
                >
                  {hotelDetails?.ranking}
                </span>
              </div>
            </div>
          </div>
          <div className="my-4 mb-1">
            <h6 className="font-medium text-sm">{hotelDetails?.categoryName}</h6>
            <span className="font-light text-sm">
              {data?.feature1} <br /> {data?.feature2}
            </span>
          </div>

          <div className="cs-flex md:block gap-2 mt-3  md:justify-start pb-3 md:pb-0 w-[220px] md:w-[100%]">
            {hotelDetails?.wildcards
              ?.filter((item, index) => index < 2)
              .map((item) => (
                <span className="text-primary text-xs border-[1px] border-solid border-primary px-1 py-1 rounded-3xl">
                  {item?.hotelRoomDescription?.content}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="flex md:flex-col md:justify-between  md:text-right">
        <div className=" hidden md:flex gap-3 items-center justify-center md:justify-end">
          <div className=" hidden md:flex " >
            <h5
              className={` ${
                data?.rating === "Excellent"
                  ? "text-[#009D52]"
                  : data?.rating === "Average"
                  ? "text-[#E1A200]"
                  : "text-primary"
              } font-medium text-base`}
            >
              {data?.rating}
            </h5>
            <span className=" hidden md:flex text-xs font-light text-gray">
              {data?.reviews}
            </span>
          </div>

          <div>
            <span
              className={` ${
                data?.rating === "Excellent"
                  ? "text-[#009D52] bg-[#E1FFD7]"
                  : data?.rating === "Average"
                  ? "text-[#E1A200] bg-[#FFF8D3]"
                  : "text-primary bg-[#E1EAFC]"
              } py-1 px-4 text-sm rounded-3xl hidden md:flex`}
            >
              {hotelDetails?.ranking}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-col  justify-between w-[100%] md:w-[auto] pt-4 md:pt-0">
          <div>
            {console.log(hotel?.maxRate)}
            <h6 className="text-xl font-semibold">From EUR {hotel?.maxRate}</h6>
            <span className="font-light font-sm">{staying}</span>
          </div>

          <Link href={"/hotel-details/" + hotel?.code}>
            <button
              type="button" 
              onClick={() => {
                setSelectedHotel(data);
              }}
              className={styles.button}
            >
              See booking options
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

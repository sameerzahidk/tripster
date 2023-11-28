"use client";
import React from "react";
import styles from "../../styles/style";
import { MdArrowForwardIos } from "react-icons/md";
import { BsFillSuitHeartFill } from "react-icons/bs";
import Link from "next/link";
import { useAppContext } from "@/hotelContext";

const Hotels = ({ data }) => {
  const {
    filterData,
    setFilterData,
    states,
    setStates,
    childsData,
    setChildsData, nearHotels, setNearHotels, setSelectedHotel, isLoading, setDefaultHotels, defaultHotels
  } = useAppContext();
  const hotels = [
    {
      img: "hotel hotel1",
      name: "Soho Hotel London ",
      location: "London",
      price: "from $130/night",
      rating: "9.6",
      // link: "hotel-details",
    },
    {
      img: "hotel hotel2",
      name: "Hotel Norrebro",
      location: "London",
      price: "from $180/night",
      rating: "9.6",
      // link: "hotel-details",
    },
    {
      img: "hotel hotel3",
      name: "Sunset Plaza Hotel ",
      location: "London",
      price: "from $210/night",
      rating: "9.8",
      // link: "hotel-details",
    },
    {
      img: "hotel hotel4",
      name: "Three Quarters Hotel ",
      location: "London",
      price: "from $130/night",
      rating: "9.5",
      // link: "hotel-details",
    },
    {
      img: "hotel hotel5",
      name: "Surf'n'Turf Suites ",
      location: "London",
      price: "from $130/night",
      rating: "9.5",
      // link: "hotel-details",
    },
  ];
  console.log(nearHotels == '')
  console.log(defaultHotels, "default")
  return (
    <>
    
    <div className={`${styles.width} pt-10 pb-[50px]`} key="hotels">
      <h4 className="text-xl leading-[30px] mb-5">Hotels loved by guests</h4>
      <div className="w-full h-[1620px] md:h-[315px] flex flex-col md:flex-row gap-4 justify-start">
     
        {
          isLoading ?
            (
              <div className="basis-full">
                <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0">
                  <div className="flex justify-center">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    >
                      <span className="text-white !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-semibold">Loading...</h4>
                </div>
              </div>
            )
            : null}
        {
          nearHotels !== '' ?
            nearHotels?.slice(0, 5)?.map((data) => {
              const hotel = data[0];
              const hotelDetails = data[1];

console.log(hotel,"hotel")
              return (

                <div onClick={() => {
                  setSelectedHotel(data);
                  setFilterData({
                    adults: 2,
                    rooms: 1,
                    checkIn: new Date().toISOString().split('T', 1)[0],
                    checkOut: new Date(Date.now() + (3600 * 1000 * 24)).toISOString().split('T', 1)[0]
                  })
                }} className="bg-white p-2 w-full rounded-2xl shadow-[0_5px_10px_0px_#dedede] relative">
                  <Link href={"/hotel-details/" + hotel?.code}>
                    <div
                      className={`w-full h-[150px] bg-white rounded-2xl`}
                    >
                      <img className={` w-full h-[150px]  rounded-2xl`}
                        src={
                          process.env.HOTELBEDS_IMAGE_PATH + hotelDetails?.images?.[0]?.path
                        }
                        alt="Hotel Image"
                      />
                    </div>
                    <div className="mt-3 px-2 " style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:125}}>
                      <div>
                      <p className="text-base">{hotel?.name}</p>
                      <span className="text-sm text-light text-gray">
                        {hotel?.destinationName}
                      </span>
                      </div>
                    
                      <div>
<Link
                        href="/hotel-details"
                        className="flex justify-between items-center"
                      >
                        <h6 className="text-base font-semibold mt-2">From EUR {hotel?.minRate}</h6>
                        <MdArrowForwardIos className="font-semibold" />
                      </Link>
</div>
                      
                    </div>

                    <span className="absolute top-[18px] left-[18px] text-[#009D52] bg-[#E1FFD7] px-2 text-xs rounded-3xl">
                      {hotel?.rating}
                    </span>
                    <BsFillSuitHeartFill className="absolute top-[18px] right-[18px] text-2xl text-white bg-white/[.5] p-[5px] rounded-full" />

                  </Link>
                </div>

              )
            })
            : null}
       

      </div>
    </div>
    
    </>
    
  );
};

export default Hotels;

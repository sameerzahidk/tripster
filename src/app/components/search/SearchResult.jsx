"use client";
import React, { useState, useEffect, use } from "react";
import PaginationButtons from "./Pagination/PaginationButtons ";
import { useAppContext } from "@/hotelContext";
import { useAlertContext } from "@/AlertContext";
import { Auth } from "@/authorize";
import HotelCard from "./HotelCard";
import { setLazyProp } from "next/dist/server/api-utils";
import { BackdropComponent } from "../BackdropComponent";

const SearchResult = () => {
  const { hotel, setHotel, filterData, setFilterData, childsData } =
    useAppContext();
    var storedItem;
    console.log("in search result")

  const { setAlert } = useAlertContext();
  const [sort, setSort] = useState('high');
  const [result, setResult] = useState({});
  const [resultMessage, setResultMessage] = useState("");
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shiftDays, setShiftDays] = useState("");
  const perPage = 10;
  const [loading, setLoading] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (
      filterData?.search &&
      filterData?.checkIn !== "" &&
      filterData?.checkOut !== "" &&
      filterData?.adults !== "" &&
      filterData?.rooms !== "" &&
      filterData?.destinationCode !== ""
    ) {
      setFilterData({ ...filterData, search: false });
      setShiftDays(
        Math.abs(
          (new Date(filterData?.checkOut) - new Date(filterData?.checkIn)) /
            (24 * 60 * 60 * 1000)
        )
      );
    fetchHotels()
    }
  }, [filterData]);
  useEffect(()=>{
    if(filterData?.length == undefined){
      storedItem = localStorage.getItem('filterData')
      if (storedItem) {
        // Parse the stored JSON string back into an object
        console.log(JSON.parse(storedItem))
        setFilterData({ ...JSON.parse(storedItem), search: true });

      }
     }  },[])
console.log(filterData)

  const fetchHotels = async () => {
    console.log("here in fetch hotels")
    //setLoading(true);
    setContent("Loading Hotels.....");
    setBackdrop(true);
    let signature = await Auth();
    let paxes = [];
    if (childsData !== undefined && Object.keys(childsData)?.length > 0) {
      Object.values(childsData)
        .filter((item, index) => index < filterData?.children)
        .map((item) => {
          paxes.push({
            type: "CH",
            age: item.age,
          });
        });
    }

    const resposne = await fetch("/api/listingHotel", {
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
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.data) {
          if (res.data?.total && res.data?.total > 0) {
            setHotel({ ...hotel, hotels: res.data });
            setResultMessage(`${filterData?.destinationName},
             
            
              ${
                filterData?.checkIn
                  ? new Date(filterData?.checkIn).getUTCDate()
                  : ""
              } - 
              ${
                filterData?.checkOut
                  ? new Date(filterData?.checkOut).getUTCDate()
                  : ""
              },
              ${
                parseInt(filterData?.adults, 10) +
                parseInt(filterData?.children, 10)
              } Guests,
              ${filterData?.rooms} Room`);
            //setLoading(false);
            //setBackdrop(false);

          } else {
            setHotel({ ...hotel, hotels: {} });
         //   setLoading(false);
       //  setBackdrop(false);
            setResultMessage(`${filterData?.destinationName},
            ${
              filterData.checkIn
                ? new Date(filterData?.checkIn).toLocaleString("default", {
                    month: "short",
                  })
                : ""
            }
            ${
              filterData?.checkIn
                ? new Date(filterData?.checkIn).getUTCDate()
                : ""
            } - 
            ${
              filterData?.checkOut
                ? new Date(filterData?.checkOut).getUTCDate()
                : ""
            },
            ${
              parseInt(filterData?.adults, 10) +
              parseInt(filterData?.children, 10)
            } Guests,
            ${filterData?.rooms} Room`);
          }
          setBackdrop(false)
        } else if (res?.error) {
          setAlert(res?.error?.error?.message, "error");
          //setLoading(false);
          setBackdrop(false);

        }
      }).catch((error)=>{
        setBackdrop(false)
      })
  };

  useEffect(() => {
    if (hotel?.hotels !== undefined) {
      setResult(hotel?.hotels);
      setHotels(
        hotel?.hotels?.hotels && hotel?.hotels?.hotels
          ? hotel?.hotels?.hotels
          : []
      );

      setTotalPages(Math.ceil(hotel?.hotels?.total / perPage));
    }
  }, [hotel]);

  const Hotels = () => {
    const startIndex = (currentPage - 1) * perPage;

    const endIndex = startIndex + perPage;
    const visibleHotels = hotels
      .sort((a, b) =>
        sort == 'high'
          ? b[0].maxRate - a[0].maxRate
          : a[0].maxRate - b[0].maxRate
      )
      .slice(startIndex, endIndex);
console.log(visibleHotels)

    return (
      <div className="flex flex-col gap-6">
        <BackdropComponent
        backdrop={backdrop}
        setBackdrop={setBackdrop}
        content={content}
      />
        {visibleHotels?.length > 0 ? (
          visibleHotels?.map((data, index) => (
            <HotelCard
              sort={sort}
              data={data}
              staying={` ${shiftDays} nights, ${
                parseInt(filterData?.adults, 10) +
                parseInt(filterData?.children, 10)
              } guests`}
              key={index}
            />
          ))
        ) : (
          <div className="text-center md:text-center py-3 md:py-0">
            <h4 className="font-medium text-xl">No Hotels Found</h4>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="pt-3 md:pt-6 px-4 md:px-0">
      <div className="md:flex justify-between items-center">
        <div className="md:pb-6">
          <span className="text-sm">{result?.total} search results for</span>
          <h2 className="font-semibold text-lg md:text-2xl">{resultMessage ?  resultMessage :''}</h2>
        </div>

        <div className="mt-3 mb-8 md:mt-0">
          <div className=" text-sm md:text-xl">
            <fieldset>
              <div className="w-full relative text-sm text-[#3A3A3A] bg-transparent border-[1px] border-solid border-[#DEDEDE] px-4 py-1 rounded-3xl">
                <label className="sr-only">My field</label>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                  className="w-full inline-block pr-10 bg-transparent  cursor-pointer"
                  name=""
                  id=""
                >
                  <option>Sort by</option>
                  <option value="low">Lowest Price</option>
                  <option value="high">Highest Price</option>
                </select>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <Hotels />
      <PaginationButtons
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SearchResult;

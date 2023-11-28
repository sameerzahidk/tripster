"use client";
import React, { useEffect, useState } from "react";
import FilterForm from "./FilterForm";
import { useAppContext } from "@/hotelContext";
const Filter = () => {
  const { filterData, setFilterData } = useAppContext();
  console.log("in filter ")

  const popularFilter = [
    { value: 'RO', label: "Room Only" },
    { value: 'CB', label: "CONTINENTAL BREAKFAST" },
    { value: 'DB', label: "BUFFET BREAKFAST" }
  ];
  const pricePerNight = [
    { value: '{"minRate":0,"maxRate":50}', label: "Less than EUR 50" },
    { value: '{"minRate":50,"maxRate":100}', label: "EUR 50 to EUR 100" },
    { value: '{"minRate":100,"maxRate":150}', label: "EUR 100 to EUR 150" },
    { value: '{"minRate":150}', label: "EUR 150 and more" },
  ];
  const guestRating = [
    { value: '0', label: "Any" },
    { value: '5', label: "Excellent" },
    { value: '4', label: "Very good" },
    { value: '3', label: "Good" }
  ];
  const ratings = [1, 2, 3, 4, 5];

  const [popular, setPopular] = useState([]);
  const [price, setPrice] = useState([]);
  const [rating, setRating] = useState([]);

  const filterPrice = (message) => {
    setPrice(message);
  };

  useEffect(() => {
    let tempFilterdata = {};
    if (price !== "") {
      tempFilterdata.price = price;
    }
    if (popular !== "") {
      tempFilterdata.popular = popular;
    }
    if (rating !== "") {
      tempFilterdata.rating = rating;
    }

    if(Object.keys(tempFilterdata).length > 0)
    {
      setFilterData({ ...filterData, ...tempFilterdata})
    }

  }, [popular, price, rating]);
console.log(popular,"popular")
console.log(rating,"rating")

console.log(price,"price")

  return (
    <div className="pt-8 pb-12 md:pr-[20%] border-r-[1px] border-solid border-[#DEDEDE] px-4 md:px-0">
      <div className="flex md:block flex-wrap gap-x-10 gap-y-5">
        <FilterForm
          heading="Popular filters"
          setSelect={setPopular}
          selected={popular}
          data={popularFilter}
          className="basis-1/2"
          multiple={true}
        />
        <FilterForm
          setSelect={setPrice}
          selected={price}
          heading="Price per night"
          data={pricePerNight}
          className="basis-1/2"
          multiple={false}
        />
        <FilterForm
          heading="Guest rating"
          setSelect={setRating}
          selected={rating}
          data={guestRating}
          className="basis-1/2"
          multiple={false}
        />
      </div>

      {/* <div className="mt-5 md:mt-0">
        <h4 className={`${styles.heading} mb-3`}>Property class</h4>
        <div className="flex gap-2 items-center text-sm">
          {ratings.map((rating) => (
            <span className="flex gap-1 items-center border-[1px] border-solid border-gray py-1 px-3 rounded-3xl">
              {rating}
              <AiFillStar className="text-gray" />
            </span>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Filter;

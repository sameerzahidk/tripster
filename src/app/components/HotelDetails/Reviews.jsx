"use client";
import React from "react";
import styles from "../../styles/style";
import ReviewProgressBar from "./ReviewProgressBar";

const Reviews = () => {
  const reviews = [
    {
      heading: "Excellent value for the price!",
      comment:
        "We enjoyed our stay at this hotel. We will definitely come back!",
      name: "Mark M.",
      ratings: "Excellent",
      ratingPoint: "10",
      services: [
        "Great location!",
        "Service",
        "Bottle of champagne in the room!",
      ],
      date: "20 September, 2022",
    },
    {
      heading: "Good hotel but noisy location",
      comment:
        "Had room facing the street and it was super noisy. Unfortuately, we couldn’t change room.",
      name: "Karena L.",
      ratings: "Average",
      ratingPoint: "5.6",
      services: ["Noise"],
      date: "20 September, 2022",
    },
  ];
  return (
    <div className={`${styles.width} md:flex gap-24 py-10`}>
      <div className="basis-[30%]">
        <h4 className={styles.heading}>Reviews</h4>
        <ReviewProgressBar />
      </div>

      <div className="basis-[70%]">
        {reviews.map((review, index) => (
          <div className="py-5 border-b-[1px] border-solid border-[#DEDEDE] flex flex-col-reverse md:flex-row justify-between" key={index}>
            <div>
              <h6>{review.heading}</h6>
              <span className="text-gray text-xs font-light mt-[0px] block">
                {review.name}
              </span>
              <p className="text-sm font-light my-2 mb-3">{review.comment}</p>
              <ul className="text-xs font-ligt">
                {review.services.map((service) => (
                  <li className="flex items-center gap-2 text-xs font-light">
                    <span
                      className={` ${
                        review.ratings === "Average"
                          ? "text-[#E1A200]"
                          : "text-[#009D52]"
                      } text-xl`}
                    >
                      {review.ratings === "Average" ? "-" : "+"}
                    </span>{" "}
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row md:flex-col justify-between my-4 md:my-0">
              <div className="flex items-center gap-2">
                <h5
                  className={` ${
                    review.ratings === "Excellent"
                      ? "text-[#009D52]"
                      : review.ratings === "Average"
                      ? "text-[#E1A200]"
                      : "text-primary"
                  } font-medium text-base`}
                >
                  {review.ratings}
                </h5>
                <span
                  className={` ${
                    review.ratings === "Excellent"
                      ? "text-[#009D52] bg-[#E1FFD7]"
                      : review.ratings === "Average"
                      ? "text-[#E1A200] bg-[#FFF8D3]"
                      : "text-primary bg-[#E1EAFC]"
                  } py-1 px-4 text-sm rounded-3xl`}
                >
                  {review.ratingPoint}
                </span>
              </div>

              <div className="text-xs font-light text-gray flex flex-col gap-1 md:text-right">
                <span>Reviewed on</span>
                <span>{review.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;

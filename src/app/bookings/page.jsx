"use client";

import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import { Auth } from "@/authorize";
import { useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";
import styles from "../styles/style";

const Bookings = () => {
  const { data: session } = useSession();
  console.log(session, "session");
  const [loading, setLoading] = useState(false);
  var user = session?.token?.id;
  console.log(user, "user");
  const [bookingData, setBookingData] = useState();
  const [errorText, setErrorText] = useState();
  const fetchBookings = async () => {
    if (user) {
      setLoading(true);
      var signature = await Auth();

      const resposne = await fetch("/api/listBookings/" + user, {
        method: "GET",

        headers: {
          "X-Signature": signature,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res?.data) {
            if (res?.data) {
              setBookingData(res?.data);
            } else {
              setErrorText("No Active Bookings");
            }
          } else if (res.error) {
            setErrorText(res.error.message);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [session?.token?.id]);

  return (
    <div>
      {session?.token?.id ? (
        loading == true ? (
          <div className="flex flex-col gap-4 text-center mb-8 md:mb-0 mt-10 md:mt-0 ">
            <div className="flex justify-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="text-white !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            </div>
            <h4 className="text-2xl font-semibold">Loading Bookings...</h4>
          </div>
        ) : (
          <React.Fragment>

            <div className={`${styles.width} pt-4`} key="hotels">
              <h4 className="text-xl leading-[30px] mb-5"> {errorText ? errorText : "Bookings"}</h4>
              <div className="w-full h-[1620px]h-[100%] flex-wrap flex flex-col md:flex-row gap-4 pb-8 justify-start">
                {bookingData?.map((data) => (
                  <BookingCard data={data} />
                ))}
              </div>
            </div>
          </React.Fragment>
        )
      ) : (
        <h1 className="text-center my-3 ">Login to Book with us</h1>
      )}
    </div>
  );
};

export default Bookings;

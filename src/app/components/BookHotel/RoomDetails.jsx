"use client";
import React, { Children, useEffect, useState } from "react";
import styles from "../../styles/style";
import BookingDetailsCard from "./BookingDetailsCard";
import { useSession } from "next-auth/react";
import Stripe from "stripe";
import { useAppContext } from "@/hotelContext";
const stripe = new Stripe(process.env.STRIPE_KEY);

const RoomDetails = ({ hotel, hotelDetails, selectedRooom }) => {
  const { adultsData, personalData, childsData, filterData } = useAppContext();
  let childItemCount = childsData.length;

  const { data: session } = useSession();
  const [rate, setRate] = useState(0);
  const [rateKey, setRateKey] = useState({});
  const [proceedCheckout, setProceedCheckout] = useState(true);
  const [errorText, setErrorText] = useState("");
  console.log(hotel,"hotel")

console.log(selectedRooom,"roorm")
  useEffect(() => {
    if (selectedRooom) {
      setRateKey(selectedRooom.rates[0]);
      setRate(parseInt(selectedRooom.rates[0].net));
    }
  }, []);

  useEffect(() => {
    Object.keys(childsData).map((milestone) => {
      console.log(
        childsData[milestone].firstName !== undefined &&
          childsData[milestone].firstName !== "" &&
          childsData[milestone].lastName !== undefined &&
          childsData[milestone].lastName !== "",
        "child error"
      );
      if (
        childsData[milestone].firstName !== undefined &&
        childsData[milestone].firstName !== "" &&
        childsData[milestone].lastName !== undefined &&
        childsData[milestone].lastName !== ""
      ) {
        setProceedCheckout(false);
      } else {
        setProceedCheckout(true);
      }
    });
  }, [childsData]);
  useEffect(() => {
    Object.keys(childsData).map((milestone) => {
      console.log(
        childsData[milestone].firstName !== undefined &&
          childsData[milestone].firstName !== "" &&
          childsData[milestone].lastName !== undefined &&
          childsData[milestone].lastName !== "",
        "child error"
      );
      if (
        childsData[milestone].firstName !== undefined &&
        childsData[milestone].firstName !== "" &&
        childsData[milestone].lastName !== undefined &&
        childsData[milestone].lastName !== ""
      ) {
        delete childsData[milestone]?.filled;

        setProceedCheckout(false);
      } else {
        setProceedCheckout(true);
      }
    });
  }, [childsData]);

  
  console.log(childsData,"proceed")
  useEffect(() => {
    if (
      personalData?.email !== undefined &&
      personalData?.email !== "" &&
      adultsData !== undefined &&
      Object.keys(adultsData).length == parseInt(filterData.adults)
    ) {
      Object.keys(adultsData).map((milestone) => {
        console.log(
          adultsData[milestone].firstName !== undefined &&
          adultsData[milestone].firstName !== "" &&
          adultsData[milestone].lastName !== undefined &&
          adultsData[milestone].lastName !== ""
        );
        if (
          adultsData[milestone].firstName !== undefined &&
          adultsData[milestone].firstName !== "" &&
          adultsData[milestone].lastName !== undefined &&
          adultsData[milestone].lastName !== ""
        ) {
          console.log("in adults false")
          setProceedCheckout(false);
        } else {
          setProceedCheckout(true);
        }
      });
    } else {
      setProceedCheckout(true);
    }
  }, [adultsData, personalData]);
  async function handleCheckout() {
    if (filterData.children !== undefined || childsData !== undefined) {
      setErrorText("");
      const sessionRes = await stripe.checkout.sessions.create({
        customer_creation: "if_required",
        customer_email: session?.token?.email,
        line_items: [
          {
            price_data: {
              currency: "EUR",
              product_data: {
                name: hotelDetails?.name?.content,
              },
              unit_amount: Math.round(rate) *100,
            },
            quantity: rateKey?.rooms,
          },
        ],
        metadata: {
          rateKey: rateKey.rateKey,
          checkIn: filterData?.checkIn,
          checkOut: filterData?.checkOut,
          hotelDetails: JSON.stringify({
            name: hotelDetails?.name?.content,
            image: hotelDetails?.images?.[0]?.path,
            //address1: hotelDetails?.address?.content,
            address2: hotelDetails?.city?.content,
            address3: hotelDetails?.state?.name,
            address4: hotelDetails?.postalCode,
            email: hotelDetails?.email,
            phones: hotelDetails?.phones,
          }),
          adults: JSON.stringify(Object.values(adultsData)),
          personal: JSON.stringify(Object.values(personalData)),
          childrenData: JSON.stringify(Object.values(childsData)),
          userId: session?.token?.id
          
        },
        mode: "payment",
        success_url:
          process.env.NEXT_URL + "/booking-confirmation/{CHECKOUT_SESSION_ID}",
        cancel_url: process.env.NEXT_URL + "/cancel-booking",
      });
      console.log(sessionRes, "res")
      
      if (sessionRes.url) {
        window.location.assign(sessionRes.url);
        
      }
    } else {
      setErrorText("eRROR");
    }
  }
  return (
    <div>
      <BookingDetailsCard hotelDetails={hotelDetails}>
        <div className="flex gap-10 pt-3 border-t-[1px] border-solid border-[#DEDEDE]">
          <h5 className="text-sm font-medium uppercase w-[150px]">TOTAL</h5>
          <h5 className="text-sm font-extrabold uppercase">EUR {selectedRooom?.rates[0]?.net}</h5>
        </div>
      </BookingDetailsCard>

      <div className="w-full text-center flex flex-col mt-5 mb-10 md:mb-0">
        <button
          onClick={handleCheckout}
          className={`${styles.button} w-full py-3`}
          disabled={proceedCheckout}
        >
          Proceed To Checkout
        </button>
        <h3 style={{ color: "red" }}>{errorText}</h3>
      </div>
    </div>
  );
};

export default RoomDetails;

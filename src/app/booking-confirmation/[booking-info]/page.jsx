"use client";
import React, { use, useEffect, useState } from "react";
import BookingDetails from "../../components/BookingConfirmation/BookingDetails";
import Confirmation from "../../components/BookingConfirmation/Confirmation";
import styles from "../../styles/style";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import Link from "next/link";
import Stripe from "stripe";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/hotelContext";
import { Auth } from "@/authorize";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const stripe = new Stripe(process.env.STRIPE_KEY);

const page = () => {
  const router = useRouter();
  const {
    hotel,
    setHotel,
    selectedHotel,
    bookingData,
    setBookingData,
    setIsLoading,
    isLoading,
  } = useAppContext();

  const { data: session } = useSession();
  const [rateKey, setRateKey] = useState();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [hotelDetails, setHotelDetails] = useState({});
  const [personalData, setPersonalData] = useState([]);
  const [adultsData, setAdultsData] = useState([]);
  const [childrenData, setChildrenData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [refundSuccess, setRefundSuccess] = useState(false);

  const [paymentIntentId, setPaymentIntentId] = useState();
  const [userId, setUserId] = useState("");
  const pathname = usePathname();
  var storedData;
  async function handleSuccess() {
    setLoading(true);
    const sessionRes = await stripe.checkout.sessions.retrieve(
      pathname.split("/").pop()
    );
    if (sessionRes) {
      setRateKey(sessionRes?.metadata?.rateKey);
      setCheckIn(sessionRes?.metadata?.checkIn);
      setCheckOut(sessionRes?.metadata?.checkOut);
      setHotelDetails(JSON.parse(sessionRes?.metadata?.hotelDetails));
      setPersonalData(JSON.parse(sessionRes?.metadata?.personal));
      setAdultsData(JSON.parse(sessionRes?.metadata?.adults));
      setChildrenData(JSON.parse(sessionRes?.metadata?.childrenData));
      setUserId(sessionRes?.metadata?.userId);
      setPaymentIntentId(sessionRes?.payment_intent);
      setSuccess(true);
    }
  }

  useEffect(() => {
    handleSuccess();
  }, [pathname]);

  const refundGeneration = async () => {
    setLoading(true);

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId, // Use the Payment Intent ID
    });
    setRefundSuccess(refund)
    return refund;
  };
  const sendEmail = async () => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'zohaibkhan4822@gmail.com', // Replace with the recipient's email
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  const bookHotels = async () => {
    setIsLoading(true);
    //const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      setIsLoading(false);
      router.push("/bookings");
    } else {
      var signature = await Auth();
      let paxes = [];

      paxes = adultsData.map((adult, index) => {
        return {
          roomId: Math.floor(index / 2) + 1,
          type: "AD",
          name: adult.firstName,
          surname: adult.lastName,
        };
      });
      childrenData.map((item, index) => {
        paxes.push({
          roomId: Math.floor(index / 2) + 1,
          type: "CH",
          age: parseInt(item.age),
        });
      });
      const response = await fetch("/api/bookHotel", {
        method: "POST",

        headers: {
          "X-Signature": signature,
        },
        
        body: JSON.stringify({
          firstName: personalData[0],
          lastName: personalData[0],
          paxes: paxes,
          rateKey: rateKey,
          id: userId,
          paymentIntentId: paymentIntentId,
        }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          console.log(res?.hotels, "res hotels");
          if (res?.hotels?.booking) {
            setBookingData(res.hotels.booking);
            sessionStorage.setItem(
              "bookingData",
              JSON.stringify(res.hotels.booking)
            );

            setBookingSuccess(true);
            setIsLoading(false);
            sendEmail();
          } else if (res?.hotels?.error) {
            console.log(res?.hotels?.error);
            setBookingData(res.hotels.error);
            setBookingSuccess(false);
            const refunds = refundGeneration();
            console.log(refunds, "Refunds");
           
            setIsLoading(false);
          }
        });
    }
  };
  useEffect(() => {
    if (success) {
      bookHotels();
    }
  }, [success]);

  useEffect(() => {
    if (bookingSuccess == true) {
      const timer = setTimeout(() => {
        router.push("/bookings");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingSuccess]);

  console.log(refundSuccess, "success");
  return (
    <div className="border-t-[1px] border-solid border-[#DEDEDE]">
      <div className={styles.width}>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="basis-1/2">
            <BookingDetails
              checkIn={checkIn}
              checkOut={checkOut}
              hotelDetails={hotelDetails}
            />
          </div>

          <div className="basis-1/2">
            <Confirmation loading={loading} setLoading={setLoading} />
          </div>
        </div>
        <div>
          <div className="pt-12 border-b-[1px] border-solid border-[#DEDEDE]">
            <h4 className={styles.heading}>Your trip starts</h4>

            <div className="flex flex-col gap-2 pt-6 pb-8">
              <div className="flex gap-3">
                <span className="text-base w-[150px] flex gap-1 items-center">
                  <span>
                    <FaCalendarCheck />{" "}
                  </span>{" "}
                  Check-in
                </span>
                <span className="font-light text-base">
                  {checkIn !== undefined
                    ? new Date(checkIn).toDateString()
                    : ""}
                </span>
              </div>
              <div className="flex gap-3">
                <span className="text-base w-[150px] flex gap-1 items-center">
                  <span>
                    <FaCalendarTimes />{" "}
                  </span>{" "}
                  Check-out
                </span>
                <span className="font-light text-base">
                  {checkOut !== undefined
                    ? new Date(checkOut).toDateString()
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 py-6 border-b-[1px] border-solid border-[#DEDEDE]">
            <div className="flex gap-2">
              <span className="w-[150px] text-base">Hotel address</span>
              <span className="font-light">
                {hotelDetails !== undefined ? hotelDetails.address1 : ""}
              </span>
            </div>
            <div className="flex gap-2 text-base">
              <span className="w-[150px]">E-mail</span>
              <div className="flex gap-2 items-center">
                <span className="font-light text-sm md:text-md ">
                  {hotelDetails !== undefined ? hotelDetails.email : ""}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-[150px]">Telephones</span>
              <div>
                {hotelDetails?.phones?.map((phone) => (
                  <div>
                    <span className="font-light">{phone.phoneType}</span> -
                    <span className="font-light">{phone.phoneNumber}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 text-base py-6 border-b-[1px] border-solid border-[#DEDEDE]">
            <div className="w-[150px]">
              <span>Total price</span>
            </div>

            <div className="flex gap-2 items-center">
              {/* <span className="font-light text-base">{hotel ? totalNet : ''}</span> */}

              {bookingData !== undefined && bookingData !== "" && bookingData?.totalNet ? (
                <>
                  <span>EUR {bookingData.totalNet}</span>

                  <span className="text-[#009D52] bg-[#E1FFD7] px-3 text-sm rounded-3xl">
                    Paid
                  </span>
                </>
              ) : null}

              {refundSuccess !== undefined && refundSuccess !== "" ? (
                <>
                  <span>EUR {parseFloat(refundSuccess.amount)/100}</span>

                  <span className="text-[#009D52] bg-[#E1FFD7] px-3 text-sm rounded-3xl">
                    Refunded
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center my-8 justify-center md:justify-start">
            <Link href="/">
              <button className="bg-primary px-20 py-3 text-sm text-white mt-2 rounded-3xl">
                Contact property
              </button>
            </Link>
            <Link href="/">
              <button className="text-primary text-sm px-20 py-3 rounded-3xl border-[1px] border-solid border-primary">
                Cancel reservation
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

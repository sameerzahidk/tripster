
import React, { useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import styles from "../../styles/style";
import { useSession } from "next-auth/react"
import { useAppContext } from "@/hotelContext";
import { useRouter } from "next/navigation";

const Rooms = ({hotelDetails,hotelBookingData}) => {
  const { data: session } = useSession();

  const { selectedHotel, setSelectedHotel, setSelectedRoom } = useAppContext();
  const router = useRouter();
  const rooms = hotelBookingData ? hotelBookingData?.rooms :[] ;

  const onBookNow = (selectedRoom) => {
    sessionStorage.setItem('selectedRoom',JSON.stringify(selectedRoom))
    sessionStorage.setItem('selectedHotel',JSON.stringify([selectedHotel[0], hotelDetails]))

    setSelectedRoom(selectedRoom);
    setSelectedHotel([selectedHotel[0], hotelDetails]);
    if (session?.token) {
      localStorage.removeItem('bookingFlag')
    } else {
      localStorage.setItem('bookingFlag', JSON.stringify(selectedHotel[0]?.code))
    }
    router.push(session?.token ? `/book-hotel` : '/login')
  }


  return (
    <div className="bg-[#F8F8F8] py-7">
      <div className={styles.width}>
        <h4 className={`${styles.heading} pb-4`}>Rooms</h4>
        <div className=" flex flex-col items-center md:flex-row gap-6 md:gap-4 justify-start">
          {rooms.map((room) => {
                var roomImage = selectedHotel?.[1]?.images?.filter((image)=>image.roomCode == room.code )
            return (
              <div className="bg-white p-2 w-[80%] md:w-[400px] rounded-2xl shadow-[0_5px_10px_0px_#dedede] relative">
                  <div
                        className={` w-full h-[200px] bg-white rounded-2xl`}
                      >
                       { roomImage?.[0]?.path == undefined ? 
                                             <div  className={` w-full h-[200px] hotel1 bg-white rounded-2xl`} />

                      :
                      <img  className={` w-full h-[200px] bg-white rounded-2xl`}  src={"http://photos.hotelbeds.com/giata/"+ roomImage?.[0]?.path}/>
                        

                      }
                        </div>
                <div className="mt-3 px-2">
                  <span className="text-base">{room?.name}</span>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-1 text-xs font-light">
                      <span>
                        <MdArrowForwardIos />{" "}
                      </span>
                      <span> Adults :</span>
                      <span>{room?.rates.length > 0 ? room?.rates[0]?.adults : ''}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-light">
                      <span>
                        <MdArrowForwardIos />{" "}
                      </span>
                      <span> Children :</span>
                      <span>{room?.rates.length > 0 ? room?.rates[0]?.children : ''}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-light">
                      <span>
                        <MdArrowForwardIos />{" "}
                      </span>
                      <span>Rooms :</span>
                      <span>{room?.rates.length > 0 ? room?.rates[0]?.rooms : ''}</span>
                    </div>
                  </div>

                  <button onClick={() => onBookNow(room)} className={`${styles.button} w-full`}>
                    Book now 
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rooms;

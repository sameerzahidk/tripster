'use client';
import { createContext, useContext, useState } from 'react';

const HotelContext = createContext();

export function AppWrapper({ children }) {
  const [hotel, setHotel] = useState();
  const [states, setStates] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState([]);
  const [selectedRooom, setSelectedRoom] = useState(null);
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const[isLoading,setIsLoading]=useState()
  const [adultsData, setAdultsData] = useState({});
  const [childsData, setChildsData] = useState({});
  const [filterData, setFilterData] = useState({
    checkIn: "",
    checkOut:"",
    rooms: "1",
    destinationCode: "",
    destinationName: "",
    adults: "1",
    children: "0",
    shiftDays: "",
    countryName:"",
    search: false
  });
  const [bookingData, setBookingData] = useState({})
const[nearHotels,setNearHotels]=useState([])
const[defaultHotels,setDefaultHotels]=useState([])

  return (
    <HotelContext.Provider value={{ hotel, setHotel, states, setStates, filterData, setFilterData, selectedHotel, setSelectedHotel, selectedRooom, setSelectedRoom, adultsData, setAdultsData, personalData, setPersonalData, childsData, setChildsData, bookingData, setBookingData,setNearHotels,nearHotels ,isLoading,setIsLoading,defaultHotels,setDefaultHotels}}>
      {children}
    </HotelContext.Provider>
  );
}

export function useAppContext() {
  return useContext(HotelContext);
}
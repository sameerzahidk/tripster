'use client'
import React,{useState,useEffect} from 'react';
import Hotels from '../components/home/Hotels'
import Newsletter from '../components/home/Newsletter'
import Destination from '../components/home/Destination';
import Hero from '../components/home/Hero';
import { useAppContext } from '@/hotelContext';
const page = () => { 

    const {
        filterData,
        setFilterData,
        states,
        setStates,
        childsData,
        setChildsData,nearHotels,setNearHotels
      } = useAppContext();
      console.log(nearHotels,"nearhotels")
    return (
        <div key={"pages"}>
           <Hero  />
           <Destination/>

           <Hotels/>
           
        </div>
    );
};

export default page;
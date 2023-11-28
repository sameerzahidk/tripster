import React from 'react'
import { useAppContext } from "@/hotelContext";


export const SelectComponent = ({ onChange,value }) => {
    const {
        filterData,
        setFilterData,
        states,
        setStates,
        childsData,
        setChildsData,
      } = useAppContext();
    const nArray = [0, 1, 2, 3, 4, 5]
console.log(filterData,"filtereData in select")
    const handleChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <select
            onChange={handleChange} defaultValue="0"
            className="w-[100%] md:w-[50%] inline-block pr-10 bg-transparent  cursor-pointer text-gray"
            name=""
            id=""
        >
            {
                nArray.map((item) => (
                    <option selected={item === value ? item : 0} value={item}>{item}</option>
                ))
            }
        </select>
    )
}
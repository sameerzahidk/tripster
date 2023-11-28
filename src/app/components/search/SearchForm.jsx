import React, { Children, useEffect, useState } from "react";
import { BsArrowLeftShort, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { FaCalendarCheck, FaCalendarTimes, FaUserAlt } from "react-icons/fa";
import styles from "../../styles/style";
import style from "../../styles/Index.module.css";
import { useAppContext } from "@/hotelContext";
import { useSearchParams } from "next/navigation";
import { Auth } from "@/authorize";
import { Autocomplete, TextField } from "@mui/material";
import { ChildModalComponent } from "../ChildrenModal/modal";
import { styled, lighten, darken } from '@mui/system';
import { countries } from 'country-data';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

const SearchForm = () => {

  const {
    filterData,
    setFilterData,
    states,
    setStates,
    childrenData,
    setChildrenData,childsData,setChildsData
  } = useAppContext();
  console.log("in search form")
  const searchParams = useSearchParams();
  console.log(searchParams,"search par")
  var storedItem;
  const [loading, setLoading] = useState(false);
  const [ageModal, setAgeModal] = useState();
  const [hide, setHide] = useState(true);
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(1000)
const [disabled, setDisabled] = useState(false);
const[error,setError]=useState(false)
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (states.length < 1) {
      fetchStates();
    }
  }, []);

  const [selectedValue, setSelectedValue] = useState(null);

  const [open, setOpen] = useState(false)
  const[selectedOption,setSelectedOption]=useState(null)

  
  useEffect(()=>{
    console.log("here in filterData")
    if(Object.keys(filterData.checkIn).length == 0){
      storedItem = sessionStorage.getItem('filterData')
      if (storedItem) {
        // Parse the stored JSON string back into an object
        console.log(JSON.parse(storedItem))
        setFilterData({ ...JSON.parse(storedItem), search: true });

      }
     
      
    }

  },[])
  useEffect(() => {
    let queryDestinationCode = searchParams.get("destinationCode");
    let queryDestinationName = searchParams.get("destinationName");
    let queryCheckIn = searchParams.get("checkIn");
    let queryCheckOut = searchParams.get("checkOut");
    let queryRooms = searchParams.get("rooms");
    let queryAdults = searchParams.get("adults");
    let queryChildren = searchParams.get("children");

    let tempFilterData = {};

    if (queryDestinationCode !== null) {
      tempFilterData.destinationCode = queryDestinationCode;
      tempFilterData.destinationName =
        queryDestinationName !== null ? queryDestinationName : "";
    }

    if (queryCheckIn !== null) {
      tempFilterData.checkIn = queryCheckIn;
    }

    if (queryCheckOut !== null) {
      tempFilterData.checkOut = queryCheckOut;
    }

    if (queryRooms !== null) {
      tempFilterData.rooms = queryRooms;
    }

    if (queryAdults !== null) {
      tempFilterData.adults = queryAdults;
    }

    if (queryChildren !== null) {
      tempFilterData.children = queryChildren;
    }

    tempFilterData.search = true;
  
   
      const matchingOption = states?.find((option) =>
                option?.name?.content.toLowerCase().startsWith( tempFilterData.destinationName.toString().toLowerCase())
              );
                console.log(matchingOption)
                
              if (matchingOption) {
                setSelectedValue(matchingOption?.name?.content)
                setSelectedOption(matchingOption);

                console.log('Found object:', matchingOption);
              } else {
                console.log('No object found.');
              }
    

    setFilterData({ ...filterData, ...tempFilterData });
  }, []);
 
  const fetchStates = async () => {
    var signature = await Auth();
    const response = await fetch("/api/states?from="+ from +'&to='+ to, {
      method: "GET",
      headers: {
        "X-Signature": signature,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.states?.total && res?.states?.total > 0) {
          setStates(res.states.destinations);
        }
      });
  };
  const handleInputChange = (event) => {
    console.log("here in input change")
    const isValueValid = states?.some((option) =>
    option?.name?.content.toLowerCase().includes(event?.target?.value?.toString().toLowerCase())
  );
if(isValueValid == false){

setFrom(from + 1000)
   setTo(to + 999)
   fetchStates()
}
  };
  const handleChange = (e, v) => {
    e.preventDefault();
    setOpen(true)
    setFilterData({
      ...filterData,
      destinationCode: v !== null ? v.code : "",
      destinationName: v !== null ? v.name.content : "",
      adults: 1,
      rooms: 1,
      countryName: v !== null ? countries[v?.countryCode]?.name : ''
    });
  };
  useEffect(() => {
    var shift = Math.abs(
      (new Date(filterData.checkOut) - new Date(filterData.checkIn)) /
      (24 * 60 * 60 * 1000)
    );
    if (
      new Date(filterData.checkIn).setHours(0, 0, 0, 0) <=
      new Date().setHours(0, 0, 0, 0)
    ) {
      setDisabled(true);
      setError(true)
      setErrorText("Check-in must be in future");
      console.log("must be future")

    } else if (new Date(filterData.checkIn) > new Date(filterData.checkOut)) {
      setDisabled(true);
      setError(true)

      setErrorText("check-out date earlier than check-in");
      console.log("checkout date earlier")

    } else if (filterData.checkIn === filterData.checkOut) {
      console.log(filterData.checkIn,filterData.checkOut)
      setError(true)

      setErrorText("check-in date & check-out date are same");
      console.log("same dates")

      setDisabled(true);
    } else if (shift >= 5) {
      console.log("shift > 5")
      setError(true)

      setDisabled(true);
      setErrorText("Difference between checkIn & checkout more than 5");
    }else{
      console.log("in usefefect filterdata")
      setError(false)

      setErrorText("");
      setDisabled(false)
    }

    
  }, [filterData]);

  useEffect(() => {
    if (
      filterData.children > 0 &&
      Object.keys(childsData).length === 0
      
    ) {
      console.log("here in children , childs Data")

      setDisabled(true);

    }else{
      console.log("in filter data children")
     setDisabled(false)
    }
  }, [filterData.children]);


  useEffect(()=>{
    if(childsData !== undefined){
     
      var result = isObjectFilled(childsData, filterData.children)
      setDisabled(result)
    }
  },[childsData])
  function isObjectFilled(obj, expectedLength) {
    if (typeof obj !== 'object' || obj === null) {
      return false; // Make sure obj is a valid object
    }
  
    const keys = Object.keys(obj);
  console.log(keys,"keys")
    if (keys.length !== expectedLength) {
      return false; // Check if the object has the expected number of keys
    }
    for (const object of Object.keys(obj)) {
      console.log(obj[object].age ,"loop");
      if(obj[object].filled !== true){
       return true
      }
    }
   

   return false
  }
console.log(error,"error")
  return (
    <div 
      className={`bg-[#F8F8F8] relative ${style.searchBg} py-5 px-4 md:px-0 md:pr-[20%] border-b-[1px] md:border-r-[1px] border-solid border-[#DEDEDE]`}
    >

      <ChildModalComponent ageModal={ageModal} setAgeModal={setAgeModal} />
      <div className="flex flex-row">
        <a href="/">
          <BsArrowLeftShort className="text-4xl font-bold" />
        </a>
        <div style={{ cursor: 'pointer' }} onClick={() => {
          setHide(!hide);
        }} className="flex justify-center w-full items-baseline h-[50px] border-[1px] rounded-3xl ">
          <h4

            className={`${styles.heading} mt-2 mb-4 mr-5`}
          >
            Your search
          </h4>
          {hide ? <BsCaretDownFill className="text-base font-bold " /> : <BsCaretUpFill className="text-base font-bold" />}
        </div>
      </div>


      <div style={{ display: hide == true ? "none" : "block" }} >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm">Destination</label>
            <div className={styles.inputField}>
              <Autocomplete
              sx={{
                width: "100%", fontFamily: 'inherit',
                "@media screen and (max-width: 650px)": {
                  width: "100%",
                },
                '& .css-1emna0o-MuiFormControl-root-MuiTextField-root': {
                  height: 40
                },
                '& .css-1emna0o-MuiFormControl-root-MuiTextField-root .MuiFilledInput-root': { paddingTop: '6px !important' },
                '& .css-1kvpngo-MuiAutocomplete-root .MuiFilledInput-root': { paddingTop: '0px !important', paddingLeft: 0 },
                "& .MuiFormLabel-root": {
                  fontFamily: 'inherit',
                  fontSize: 12,
                  top: '-5px',
                  left: '-5px'
                },
                ".css-1emna0o-MuiFormControl-root-MuiTextField-root .MuiFilledInput-root":{border:'none'},
                ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                  backgroundColor: "transparent",
                  fontFamily: "inherit",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
  
                  padding: 0,
                  paddingRight: "8px",
  
                  color: "rgb(133 133 133/1)",
                  position: "relative",
                },
  
                "& + .MuiInputBase-input-MuiOutlinedInput-input": {
                  height: "20px",
                },
                "& .css-9e5uuu-MuiPaper-root-MuiAutocomplete-paper": { position: 'absolute', top: 10 },
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                {
                  backgroundColor: "#4396e6",
                },
                '& + .css-1y2378-MuiAutocomplete-root .MuiFilledInput-root': {
                  padding: 0,
                  border:'none'
                },
                '& + .css-1tzgnuz-MuiInputBase-root-MuiFilledInput-root:before':{
                  border:'none !important'
                }
              }}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  console.log("in enter",event.target.value)
                  // Update the selected option
                  const matchingOption = states?.find((option) =>
                  option?.name?.content.toLowerCase().startsWith(event?.target?.value?.toString().toLowerCase())
                );
                  
                  
                if (matchingOption) {
                  setSelectedValue(matchingOption?.name?.content)
                                 setSelectedOption(matchingOption);
                                 setFilterData({
                                  ...filterData,
                                  destinationCode: matchingOption !== null ? matchingOption.code : "",
                                  destinationName: matchingOption !== null ? matchingOption?.name?.content : "",
                                 
                                  countryName: matchingOption !== null ? countries[matchingOption?.countryCode]?.name : ''
                                });
                  console.log('Found object:', matchingOption);
                } else {
                  console.log('No object found.');
                }
                }
              }}
             
                value={selectedOption}
                open={open}
               
              
                loading={loading}
                disablePortal
                id="combo-box-demo"
                options={states}
                groupBy={(option) => option.countryCode}
                // <TextField className={styles.inputText} {...params} />
                getOptionValue={(option) => option.countryCode}
                getOptionLabel={(option) => option.name.content}
                onInputChange={(e) => {  handleInputChange(e) }}
                onChange={handleChange}
                renderInput={(params) => (
                  <RedditTextField  {...params}
                    label="CITY/AREA"
                    id="reddit-input"
                    variant="filled"
                    filterData={filterData}

                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Check-in date</label>
            <div className={styles.inputField}>
              <FaCalendarCheck className="text-gray text-base" />
              <input
                type="text"
                placeholder="Friday, 09 December 2022"
                value={
                  filterData?.checkIn !== undefined
                    ? new Date(filterData?.checkIn).toDateString()
                    : ""
                }
                onChange={(e) => {
                  setFilterData({ ...filterData, checkIn: e.target.value });
                }}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className={`${styles.inputText} w-full`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Check-out date</label>
            <div className={styles.inputField}>
              <FaCalendarTimes className="text-gray text-base" />
              <input
                type="text"
                value={
                  filterData?.checkOut !== undefined
                    ? new Date(filterData?.checkOut).toDateString()
                    : ""
                }
                placeholder="Monday, 12 December 2022"
                onChange={(e) => {
                  e.preventDefault();
                  setFilterData({ ...filterData, checkOut: e.target.value });
                }}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className={`${styles.inputText} w-full`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Rooms</label>
            <div className={styles.inputField}>
              <FaUserAlt className="text-gray text-base" />
              <input
                value={filterData?.rooms}
                type="number"
                onChange={(e) => {
                  e.preventDefault();
                  setFilterData({ ...filterData, rooms: e.target.value });
                }}
                placeholder="1 room"
                className={styles.inputText}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Adults</label>
            <div className={styles.inputField}>
              <FaUserAlt className="text-gray text-base" />
              <input
                value={filterData?.adults}
                type="number"
                onChange={(e) => {
                  e.preventDefault();
                  setFilterData({ ...filterData, adults: e.target.value });
                }}
                placeholder="2 adults"
                className={styles.inputText}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Children</label>
            <div className={styles.inputField}>
              <FaUserAlt className="text-gray text-base" />
              <input
                value={filterData?.children}
                type="number"
                onChange={(e) => {
                  e.preventDefault();
                  setFilterData({ ...filterData, children: e.target.value });
                }}
                placeholder="children"
                className={styles.inputText}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {filterData?.children !== undefined &&
              filterData?.children !== "" &&
              filterData.children > 0 ? (
              <button
                type="button"
                className="bg-primary w-[50%] py-3 text-sm text-white mt-6 rounded-3xl"
                onClick={() => {
                  setAgeModal(true);
                }}
              >
                Child Detail's
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={error == true ? `` :`hidden`}>
 <Alert   severity="error">{errorText}</Alert>
        </div>
       

        <button
          type="button"
          disabled={!filterData?.destinationCode || !filterData?.checkIn || !filterData?.checkOut || !filterData?.adults || !filterData?.rooms || disabled}

          onClick={() => {
            setFilterData({ ...filterData, search: true });
          }}
          className="bg-primary w-full py-3 text-sm text-white mt-6 rounded-3xl"
        >
          Search
        </button>
      </div>
    </div>
  );
};
const RedditTextField = styled((props, params, filterData) => (
  <TextField sx={{
    '& .MuiFormHelperText-root': {
      position: 'absolute', top: 39,
      fontFamily: 'inherit'
    },
    "& .MuiFilledInput-root": {
      paddingTop: "10px",
      backgroundColor: '#FFF', height: 60
    }
  }} InputProps={{ disableUnderline: true }} {...props} {...params} helperText={filterData?.countryName} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    fontFamily: 'inherit',
    overflow: 'hidden',
    borderRadius: 4,

    border: '1px solid',
    borderColor: '#E0E3E7',

    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      //boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      // borderColor: theme.palette.primary.main,
    },
  },
}));
export default SearchForm;

"use client";
import React, { useState, useEffect } from "react";
import styles from "../../styles/style";
import style from "../../styles/Index.module.css";
import { BsFillArrowRightCircleFill, BsCalendar } from "react-icons/bs";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/hotelContext";
import { Auth } from "@/authorize";
import {  IconButton, TextField } from "@mui/material";
import { FaChild, FaUserAlt } from "react-icons/fa";
import { ChildModalComponent } from "../ChildrenModal/modal";
import Tooltip from "@mui/material/Tooltip";
import { BackdropComponent } from "../BackdropComponent";
import { SelectComponent } from "../SelectComponent";
import { filter } from "rxjs";
import { M_PLUS_1 } from "next/font/google";
import { styled, lighten, darken } from '@mui/system';
import { useGeolocated } from "react-geolocated";
import { countries } from 'country-data';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Typography } from '@mui/material';

const ChildrenAgeComponent = ({ count, setChildErrorText }) => {

  const {
    childsData,
    setChildsData,
  } = useAppContext();
  const components = [];


  for (let i = 0; i < parseInt(count); i++) {
    components.push(


      <div key={i} className="flex items-center gap-2 bg-white rounded-3xl px-1 py-1" style={{ px: 1, py: 1, border: '1px solid rgb(133 133 133/1)', width: '30%' }}>
        <input
          value={childsData[i]?.age} key={i}
          id={['children', i].join('_')}
          type="text" maxLength="2"
          onChange={(e) => {
            e.preventDefault();
            if (e.target.value < 18) {
              setChildErrorText("")
              setChildsData({
                ...childsData,
                [i]: { age: e.target.value ,filled: e.target.value !== '' ? true :false },
              });
            }
            else {
              setChildsData({
                ...childsData,
                [i]: { age: '' },
              });
              setChildErrorText("age should be less than 18")

            }

          }}
          placeholder="Age" style={{ width: '100%' }}
          className={styles.inputText}
        />

      </div>



    );
  }

  return <div className="flex flex-wrap">{components}</div>;
};


const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: 'black',

}));

const GroupItems = styled('ul')({
  padding: 0,
});
const Hero = () => {
  const router = useRouter();
  const {
    filterData,
    setFilterData,
    states,
    setStates,
    childsData,
    setChildsData, nearHotels, setNearHotels, setIsLoading, setDefaultHotels, defaultHotels
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [ageModal, setAgeModal] = useState();
  const [backdrop, setBackdrop] = useState(false);
  const [latitude, setLatitue] = useState("")
  const [longitude, setLongitude] = useState("")
  const [childErrorText, setChildErrorText] = useState('')
  const [open, setOpen] = useState(false)
  const [enteredValue, setEnteredValue] = useState('');
  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(1000)
  const[disableInput,setDisableInput]=useState(false)
const [content,setContent]=useState('')
const [selectedValue, setSelectedValue] = useState(null);
const[selectedOption,setSelectedOption]=useState(null)
const[hide,setHide]=useState(false)
const hint = React.useRef('');
const [inputValue, setInputValue] = React.useState('');
function removeDuplicates(arr, prop) {
  const seen = {};
  return arr.filter((item) => {
    const value = item[prop];
    if (seen[value]) {
      return false;
    }
    seen[value] = true;
    return true;
  });
}
  const handleOpen = (e) => {

    if (e.target.value.length > 0) {
      setOpen(true);
    }
  };
  const handleInputChange = (event) => {
console.log(event,"evenet")
    

   
    const isValueValid = states?.some((option) =>
    option?.name.toLowerCase().includes(event?.target?.value?.toString().toLowerCase())
  );
// if(isValueValid == false){

// setFrom(from + 1000)
//    setTo(to + 999)
//    fetchStates()
// }
    // if (isValueValid ) {
    //   setFrom(from + 1000)
    //   setTo(to + 999)
    //   fetchStates()
    // }
    
    
  };
  console.log(selectedValue,"selected")
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const fetchStates = async () => {
    setLoading(true);

    var signature = await Auth();
    const response = await fetch('/api/states', {
      method: "GET",
      headers: {
        "X-Signature": signature,
      },


    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res,"res")

        if (res?.status == 200 && res?.states) {
          var concatenated = states.concat(res.states);
          const stateWithNoDuplicates = removeDuplicates(concatenated, "code");
          setStates(stateWithNoDuplicates);
          setDisableInput(false)
         
        }
      });
    setLoading(false);
  };

  console.log(coords, "Coords")
  const fetchNearHotels = async (lat, long) => {
    setIsLoading(true)
    var signature = await Auth();
    var nextDay = new Date(Date.now() + (3600 * 1000 * 24)).toISOString().split('T', 1)[0]
    var shiftDays = (new Date() - new Date(filterData.checkIn)) /
      (24 * 60 * 60 * 1000)
    console.log(shiftDays)
    console.log(lat, long, "in func call")
    if (lat && long) {
      const resposne = await fetch("/api/nearHotels", {
        method: "POST",
        headers: {
          "X-Signature": signature,
        },
        body: JSON.stringify({
          checkIn: new Date().toISOString().split('T', 1)[0],
          checkOut: nextDay,
          rooms: 1,
          adults: 2,
          children: 0,
          latitude: lat,
          longitude: long,
          shiftDays: shiftDays,

        }),
      })
        .then((res) => res.json())
        .then((res) => {

          console.log(res, "in near api call")

          if (res?.data?.total > 0) {
            setNearHotels(res.data.hotels)
            setIsLoading(false)
          }
        })
    }


  }
  const fetchDefaultHotels = async () => {
    setIsLoading(true)
    var signature = await Auth();
    var nextDay = new Date(Date.now() + (3600 * 1000 * 24)).toISOString().split('T', 1)[0]
    var shiftDays = (new Date() - new Date(filterData.checkIn)) /
      (24 * 60 * 60 * 1000)
    console.log(shiftDays)

    const resposne = await fetch("/api/defaultHotels", {
      method: "POST",
      headers: {
        "X-Signature": signature,
      },
      body: JSON.stringify({
        checkIn: new Date().toISOString().split('T', 1)[0],
        checkOut: nextDay,
        rooms: 1,
        adults: 2,
        children: 0,
        latitude: 19.076090,
        longitude: 72.877426,
        shiftDays: shiftDays,

      }),
    })
      .then((res) => res.json())
      .then((res) => {

        console.log(res, "in near api call")

        if (res?.data?.total > 0) {
          console.log(res?.data?.hotels, "default hotels")
          setNearHotels(res.data.hotels)
          setIsLoading(false)
        }
      })



  }
  const searchHotels = (event) => {
    event.preventDefault();
    setBackdrop(true)
    setContent('Fetching Hotels....')
 
    setFilterData({ ...filterData, search: true });
    localStorage.setItem(
      "filterData",
      JSON.stringify(filterData)
    );
    sessionStorage.setItem('filterData', JSON.stringify(filterData))
    router.push(
      `/search?checkIn=${filterData?.checkIn}&checkOut=${filterData?.checkOut}&rooms=${filterData?.rooms}&adults=${filterData?.adults}&children=${filterData?.children}&destinationCode=${filterData?.destinationCode}&destinationName=${filterData?.destinationName}&countryName=${filterData?.countryName}`
    );
    
  };

  useEffect(() => {
    fetchStates();
    //fetchDefaultHotels();
  }, []);
  useEffect(() => {
    if (coords) {
      console.log(" supporting", coords)
      setLatitue(coords.latitude)
      setLongitude(coords.longitude)
    } else {
      console.log("supporting")
    }


  }, [coords]);
  useEffect(() => {

    //fetchNearHotels()
    if (latitude !== '' && longitude !== '') {
      fetchNearHotels(latitude, longitude)

    } else {
      fetchDefaultHotels()
    }

  }, [latitude, longitude]);
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
      setErrorText("Check-in must be in future");
      console.log("must be future")

    } else if (new Date(filterData.checkIn) > new Date(filterData.checkOut)) {
      setDisabled(true);
      setErrorText("check-out date earlier than check-in");
      console.log("checkout date earlier")

    } else if (filterData.checkIn === filterData.checkOut) {
      console.log(filterData.checkIn,filterData.checkOut)
      setErrorText("check-in date & check-out date are same");
      console.log("same dates")

      setDisabled(true);
    } else if (shift >= 5) {
      console.log("shift > 5")

      setDisabled(true);
      setErrorText("Difference between checkIn & checkout more than 5");
    }else{
      console.log("in usefefect filterdata")
      setErrorText("");
      setDisabled(false)
    }

    
  }, [filterData]);
  // useEffect(() => {
  //   if (
  //     filterData.checkIn &&
  //     filterData.checkOut &&
  //     filterData.adults &&
  //     filterData.destinationCode &&
  //     filterData.rooms &&
  //     filterData.children
  //   ) {
  //     console.log(( filterData.checkIn &&
  //       filterData.checkOut &&
  //       filterData.adults &&
  //       filterData.destinationCode &&
  //       filterData.rooms &&
  //       filterData.children),"here in filter Data")
  //     setDisabled(true);
  //   } else {
  //     console.log("in filterData")
  //     setDisabled(false);
  //   }
  // }, [filterData]);
  console.log(Object.keys(childsData).length,Object.values(childsData),"childsData")

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

  console.log(disabled,"disabled")

 

  const handleChange = (e, v) => {
    
console.log(v,"v")
    setFilterData({
      ...filterData,
      destinationCode: v !== null ? v.code : "",
      destinationName: v !== null ? v?.name : "",
      adults: 1,
      rooms: 1,
      countryName: v !== null ? countries[v?.countryCode]?.name : ''
    });
  };

  const handleRooms = (value) => {
    setFilterData({ ...filterData, rooms: parseInt(value) });
  };
  const handleAdults = (value) => {
    setFilterData({ ...filterData, adults: parseInt(value) });
  };
  const handleChildrens = (value) => {
    setFilterData({ ...filterData, children: parseInt(value) });
  };
  
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default Enter key behavior (e.g., form submission)
      event.preventDefault();

      // Handle the selected value (in this example, we'll just log it)
      if (selectedValue) {
        console.log('Selected Value:', selectedValue);
      }
    }
  };
  console.log(Object.values(childsData),"childs data values");

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

  console.log(!filterData?.destinationCode || !filterData?.checkIn || !filterData?.checkOut || !filterData?.adults || !filterData?.rooms || disabled,"check")
  return (
    <div key="hero">
      <ChildModalComponent ageModal={ageModal} setAgeModal={setAgeModal} />
      <BackdropComponent backdrop={backdrop} setBackdrop={setBackdrop} content={content} />
      <div
        className={`${styles.width} ${style.heroBanner} flex justify-center h-[50vh] rounded-[30px] relative pb-10`}
      >
        <div
          className="w-[80%] md:w-[full] lg:w-[full]  grid justify-center h-auto m-auto text-center absolute top-1/2 translate-y-[-50%]"
        >
          <h2
            style={{ overflowWrap: "anywhere" }}
            className=" font-semibold text-2xl md:text-[40px] md:leading-[70px] text-white "
          >
            Book your stay with NIfty Travels
          </h2>
          <span
            style={{ overflowWrap: "anywhere" }}
            className=" break-words	text-sm md:text-xl text-white leading-[30px]"
          >
            1,480,086 rooms around the world are waiting for you!
          </span>
        </div>
      </div>
    
   
  

      <div className="w-[90%] md:w-[90%] m-auto flex flex-col md:flex-row pr-[20px]  justify-evenly bg-white shadow-[0px_4px_10px_0px_#e1e1e1] pl-10 py-4 rounded-3xl md:rounded-[100px] relative top-[30px] md:top-[-35px]">
        <div className=" basis-full md:basis-1/3 flex flex-col gap-1 ">
          <label className={styles.label}>Location</label>
          <Autocomplete
            sx={{
              width: "80%", fontFamily: 'inherit',
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
                padding: 0
              }
            }}
            loading={loading}
            freeSolo
            disablePortal
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                console.log("in enter",event.target.value)
                // Update the selected option
                const matchingOption = states?.find((option) =>
                option?.name.toLowerCase().startsWith(event?.target?.value?.toString().toLowerCase())
              );
                
                
              if (matchingOption) {
                setSelectedValue(matchingOption?.name)
                               setSelectedOption(matchingOption);
                               setFilterData({
                                ...filterData,
                                destinationCode: matchingOption !== null ? matchingOption.code : "",
                                destinationName: matchingOption !== null ? matchingOption?.name : "",
                               
                                countryName: matchingOption !== null ? countries[matchingOption?.countryCode]?.name : ''
                              });
                console.log('Found object:', matchingOption);
              } else {
                console.log('No object found.');
              }
              }
            }}
           
            open={open}
            // filterOptions={(options, state) => {
            //   const displayOptions = options.filter((option) =>
            //     option.name.content
            //       .toLowerCase()
            //       .trim()
            //       .includes(selectedValue?.toLowerCase().trim()),
            //   );
      
            //   return displayOptions;
            // }}
            value={selectedOption}
            onOpen={(e) => { handleOpen(e) }}
            onClose={() => setOpen(false)}
            id="combo-box-demo"
            options={states}
           disableInput={disableInput}
            groupBy={(option) => option?.countryCode}
            // <TextField className={styles.inputText} {...params} />
            getOptionValue={(option) => option?.countryCode}
            getOptionLabel={(option) => option?.name}
            onInputChange={(e,v) => { setOpen(true); handleInputChange(e,v) }}
            onChange={handleChange}
            renderInput={(params) => {
              return (
                <RedditTextField  {...params}
                  filterData={filterData}
                  label="CITY/AREA"
                  id="reddit-input"
                  variant="filled"

                />

              )
            }}

            renderGroup={(params) => {

              return (

                <li key={params.key}>
                  <GroupHeader><PlaceIcon />{countries[params.group]?.name}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>

              )
            }}
          />
        </div>

        <div className="basis-full md:basis-1/4 flex flex-col gap-1 top-[8px] mb-3 relative">
          <label className={styles.label}>Check-in</label>
          <div className="flex items-center justify-between w-full xl:w-4/5 lg:w-4/5	md:w-4/5 sm:w-full"  >
            <input
              type="date"
              placeholder="Add date"
              min={new Date().toISOString().split('T')}
              onChange={(e) => {
                setFilterData({ ...filterData, checkIn: e.target.value });
              }}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "date")}
              className={styles.inputText + "w-[100%] md:w-[100%]"}
            />

            <BsCalendar className="text-gray text-base" />
          </div>

          <div className="w-[100%] md:w-[1px] h-[1px] md:h-12 bg-[#bdbdbd] absolute top-[50px] md:top-0 md:left-[-20px]"></div>
        </div>

        <div className="basis-full md:basis-1/4 flex flex-col gap-1 top-[8px] mb-3 relative">
          <label className={styles.label}>Check-out</label>
          <div className="flex items-center justify-between  xl:w-4/5 lg:w-4/5	md:w-4/5 " >
            
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              max={new Date()}
              onChange={(e) => {
                setFilterData({ ...filterData, checkOut: e.target.value });
              }}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              className={styles.inputText + "w-[100%] md:w-[100%]"}
            />
            <BsCalendar className="text-gray text-base" />
          </div>

          <div className="w-[100%] md:w-[1px] h-[1px] md:h-12 bg-[#bdbdbd] absolute top-[50px] md:top-0 md:left-[-20px]"></div>
        </div>

        <div className="basis-full md:basis-1/5 flex flex-col gap-1 top-[8px] mb-3  relative">
          <label className={styles.label}>Adults</label>
          <SelectComponent value={filterData?.adults} onChange={handleAdults} />
          {/* <input
            style={{ width: "70%" }}
            type="text"
            onChange={(e) => {
              setFilterData({ ...filterData, adults: e.target.value });
            }}
            placeholder="Number of adults"
            className={styles.inputText}
          /> */}
          <div className="w-[100%] md:w-[1px] h-[1px] md:h-12 bg-[#bdbdbd] absolute top-[50px] md:top-0 md:left-[-20px]"></div>
        </div>

        <div  className="basis-full md:basis-1/4 flex flex-col gap-1 top-[8px] mb-3 relative">
          <label onClick={()=>{setHide(!hide)}} className={styles.label}>Children</label>
          <SelectComponent value={filterData?.children} onChange={handleChildrens} />

<div className={hide ? `hidden` : `block`} >
<ChildrenAgeComponent setChildErrorText={setChildErrorText} count={filterData.children !== undefined ? filterData.children : 0} />
<span className="text-sm text-red-700">{childErrorText}</span>

  </div>

          <div className="w-[100%] md:w-[1px] h-[1px] md:h-12 bg-[#bdbdbd] absolute top-[50px] md:top-0 md:left-[-20px]"></div>
        </div>
        {/* {filterData?.children !== undefined &&
          filterData?.children !== "" &&
          filterData.children > 0 ? (
          <Tooltip
            onClick={() => {
              setAgeModal(true);
            }}
            autoFocus={filterData?.children > 0 ? true : false}
            style={{ marginRight: "20px" }}
            title="Enter child details"
          >
            <IconButton>
              <FaChild className="text-gray text-base" />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )} */}
        <div className="basis-full md:basis-1/5 flex flex-col gap-1 top-[8px] mb-3 relative">
          <label className={styles.label}>Rooms</label>
          <SelectComponent value={filterData?.rooms} onChange={handleRooms} />

          {/* <input
            type="text"
            style={{ width: "50%" }}
            placeholder="Add rooms"
            onChange={(e) => {
              setFilterData({ ...filterData, rooms: e.target.value });
            }}
            className={styles.inputText}
          /> */}
          <div className="w-[100%] md:w-[1px] h-[1px] md:h-12 bg-[#bdbdbd] absolute top-[50px] md:top-0 md:left-[-20px]"></div>
        </div>
        <div className="  text-center flex justify-center mt-2">
          <button 
            type="button" className="hidden md:block lg:block"
            disabled={!filterData?.destinationCode || !filterData?.checkIn || !filterData?.checkOut || !filterData?.adults || !filterData?.rooms || disabled}
            onClick={(event) => {
              searchHotels(event);
            }}
          >
            <BsFillArrowRightCircleFill className="text-primary text-4xl md:text-5xl" />
          </button>
          <button 
            type="button" className=" w-[full] block md:hidden lg:hidden rounded-full p-2 bg-primary text-white text-sm md:text-5xl"
            disabled={!filterData?.destinationCode || !filterData?.checkIn || !filterData?.checkOut || !filterData?.adults || !filterData?.rooms || disabled}
            onClick={(event) => {
              searchHotels(event);
            }}
          >
          Search
          </button>
        </div>
      </div>
      <div className="w-full h-auto m-auto text-center mt-12  md:mt-1 translate-y-[-50%]">
        <span className="text-sm md:text-xl text-black leading-[30px]">
          {errorText}
        </span>
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
      paddingTop: "6px",
      backgroundColor: '#FFF'
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
export default Hero;

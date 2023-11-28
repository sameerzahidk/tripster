"use client";
import React,{useState} from "react";
import styles from "../../styles/style";
import style from "../../styles/Index.module.css";

const FilterForm = ({ heading, data, selected, setSelect, multiple }) => {

  console.log("in filter form")

  const [checkedState, setCheckedState] = useState([]);
  
  const handleOnChange = (position,itemValue) => {
    if(multiple ==  true){
      if (selected?.includes(itemValue)) {
        setSelect(selected.filter((item) => item !== itemValue));
      } else {
        setSelect(selected => [...selected,itemValue] )
      }
    }else{
      console.log("here", selected , itemValue)
     if(selected?.length == 0){

      setSelect(selected => [...selected,itemValue] )

     }
     if (selected?.includes(itemValue)) {
      setSelect([])
     }else{
      setSelect(itemValue)
     }
    }
    //setCheckedState(checkedState => [...checkedState,itemValue] );
     
    
    
    //setCheckedState(updatedCheckedState);


  };
  return (
    <div className="md:mb-6 md:px-0">
      <h4 className={`${styles.heading} mb-3`}>{heading}</h4>
      <div className="flex flex-col gap-4">
        {data?.map((item,index) => (
          <div>
            <input multiple={multiple}
              value={item.value}
             // onChange={() => handleOnChange(index)}
              
              type="checkbox"
              className={style.roundedCheckbox}
              id="checkbox"
              checked={selected?.includes(item?.value)}
              //checked={checkedState?.[index]}
              onChange={() => handleOnChange(index,item.value)}
            />
            <label onClick={()=>{handleOnChange(index,item.value)}} className="text-sm font-light ml-1">
              {item?.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterForm;

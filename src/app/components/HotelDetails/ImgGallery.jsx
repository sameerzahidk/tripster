"use client";
import React from "react";
import styles from "../../styles/style";

const ImgGallery = ({ hotelDetails }) => {
  return (
    <div className={`${styles.width} flex flex-col md:flex-row lg:flex-row gap-4`}>
      <div className={`basis-1/2 hotelDetailImg w-full md:h-full `}>
      {hotelDetails?.images == undefined ? 
(             <div className={`w-full rounded-2xl ${hotelDetails?.images == undefined ? `hotel hotel1 ` : ""} `} />
)
      :
      <img className="w-full rounded-2xl" src={process.env.HOTELBEDS_LARGE_IMAGE_PATH + hotelDetails?.images?.filter(option => option.type.code == 'HAB')?.[0]?.path} />

}
      </div>

      <div className="basis-1/2 flex gap-4 w-full">
        <div className="w-full h-full flex flex-col gap-4" key="part-21">
          {
            hotelDetails?.images == undefined ?
             <div className={`w-full rounded-2xl ${hotelDetails?.images?.[0]?.path == undefined ? `hotel hotel1 ` : ""} `} />
            

            :
            hotelDetails?.images?.filter(option => option.type.code == 'HAB')?.slice(1,3).map((image, index) =>
            (
              <img className="w-full rounded-2xl" src={process.env.HOTELBEDS_LARGE_IMAGE_PATH + image?.path} key={index}/>
            )
            )
          }
          

        </div>

        <div className="w-full h-full flex flex-col gap-4"  key="part-22">
          {
            hotelDetails?.images?.slice(4, 6).map((image, index) =>
            (
              <img className="w-full rounded-2xl h-full" src={process.env.HOTELBEDS_LARGE_IMAGE_PATH + image.path} key={index}/>
            )
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ImgGallery;

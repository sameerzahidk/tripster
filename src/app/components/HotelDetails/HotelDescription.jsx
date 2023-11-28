"use client";
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaParking, FaClock, FaBath } from "react-icons/fa";
import { HiWifi } from "react-icons/hi";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { TbAirConditioningDisabled } from "react-icons/tb";
import styles from "../../styles/style";

const HotelDescription = ({ hotelDetails }) => {

  const [activeTab, setActiveTab] = React.useState("overview");
  const data = [
    {
      label: "Overview",
      value: "overview",
      heading: "Property overview",
    },
    {
      label: "Rooms",
      value: "rooms",
      heading: "Rooms"
    },
    {
      label: "Amenities",
      value: "amenities",
      heading: "Amenities"
    },
  ];

  return (
    <div className={styles.width}>
      <div className="md:flex justify-between items-center my-8">
        <div>
          <h4 className="font-medium text-xl">{hotelDetails?.name?.content}</h4>
          <p className="text-sm font-light w-full md:w-full" style={{textAlign: "justify"}}>
            {hotelDetails?.description?.content}
          </p>
        </div>

        {/* <div className="flex gap-3 items-center md:justify-end mt-2 md:mt-0">
          <div>
            <h5 className="text-[#009D52] font-medium text-base">Excellent</h5>
            <span className="text-xs font-light text-gray">832 reviews</span>
          </div>

          <div>
            <span className="text-[#009D52] bg-[#E1FFD7] py-1 px-4 text-sm rounded-3xl w-[160px]">
              {hotelDetails?.ranking}
            </span>
          </div>
        </div> */}
      </div>

      {/* TABS */}
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-gray bg-transparent p-0 gap-8"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-solid border-primary shadow-none rounded-none active-border",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`${activeTab === value
                  ? "text-primary font-medium"
                  : "text-gray font-light"
                } w-auto text-sm`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, heading, desc, propertyOverview }) => (
            <TabPanel key={value} value={value} className="mt-2 mb-5">
              <h4 className={`${styles.heading} mb-3`}>{heading}</h4>
              <div className="flex flex-col gap-3">
                {activeTab == 'overview' ? (
                  <>
                    <div className="items-center text-sm font-light">
                      <span className="text-lg">Address: </span>
                      <span>{hotelDetails?.address?.content}, {hotelDetails?.city?.content}, {hotelDetails?.state?.name} - {hotelDetails?.postalCode}</span>
                    </div>
                    <div className="items-center text-sm font-light">
                      <span className="text-lg">Email: </span>
                      <span>{hotelDetails?.email}</span>
                    </div>
                    <div className="items-center text-sm font-light">
                      <span className="text-lg">Contact Numbers: </span>
                      {
                        <ul>
                        {
                          hotelDetails?.phones.map((phone) => {
                            return (
                                <li>{phone.phoneType} - {phone?.phoneNumber}</li>
                            )
                          })
                        }
                        </ul>
                      }
                    </div>
                  </>
                ) : activeTab == 'rooms' ? (
                  <ul>
                    {
                      hotelDetails?.rooms.map((room, index) => (
                        <li key={index}>{room?.description}</li>
                      ))
                    }
                  </ul>
                ) : activeTab == 'amenities' ? (
                  <div className="cs-flex gap-3">
                  {
                      hotelDetails?.facilities?.map((facility) => {
                        return (
                          <div className="items-center text-sm font-light">
                            <span>{facility?.description?.content},</span>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : ''}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default HotelDescription;

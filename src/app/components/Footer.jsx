"use client";
import React from "react";
import styles from "../styles/style";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#F8F8F8] py-8">
      <div className={`${styles.width} flex justify-between`}>
        <div>
          <Link href="/">
            <h4 className="font-medium text-xl">
              NIfty Travels
            </h4>
          </Link>

          <p className="w-4/5 md:w-full font-light text-xs leading-4 mt-1 mb-10">
            Your favorite hotel booking experience since 1997!
          </p>
          <span className="text-gray font-light text-xs leading-4">
            Uizard © 2022
          </span>
        </div>

        {/* <div>
          <h6 className="font-medium text-xs leading-4 mb-3">Help</h6>
          <ul className=" flex flex-col gap-3 font-light text-xs leading-4">
            <li>FAQ</li>
            <li>Customer Service</li>
            <li>How to guide</li>
            <li>Contact us</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;

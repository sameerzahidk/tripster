"use client";
import React from "react";
import styles from "../../styles/style";
import style from "../../styles/Index.module.css";
import { FaHandHoldingUsd } from "react-icons/fa";

const Newsletter = () => {
  return (
    <div
      className={`${styles.width} bg-white ${style.boxShaddow} rounded-[20px]`}
      key="newsletter"
    >
      <div className="px-7 py-4 md:flex justify-between items-center my-12">
        <div className="flex items-center gap-6">
          <div>
            <FaHandHoldingUsd className="text-4xl" />
          </div>

          <div>
            <h6 className="text-base font-semibold">Pssst!</h6>
            <p className="text-sm font-light">
              Do you want to get secret offers and best prices for amazing
              stays? <br /> Sign up to join our Travel Club!
            </p>
          </div>
        </div>

        <div className="text-center my-3 md:my-0">
          <a href="/">
            <button className="text-primary text-sm px-8 py-2 rounded-3xl border-[1px] border-solid border-primary">
              Sign up for newsletter
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

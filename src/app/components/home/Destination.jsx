"use client";
import React from "react";
import styles from "../../styles/style";
import style from "../../styles/Index.module.css";

const Destination = () => {
  return (
    <div className={`${styles.width} pt-20`} key="destination">
      <h4 className="text-xl leading-[30px] mb-5">Popular destinations</h4>

      <div className="flex flex-col md:flex-row gap-5 md:gap-3 w-full h-[1800px] md:h-[400px]">
        <div className="w-full h-[300px] md:h-full destination1 destination relative">
          <span className={styles.destName}>Spain</span>
        </div>

        <div className="flex flex-col gap-5 w-full h-[600px] md:h-full">
          <div className="destination2 destination w-full h-[300px] md:h-4/5 relative">
            <span className={styles.destName}>London</span>
          </div>
          <div className="destination3 destination w-full h-[300px]  relative">
            <span className={styles.destName}>Srilanka</span>
          </div>
        </div>

        <div className="w-full h-[300px] md:h-full">
          <div className="w-full h-[300px] md:h-full destination4 destination relative">
            <span className={styles.destName}>India</span>
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full h-[600px] md:h-full">
          <div className="destination5 destination w-full h-[300px]  relative">
            <span className={styles.destName}>Japan</span>
          </div>
          <div className="destination6 destination w-full h-[300px] md:h-4/5 relative">
            <span className={styles.destName}>Thailand</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;

'use client'
import React, { useEffect } from 'react';
import SearchForm from '../components/search/SearchForm';
import Filter from '../components/search/Filter';
import SearchResult from '../components/search/SearchResult';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react'

const page = React.memo(() => {
   
    return (
        <Suspense>
  <div className='border-t-[1px] border-solid border-[#DEDEDE]'>
            <div className={`md:w-[90%] m-auto md:flex md:gap-10`}>
                <div className='basis-[30%]'>
                    <SearchForm />
                    <Filter />
                </div>

                <div className='basis-[70%]'>
                    <SearchResult />
                </div>
            </div>
        </div>
        </Suspense>
      
    );
});

export default page;
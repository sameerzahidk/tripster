"use client";
import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

const PaginationButtons = ({ setCurrentPage, currentPage, totalPages }) => {

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected+1);
  };

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center mt-8"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-full">
            <MdKeyboardArrowRight className="text-[#757575] font-bold text-xl" />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-rull mr-2">
            <MdKeyboardArrowLeft className="text-[#757575] font-bold text-xl" />
          </span>
        }
        containerClassName="flex items-center justify-center mt-8 mb-4 text-sm"
        pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-8 h-8 flex items-center justify-center rounded-full mr-2"
        activeClassName="bg-primary text-white"
      />
    </motion.div>
  );
};

export default PaginationButtons;

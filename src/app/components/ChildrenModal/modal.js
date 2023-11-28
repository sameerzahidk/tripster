
import { useAppContext } from "@/hotelContext";
import styles from "../../styles/style";
import { FaChevronCircleDown, FaUserAlt } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

export const ChildModalComponent = (props) => {
    const { filterData } = useAppContext();

    const [errorText, setErrorText] = useState('')


    return (
        <div
            tabIndex="-1"
            aria-hidden="false"
            style={{ display: props.ageModal == true ? "flex" : "none" }}
            className="fixed flex justify-center right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative w-full max-w-sm max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Children's Age
                        </h3>
                        <div onClick={()=>{props.setAgeModal(false)}}>
                            <CloseIcon/>
                        </div>
                        {/* <button
                            onClick={() => { props.setAgeModal(false) }}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button> */}
                    </div>
                    <div className="p-6 space-y-6  justify-center">
                        <ChildrenAgeComponent setErrorText={setErrorText} count={filterData.children !== undefined ? filterData.children : 0} />
                        <span className="text-sm text-red-700">{errorText}</span>
                    </div>
                    <div className="flex items-center justify-center p-6 space-x-2  border-gray-200 rounded-b dark:border-gray-600">
                        <button disabled={errorText !== '' ? true : false}
                            onClick={() => { props.setAgeModal(false) }}
                            data-modal-hide="defaultModal"
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChildrenAgeComponent = ({ count,setErrorText }) => {
    
    const {
        childsData,
        setChildsData,
    } = useAppContext();
    const components = [];
    

    for (let i = 0; i < parseInt(count); i++) {
        components.push(
            <div className="flex flex-col gap-1" style={{ marginTop: '8px' }} key={i}>
                <label className="text-sm">Children {i + 1} Age</label>
                <div className={styles.inputField} style={{ border: '1px solid rgb(133 133 133/1)' }}>
                    <FaChild className="text-gray text-base" />
                    <input
                        value={childsData[i]?.age} key={i}
                        id={['children', i].join('_')}
                        type="text" maxLength="2"
                        onChange={(e) => {
                            e.preventDefault();
                            if (e.target.value < 18) {
                                setErrorText("")
                                setChildsData({
                                    ...childsData,
                                    [i]: { age: e.target.value },
                                });
                            }
                            else {
                                setChildsData({
                                    ...childsData,
                                    [i]: { age: '' },
                                });
                                setErrorText("age should be less than 18")

                            }

                        }}
                        placeholder="Age"
                        className={styles.inputText}
                    />

                </div>

            </div>

        );
    }

    return <div>{components}</div>;
};
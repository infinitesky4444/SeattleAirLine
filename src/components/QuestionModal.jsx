import React, { useState } from "react";

const QuestionModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                className="bg-teal-300 text-black active:bg-teal-500 
                    font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Book Now
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-70"></div>
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-3xl font=semibold">General Info</h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={() => setShowModal(false)}>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                            First Name
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Last Name
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            Address
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                            City
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-teal-500 active:bg-teal-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default QuestionModal;
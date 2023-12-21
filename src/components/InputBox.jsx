import React, { useState, useEffect, use } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useSelector,useDispatch } from 'react-redux';

const InputBox = () => {
    const [arrive, setArrive] = useState('');
    const [round, setRound] = useState(false);
    const [date, setDate] = useState(new Date());
    const [suggestions, setSuggestions] = useState([]);
    const [cityCodes, setCityCodes] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();



    const handleArrive = (e) => {
        autocomplete(e.target);
        setArrive(e.target.value);
    }

    const handleFlight = (e) => {
        setRound(e.target.value);
    }

    const handleDate = (date) => {
        setDate(date);
    }

    const autocomplete = async (input) => {
        try {
            const params = new URLSearchParams({ keyword: input.value });
            const response = await fetch(`http://localhost:8000/api/autocomplete?${params}`);
            const data = await response.json();

            let options = [];
            let citycode = [];
            let countrycodes = [];

            data.forEach((entry) => {
                citycode[entry.name.toLowerCase()] = entry.iataCode;
                countrycodes[entry.name.toLowerCase()] = entry.address.countryCode;
                options.push(entry.name)
            });
            setSuggestions(options);
            setCityCodes(citycode);
            setCountryCodes(countrycodes);
        } catch (error) {
            console.error(error);
        }
    }

    const formatDate = (date) => {
        const [formattedDate] = date.toISOString().split("T");

        return formattedDate;
    };

    const handleSubmit = async () => {
        try {
            const returns = round;
            const params = new URLSearchParams({
                origin: 'SEA',
                destination: cityCodes[arrive.toLowerCase()],
                departureDate: formatDate(date),
                adults: '1',
            });
            const response = await fetch(`http://localhost:8000/api/search?${params}`);
            const data = await response.json();
            const countries = {
                destination: 'US',
                arrival: countryCodes[arrive.toLowerCase()]
            }
            console.log(countryCodes)
            dispatch({ type: 'GET_RESULT', payload: data });
            dispatch({type: 'GET_COUNTRIES', payload: countries})
            setResults(data);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12 mx-2 md:mx-8">
                <div className='mx-auto w-full'>
                    <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Fly From</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600" >
                            <LocationMarkerIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </span>
                        <input type="text" id="input-group-1" disabled className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SEATTLE" />
                    </div>
                </div>
                <div className='mx-auto  w-full'>
                    <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Fly To</label>
                    <div className="flex input-group">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600" >
                            <LocationMarkerIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </span>
                        <input type="text" id="destination-input" onChange={handleArrive} className="
                                        rounded-none rounded-e-lg 
                                        bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 
                                        block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" list="destination-options" placeholder="SEATTLE" />
                        <datalist id="destination-options">
                            {suggestions.map((suggestion, index) => {
                                return <option value={suggestion} key={index}></option>
                            })}
                        </datalist>
                    </div>
                </div>
                <div className='mx-auto  w-full'>
                    <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Flight</label>
                    <div className="flex">
                        <select id='from' onChange={handleFlight} className='
                        bg-gray-50 
                        border border-gray-300 
                        text-gray-900 text-sm 
                        rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block p-2.5 mx-auto  w-full
                        dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value="OneWay" selected>One-way</option>
                            <option value="Round" selected>Round-trip</option>
                        </select>
                    </div>
                </div>
                <div className='mx-auto '>
                    <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Departure date</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600" >
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                            </svg>
                        </span>
                        <DatePicker
                            id="datepicker"
                            selected={date}
                            onChange={handleDate}
                            className="
                            rounded-none rounded-e-lg 
                            bg-gray-50 
                            border border-gray-300 
                            text-gray-900 text-sm 
                            focus:ring-blue-500 focus:border-blue-500 
                            block p-2.5 mx-auto w-80
                            dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button onClick={handleSubmit} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded my-6">
                    Search
                </button>
            </div>
        </div>
    )
}

export default InputBox;
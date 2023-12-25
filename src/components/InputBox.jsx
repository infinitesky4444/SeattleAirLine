import React, { useState, useEffect, use } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';

const InputBox = () => {
    const [arrive, setArrive] = useState('');
    const [round, setRound] = useState(false);
    const [date, setDate] = useState(new Date());
    const [suggestions, setSuggestions] = useState([]);
    const [cityCodes, setCityCodes] = useState([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [results, setResults] = useState([]);
    const [errorArrival, setErrorArrival] = useState(true);
    const [errorDate, setErrorDate] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleArrive = (e) => {
        if (e.target.value === '') {
            setErrorArrival(true);
        } else {
            setErrorArrival(false);
        }
        autocomplete(e.target);
        setArrive(e.target.value);
    }

    const handleFlight = (e) => {
        setRound(e.target.value);
    }

    const handleDate = (date) => {
        const currentDate = new Date();
        if (date < currentDate) {
            setErrorDate(true);
        } else {
            setErrorDate(false);
        }
        setDate(date);
    }

    const autocomplete = async (input) => {
        try {
            const params = new URLSearchParams({ keyword: input.value });
            const response = await fetch(`https://seattle-air-line-backend.vercel.app/api/autocomplete?${params}`);
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
        if (!errorArrival && !errorDate) {
            try {
                setLoading(true);
                const returns = round;
                const params = new URLSearchParams({
                    origin: 'SEA',
                    destination: cityCodes[arrive.toLowerCase()],
                    departureDate: formatDate(date),
                    adults: '1',
                });
                const response = await fetch(`https://seattle-air-line-backend.vercel.app/api/search?${params}`);
                const data = await response.json();
                const countries = {
                    destination: 'US',
                    arrival: countryCodes[arrive.toLowerCase()]
                }
                dispatch({ type: 'GET_RESULT', payload: data });
                dispatch({ type: 'GET_COUNTRIES', payload: countries });
                setResults(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        } else {
            return;
        };
    }



    return (
        <div className="header-image">
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
                        {errorArrival ? <div className="text-sm text-red text-center">Please enter valid arrival location</div> : ''}
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
                    <div className='mx-auto'>
                        <label for='from' className='block text-gray-500 font-bold text-center mb-1 md:mb-0 py-4'>Departure date</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600" >
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                                </svg>
                            </span>
                            <div className="w-full">
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
                                    block p-2.5 mx-auto w-full lg:w-80
                                    dark:bg-gray-700 dark:border-gray-600 
                                    dark:placeholder-gray-400 dark:text-white 
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                        {errorDate ? <div className="text-sm text-red text-center">Destination Date can't be previous day</div> : ''}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button onClick={handleSubmit} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded my-6">
                        Search
                    </button>
                </div>
                {loading && <div role="status" class="fixed -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>}
            </div>
        </div>
    )
}

export default InputBox;
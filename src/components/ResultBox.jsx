import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { carriers } from "../data/carriers";
import AirlineInfo from "./AirlineInfo";

const ResultBox = () => {
    const result = useSelector(state => state.results.data);
    const countries = useSelector(state => state.contries.contries);
    const [noDirect, setNoDirect] = useState(true);
    const dispatch = useDispatch();

    const handleClick = (key) => {
        const airline = result[key];
        dispatch({ type: 'SELECT_AIRLINE', payload: airline });
    }

    useEffect(() => {
        for (const i of result) {
            for (const j of i.itineraries) {
                if (j.segments.length === 1) {
                    setNoDirect(false);
                    return;
                }
                else setNoDirect(true);
            }
        }

        dispatch({ type: 'SELECT_AIRLINE', payload: null });
    })

    if (result.length > 0) {
        if (noDirect) {
            return (
                <div className="p-10">
                    <div className="text-center bg-teal-500 text-white p-5 text-lg">
                        Sorry, No Direct Flights
                    </div>
                </div>
            )
        } else
            return (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10">
                        <div className="md:col-span-2 border shadow-2xl h-fit">
                            {result.map(({ itineraries, price, validatingAirlineCodes }, key) => {
                                const priceLabel = `${price.total} ${price.currency}`;
                                return (
                                    <>
                                        {
                                            itineraries.map((itinerary, index) => {
                                                const [, hours, minutes] = itinerary.duration.match(/(\d+)H(\d+)?/);
                                                if (itinerary.segments.length === 1) {
                                                    return (
                                                        <div onClick={() => handleClick(key)} className="p-5 hover:bg-gray-200 cursor-pointer">
                                                            <div key={index} className="flex grid grid-cols-2 md:grid-cols-3 items-center">
                                                                <div className="mr-auto">
                                                                    <div className="text-xl font-bold text-teal-500">{carriers[validatingAirlineCodes[0]]}</div>
                                                                    <div>{hours || 0}h {minutes || 0}m</div>
                                                                </div>
                                                                <div className="text-lg font-bold mx-auto grid grid-cols-3 gap-4 items-center hidden md:flex">
                                                                    <div>
                                                                        {itinerary.segments[0].departure.iataCode}
                                                                        <img src={`https://flagsapi.com/${countries.destination}/flat/32.png`} />
                                                                    </div>
                                                                    <div className="text-center text-4xl">
                                                                        →
                                                                    </div>
                                                                    <div>
                                                                        {itinerary.segments[0].arrival.iataCode}
                                                                        <img src={`https://flagsapi.com/${countries.arrival}/flat/32.png`} />
                                                                    </div>
                                                                </div>
                                                                <span className="ml-auto bg-teal-200 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                                                    {priceLabel}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return null;
                                            })
                                        }
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            <AirlineInfo />
                        </div>
                    </div>
                </>
            )
    } else {
        return (
            <div className="p-10">
                <div className="text-center bg-teal-500 text-white p-5 text-lg">
                    Sorry, No Available Flights
                </div>
            </div>
        )
    }
}

export default ResultBox;
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { carriers } from "../data/carriers";

const ResultBox = () => {
    const result = useSelector(state => state.results.data);
    const countries = useSelector(state => state.contries.contries);
    console.log(countries);


    if (result.length > 0) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-10">
                    <div className="col-span-2 border shadow-2xl">
                        {result.map(({ itineraries, price, validatingAirlineCodes, index }) => {
                            const priceLabel = `${price.total} ${price.currency}`;
                            return (
                                <div key={index} className="m-5">
                                    {
                                        itineraries.map((itinerary, index) => {
                                            const [, hours, minutes] = itinerary.duration.match(/(\d+)H(\d+)?/);
                                            if (itinerary.segments.length === 1) {
                                                return (
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
                                                        <div className="ml-auto">
                                                            {priceLabel}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return;
                                            }
                                        })
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div>

                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="text-center m-10 bg-teal-500 text-white p-5 text-lg">
                    Sorry, No Available Flights
                </div>
            </>
        )
    }

}

export default ResultBox;
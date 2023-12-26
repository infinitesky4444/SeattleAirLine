import React from "react";
import { useSelector } from "react-redux";
import { carriers } from "../data/carriers";
import QuestionModal from "./QuestionModal";

const AirlineInfo = () => {
  const selectedAirline = useSelector(state => state.airlines.selectedAirline);

  if (!selectedAirline) {
    return (
      <div className="info-box border shadow-xl text-center p-5 text-teal-500 font-bold">
        Select flight to see more
      </div>
    )
  } else
    return (
      <div className=" info-box border shadow-2xl p-5 mt-5 md:mt-0">
        <div className="text-center text-teal-500 text-3xl mt-5 mb-10 font-bold">
          {carriers[selectedAirline.validatingAirlineCodes[0]]}
        </div>
        <div className="flex items-center my-2 border-b-2">
          <div className="font-bold text-teal-500 text-xl">Departure At:</div>
          <div className="text-lg ms-5">
            {new Date(selectedAirline.itineraries[0].segments[0].departure.at).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center my-2 border-b-2">
          <div className="font-bold text-teal-500 text-xl">Arrive At:</div>
          <div className="text-lg ms-5">
            {new Date(selectedAirline.itineraries[0].segments[0].arrival.at).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center my-2 border-b-2">
          <div className="font-bold text-teal-500 text-xl">Bookable Seats:</div>
          <div className="text-lg ms-5">
            {selectedAirline.numberOfBookableSeats} Seats
          </div>
        </div>
        <div className="flex items-center my-2 border-b-2">
          <div className="font-bold text-teal-500 text-xl">Price:</div>
          <div className="text-lg ms-5">
            {selectedAirline.price.total} {selectedAirline.price.currency}
          </div>
        </div>
        <div className="flex items-center my-2">
          <div className="font-bold text-teal-500 text-xl">Last Ticketing Date:</div>
          <div className="text-lg ms-5">
            {new Date(selectedAirline.lastTicketingDate).toLocaleString()}
          </div>
        </div>

        <div className="flex mt-10">
          <div className="mx-auto">
            <QuestionModal />
          </div>
        </div>
      </div>
    );
};

export default AirlineInfo;
import React from "react";
import { useSelector } from "react-redux";

const AirlineInfo = () => {
    const selectedAirline = useSelector(state => state.airlines.selectedAirline);

    console.log(selectedAirline);
  
    return (
      <div className="p-5">
        
      </div>
    );
  };
  
  export default AirlineInfo;
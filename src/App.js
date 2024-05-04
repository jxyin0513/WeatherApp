import "./styles.css";
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "./styles.css";
import ThisWeekChart from "./thisWeek";
import NextWeekChart from "./nextWeek";

Chart.register(CategoryScale);

function App() {
  // const sessionUser = useSelector(state => state.session.user);
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // useEffect(() => {
  //   if (location.length === 0 || day === "" || time.length === 0) {
  //     return;
  //   }
  //   setLocation(location)
  //   setDay(day)
  //   setTime(time)
  // }, [location, day, time]);

  return (
    <div className="App">
      {<Navigation />}
      <div></div>
      <div className="search-Bar">
        <form className="search-form">
          <div>
            <i className="fa-regular fa-location-dot"></i>
            <input
              type={"text"}
              placeholder="Enter the location"
              onChange={(e) => setLocation(e.target.value)}
              className="search-Tab"
              size={30}
            ></input>
          </div>
        </form>
        <select className="day-Outer" onChange={(e) => setDay(e.target.value)}>
          <option value={""}>Select the day</option>
          <option value={0}>Every Sunday</option>
          <option value={1}>Every Monday</option>
          <option value={2}>Every Tuesday</option>
          <option value={3}>Every Wednesday</option>
          <option value={4}>Every Thursday</option>
          <option value={5}>Every Friday</option>
          <option value={6}>Every Saturday</option>
        </select>
        <select
          className="time-Outer"
          onChange={(e) => setTime(e.target.value)}
        >
          <option value={""}>Select time</option>
          <option value={"8-12"}>Morning</option>
          <option value={"12-17"}>Afternoon</option>
          <option value={"17-21"}>Evening</option>
        </select>
      </div>
      <div className="search-Tab-Bar">
        ____________________________________________________________________________________________________
      </div>
      <div className="weather-Container">
        {location.length > 0 && day !== "" && time.length > 0 && (
          <ThisWeekChart info={{ location, time, day }} />
        )}
        {location.length > 0 && day !== "" && time.length > 0 && (
          <NextWeekChart info={{ location, time, day }} />
        )}
      </div>
    </div>
  );
}
export default App;

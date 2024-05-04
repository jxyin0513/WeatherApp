import "./styles.css";
import React, { useState, useEffect } from "react";

function SearchBar() {
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [chartData, setChartData] = useState({});
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState([]);
  const currTime = new Date();
  const currDay = currTime.getDay();
  let thisWeek;
  let nextWeek;
  async function onSubmit(e) {
    if (location.length || day.length || time.length) {
      return;
    }
    console.log(currTime, "0");
    if (currDay <= day) {
      thisWeek = new Date(currTime + 3600 * 1000 * 24 * currDay);
      nextWeek = new Date(thisWeek + 3600 * 1000 * 24 * 7);
    } else {
      thisWeek = new Date(currTime + 3600 * 1000 * 24 * (6 - currDay + day));
      nextWeek = new Date(thisWeek + 3600 * 1000 * 24 * 7);
    }
    let time1 = time.split("-")[0];
    let time2 = time.split("-")[1];
    console.log(thisWeek.getFullYear());

    await window,
      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${thisWeek.getFullYear()}-${thisWeek.getMonth()}-${thisWeek.getDate()}T${time1}:00:00/${thisWeek.getFullYear()}-${thisWeek.getMonth()}-${thisWeek.getDate()}T${time2}:00:00?key=G3YYC9VBLJ5NDAH7LARPZH49Z`
      )
        .then(async (response) => {
          await response.json();
          if (response.ok) {
            await response.json();
          } else {
            throw new Error("Can't find weather in this area");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
  }
  return (
    <div>
      <form className="search-form" onSubmit={onSubmit}>
        <div>
          <i className="fa-regular fa-location-dot"></i>
          <input
            type={"text"}
            placeholder="Enter the location"
            onChange={(e) => setLocation(e.target.value)}
            className="search-Tab"
          ></input>
        </div>
        <select onChange={(e) => setDay(e.target.value)}>
          <option value={""}>Select the day</option>
          <option value={0}>Every Sunday</option>
          <option value={1}>Every Monday</option>
          <option value={2}>Every Tuesday</option>
          <option value={3}>Every Wednesday</option>
          <option value={4}>Every Thursday</option>
          <option value={5}>Every Friday</option>
          <option value={6}>Every Saturday</option>
        </select>
        <select onChange={(e) => setTime(e.target.value)}>
          <option value={""}>Select time</option>
          <option value={"8-12"}>Morning</option>
          <option value={"12-17"}>Afternoon</option>
          <option value={"17-21"}>Evening</option>
        </select>
        <button type="submit">search</button>
      </form>
    </div>
  );
}

export default SearchBar;

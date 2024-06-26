import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { data } from "./data";

function ThisWeekChart({ info }) {
  const { location, time, day } = info;
  // console.log(info, location);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [thisChartData, setThisChartData] = useState({});
  const [errors, setErrors] = useState(null);
  const [todayWeather, setTodayWeather] = useState({});
  const currTime = new Date();
  const currDay = currTime.getDay();
  let thisWeek;

  useEffect(() => {
    let thisWeekData = [];
    let weatherData;
    if (currDay <= day) {
      thisWeek = new Date(
        currTime.getTime() + 3600 * 1000 * 24 * (day - currDay),
      );
    } else {
      thisWeek = new Date(
        currTime.getTime() +
          3600 * 1000 * 24 * (6 - Number(currDay) + Number(day) + 1),
      );
    }
    let timeRange = time.split("-").map((time) => Number(time));
    // console.log(thisWeek, "full year", 6, Number(currDay), timeRange);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${thisWeek.getFullYear()}-${
            thisWeek.getMonth() + 1
          }-${thisWeek.getDate()}T${
            timeRange[0]
          }:00:00/${thisWeek.getFullYear()}-${
            thisWeek.getMonth() + 1
          }-${thisWeek.getDate()}T${
            timeRange[1]
          }:00:00?key=G3YYC9VBLJ5NDAH7LARPZH49Z`,
        );
        if (!response.ok) {
          throw new Error(`Sorry can't find weather at `);
        }
        weatherData = await response.json();
        // console.log(jsonData);
        console.log(weatherData);
        (thisWeekData = weatherData.days[0].hours?.filter((hour) => {
          // console.log(hour);
          let time = hour.datetime.split(":")[0];
          if (Number(time) < timeRange[1] && Number(time) >= timeRange[0]) {
            return true;
          } else {
            return false;
          }
        })),
          setTodayWeather(weatherData?.days[0]);
        let timeLine = [];
        let dummyRange = [...timeRange];
        while (dummyRange[1] > dummyRange[0]) {
          timeLine.push(`${dummyRange[0]}:00`);
          dummyRange[0] += 1;
        }
        setThisChartData({
          labels: timeLine,
          datasets: [
            {
              label: "Temperature",
              data: thisWeekData?.map((data) => {
                let hour = data.datetime.split(":")[0];
                // console.log(hour, Number(hour));
                if (
                  Number(hour) < timeRange[1] &&
                  Number(hour) >= timeRange[0]
                ) {
                  // console.log(`data`);
                  return data.temp;
                }
              }),
              backgroundColor: "#2a71d0",
              borderColor: "blue",
              borderWith: 2,
            },
            {
              label: "Feels Like",
              data: thisWeekData?.map((data) => {
                let hour = data.datetime.split(":")[0];
                if (
                  Number(hour) < timeRange[1] &&
                  Number(hour) >= timeRange[0]
                ) {
                  return data.feelslike;
                }
              }),
              backgroundColor: "red",
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.log(error.message);
        setErrors(error.message);
      }
    };
    fetchData();
    // console.log(weatherData);
    return () => {
      setTodayWeather({});
      setThisChartData({});
      setErrors(null);
    };
  }, [location, day, time]);
  return (
    <div className="this-Week-Container">
      {Object.values(todayWeather).length > 0 && (
        <div className="weather-Info-Outer">
          <div className="date-This-Week">
            <i
              className="fa-regular fa-calendar-days fa-2xl"
              style={{ color: "rgba(58, 58, 58, 0.896)" }}
            ></i>
            <div>
              This {days[day]} ,
              {months[Number(todayWeather.datetime.split("-")[1]) - 1]}{" "}
              {Number(todayWeather.datetime.split("-")[2])}
            </div>
          </div>
          {/* <i class="fa-solid fa-wind"></i> */}
          <div className="rain-This-Week">
            <i
              className="fa-solid fa-cloud-showers-water fa-xl"
              style={{ color: "rgb(148, 144, 144)" }}
            ></i>
            {todayWeather.humidity > 25 ? (
              <div>Likely to rain</div>
            ) : (
              <div>No rain</div>
            )}
          </div>

          <div className="humidity-This-Week">
            <i
              className="fa-solid fa-droplet fa-lg"
              style={{ color: "rgb(145, 195, 226)" }}
            ></i>
            <div>{todayWeather.humidity}%</div>
          </div>
          <div className="temperature-This-Week">
            <i className="fa-regular fa-temperature-quarter"></i>
            {todayWeather.temp >= 60 && todayWeather.temp < 75 && (
              <div>Warm</div>
            )}
            {todayWeather.temp >= 75 && <div>Hot</div>}
            {todayWeather.temp >= 40 && todayWeather.temp < 60 && (
              <div>Little Warm</div>
            )}
            {todayWeather.temp < 40 && <div>Cold</div>}
          </div>
          <div className="cloud-This-Week">
            <i
              className="fa-solid fa-cloud-sun fa-3x"
              style={{ color: "lightskyblue" }}
            ></i>
          </div>
        </div>
      )}
      {errors !== null && (
        <div className="error-handler-outer">
          {errors}
          <div>{location}</div> this {days[day]}
        </div>
      )}
      {Object.values(thisChartData).length > 0 && (
        <Line
          data={thisChartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Weather forecast this week",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Temperature F",
                  align: "end",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Hour",
                  align: "end",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default ThisWeekChart;

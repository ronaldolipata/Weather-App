import { useEffect, useState, useCallback } from 'react';

import debounce from 'lodash/debounce';
import NavBar from './components/NavBar';
import CurrentForecast from './components/CurrentForecast';

import AirTemperature from './components/AirTemperature';
import AirPressure from './components/AirPressure';
import CloudAreaFraction from './components/CloudAreaFraction';
import RelativeHumidity from './components/RelativeHumidity';
import WindFromDirection from './components/WindFromDirection';
import WindSpeed from './components/WindSpeed';

import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';

import './App.css';

const WEEKDAY = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const App = () => {
  // Use to track current day & summary for current forecast
  const [currentUserLocation, setCurrentUserLocation] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentSummary, setCurrentSummary] = useState('');
  const [icon, setIcon] = useState('');
  const [details, setDetails] = useState({});
  const [units, setUnits] = useState({});

  // Use to track hourly & daily data
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  // Use to request location from User and display forecasts
  const requestUserLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      requestDataToGetUserCity(coords.latitude, coords.longitude);
      requestData(coords.latitude, coords.longitude);
    });
  };

  // Request data from Weather API
  const requestData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setUnits(data.properties.meta.units);
        setDetails(data.properties.timeseries[0].data.instant.details);

        // Remove underscore from summary
        const summary =
          data.properties.timeseries[0].data.next_1_hours.summary.symbol_code;
        const newSummary = summary.replace(/_/g, ' ');
        setCurrentSummary(newSummary);
        setIcon(summary);

        getHourlyData(data);
        getDailyData(data);
      }
    } catch (error) {
      return error;
    }
  };

  // Request data to get the user city and display to input value
  const requestDataToGetUserCity = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );
      if (response.status === 200) {
        const data = await response.json();
        setCurrentUserLocation(data[0].name);
      }
    } catch (error) {
      return error;
    }
  };

  // Request Data to get the latitude and longitude
  const requestDataForInputLocation = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );
      if (response.status === 200) {
        const data = await response.json();
        // Get latitute and longitude of the Location and pass into requestData to process
        requestData(data[0].lat, data[0].lon);
      }
    } catch (error) {
      return error;
    }
  };

  const getHourlyData = (data) => {
    setHourlyData([]);
    for (let i = 1; i < 12; i++) {
      const summary =
        data.properties.timeseries[i].data.next_1_hours.summary.symbol_code;
      const newSummary = summary.replace(/_/g, ' ');
      setHourlyData((previous) => [
        ...previous,
        {
          time: `${data.properties.timeseries[i].time.slice(11, 16)} UTC`,
          icon: data.properties.timeseries[i].data.next_1_hours.summary
            .symbol_code,
          summary: newSummary,
          temperature:
            data.properties.timeseries[i].data.instant.details.air_temperature,
        },
      ]);
    }
  };

  const getDailyData = (data) => {
    setDailyData([]);
    data.properties.timeseries.map(({ time }, index, array) => {
      const slicedTime = time.slice(11, 16);
      if (array[index].data.next_1_hours.summary !== undefined) {
        if (slicedTime === '00:00') {
          // Get the time from the fetched API
          const d = new Date(time);
          const day = d.getDay();
          setCurrentDay(WEEKDAY[day]);
          const currentDay = WEEKDAY[day];
          const slicedCurrentDay = currentDay.slice(0, 3);
          const slicedDate = time.slice(5, 10);

          // Remove underscore from summary
          const summary =
            data.properties.timeseries[index].data.next_1_hours.summary
              .symbol_code;
          const newSummary = summary.replace(/_/g, ' ');

          setDailyData((previous) => [
            ...previous,
            {
              date: slicedDate,
              day: slicedCurrentDay,
              icon: array[index].data.next_1_hours.summary.symbol_code,
              nextDaySummary: newSummary,
              nextDayTemperature:
                array[index].data.instant.details.air_temperature,
            },
          ]);
        }
      }
    });
  };

  // Use to make 1 second delay to pass the data after the User input the location
  const changeHandler = (event) => {
    if (event.target.value !== '') {
      requestDataForInputLocation(event.target.value);
    }
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 1000), []);

  useEffect(() => {
    requestUserLocation();
  }, []);

  return (
    <>
      <NavBar />

      <div className="filter-container">
        <input
          type="text"
          onChange={debouncedChangeHandler}
          defaultValue={currentUserLocation}
        />
      </div>

      <CurrentForecast
        currentTemperature={details.air_temperature}
        day={currentDay}
        summary={currentSummary}
        icon={icon}
      />

      <div>
        <ul className="grid">
          <li className="grid-item">
            <AirTemperature
              airTemperature={details.air_temperature}
              unit={units.air_temperature}
            />
          </li>
          <li className="grid-item">
            <AirPressure
              airPressure={details.air_pressure_at_sea_level}
              unit={units.air_pressure_at_sea_level}
            />
          </li>
          <li className="grid-item">
            <CloudAreaFraction
              cloudAreaFraction={details.cloud_area_fraction}
              unit={units.cloud_area_fraction}
            />
          </li>
          <li className="grid-item">
            <RelativeHumidity
              relativeHumidity={details.relative_humidity}
              unit={units.relative_humidity}
            />
          </li>
          <li className="grid-item">
            <WindFromDirection
              windFromDirection={details.wind_from_direction}
              unit={units.wind_from_direction}
            />
          </li>
          <li className="grid-item">
            <WindSpeed windSpeed={details.wind_speed} unit={units.wind_speed} />
          </li>
        </ul>
      </div>

      {/* To display Hourly Forecast */}
      <div className="hourly-forecast-container">
        <h2 className="sub-title">Hourly Forecast</h2>
        <ul className="flex-row">
          {hourlyData.map(({ time, icon, summary, temperature }) => (
            <HourlyForecast
              key={time}
              time={time}
              icon={icon}
              summary={summary}
              temperature={temperature}
            />
          ))}
        </ul>
      </div>

      {/* To display Day Forecast */}
      <ul className="container daily-forecast-container">
        <h2 className="sub-title">{dailyData.length}-Day Weather Forecast</h2>
        {dailyData.map(
          ({ date, day, icon, nextDaySummary, nextDayTemperature }) => (
            <DailyForecast
              key={day}
              date={date}
              day={day}
              icon={icon}
              nextDaySummary={nextDaySummary}
              nextDayTemperature={nextDayTemperature}
            />
          )
        )}
      </ul>
    </>
  );
};

export default App;

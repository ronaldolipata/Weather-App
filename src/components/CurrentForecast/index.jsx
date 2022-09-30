import style from './CurrentForecast.module.css';

const CurrentForecast = ({ currentTemperature, day, summary, icon }) => {
  return (
    <div className={style.container}>
      <h1 className="title">Current Forecast</h1>
      <div className={style.flex}>
        <div>
          <p className={style.currentTemperature}>{currentTemperature}°C</p>
          <p className={style.dateToday}>{day}</p>
        </div>
        <div className={style.flexItem}>
          <img className={style.icon} src={`./assets/${icon}.svg`} alt={icon} />
          <p className={style.summary}>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentForecast;

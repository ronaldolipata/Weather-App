import style from './DailyForecast.module.css';

const DailyForecast = ({
  date,
  day,
  icon,
  nextDaySummary,
  nextDayTemperature,
}) => {
  return (
    <li className={style.grid}>
      <p className={style.date}>{date}</p>
      <p>{day}</p>
      <img src={`./assets/${icon}.svg`} alt={icon} />
      <p className={style.summary}>{nextDaySummary}</p>
      <p className={style.temperature}>{nextDayTemperature}°C</p>
    </li>
  );
};

export default DailyForecast;

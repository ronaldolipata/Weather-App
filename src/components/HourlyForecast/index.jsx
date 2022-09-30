import style from './HourlyForecast.module.css';

const HourlyForecast = ({ time, icon, summary, temperature }) => {
  return (
    <li className={style.flexColumn}>
      <p className={style.time}>{time}</p>
      <img className={style.icon} src={`./assets/${icon}.svg`} alt={icon} />
      <p className={style.summary}>{summary}</p>
      <p>{temperature}°C</p>
    </li>
  );
};

export default HourlyForecast;

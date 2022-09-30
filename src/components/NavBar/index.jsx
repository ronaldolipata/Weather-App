import style from './NavBar.module.css';

const NavBar = () => {
  return (
    <div>
      <nav>
        <ul className={style.flex}>
          <li>
            <img src="./assets/fair_day.svg" alt="fair_day" />
          </li>
          <li className={style.logoName}>Weather Forecast</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

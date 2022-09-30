import { WindyStrong } from '@ricons/carbon';
import { Icon } from '@ricons/utils';

const WindSpeed = ({ windSpeed, unit }) => {
  return (
    <>
      <Icon size="32">
        <WindyStrong />
      </Icon>
      <p>Wind Speed</p>
      <p>
        {windSpeed} {unit}
      </p>
    </>
  );
};

export default WindSpeed;

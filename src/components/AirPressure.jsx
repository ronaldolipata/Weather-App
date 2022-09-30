import { Wind } from '@ricons/fa';
import { Icon } from '@ricons/utils';

const AirPressure = ({ airPressure, unit }) => {
  return (
    <>
      <Icon size="32">
        <Wind />
      </Icon>
      <p>Air Pressure</p>
      <p>
        {airPressure} {unit}
      </p>
    </>
  );
};

export default AirPressure;

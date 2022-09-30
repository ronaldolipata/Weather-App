import { Temperature24Regular } from '@ricons/fluent';
import { Icon } from '@ricons/utils';

const AirTemperature = ({ airTemperature, unit }) => {
  return (
    <>
      <Icon size="32">
        <Temperature24Regular />
      </Icon>
      <p>Air Temperature</p>
      <p>
        {airTemperature} {unit}
      </p>
    </>
  );
};

export default AirTemperature;

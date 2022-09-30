import { Humidity } from '@ricons/carbon';
import { Icon } from '@ricons/utils';

const RelativeHumidity = ({ relativeHumidity, unit }) => {
  return (
    <>
      <Icon size="32">
        <Humidity />
      </Icon>
      <p>Relative Humidity</p>
      <p>
        {relativeHumidity}
        {unit}
      </p>
    </>
  );
};

export default RelativeHumidity;

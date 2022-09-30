import { WindGusts } from '@ricons/carbon';
import { Icon } from '@ricons/utils';

const WindFromDirection = ({ windFromDirection, unit }) => {
  return (
    <>
      <Icon size="32">
        <WindGusts />
      </Icon>
      <p>Wind From Direction</p>
      <p>
        {windFromDirection} {unit}
      </p>
    </>
  );
};

export default WindFromDirection;

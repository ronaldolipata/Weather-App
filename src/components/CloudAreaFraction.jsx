import { Cloud } from '@ricons/fa';
import { Icon } from '@ricons/utils';

const CloudAreaFraction = ({ cloudAreaFraction, unit }) => {
  return (
    <>
      <Icon size="32">
        <Cloud />
      </Icon>
      <p>Cloud Area Fraction</p>
      <p>
        {cloudAreaFraction}
        {unit}
      </p>
    </>
  );
};

export default CloudAreaFraction;

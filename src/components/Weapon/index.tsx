import React from 'react';
import { Weapon } from 'types';
import Circular from '../Circular';

interface Props {
  className?: string;
  data: Weapon[];
  onClick(data: Weapon): void;
}

const WeaponOption = ({ data, onClick }: Props) => {

  return (
    <>
      {data.map((item: Weapon) => {
        const {name, photo} = item;
        return (
          <Circular
            item={item}
            handleClick={onClick}
            key={name}
          >
            <img src={photo} alt={name} />
          </Circular>
        );
      })}
    </>
  );
};

export default WeaponOption;

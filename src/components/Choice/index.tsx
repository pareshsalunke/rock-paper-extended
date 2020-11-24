import React from 'react';
import Circular from '../Circular';

interface Props {
  className?: string;
  selectedWeaponImg: string | null;
}

const Choice = ({ selectedWeaponImg, className }: Props) => {
  return (
    <>
      <Circular className={className}>
        {selectedWeaponImg && <img src={selectedWeaponImg} alt="player_choice" />}
      </Circular>
    </>
  );
};

export default Choice;

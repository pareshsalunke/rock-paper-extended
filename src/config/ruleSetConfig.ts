import { LevelRuleSet, Level, WeaponName, Weapon } from '../types';

import rockImg from 'pages/Play/images/rock.svg';
import paperImg from 'pages/Play/images/paper.svg';
import scissorImg from 'pages/Play/images/scissor.svg';
import lizardImg from 'pages/Play/images/lizard.svg';
import spockImg from 'pages/Play/images/spock.svg';

export const ruleSetConfig: LevelRuleSet = [
  {
    level: Level.BASIC,
    ruleSet: [
      { weaponName: WeaponName.ROCK, defeats: [WeaponName.SCISSOR] },
      { weaponName: WeaponName.PAPER, defeats: [WeaponName.ROCK] },
      { weaponName: WeaponName.SCISSOR, defeats: [WeaponName.PAPER] }
    ]
  },
  {
    level: Level.ADVANCED,
    ruleSet: [
      {
        weaponName: WeaponName.ROCK,
        defeats: [WeaponName.SCISSOR, WeaponName.LIZARD]
      },
      {
        weaponName: WeaponName.PAPER,
        defeats: [WeaponName.ROCK, WeaponName.SPOCK]
      },
      {
        weaponName: WeaponName.SCISSOR,
        defeats: [WeaponName.PAPER, WeaponName.LIZARD]
      },
      {
        weaponName: WeaponName.LIZARD,
        defeats: [WeaponName.PAPER, WeaponName.SPOCK]
      },
      {
        weaponName: WeaponName.SPOCK,
        defeats: [WeaponName.SCISSOR, WeaponName.ROCK]
      }
    ]
  }
];

export const weaponConfig: Weapon[] = [
  {
    name: WeaponName.ROCK,
    level: Level.BASIC,
    photo: rockImg
  },
  {
    name: WeaponName.PAPER,
    level: Level.BASIC,
    photo: paperImg
  },
  {
    name: WeaponName.SCISSOR,
    level: Level.BASIC,
    photo: scissorImg
  },
  {
    name: WeaponName.LIZARD,
    level: Level.ADVANCED,
    photo: lizardImg
  },
  {
    name: WeaponName.SPOCK,
    level: Level.ADVANCED,
    photo: spockImg
  }
];

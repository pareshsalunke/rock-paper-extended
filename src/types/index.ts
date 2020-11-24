export enum GameType {
  COMPUTERVSCOMPUTER = 'COMPUTERVSCOMPUTER',
  COMPUTERVSHUMAN = 'COMPUTERVSHUMAN'
}

export enum Level {
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED'
}

export enum WeaponName {
  ROCK = 'ROCK',
  PAPER = 'PAPER',
  SCISSOR = 'SCISSOR',
  LIZARD = 'LIZARD',
  SPOCK = 'SPOCK'
}

export interface Weapon {
  name: WeaponName;
  level: Level;
  photo: string;
}

export interface Player {
  name: 'computer1' | 'computer2' | 'human' | null;
  selectedWeaponName: WeaponName | null;
  selectedWeaponPhoto: string | null;
}

export interface Rule {
  weaponName: WeaponName;
  defeats: WeaponName[];
}

type RuleSet = Rule[];

export interface LevelRule {
  level: Level;
  ruleSet: RuleSet;
}

export type LevelRuleSet = LevelRule[];

export interface GameState {
  gameType: GameType;
  score?: number;
  levelRule: LevelRule;
}

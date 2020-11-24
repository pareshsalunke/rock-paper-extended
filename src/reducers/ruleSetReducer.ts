import { GameState, Level, LevelRule, GameType } from '../types';
import { RulesAction, RulesActionType } from './types';

import { ruleSetConfig } from '../config/ruleSetConfig';

const state: GameState = {
  gameType: GameType.COMPUTERVSHUMAN,
  levelRule: ruleSetConfig.find(
    (i: LevelRule) => i.level === Level.BASIC
  ) as LevelRule
};

const rulesReducer = (state: GameState, action: RulesAction) => {
  switch (action.type) {
    case RulesActionType.SET_GAME_TYPE: {
      return { ...state, gameType: action.payload };
    }
    case RulesActionType.SET_LEVEL: {
      const ruleSetConfigForLevel = ruleSetConfig.find(config => config.level === action.payload);

      return {
        ...state,
        levelRule: {
          ...state.levelRule,
          ...ruleSetConfigForLevel
        }
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { rulesReducer, state };

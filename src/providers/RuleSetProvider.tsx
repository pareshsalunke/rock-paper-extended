import React, { useReducer, createContext, ReactNode, useContext } from 'react';

import { GameState, GameType, Level } from '../types';
import { RulesDispatch, RulesActionType } from '../reducers/types';
import {
  rulesReducer,
  state as rulesInitialState
} from '../reducers/ruleSetReducer';

type Props = {
  children: ReactNode;
};

const RulesStateContext = createContext<GameState | undefined>(undefined);
const RulesDispatchContext = createContext<RulesDispatch | undefined>(
  undefined
);

const RulesProvider = ({ children }: Props) => {
  const [rulesState, rulesDispatch] = useReducer(
    rulesReducer,
    rulesInitialState
  );

  return (
    <RulesStateContext.Provider value={rulesState}>
      <RulesDispatchContext.Provider value={rulesDispatch}>
        {children}
      </RulesDispatchContext.Provider>
    </RulesStateContext.Provider>
  );
};

const useRulesContext = () => {
  const context = useContext(RulesStateContext);
  if (context === undefined) {
    throw new Error('useRulesContext must be used within a RulesProvider');
  }
  return context;
};

const useRulesDispatch = () => {
  const context = useContext(RulesDispatchContext);
  if (context === undefined) {
    throw new Error('useRulesDispatch must be used within a RulesProvider');
  }
  return context;
};

const setLevel = (dispatch: RulesDispatch, level: Level) => {
  try {
    dispatch({
      type: RulesActionType.SET_LEVEL,
      payload: level
    });
  } catch (error) {
    throw error;
  }
};

const setGameType = (dispatch: RulesDispatch, gameType: GameType) => {
  try {
    dispatch({
      type: RulesActionType.SET_GAME_TYPE,
      payload: gameType
    });
  } catch (error) {
    throw error;
  }
};

export { RulesProvider, useRulesContext, useRulesDispatch, setLevel, setGameType };

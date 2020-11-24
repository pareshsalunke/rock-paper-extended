export enum RulesActionType {
  SET_LEVEL = 'SET_LEVEL',
  SET_GAME_TYPE = 'SET_GAME_TYPE'
}

export type RulesAction = {
  type: 'SET_LEVEL' | 'SET_GAME_TYPE';
  payload: any;
};

export type RulesDispatch = (action: RulesAction) => void;

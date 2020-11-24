export const getHumanScoreFromLocalStorage = () => {
  let score = localStorage.getItem('GAME_HUMAN_SCORE');
  if (score === null || score === undefined) {
    localStorage.setItem('GAME_HUMAN_SCORE', String(0));
    return 0;
  }
  return Number(localStorage.getItem('GAME_HUMAN_SCORE'));
};

export const setHumanScoreToLocalStorage = (humanScore: number) => {
  localStorage.setItem('GAME_HUMAN_SCORE', String(humanScore));
};

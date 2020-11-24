import React, { useEffect } from 'react';
import { useRulesContext } from 'providers/RuleSetProvider';
import { GameType, Weapon } from 'types';
import Choice from 'components/Choice';
import WeaponOption from 'components/Weapon';
import Button from 'components/Button';
import useGame from 'hooks/useGame';
import { weaponConfig } from 'config/ruleSetConfig';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const PlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  padding: 2rem 0;
  
  @media (min-width: 768px) {
    flex: 0 0 calc(50% - 1rem);
  }
`;

const Score = styled.h1`
  align-self: flex-end;
  color: #795548;
  border: 2px dashed #607D8B;
  border-radius: 6px;
  padding: 0.5rem;
  margin: 0;
`;

const PlayArena = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    h2 {
      margin: 0;
    }
  }
  
   .arenaOne--container,
   .arenaTwo--container {
    display: flex;
    align-items: center;
    justify-content: center;   
    flex-direction: column;
    width: 100%;
    
    h2 {
      margin:0.25rem 0;
    }

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-evenly;
    }
  }

  & .playerOne-choice--circle {
    top: 10%;
    border-bottom: none;
  }
  
  & .playerTwo-choice--circle {
    top: -10%;
    border-top: none;
  }
  
  & .playerOne-choice--circle,
  .playerTwo-choice--circle {
    margin-right: 1rem;
    box-shadow: none;
    width: 100px;
    height: 100px;
    
    &:active {
      cursor: default;
      top: 0px;
    }
    @media (min-width: 768px) {
      width: 180px;
      height: 180px;
    }
  }
`;

const WeaponOptionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  flex: 0 0 auto;
  
  @media (min-width: 768px) {
    justify-content: space-around;
  }
`;

const ResultsContainer = styled.div`
  padding: 0.25rem 0;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (min-width: 768px) {
    padding: 3.2rem 4.8rem;
  }
  & button {
    width: 200px;
  }
`;

const ResultText = styled.h2`
  margin: 0;
  padding: 0.5rem;
  color: #795548;
  border: 2px dashed #607D8B;
  width: 100%;
  
`

const Play = () => {
  const { gameType, levelRule } = useRulesContext();
  const history = useHistory();
  const {
    generateWeaponsList,
    onWeaponSelection,
    firstPlayer,
    secondPlayer,
    setSecondPlayer,
    onReplay,
    winner,
    humanScore,
    onResetHumanScore
  } = useGame(levelRule, gameType, weaponConfig);

  useEffect(() => {
    if (GameType.COMPUTERVSHUMAN) {
      setSecondPlayer((prevState) => {
        return {
          ...prevState,
          name: 'human',
          selectedWeaponName: null,
          selectedWeaponPhoto: null
        }
      });
    } else {
      setSecondPlayer((prevState) => {
        return {
          ...prevState,
          name: 'computer2',
          selectedWeaponName: null,
          selectedWeaponPhoto: null
        }
      });
    }
  }, []);

  const endGameAndReturnToMainMenu = () => {
    onResetHumanScore();
    history.push('/')
  };

  const handleWeaponSelection = (data: Weapon): void => onWeaponSelection(data);

  const handleReplay = () => onReplay();
  const hasPlayersMadeChoice = firstPlayer.selectedWeaponName && secondPlayer.selectedWeaponName;
  return (
    <PlayContainer>
      <Score data-testid="human_score">Score: {humanScore}</Score>
      <PlayArena>
        <div className={'arenaOne--container'}>
          <Choice className="playerOne-choice--circle" selectedWeaponImg={firstPlayer.selectedWeaponPhoto}/>
          <h2>{firstPlayer.name} choice</h2>
        </div>
        <h2>Vs</h2>
        <div className={'arenaTwo--container'}>
          <Choice className="playerTwo-choice--circle" selectedWeaponImg={secondPlayer.selectedWeaponPhoto}/>
          <h2>{secondPlayer.name} choice</h2>
        </div>
      </PlayArena>
      { !hasPlayersMadeChoice &&
      gameType !== GameType.COMPUTERVSCOMPUTER && (
        <WeaponOptionContainer>
          <WeaponOption
            data={generateWeaponsList()}
            onClick={handleWeaponSelection}
          />
        </WeaponOptionContainer>
      )}
      {hasPlayersMadeChoice &&
      winner && (
        <ResultsContainer>
          <Button label="Play Again" fontAwesomeIconClassName="redo"   onClick={handleReplay} />
          <ResultText>{winner === 'tie' ? `It's a Tie. Hard luck.` : `${winner.toUpperCase()} won this round`}</ResultText>
          <Button label="End Game" fontAwesomeIconClassName="times" onClick={endGameAndReturnToMainMenu} />
        </ResultsContainer>
      )}
    </PlayContainer>
  );
};

export default Play;

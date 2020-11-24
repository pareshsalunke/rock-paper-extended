import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';
import {
  useRulesContext,
  useRulesDispatch,
  setLevel, setGameType,
} from 'providers/RuleSetProvider';
import { GameType, Level } from 'types';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 2rem 0;
  
  @media (min-width: 768px) {
    padding: 3.2rem 4.8rem;
  }
`;

const GamePlayButton = styled(Button)`
  border-radius: 2rem;
`;

const Home = () => {
  const history = useHistory();
  const { gameType, levelRule } = useRulesContext();
  const rulesDispatch = useRulesDispatch();

  const handleLevelChange = (level: Level) => {
    setLevel(rulesDispatch, level);
  };

  const handleGameTypeChange = (gameType: GameType) => {
    setGameType(rulesDispatch, gameType);
  }

  return (
    <HomeContainer>
      <Button
        label="Comp. Vs Comp."
        isDisabled={GameType.COMPUTERVSCOMPUTER === gameType}
        onClick={() => handleGameTypeChange(GameType.COMPUTERVSCOMPUTER)}
      />
      <Button
        label="Comp. Vs Human"
        isDisabled={GameType.COMPUTERVSHUMAN === gameType}
        onClick={() => handleGameTypeChange(GameType.COMPUTERVSHUMAN)}
      />
      <Button
        isDisabled={Level.BASIC === levelRule.level}
        label={Level.BASIC}
        onClick={() => handleLevelChange(Level.BASIC)}
      />
      <Button
        isDisabled={Level.ADVANCED === levelRule.level}
        label={Level.ADVANCED}
        onClick={() => handleLevelChange(Level.ADVANCED)}
      />
      <GamePlayButton
        label="Play"
        className="play--btn"
        fontAwesomeIconClassName="gamepad"
        onClick={() => history.push('/play')}
      />
    </HomeContainer>
  );
};

export default Home;

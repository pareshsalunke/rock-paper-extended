import { useState, useCallback, useEffect } from 'react';

import {
  GameType,
  Player,
  Weapon,
  Rule,
  LevelRule,
  Level,
  WeaponName
} from 'types';
import {
  getHumanScoreFromLocalStorage,
  setHumanScoreToLocalStorage
} from 'utils/gameUtils';

const useGame = (
  levelRule: LevelRule,
  gameType: GameType,
  weaponConfig: Weapon[]
) => {
  const [humanScore, setHumanScore] = useState<number>(
    getHumanScoreFromLocalStorage()
  );
  const onResetHumanScore = () => {
    setHumanScore(0);
    setHumanScoreToLocalStorage(0);
    setFirstPlayer(prevState => {
      return { ...prevState, selectedWeaponName: null, selectedWeaponPhoto: null }
    });
    setSecondPlayer(prevState => {
      return { ...prevState, selectedWeaponName: null, selectedWeaponPhoto: null }
    });
  };

  const [firstPlayer, setFirstPlayer] = useState<Player>({
    name: 'computer1',
    selectedWeaponName: null,
    selectedWeaponPhoto: null
  });
  const [secondPlayer, setSecondPlayer] = useState<Player>({
    name: null,
    selectedWeaponName: null,
    selectedWeaponPhoto: null
  });

  const [winner, setWinner] = useState<
    'computer1' | 'computer2' | 'human' | 'tie' | null
    >(null);

  const getPlayerWeaponPhoto = (selectedWeaponName: WeaponName | null) => {
    const weaponData = weaponConfig.find(
      (i: Weapon) => i.name === selectedWeaponName
    );
    if (weaponData) {
      return weaponData.photo;
    }
    return null;
  };

  const generateChoiceForComputer = useCallback(() => {
    const index = Math.floor(Math.random() * levelRule.ruleSet.length);
    return levelRule.ruleSet[index].weaponName;
  }, []);

  const determineResult = useCallback(
    (firstPlayerData: Player, secondPlayerData: Player, humanScore: number) => {
      let winnerName = null;
      const {
        name: firstPlayerName,
        selectedWeaponName: firstPlayerSelectedWeaponName
      } = firstPlayerData;
      const {
        name: secondPlayerName,
        selectedWeaponName: secondPlayerSelectedWeaponName
      } = secondPlayerData;
      if (!firstPlayerSelectedWeaponName || !secondPlayerSelectedWeaponName) {
        return;
      }

      // Tie case - winner is null
      if (firstPlayerSelectedWeaponName === secondPlayerSelectedWeaponName) {
        setWinner('tie');
        return;
      }

      const firstPlayerRules: Rule = levelRule.ruleSet.find(
        (i: Rule) => i.weaponName === firstPlayerSelectedWeaponName
      ) as Rule;

      if (firstPlayerRules.defeats.includes(secondPlayerSelectedWeaponName)) {
        setWinner(firstPlayerName);
        winnerName = firstPlayerName;
      } else {
        setWinner(secondPlayerName);
        winnerName = secondPlayerName;
      }

      // update and store human score
      if (GameType.COMPUTERVSHUMAN && winnerName === 'human') {
        let score = getHumanScoreFromLocalStorage();
        const newScore = winnerName === secondPlayerName ? ++score : score;
        setHumanScore(newScore);
        setHumanScoreToLocalStorage(humanScore);
      }
    },
    []
  );

  useEffect(() => {
    const firstPlayerName = 'computer1';
    let firstPlayerWeaponChoiceName = firstPlayer.selectedWeaponName;
    if (!firstPlayerWeaponChoiceName) {
      firstPlayerWeaponChoiceName = generateChoiceForComputer();
    }

    let secondPlayerName = secondPlayer.name;
    let secondPlayerWeaponChoiceName = secondPlayer.selectedWeaponName;

    if (
      !secondPlayerWeaponChoiceName &&
      gameType === GameType.COMPUTERVSCOMPUTER
    ) {
      secondPlayerName = 'computer2';
      secondPlayerWeaponChoiceName = generateChoiceForComputer();
    } else if (gameType === GameType.COMPUTERVSHUMAN) {
      secondPlayerName = 'human';
      secondPlayerWeaponChoiceName = secondPlayer.selectedWeaponName;
    }

    if (firstPlayerWeaponChoiceName && secondPlayerWeaponChoiceName) {
      setFirstPlayer((prevState: Player) => {
        if (prevState.selectedWeaponName !== firstPlayerWeaponChoiceName) {
          return {
            name: 'computer1',
            selectedWeaponName: firstPlayerWeaponChoiceName,
            selectedWeaponPhoto: getPlayerWeaponPhoto(
              firstPlayerWeaponChoiceName
            )
          };
        } else {
          return firstPlayer;
        }
      });
      setSecondPlayer((prevState: Player) => {
        if (prevState.selectedWeaponName !== secondPlayerWeaponChoiceName) {
          return {
            name: 'computer2',
            selectedWeaponName: secondPlayerWeaponChoiceName,
            selectedWeaponPhoto: getPlayerWeaponPhoto(
              secondPlayerWeaponChoiceName
            )
          };
        } else {
          return secondPlayer;
        }
      });
      determineResult(
        {
          ...firstPlayer,
          name: firstPlayerName,
          selectedWeaponName: firstPlayerWeaponChoiceName
        },
        {
          ...secondPlayer,
          name: secondPlayerName,
          selectedWeaponName: secondPlayerWeaponChoiceName
        },
        humanScore
      );
    }
  }, [
    determineResult,
    gameType,
    generateChoiceForComputer,
    firstPlayer,
    secondPlayer
  ]);

  const generateWeaponsList = (): Weapon[] => {
    const isBasicLevel: boolean = Level.BASIC === levelRule.level;
    if (isBasicLevel) {
      return weaponConfig.filter((weapon: Weapon) => weapon.level === levelRule.level);
    }
    return weaponConfig;
  }

  const onWeaponSelection = (data: Weapon) =>
    setSecondPlayer({
      ...secondPlayer,
      name: 'human',
      selectedWeaponName: data.name,
      selectedWeaponPhoto: getPlayerWeaponPhoto(data.name)
    });

  const onReplay = () => {
    setFirstPlayer(prevState => {
      return { ...prevState, selectedWeaponName: null, selectedWeaponPhoto: null }
    });
    setSecondPlayer(prevState => {
      return { ...prevState, selectedWeaponName: null, selectedWeaponPhoto: null }
    });
    setWinner(null);
  };

  return {
    generateWeaponsList,
    onWeaponSelection,
    firstPlayer,
    secondPlayer,
    setSecondPlayer,
    onReplay,
    winner,
    humanScore,
    onResetHumanScore
  };
};

export default useGame;

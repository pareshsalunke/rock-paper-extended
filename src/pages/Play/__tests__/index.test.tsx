import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, Selectors } from '../../../utils/testUtils';
import { getHumanScoreFromLocalStorage } from '../../../utils/gameUtils';
import Play from '../index';

describe('Tests for play screen', () => {
  it('should render the screen without any error', () => {
    const { container } = render(<Play />);
    expect(container).not.toBeNull();
  });
  it('should render the saved score from localStorage', () => {
    const { getByTestId } = render(<Play />);
    const savedScore = getHumanScoreFromLocalStorage();
    expect(getByTestId(Selectors.HUMAN_SCORE)).toHaveTextContent(
      savedScore.toString()
    );
  });
  it('should render the weapons for basic level', () => {
    const { getByTestId } = render(<Play />);
    expect(getByTestId(Selectors.WEAPON_ROCK)).not.toBeNull();
    expect(getByTestId(Selectors.WEAPON_PAPER)).not.toBeNull();
    expect(getByTestId(Selectors.WEAPON_SCISSOR)).not.toBeNull();
  });
  it('should change the selected image in the second player choice component', async () => {
    const { getByTestId, findAllByAltText } = render(<Play />);
    userEvent.click(getByTestId(Selectors.WEAPON_PAPER));
    expect(
      (await findAllByAltText(Selectors.PLAYER_CHOICE))[1]
    ).toHaveAttribute('src', 'paper.svg');
  });
});

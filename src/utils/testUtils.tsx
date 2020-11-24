import React from 'react';
import { render } from '@testing-library/react';
import 'utils/iconsLib';
import { RulesProvider } from '../providers/RuleSetProvider';

export enum Selectors {
  HUMAN_SCORE = 'human_score',
  WEAPON_ROCK = 'ROCK',
  WEAPON_PAPER = 'PAPER',
  WEAPON_SCISSOR = 'SCISSOR',
  PLAYER_CHOICE = 'player_choice',
  BASIC = "BASIC",
  ADVANCED = "ADVANCED",
  PLAY = "Play",
  COMPUTERVSHUMAN = "Comp. Vs Human",
  COMPUTERVSCOMPUTER = "Comp. Vs Comp."
}

type Props = {
  children: JSX.Element;
};

const Providers = ({ children }: Props) => (
  <RulesProvider>{children}</RulesProvider>
);

const customRender = (ui: JSX.Element, options?: any) =>
  render(ui, { wrapper: Providers, ...options });

// override render method
export { customRender as render };

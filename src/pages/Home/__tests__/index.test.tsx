import { render, Selectors, renderWithRouter } from '../../../utils/testUtils';
import React from 'react';
import Home from '../index';
import { Level } from '../../../types';
import userEvent from '@testing-library/user-event';

describe('Tests for home screen', () => {
  it('should render the screen without any error', () => {
    const { container } = render(<Home/>);
    expect(container).not.toBeNull();
  });
  it('should render five different buttons', () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId(Selectors.COMPUTERVSHUMAN)).toHaveTextContent("Comp. Vs Human");
    expect(getByTestId(Selectors.COMPUTERVSCOMPUTER)).toHaveTextContent("Comp. Vs Comp.");
    expect(getByTestId(Selectors.BASIC)).toHaveTextContent(Level.BASIC);
    expect(getByTestId(Selectors.ADVANCED)).toHaveTextContent(Level.ADVANCED);
    expect(getByTestId(Selectors.PLAY)).toHaveTextContent("Play");
  });
  it('should disable the button with text ADVANCED on click', async () => {
    const { getByTestId, findByTestId } = render(<Home />);
    userEvent.click(getByTestId(Selectors.ADVANCED));
    expect(getByTestId(Selectors.ADVANCED)).toHaveAttribute('disabled');
    userEvent.click(getByTestId(Selectors.BASIC));
    expect(await findByTestId(Selectors.ADVANCED)).not.toHaveAttribute('disabled');
  });
  it('should have COMPUTERVSHUMAN button disabled by default',  () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId(Selectors.COMPUTERVSHUMAN)).toHaveAttribute('disabled');
  });
  it('should enable COMPUTERVSHUMAN button on click of COMPUTERVSCOMPUTER button', async () => {
    const { getByTestId } = render(<Home />);
    userEvent.click(getByTestId(Selectors.COMPUTERVSCOMPUTER));
    expect(getByTestId(Selectors.COMPUTERVSHUMAN)).not.toHaveAttribute('disabled');
  })
});
import React from 'react';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 1rem 2rem;
  margin: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  font-size: 0.875rem;
  position: relative;
  transition: all 0.3s;
  background: #3498db;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 200px;
  height: 50px;

  &:hover:not(:disabled) {
    background: #2980b9;
  }

  &:active:not(:disabled) {
    top: 2px;
  }

  &:disabled {
    cursor: default;
    background-color: #E0E0E0;;
  }
  
  & .btn--icon {
    font-size: 2rem;
    flex: 0 0 25%;
    padding-right: 0.5rem;
  }

`;

interface Props {
  className?: string;
  label: string;
  isDisabled?: boolean;
  onClick(): void;
  fontAwesomeIconClassName?: IconProp;
}

const Button = ({ label, onClick, isDisabled, fontAwesomeIconClassName, className }: Props) => {
  return (
    <StyledButton data-testid={label} disabled={isDisabled} type="button" onClick={onClick} className={className}>
      {fontAwesomeIconClassName && (
        <FontAwesomeIcon
          icon={fontAwesomeIconClassName}
          className={'btn--icon'}
        />
      )}
      {label}
    </StyledButton>
  )
};

export default Button;

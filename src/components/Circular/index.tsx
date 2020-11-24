import React from 'react';
import styled from 'styled-components';
import { Weapon } from '../../types';

interface Props {
  className?: string;
  handleClick?: (data: Weapon) => void;
  children?: React.ReactNode;
  item?: Weapon;
}

const Circular = (props: Props) => {
  const { className, handleClick, item, children } = props;

  const onClickHandler = React.useCallback(() => {
    if (handleClick && item) handleClick(item);
  }, [item]);
  return (
    <StyledCircular
      className={className}
      role="button"
      tabIndex={0}
      onClick={onClickHandler}
      data-testid={item && item.name ? item.name : ''}
    >
      {children}
    </StyledCircular>
  );
};

const StyledCircular = styled.div`
  outline: none;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: inset -1px -1px 2px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-width: 50px;
  min-height: 50px;

  &:active {
    top: 1px;
    position: relative;
    box-shadow: none;
  }

  & img {
    flex: 0;
  }
`;

export default Circular;

import { IoMdClose } from 'react-icons/io';
import { styled } from 'styled-components';

const StyledClose = styled(IoMdClose)`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;

  &:hover {
    opacity: 1;
    background-color: turquoise;
  }
`;

const StyledTab = styled.div<{ isActive: boolean; isChange: boolean }>`
  position: relative;

  width: max-content;
  height: 100%;
  padding-left: 1.25rem;
  padding-right: 0.5rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right-width: 0;

  ${({ isActive }) =>
    isActive &&
    `
    border-top: 2px solid blue;
    background-color: honeydew;
    `}

  &:first-child {
    border-left: 0;
  }

  &:last-child {
    border-right-width: 2px;
  }

  p {
    max-width: 150px;
    margin-right: 0.5rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ isChange }) =>
    !isChange &&
    `
      &:hover ${StyledClose} {
      opacity: 1;
      }
    `}
`;

const ActionContainer = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;

  overflow: hidden;
`;

export { ActionContainer, StyledClose, StyledTab };

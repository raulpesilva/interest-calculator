import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;

  border-radius: 8px;
  padding: 0 16px;
  background-color: #141414;
  box-sizing: border-box;
  & + & {
    margin-top: 8px;
  }
`;

export const Date = styled.p`
  font-weight: 600;
`;

export const Payed = styled.span`
  font-weight: 600;
  margin-left: auto;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff7777;
  margin-left: 8px;
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
`;

export const Label = styled.label`
  color: #fff;
`;

export const Input = styled.input`
  flex: 1;
  min-height: 40px;
  max-height: 40px;
  width: 100%;
  border: none;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 8px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #141414;
  color: #fff;
  &::placeholder {
    color: #bdbdbd;
  }
`;

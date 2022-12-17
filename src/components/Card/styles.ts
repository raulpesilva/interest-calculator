import styled from 'styled-components';

export const Container = styled.div`
  background-color: #141414;
  padding: 16px;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 8px;
  width: 100%;
  margin-top: 8px;
  &:hover {
    background-color: #171717;
  }
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  height: 40px;
  align-items: center;
`;

export const Interest = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #0c5bb7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

export const WrapperInfo = styled.div`
  margin-left: 10px;
`;

export const Name = styled.h2`
  font-weight: 600;
  text-transform: capitalize;
`;

export const InitialDate = styled.p``;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  height: 40px;
  align-items: center;
`;

export const WrapperInterest = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & + & {
    margin-left: auto;
  }
`;

export const Value = styled.h2<{ interest?: number }>`
  font-weight: 600;
  text-transform: capitalize;
  color: ${(props) => (props.interest ? '#26AE6D' : '#fff')};
`;

export const Description = styled.p`
  font-size: 12px;
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 20px;
`;

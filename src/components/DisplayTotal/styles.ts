import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const Title = styled.p`
  font-weight: 600;
`;

export const Value = styled.span<{ value?: number; withColor?: boolean }>`
  font-weight: 600;
  color: ${(props) => {
    if (!props.withColor) return '#fff';
    if (props.value === undefined) return '#fff';
    if (props.value > 0) return '#26AE6D';
    if (props.value < 0) return '#ff7777';
    return '#fff';
  }};
`;

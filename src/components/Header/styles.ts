import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  justify-content: space-between;
`;
export const Title = styled.h1`
  font-size: 24px;
`;
export const BackButton = styled(NavLink)`
  color: #fff;
  font-size: 24px;
  text-decoration: none;
`;

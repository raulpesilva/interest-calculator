import styled, { css } from 'styled-components';

const variants = {
  default: css`
    margin: 0 auto;
    margin-top: 16px;
    width: 100%;
    background-color: #0c5bb7;
    color: #ffffff;
  `,
  delete: css`
    margin: 0 auto;
    margin-top: 16px;
    width: 100%;
    background-color: #ff7777;
    color: #ffffff;
  `,
  date: css`
    margin: 0 auto;
    width: 100%;
    background-color: #141414;
    margin-top: 8px;
    color: #ffffff;
  `,
};

export type Variants = keyof typeof variants;

export const Container = styled.button<{ variant?: Variants }>`
  border: none;
  border-radius: 8px;
  max-height: 40px;
  height: 40px;
  ${(props) => variants[props.variant || 'default']}
`;

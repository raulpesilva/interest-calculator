import { ButtonHTMLAttributes, forwardRef } from 'react';
import * as S from './styles';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.Variants;
}
export const Button = forwardRef(({ children, ...rest }: ButtonProp) => {
  return <S.Container {...rest}>{children}</S.Container>;
});

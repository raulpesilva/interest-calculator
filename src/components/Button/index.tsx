import { ButtonHTMLAttributes, forwardRef } from 'react';
import * as S from './styles';

interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.Variants;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProp>(({ children, ...rest }, ref) => {
  return (
    <S.Container {...rest} ref={ref}>
      {children}
    </S.Container>
  );
});

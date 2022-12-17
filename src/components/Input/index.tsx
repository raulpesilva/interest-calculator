import { useId } from 'react';
import * as S from './styles';

interface InputProps {
  label: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}
export const Input = ({ label, inputProps }: InputProps) => {
  const id = useId();
  return (
    <S.Container>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input {...inputProps} id={id} />
    </S.Container>
  );
};

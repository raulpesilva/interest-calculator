import { formatMoneyString } from 'utils';
import * as S from './styles';

interface DisplayTotalProps {
  title: string;
  value: number;
  withColor?: boolean;
}
export const DisplayTotal = ({ title, value, withColor }: DisplayTotalProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Value withColor={withColor} value={value}>
        {formatMoneyString(value)}
      </S.Value>
    </S.Container>
  );
};

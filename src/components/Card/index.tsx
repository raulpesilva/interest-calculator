import { setHours } from 'date-fns';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatMoneyString, Loan, loans } from 'utils';
import * as S from './styles';

export const Card = ({ loan }: { loan: Loan }) => {
  const navigate = useNavigate();
  const infos = useMemo(() => loans.calculateInterest(loan.id), [loan.id]);
  return (
    <S.Container onClick={() => navigate(`transaction/${loan.id}`)}>
      <S.Header>
        <S.Interest>
          <p>{loan.percentageInterest}%</p>
        </S.Interest>
        <S.WrapperInfo>
          <S.Name>{loan.name}</S.Name>
          <S.InitialDate>{formatDate(setHours(new Date(loan.initialDate), 20))}</S.InitialDate>
        </S.WrapperInfo>
      </S.Header>
      {infos && (
        <S.Footer>
          <S.WrapperInterest>
            <S.Value>{formatMoneyString(infos.value)}</S.Value>
            <S.Description>Valor emprestado</S.Description>
          </S.WrapperInterest>
          <S.WrapperInterest>
            <S.Value interest={infos.interestToPay}>{formatMoneyString(infos.interestToPay)}</S.Value>
            <S.Description>Juros a receber</S.Description>
          </S.WrapperInterest>
        </S.Footer>
      )}
    </S.Container>
  );
};

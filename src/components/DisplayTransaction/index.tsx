import { addHours } from 'date-fns';
import { formatDate, formatMoneyString, Transaction } from 'utils';
import * as S from './styles';

interface DisplayTransactionProps {
  transaction: Transaction;
  onDelete: () => void;
}
export const DisplayTransaction = ({ transaction, onDelete }: DisplayTransactionProps) => {
  return (
    <S.Container>
      <S.Date>{formatDate(addHours(new Date(transaction.date), 20))}</S.Date>
      <S.Payed>{formatMoneyString(transaction.payed)}</S.Payed>
      {transaction.id !== '0' && <S.DeleteButton onClick={onDelete}>Deletar</S.DeleteButton>}
    </S.Container>
  );
};

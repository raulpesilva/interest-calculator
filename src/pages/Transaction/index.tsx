import { Button, DisplayTransaction, Header, Input, InputDate } from 'components';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loans } from 'utils';
import * as S from './styles';

interface TransactionProps {}
export const Transaction = ({}: TransactionProps) => {
  const [render, forceRender] = useState(0);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [date, setDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState('');

  const handleAddNewTransaction = () => {
    const formattedDate = (date ?? new Date()).toISOString();
    const newTransaction = {
      date: formattedDate,
      payed: Number(value),
    };
    if (!id) return;
    loans.addTransaction(id, newTransaction);
    forceRender((prev) => prev + 1);
  };

  const payInterest = () => {
    if (!id) return;
    const payed = loans.calculateInterest(id)?.interestToPay || 0;
    const newTransaction = {
      date: new Date().toISOString(),
      payed,
    };
    console.log(newTransaction);
    loans.addTransaction(id, newTransaction);
    navigate('/');
  };

  const transactions = useMemo(() => (id ? loans.getTransactions(id) ?? [] : []), [id, render]);
  const handleDelete = (transactionId: string) => {
    if (!id) return;
    loans.deleteTransaction(id, transactionId);
    forceRender((prev) => prev + 1);
  };

  const handleDeleteLoan = () => {
    if (!id) return;
    loans.deleteLoan(id);
    navigate('/');
  };

  return (
    <S.Container>
      <Header title='Detalhes' />
      <Header title='Valores recebidos' withoutNavigation />
      {transactions.map((transaction) => (
        <DisplayTransaction
          key={transaction.id}
          transaction={transaction}
          onDelete={() => handleDelete(transaction.id)}
        />
      ))}
      <Header title='Adicionar pagamento' withoutNavigation />

      <InputDate onChange={setDate} selected={date} label='Data' />

      <Input
        label='Valor'
        inputProps={{
          type: 'number',
          placeholder: 'Valor',
          value: value,
          onChange: (e) => setValue(e.target.value),
          inputMode: 'numeric',
        }}
      />
      <Button onClick={handleAddNewTransaction}>Adicionar pagamento</Button>
      <Button onClick={payInterest}>Pagar todo o juros</Button>
      <Button onClick={handleDeleteLoan} variant='delete'>
        Apagar empréstimo
      </Button>
    </S.Container>
  );
};

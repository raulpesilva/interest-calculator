import { Button, Card, DisplayTotal, Header } from 'components';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loan, loans } from 'utils';

import * as S from './styles';

// loans.addLoan({
//   id: 'id1',
//   name: 'first loan',
//   initialDate: subDays(new Date(), 60).toISOString(),
//   finalDate: new Date().toISOString(),
//   value: 1000,
//   percentageInterest: 25,
//   observations: 'observations',
// });

// loans.addTransaction('id1', {
//   date: subDays(new Date(), 30).toISOString(),
//   payed: 0,
// });

// loans.addTransaction('id1', {
//   date: subDays(new Date(), 20).toISOString(),
//   payed: 83.33333333333333,
// });

// loans.addTransaction('id1', {
//   date: subDays(new Date(), 20).toISOString(),
//   payed: 100,
// });

// loans.addTransaction('id1', {
//   date: new Date().toISOString(),
//   payed: 150,
// });

// loans.addLoan({
//   id: 'id2',
//   name: 'second loan',
//   initialDate: subDays(new Date(), 60).toISOString(),
//   finalDate: new Date().toISOString(),
//   value: 1000,
//   percentageInterest: 25,
//   observations: 'observations',
// });

// loans.addTransaction('id2', {
//   date: subDays(new Date(), 30).toISOString(),
//   payed: 350,
// });

// loans.addTransaction('id2', {
//   date: new Date().toISOString(),
//   payed: 150,
// });

interface HomeProps {}
export const Home = ({}: HomeProps) => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Loan[]>(loans.getLoans());

  const totals = useMemo(() => {
    return loans.getLoans().reduce(
      (acc, loan) => {
        const info = loans.calculateInterest(loan.id);
        if (!info) return acc;
        return { totalInterest: acc.totalInterest + info.interestToPay, totalValue: acc.totalValue + info.value };
      },
      { totalInterest: 0, totalValue: 0 }
    );
  }, []);

  return (
    <S.Container>
      <Header title='Empréstimos' withoutNavigation />
      <DisplayTotal title='Total emprestado' value={totals.totalValue} />
      <DisplayTotal title='Juros a receber' value={totals.totalInterest} withColor />
      {transactions.map((loan) => (
        <Card loan={loan} key={loan.id} />
      ))}
      <Button onClick={() => navigate('/new')}>Adicionar novo empréstimo</Button>
    </S.Container>
  );
};

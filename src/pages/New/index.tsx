import { Button, Header, Input, InputDate } from 'components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loans } from 'utils';
import * as S from './styles';

interface NewProps {}
export const New = ({}: NewProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState('');
  const [percentageInterest, setPercentageInterest] = useState('');
  const [observations, setObservations] = useState('');

  const handleAddNewLoan = () => {
    const initialDateWithoutTimezone = (initialDate ?? new Date()).toISOString();
    const newLoan = {
      name,
      initialDate: initialDateWithoutTimezone,
      value: Number(value),
      percentageInterest: Number(percentageInterest),
      observations,
    };
    loans.addLoan(newLoan);
    navigate('/');
  };

  return (
    <S.Container>
      <Header title='Novo empréstimo' />
      <Input
        label='Nome'
        inputProps={{
          placeholder: 'Nome',
          value: name,
          onChange: (e) => setName(e.target.value),
        }}
      />
      <InputDate onChange={setInitialDate} selected={initialDate} label='Data' />
      <Input
        label='Valor emprestado'
        inputProps={{
          type: 'number',
          placeholder: 'Valor emprestado',
          value: value,
          onChange: (e) => setValue(e.target.value),
          inputMode: 'numeric',
        }}
      />
      <Input
        label='Porcentagem de juros'
        inputProps={{
          type: 'number',
          placeholder: 'Porcentagem de juros',
          value: percentageInterest,
          onChange: (e) => setPercentageInterest(e.target.value),
          inputMode: 'numeric',
        }}
      />
      <Input
        label='Observações'
        inputProps={{
          placeholder: 'Observações',
          value: observations,
          onChange: (e) => setObservations(e.target.value),
        }}
      />
      <Button onClick={handleAddNewLoan}>Adicionar novo empréstimo</Button>
    </S.Container>
  );
};

import { Button } from 'components/Button';
import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { formatDate } from 'utils';
import * as S from './styles';

interface DateButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: string;
  label: string;
}
export const DateButton = forwardRef<HTMLButtonElement, DateButtonProps>(({ onClick, value, label }, ref) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <Button variant='date' onClick={onClick} ref={ref}>
        {!!value && formatDate(new Date(value))}
      </Button>
    </S.Container>
  );
});

interface InputDateProps {
  selected: Date | null;
  onChange: (date: Date) => void;
  label: string;
}

export const InputDate = ({ selected, onChange, label }: InputDateProps) => {
  return (
    <ReactDatePicker
      locale='pt-BR'
      customInput={<DateButton label={label} />}
      selected={selected}
      onChange={onChange}
    />
  );
};

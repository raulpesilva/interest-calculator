import * as S from './styles';

interface HeaderProps {
  title: string;
  withoutNavigation?: boolean;
}
export const Header = ({ title, withoutNavigation }: HeaderProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {!withoutNavigation && <S.BackButton to='/'>Voltar</S.BackButton>}
    </S.Container>
  );
};

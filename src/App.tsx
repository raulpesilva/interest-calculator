import ptBR from 'date-fns/locale/pt-BR';
import { GlobalProvider } from 'providers';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppRoutes } from 'routes';

registerLocale('pt-BR', ptBR);

function App() {
  return (
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  );
}

export default App;

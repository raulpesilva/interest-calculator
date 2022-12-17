import { Home, New, Transaction } from 'pages';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Outlet />}>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/transaction/:id' element={<Transaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

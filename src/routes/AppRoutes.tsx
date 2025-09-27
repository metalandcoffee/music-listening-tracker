import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddAlbumPage from '../pages/AddAlbumPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/add' element={<AddAlbumPage />} />
    </Routes>
  );
};

export default AppRoutes;

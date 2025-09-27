import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddAlbumPage from '../pages/AddAlbumPage';
import EditAlbumPage from '../pages/EditAlbumPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/add' element={<AddAlbumPage />} />
      <Route path='/edit/:id' element={<EditAlbumPage />} />
    </Routes>
  );
};

export default AppRoutes;

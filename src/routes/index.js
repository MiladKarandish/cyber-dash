import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Traits from '../pages/Trending';
import Drops from '../pages/Drops';
import ExpectedPnl from '../pages/ExpectedPnl';
import CollectionOfficials from '../pages/CollectionOfficials';
import Collection from '../pages/Collection';
import Home from '../pages/Home';

const index = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/trending' element={<Traits />} />
      <Route path='/drops' element={<Drops />} />
      <Route path='/panel' element={<ExpectedPnl />} />
      <Route path='/collection/:slug' element={<Collection />} />
      <Route
        path='/collectionOfficials/:slug'
        element={<CollectionOfficials />}
      />
    </Routes>
  );
};

export default index;

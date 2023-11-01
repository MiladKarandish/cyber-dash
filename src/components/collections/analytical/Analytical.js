import SecondChart from './SecondChart';
import BoredApe from './BoredApeChart';
import { CollectionContextProvider } from 'contexts/collectionContext';
import 'styles/collections/mainCollection.scss';

const Analytical = () => {
  return (
    <CollectionContextProvider>
      <div className='analytical'>
        <BoredApe />
        <SecondChart />
      </div>
    </CollectionContextProvider>
  );
};

export default Analytical;

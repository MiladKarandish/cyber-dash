import { createContext, useState } from 'react';

const CollectionContext = createContext();

export const CollectionContextProvider = ({ children }) => {
  const [collectionData, setCollectionData] = useState(null);

  const value = { collectionData, setCollectionData };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

export default CollectionContext;

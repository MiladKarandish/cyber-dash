import React, { useCallback, useEffect, useState } from 'react';
import '../styles/search.scss';

const Search = ({ className, styles, callBack }) => {
  const [value, setValue] = useState('');

  const onInputChange = useCallback((e) => setValue(e.target.value));

  // useEffect(() => {
  //   if (callBack) {
  //     const abortController = new window.AbortController();
  //     const signal = abortController.signal;

  //     try {
  //       const fetcher = async () => {
  //         const res = await fetch(
  //           `https://api.cyberdash.app/v1/collections/0xba627f3d081cc97ac0edc40591eda7053ac63532/token/${value}`
  //         );

  //         const data = await res.json();

  //         if (data) {
  //           callBack && callBack(data);
  //         }
  //       };
  //       fetcher();
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     return () => {
  //       if (signal && abortController.abort) {
  //         abortController.abort();
  //       }
  //     };
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [value]);

  return (
    <input
      className={`search ${className || ''}`}
      placeholder="Search"
      style={styles}
      value={value}
      onChange={onInputChange}
    />
  );
};

export default Search;

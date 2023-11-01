import { useEffect, useState } from 'react';

const useFetcher = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(url);

      const data = await res.json();

      setData(data);
      setLoading(false);
    };

    fetcher();
  }, [url]);

  return [data, loading];
};

export default useFetcher;

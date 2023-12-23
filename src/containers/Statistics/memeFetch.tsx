import { useState, useEffect } from 'react';

interface FetchResponse {
  success: boolean;
  ranking: {
    rank: number;
    imageUrl: string;
  }[];
}

const useFetch = (url: string): [FetchResponse | null, boolean] => {
  const [data, setData] = useState<FetchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    const response = await fetch(url);
    const json: FetchResponse = await response.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, [url]);

  return [data, loading];
};

export default useFetch;

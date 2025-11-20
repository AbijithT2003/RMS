import { useState, useEffect } from "react";

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resolveResponse = (response) => {
    // Support both raw axios responses (response.data)
    // and already-processed responses (response is the data)
    if (response === undefined || response === null) return response;
    if (response && response.data !== undefined) return response.data;
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        setData(resolveResponse(response));
      } catch (err) {
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(resolveResponse(response));
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

import React, { useCallback, useState } from "react";

const useHttp = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async function (url, applyDataFn) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const error = new Error("Something went wrong");
        applyDataFn(undefined);
        throw error;
      }

      const data = await res.json();

      //Hàm xử lý data
      applyDataFn(data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;

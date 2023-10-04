import { useCallback, useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoding = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoding = useCallback(() => {
    setIsLoading(false);
  }, []);
  return { isLoading, startLoding, stopLoding };
};

export default useLoading;
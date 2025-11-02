import { useLocation } from "react-router-dom";

export const useUrlParams = () => {
  const location = useLocation();
  
  const getParam = (param: string): string | null => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  const hasParam = (param: string): boolean => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.has(param);
  };

  return { getParam, hasParam };
};

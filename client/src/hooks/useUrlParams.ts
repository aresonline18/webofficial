import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export function useUrlParams() {
  const [location] = useLocation();
  const [params, setParams] = useState<URLSearchParams>(new URLSearchParams());

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams(searchParams);
  }, [location]);

  const hasParam = (key: string, value?: string) => {
    if (value) {
      return params.get(key) === value;
    }
    return params.has(key);
  };

  const getParam = (key: string) => {
    return params.get(key);
  };

  const getAllParams = () => {
    const allParams: Record<string, string> = {};
    params.forEach((value, key) => {
      allParams[key] = value;
    });
    return allParams;
  };

  return {
    params,
    hasParam,
    getParam,
    getAllParams
  };
}
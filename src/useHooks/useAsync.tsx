import { useState, useEffect, useCallback, useRef } from "react";

type PromiseFn<T> = (...args: any) => Promise<T>;
export type Status = "idle" | "pending" | "success" | "error";

function useAsync<D, E, F extends PromiseFn<D>>(
  asyncFunction: F,
  token: string,
  immediate: boolean = true
) {
  const [status, setStatus] = useState<Status>("idle");
  const [value, setValue] = useState<D | null>(null);
  const [error, setError] = useState<E | null>(null);
  let mounted = useRef(true);

  const execute = useCallback(() => {
    setStatus("pending");
    setValue(null);
    setError(null);

    return asyncFunction(token)
      .then((response) => {
        mounted.current && setValue(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction, token]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    return () => {
      mounted.current = false;
    };
  }, [execute, immediate]);

  return { execute, status, value, error };
}

export default useAsync;

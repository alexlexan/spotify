import { useState, useEffect, useCallback, useRef } from "react";

type Status = "idle" | "pending" | "success" | "error";

type asyncFunctionPromise<T1, T2> = (
  token: string,
  urlPlaylist: string,
  urlSongs: string
) => Promise<[T1, T2]>;

function useFetch<T1, Т2>(
  asyncFunction: asyncFunctionPromise<T1, Т2>,
  token: string,
  urlPlaylist: string,
  urlSongs: string,
  immediate: boolean = true
): {
  execute: () => Promise<void>;
  status: Status;
  value: [T1, Т2];
  error: Error | null;
} {
  const [status, setStatus] = useState<Status>("idle");
  const [value, setValue] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  let mounted = useRef(true);

  const execute = useCallback(() => {
    setStatus("pending");
    setValue(null);
    setError(null);

    return asyncFunction(token, urlPlaylist, urlSongs)
      .then((response) => {
        mounted.current && setValue(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction, token, urlPlaylist, urlSongs]);

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

export default useFetch;

export async function getPlaylists<T1, T2>(
  token: string,
  urlPlaylist: string,
  urlSongs: string
): Promise<[T1, T2]> {
  const getData = async (url: string, token: string) => {
    const request = new Request(url, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });

    const responce = await fetch(request);
    const result = await responce.json();
    return result;
  };

  const playlist = await getData(urlPlaylist, token);
  const songs = await getData(urlSongs, token);
  return Promise.all([playlist, songs]);
}

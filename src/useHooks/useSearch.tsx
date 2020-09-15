export const search = async (token: string, urlSearch: string) => {
  const request = new Request(urlSearch, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });

  const responce = await fetch(request);
  const result = await responce.json();
  return result;
};

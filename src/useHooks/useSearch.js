export const search = async (token, urlSearch) => {
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

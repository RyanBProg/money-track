import { RequestBody } from "../types/types";

export async function makeRequest(
  method: string,
  body: RequestBody | undefined,
  page: number,
  limit: number,
  sortMethod: string
) {
  const sortBy = sortMethod.split("-")[0];
  const sortOrder = sortMethod.split("-")[1];

  const url = `${
    import.meta.env.VITE_API_URL
  }/transactions?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${sortOrder}`;

  const response = await fetch(url, {
    method,
    headers: { "Content-type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });

  const jsonData = await response.json();
  return jsonData;
}

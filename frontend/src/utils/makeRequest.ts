import { RequestBody } from "../types/types";

export async function makeRequest(
  method: string,
  body: RequestBody,
  page: number,
  limit: number
) {
  const url = `${process.env.REACT_APP_API_URL}/transactions?page=${page}&limit=${limit}`;

  const response = await fetch(url, {
    method,
    headers: { "Content-type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });

  const jsonData = await response.json();
  return jsonData;
}

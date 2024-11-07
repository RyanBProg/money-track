async function makeRequest(method, body, page, limit) {
  const url = `${process.env.REACT_APP_API_URL}/transactions?page=${page}&limit=${limit}`;

  const response = await fetch(url, {
    method,
    headers: { "Content-type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });

  const jsonData = await response.json();
  return jsonData;
}

module.exports = makeRequest;

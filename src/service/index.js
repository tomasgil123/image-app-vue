export const getToken = async () => {
  const response = await fetch(`${process.env.VUE_APP_BASE_URL}auth`, {
    body: JSON.stringify({ apiKey: process.env.VUE_APP_API_KEY }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const data = await response.json();

  return { status: response.status, data: data };
};

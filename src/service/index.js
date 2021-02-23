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

function makeCommonOptions(accessToken) {
  return {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
}

export const getImages = async (token, page) => {
  let urlEnding;
  if (page > 1) {
    urlEnding = `images?page=2`;
  } else {
    urlEnding = `images`;
  }

  const response = await fetch(`${process.env.VUE_APP_BASE_URL}${urlEnding}`, {
    ...makeCommonOptions(token),
    method: "GET"
  });

  const responseData = await response.json();

  return { status: response.status, data: responseData };
};

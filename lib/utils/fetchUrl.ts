export type FetchUrlT = URL | string;

export type FetchInitT = RequestInit & {
  next?: object;
  body?: object | { [key: string]: any } | string;
};

export type FetchHeadersT = {
  "Content-Type": string;
  Authorization?: string | null;
};

async function fetchUrl<T>(url: FetchUrlT, init: FetchInitT = {}) {
  const baseUrl = "https://admin.cafe-khanevadeh.ir/api";
  const finalUrl = `${baseUrl}${url}`;
  const { method = "GET", headers: customHeaders, body, ...otherInit } = init;

  const headers = new Headers(customHeaders);
  headers.set("Content-Type", "application/json");

  const params: RequestInit = {
    method,
    headers,
    ...otherInit,
  };

  // Replace init object body with string body
  if (init?.method !== "GET") {
    if (typeof body === "string") {
      params.body = body;
    } else {
      params.body = JSON.stringify(body);
    }
  } else {
    delete params.body;
  }

  try {
    const response = await fetch(finalUrl, params);

    if (response.ok) {
      const result = await response.json();

      return result.data as T;
    } else if (response.status === 401) {
      throw { status: 401, message: "Unauthorized" };
    } else {
      throw response;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("Network error:", e);
      throw {
        status: -113,
        message:
          "A network error occurred or there is a syntax error in the result",
      };
    }
    throw e;
  }
}

export default fetchUrl;

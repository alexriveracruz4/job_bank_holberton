/*
Function to use the get, post, update and delete HTTP request methods.
Ex: 
  -helpHttp.get(url) => To use the get method
  -helpHttp.get(url, body) => To use the post method
*/
export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET"; // GET method by default if options.method is empty
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers } // Add user-fetched headers
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false; // Converts object to string
    if (!options.body) delete options.body;

    setTimeout(() => controller.abort(), 7000); // Run abort if no response in 3 seconds

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
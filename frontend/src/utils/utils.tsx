/**
 * parse url
 * @returns url parameters
 */
export const parseUrlHash = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

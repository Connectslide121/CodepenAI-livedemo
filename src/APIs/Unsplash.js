export default async function SearchImages(query) {
  const url = `https://api.unsplash.com/search/photos?page=${1}&query=${query}&client_id=${"HUBfBOYAY2krhsIhIpu7c0OgMgGPY3ru198GUXrXBy0"}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  return results[0];
}

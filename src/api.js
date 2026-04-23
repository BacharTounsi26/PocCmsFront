const BFF_URL = (process.env.REACT_APP_BFF_URL || "http://localhost:3001").replace(/\/+$/, "");

export async function fetchProducts(query) {
  const response = await fetch(
    `${BFF_URL}/api/products?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  return response.json();
}

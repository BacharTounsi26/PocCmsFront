const BFF_URL = process.env.REACT_APP_BFF_URL || "http://localhost:3001";

// Switch to "/api/products" when you have real SAP product codes
const PRODUCTS_ENDPOINT = process.env.REACT_APP_USE_MOCK === "true"
  ? "/api/products/mock"
  : "/api/products";

export async function fetchProducts(query) {
  const response = await fetch(
    `${BFF_URL}${PRODUCTS_ENDPOINT}?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${response.status}`);
  }

  return response.json();
}

import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import SelectedProducts from "./components/SelectedProducts";
import { fetchProducts } from "./api";
import { useDebounce } from "./useDebounce";

export default function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csExtension, setCsExtension] = useState(null);

  // Contentstack UI Extension SDK init
  useEffect(() => {
    if (window.ContentstackUIExtension) {
      window.ContentstackUIExtension.init().then((extension) => {
        setCsExtension(extension);
        // Load previously saved values
        const saved = extension.field.getData();
        if (Array.isArray(saved)) {
          setSelectedCodes(saved);
        }
      });
    }
  }, []);

  // Save to Contentstack whenever selection changes
  useEffect(() => {
    if (csExtension) {
      csExtension.field.setData(selectedCodes);
    }
  }, [selectedCodes, csExtension]);

  const search = useCallback(async (q) => {
    if (!q || q.trim().length < 2) {
      setProducts([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(q.trim());
      setProducts(data);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useDebounce(search, 300);

  const handleQueryChange = (value) => {
    setQuery(value);
    debouncedSearch(value);
  };

  const toggleProduct = (code) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const removeProduct = (code) => {
    setSelectedCodes((prev) => prev.filter((c) => c !== code));
  };

  return (
    <div className="app">
      <h2>Product Picker</h2>

      <SearchBar value={query} onChange={handleQueryChange} disabled={loading} />

      <SelectedProducts codes={selectedCodes} onRemove={removeProduct} />

      <ProductList
        products={products}
        selectedCodes={selectedCodes}
        onToggle={toggleProduct}
        loading={loading}
        error={error}
      />
    </div>
  );
}

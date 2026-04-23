import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  selectedCodes,
  onToggle,
  loading,
  error,
}) {
  if (loading) {
    return <div className="status-message">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="status-message error">Erreur : {error}</div>;
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.code}
          product={product}
          selected={selectedCodes.includes(product.code)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

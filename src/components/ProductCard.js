import React from "react";

export default function ProductCard({ product, selected, onToggle }) {
  return (
    <div
      className={`product-card ${selected ? "selected" : ""}`}
      onClick={() => onToggle(product.code)}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(product.code)}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="product-info">
        <span className="product-name">{product.name || product.code}</span>
        <span className="product-code">{product.code}</span>
      </div>
    </div>
  );
}

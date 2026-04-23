import React from "react";

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='%23eee'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23aaa' font-size='10'%3ENo img%3C/text%3E%3C/svg%3E";

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
      <img
        src={product.image || PLACEHOLDER_IMG}
        alt={product.name}
        className="product-image"
        onError={(e) => {
          e.target.src = PLACEHOLDER_IMG;
        }}
      />
      <div className="product-info">
        <span className="product-name">{product.name}</span>
        <span className="product-code">{product.code}</span>
      </div>
    </div>
  );
}

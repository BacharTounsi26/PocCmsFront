import React from "react";

export default function SearchBar({ value, onChange, disabled }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher un produit (code ou nom)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

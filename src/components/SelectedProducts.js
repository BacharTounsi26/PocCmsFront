import React from "react";

export default function SelectedProducts({ codes, onRemove }) {
  if (codes.length === 0) return null;

  return (
    <div className="selected-panel">
      <h3>Produits sélectionnés ({codes.length})</h3>
      <div className="selected-tags">
        {codes.map((code) => (
          <span key={code} className="tag">
            {code}
            <button onClick={() => onRemove(code)} title="Retirer">
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

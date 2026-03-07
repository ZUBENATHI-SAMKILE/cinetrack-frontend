import { useState } from "react";


export default function StarRating({ value = 0, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= (hovered || value) ? "filled" : ""}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange?.(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
import React from 'react';
import './Categories.css';
const Categories = (props) => {
  const { categories, handleCategoryClick, activeCategory } = props;
  return (
    <div className="tab-container">
      {categories.map((category) => (
        <button
          key={category}
          className={`tab ${
            category === activeCategory ? 'active' : ''
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;

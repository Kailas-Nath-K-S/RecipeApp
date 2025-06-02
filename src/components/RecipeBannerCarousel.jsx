import React, { useEffect, useState } from "react";
import "./RecipeBannerCarousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const RecipeBannerCarousel = ({ recipes }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate(); 

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % recipes.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [recipes]);

  if (!recipes.length) return null;

  const recipe = recipes[index];

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className="banner-carousel">
      <button className="nav-btn left" onClick={handlePrev}>
        <FaChevronLeft />
      </button>

      <div className="banner-card" onClick={handleClick} style={{ cursor: "pointer" }}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div className="banner-content">
          <h2>{recipe.strMeal}</h2>
          <p>{recipe.strCategory} • {recipe.strArea}</p>
        </div>
      </div>

      <button className="nav-btn right" onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default RecipeBannerCarousel;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className="cardWrapper">

   
    <div className="card" onClick={() => navigate(`/recipe/${recipe.idMeal}`)}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="card-body">
        <h3>{recipe.strMeal}</h3>
        <p>{recipe.strCategory}</p>
      </div>
    </div> 
    </div>
  );
};

export default RecipeCard;

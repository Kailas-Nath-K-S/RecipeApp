import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RecipePage.css";
import SocialIcons from "../components/SocialIcons";

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const meal = res.data.meals[0];
        setRecipe(meal);

        // Fetch similar recipes using category
        const similarRes = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`
        );
        const filtered = similarRes.data.meals.filter(m => m.idMeal !== id);
        setSimilar(filtered.slice(0, 4)); // limit to 4 similar meals
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
    }

    return ingredients;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Recipe link copied to clipboard!");
  };

  const goToRecipe = (mealId) => {
    navigate(`/recipe/${mealId}`);
    window.scrollTo(0, 0);
  };

  if (!recipe) return <p className="loading">Loading recipe...</p>;

  return (
    <div className="recipe-page">
      <div className="top-buttons"><div>

        <button onClick={() => navigate(-1)} className="back-button">Back</button>
      </div><div>

        <button onClick={() => navigate("/")} className="home-button">
          Home
        </button>
        <button className="share-button" onClick={handleShare}>Copy URL</button>
      </div>
      </div>

      <div className="recipe-header">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-img" />
        <div className="recipe-meta">
          <h1>{recipe.strMeal}</h1>
          <p><strong>Category:</strong> {recipe.strCategory}</p>
          <p><strong>Area:</strong> {recipe.strArea}</p>
          <SocialIcons />
        </div>
      </div>

      <div className="recipe-ingredients">
        <h2>Ingredients</h2>
        <ul>
          {getIngredients().map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>  <div className="recipe-instructions">
        <h2>Instructions</h2>
        <p>{recipe.strInstructions}</p>
      </div>

    

      <div className="similar-recipes">
        <h2>Similar Recipes</h2>
        <div className="similar-grid">
          {similar.map((meal) => (
            <div key={meal.idMeal} className="similar-card" onClick={() => goToRecipe(meal.idMeal)}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;

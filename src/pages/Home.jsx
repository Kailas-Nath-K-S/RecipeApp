import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import RecipeBannerCarousel from "../components/RecipeBannerCarousel";
import "../styles/Home.css";
import hat from "../assets/hat.jpg"
import meal from "../assets/meal.jpg"
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      const promises = Array.from({ length: 5 }, () =>
        axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      );
      const results = await Promise.all(promises);
      const meals = results.map((res) => res.data.meals[0]);
      setRecipes(meals);
    };
    fetchRandomRecipes();
  }, []);

  useEffect(() => {
    if (!search) return;
    const delayDebounce = setTimeout(() => {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then((res) => {
          setRecipes(res.data.meals || []);
        });
    }, 500); 
    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="home">
      <h1>Try something new <img src={hat} alt="hat"/> </h1>

      <input
        type="text"
        placeholder="Search by keyword (e.g. chicken, pasta)..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search ? (
        <div className="recipe-list">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      ) : (
        <>
          <h2>Check this Out.... <img src={meal} alt="meal"/></h2>
          <RecipeBannerCarousel recipes={recipes} />
        </>
      )}

    </div>
  );
};

export default Home;

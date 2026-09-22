import db from "./db.js";
const getAllRecipes = async () => {
  return db.recipes.toArray();
};

const getRecipeById = async (id) => {
  return db.recipes.get(id);
};

const createRecipe = async (recipe) => {
  const existingRecipe = await db.recipes.get({ name: recipe.name });
  if (existingRecipe) {
    console.log("Recipe with this name already exists");
    return false;
  }
  return db.recipes.add(recipe);
};

const updateRecipe = async (id, updatedRecipe) => {
  return db.recipes.update(id, updatedRecipe);
};

const deleteRecipe = async (id) => {
  return db.recipes.delete(id);
};

const API = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
export default API;

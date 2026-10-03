import API from "./db/api.js";

const recipeId = sessionStorage.getItem("viewRecipeId");
const recipe = await API.getRecipeById(Number(recipeId));

console.log(recipeId);

const recipeNameElement = document.getElementById("RecipeName");
const recipeIngredientsList = document.getElementById("RecipeIngredientsList");
const recipeInstructionsList = document.getElementById(
  "RecipeInstructionsList",
);
const printButton = document.querySelector("app-button");

recipeNameElement.textContent = recipe.name;
recipeIngredientsList.innerHTML = recipe.ingredients
  .map(
    (ingredient) =>
      `<li>${ingredient.name} ${ingredient.quantity} ${ingredient.unit}</li>`,
  )
  .join("");
recipeInstructionsList.innerHTML = recipe.instructions
  .map((instruction) => `<li>${instruction}</li>`)
  .join("");

printButton.addEventListener("click", () => {
  window.print();
});

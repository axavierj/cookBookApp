import API from "./db/api.js";
const recipeNameElement = document.getElementById("recipeName");
const recipeIngredientsList = document.getElementById("recipeIngredientsList");
const recipeInstructionsElement = document.getElementById(
  "recipeInstructionsList",
);
const recipeId = sessionStorage.getItem("viewRecipeId");

const loadRecipe = async (id) => {
  if (!id) return null;
  const recipe = await API.getRecipeById(Number(id));
  return recipe;
};

const renderName = ({ name }, element) => {
  if (element) {
    element.innerHTML = `<h2>${name}</h2>`;
  }
};

const renderIngredients = ({ ingredients }, element) => {
  if (element) {
    element.innerHTML = `<ul>${ingredients.map((ing) => `<li>- ${ing.name} ${ing.quantity} ${ing.unit}</li>`).join("")}</ul>`;
  }
};

const renderInstructions = ({ instructions }, element) => {
  if (element) {
    element.innerHTML = `<ul class="[ display-list ]">${instructions.map((step) => `<li>- ${step}</li>`).join("")}</ul>`;
  }
};

const recipe = await loadRecipe(recipeId);

renderName(recipe, recipeNameElement);
renderIngredients(recipe, recipeIngredientsList);
renderInstructions(recipe, recipeInstructionsElement);

//add id to url
if (recipeId) {
  const url = new URL(window.location);
  url.searchParams.set("id", recipeId);
  window.history.replaceState(null, "", url);
}

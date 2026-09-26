import API from "./db/api.js";

const recipeListComponent = document.querySelector("recipe-list");
const appPaginationComponent = document.querySelector("app-pagination");

const storedId = sessionStorage.getItem("viewRecipeId");
const editId = sessionStorage.getItem("editRecipeId");
const viewId = sessionStorage.getItem("viewRecipeId");

if (storedId) {
  sessionStorage.removeItem("viewRecipeId");
}
if (editId) {
  sessionStorage.removeItem("editRecipeId");
}

if (viewId) {
  sessionStorage.removeItem("viewRecipeId");
}

const loadRecipes = async () => {
  const recipes = await API.getAllRecipes();
  return recipes;
};

const itemsPerPage = 5;
const pagedRecipes = (currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return recipes.slice(startIndex, endIndex);
};

const recipes = await loadRecipes();

const numberOfPages = Math.ceil(recipes.length / itemsPerPage);
appPaginationComponent.numberOfPages = numberOfPages;
appPaginationComponent.currentPage = 1;
appPaginationComponent.recipesPerPage = itemsPerPage;
const initialPaginatedRecipes = pagedRecipes(1, itemsPerPage);
recipeListComponent.recipes = JSON.stringify(initialPaginatedRecipes);

document.addEventListener("edit", async (e) => {
  const { id } = e.detail;
  const numid = Number(id);
  sessionStorage.setItem("editRecipeId", numid);
  window.location.href = "/edit/";
});
document.addEventListener("view", async (e) => {
  const { id } = e.detail;
  const numid = Number(id);
  sessionStorage.setItem("viewRecipeId", numid);
  window.location.href = "/view/";
});

document.addEventListener("pagechange", async (e) => {
  const { currentPage, itemsPerPage } = e.detail;
  const paginatedRecipes = pagedRecipes(currentPage, itemsPerPage);
  recipeListComponent.recipes = JSON.stringify(paginatedRecipes);
  appPaginationComponent.currentPage = currentPage;
});
document.addEventListener("search", async (e) => {
  const { query } = e.detail;
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query),
  );
  recipeListComponent.recipes = JSON.stringify(filteredRecipes);
});

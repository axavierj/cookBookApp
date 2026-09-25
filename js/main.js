import API from "./db/api.js";

const recipeListContainer = document.getElementById("recipeListContainer");
const recipeListComponent = document.querySelector("recipe-list");
const searchInput = document.getElementById("searchInput");
const paginationContainer = document.getElementById("pageContainer");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");

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

const recipes = await loadRecipes();
recipeListComponent.recipes = JSON.stringify(recipes);

searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query),
  );
  renderRecipes(filteredRecipes);
});

//paginate

let currentPage = 1;
const recipesPerPage = 5;

const totalPages = Math.ceil(recipes.length / recipesPerPage);
const renderPagination = () => {
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = "pageButton";
    pageButton.onclick = () => {
      currentPage = i;
      const start = (currentPage - 1) * recipesPerPage;
      const end = start + recipesPerPage;
      renderRecipes(recipes.slice(start, end));
    };
    paginationContainer.appendChild(pageButton);
  }
};

const renderPaginatedRecipes = (recipes, page = 1) => {
  const start = (page - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  renderRecipes(recipes.slice(start, end));
};

renderPagination();
document.addEventListener("delete", async (e) => {
  const { id } = e.detail;
  const numid = Number(id);
  await API.deleteRecipe(numid);
  const updatedRecipes = await loadRecipes();
  recipeListComponent.recipes = JSON.stringify(updatedRecipes);
});
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
// renderPaginatedRecipes(recipes, currentPage);

prevPageButton.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderPaginatedRecipes(recipes, currentPage);
  }
};
nextPageButton.onclick = () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderPaginatedRecipes(recipes, currentPage);
  }
};

const pageButtons = document.querySelectorAll(".pageButton");
pageButtons.forEach((button) => {
  button.onclick = () => {
    currentPage = Number(button.textContent);
    renderPaginatedRecipes(recipes, currentPage);
  };
});

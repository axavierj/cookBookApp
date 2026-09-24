import API from "./db/api.js";

const recipeListContainer = document.getElementById("recipeListContainer");
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

const renderRecipes = (recipes) => {
  if (recipes.length === 0) {
    recipeListContainer.innerHTML = "<li>No recipes found</li>";
    return;
  }
  recipeListContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const li = document.createElement("li");
    li.className = "[ recipe-item ]";
    li.innerHTML = `
      <div class="flex justify-between align-center">
        <p>${recipe.name}</p>
        <section>
          <button data-id="${recipe.id}" id="delete-${recipe.id}" class="btn [ delete-button ]"><delete-icon class="passClick"></delete-icon></button>
          <button data-id="${recipe.id}" id="edit-${recipe.id}" class="mx-sm btn [ edit-button ]"><edit-icon class="passClick"></edit-icon></button>
          <button data-id="${recipe.id}" id="view-${recipe.id}" class="btn [ view-button ]"><view-icon class="passClick"></view-icon></button>
        </section>
      </div>
    `;
    recipeListContainer.appendChild(li);
  });
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const editId = Number(e.target.dataset.id);
      console.log(editId);
      sessionStorage.setItem("editRecipeId", editId);
      window.location.href = "/edit/";
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const deleteId = Number(e.target.dataset.id);
      await API.deleteRecipe(deleteId);
      const updatedRecipes = await loadRecipes();
      renderPaginatedRecipes(updatedRecipes, currentPage);
    });
  });

  const viewButtons = document.querySelectorAll(".view-button");
  viewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const viewId = Number(e.target.dataset.id);
      console.log(viewId);
      sessionStorage.setItem("viewRecipeId", viewId);
      window.location.href = "/view/";
    });
  });
};

const recipes = await loadRecipes();
renderRecipes(recipes);

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
renderPaginatedRecipes(recipes, currentPage);

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

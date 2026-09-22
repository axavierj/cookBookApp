import API from "./db/api.js";

const recipeListContainer = document.getElementById("recipeListContainer");

const storedId = sessionStorage.getItem("viewRecipeId");

if (storedId) {
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
          <button data-id="${recipe.id}" id="delete-${recipe.id}" class="btn [ delete-button ]">Delete</button>
          <button data-id="${recipe.id}" id="edit-${recipe.id}" class="mx-sm btn [ edit-button ]">Edit</button>
          <button data-id="${recipe.id}" id="view-${recipe.id}" class="btn [ view-button ]">View</button>
        </section>
      </div>
    `;
    recipeListContainer.appendChild(li);
    const deleteButtons = li.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.onclick = async (e) => {
        const id = Number(e.target.dataset.id);
        await API.deleteRecipe(id);
        const updatedRecipes = await loadRecipes();
        renderRecipes(updatedRecipes);
      };
    });
    const editButton = li.querySelector(".edit-button");
    editButton.onclick = (e) => {
      const id = e.target.dataset.id;
      sessionStorage.setItem("editRecipeId", id);
      window.location.href = `/edit/`;
    };
    const viewButton = li.querySelector(".view-button");
    viewButton.onclick = (e) => {
      const id = e.target.dataset.id;
      sessionStorage.setItem("viewRecipeId", id);
      window.location.href = `/view/`;
    };
  });
};

const recipes = await loadRecipes();
renderRecipes(recipes);

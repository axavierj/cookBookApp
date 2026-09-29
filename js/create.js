import API from "./db/api.js";
import validation from "./validation.js";

const { createRecipe } = API;
const previewIngredientsList = document.getElementById(
  "previewIngredientsList",
);
const previewInstructionsList = document.getElementById(
  "previewInstructionsList",
);
const previewRecipeName = document.getElementById("previewName");
const createRecipeButton = document.getElementById("createRecipeButton");
const alertDialog = document.querySelector("app-alert");

const showAlert = (message) => {
  alertDialog.message = message;
  alertDialog.open = "true";
};
const makeRecipeObject = (name, ingredients, instructions) => {
  return { name, ingredients, instructions };
};

let ingredients = [];
let instructions = [];
let recipeName = "";

const removeIngredient = (index) => {
  if (index > -1) {
    ingredients.splice(index, 1);
    const li = previewIngredientsList.querySelector(
      `li[data-index="${index}"]`,
    );
    if (li) li.remove();
  }
};
const removeInstruction = (index) => {
  if (index > -1) {
    instructions.splice(index, 1);
    const li = previewInstructionsList.querySelector(
      `li[data-index="${index}"]`,
    );
    if (li) li.remove();
  }
};
const addItemToPreviewList = (list, item, index) => {
  const li = document.createElement("li");
  li.innerHTML = item;
  li.dataset.index = index;
  list.appendChild(li);
};

document.addEventListener("add-ingredient", (event) => {
  const ingredient = event.detail;
  ingredients.push(ingredient);
  addItemToPreviewList(
    previewIngredientsList,
    `<li data-index="${ingredients.indexOf(ingredient)}">${ingredient.quantity} ${ingredient.unit} of ${ingredient.name} <app-button list-type="ingredients" recipe-id="${ingredients.indexOf(ingredient)}" type="delete">Remove</app-button></li>`,
    ingredients.length - 1,
  );
});

document.addEventListener("add-instruction", (event) => {
  const instruction = event.detail.instruction;
  instructions.push(instruction);
  console.log(instruction);
  addItemToPreviewList(
    previewInstructionsList,
    `<li data-index="${instructions.indexOf(instruction)}">${instruction} <app-button list-type="instructions" recipe-id="${instructions.indexOf(instruction)}" type="delete">Remove</app-button></li>`,
    instructions.length - 1,
  );
});

document.addEventListener("update-recipe-name", (event) => {
  const name = event.detail.name;
  recipeName = name;
  previewRecipeName.textContent = recipeName;
});

document.addEventListener("delete", (event) => {
  const index = event.detail.id;
  const type = event.detail.type;
  if (type === "ingredients") {
    removeIngredient(index);
  } else if (type === "instructions") {
    removeInstruction(index);
  }
});

createRecipeButton.addEventListener("click", async () => {
  const recipe = makeRecipeObject(recipeName, ingredients, instructions);
  try {
    await createRecipe(recipe);
    showAlert("Recipe created successfully!");
  } catch (error) {
    showAlert("Failed to create recipe.");
  }
});

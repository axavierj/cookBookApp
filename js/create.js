import API from "./db/api.js";
import validation from "./validation.js";

const { createRecipe } = API;
const nameInput = document.getElementById("name");
const instructionsInput = document.getElementById("instructions");
const previewIngredientsList = document.getElementById(
  "previewIngredientsList",
);
const previewInstructionsList = document.getElementById(
  "previewInstructionsList",
);
const addInstructions = document.getElementById("addInstruction");
const createRecipeButton = document.getElementById("createRecipeButton");
const alertDialog = document.querySelector("app-alert");

const showAlert = (message) => {
  alertDialog.message = message;
  alertDialog.open = "true";
};

let ingredients = [];
let instructions = [];

const makeRecipeObject = (name, ingredients, instructions) => {
  return { name, ingredients, instructions };
};

const removeIngredient = (index) => {
  if (index > -1) {
    ingredients.splice(index, 1);
    const li = previewIngredientsList.querySelector(
      `li[data-index="${index}"]`,
    );
    if (li) li.remove();
  }
};

document.addEventListener("add-ingredient", (event) => {
  const ingredient = event.detail;
  console.log(ingredient);
});

document.addEventListener("add-instruction", (event) => {
  const instruction = event.detail.instruction;
  console.log(instruction);
});

createRecipeButton.onclick = async () => {
  if (validation.isFieldEmpty(nameInput.value)) {
    showAlert("Recipe name cannot be empty");
    nameInput.classList.remove("valid");
    nameInput.classList.add("invalid");
    return;
  }
  if (validation.isArrayEmpty(ingredients)) {
    showAlert("Ingredients cannot be empty");
    ingredientsInput.classList.remove("valid");
    ingredientsInput.classList.add("invalid");
    return;
  }
  if (validation.isArrayEmpty(instructions)) {
    showAlert("Instructions cannot be empty");
    instructionsInput.classList.remove("valid");
    instructionsInput.classList.add("invalid");
    return;
  } else {
    instructionsInput.classList.remove("invalid");
    instructionsInput.classList.add("valid");
  }
  const recipe = makeRecipeObject(nameInput.value, ingredients, instructions);
  console.log(recipe);
  const createdRecipe = await createRecipe(recipe);
  if (!createdRecipe) {
    showAlert("Recipe with this name already exists");
    return;
  }

  window.location.href = "/";
};

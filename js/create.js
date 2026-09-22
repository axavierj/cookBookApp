import API from "./db/api.js";
import validation from "./validation.js";

const { createRecipe } = API;
const nameInput = document.getElementById("name");
const ingredientInput = document.getElementById("ingredient");
const unitInput = document.getElementById("unit");
const quantityInput = document.getElementById("quantity");
const instructionsInput = document.getElementById("instructions");
const addIngredientButton = document.getElementById("addIngredient");
const previewName = document.getElementById("previewName");
const previewIngredientsList = document.getElementById(
  "previewIngredientsList",
);
const previewInstructionsList = document.getElementById(
  "previewInstructionsList",
);
const addInstructions = document.getElementById("addInstruction");
const createRecipeButton = document.getElementById("createRecipeButton");
const alertDialog = document.getElementById("alertDialog");
const alertMessage = document.getElementById("alertMessage");
const closeDialog = document.getElementById("closeDialog");

const showAlert = (message) => {
  alertMessage.textContent = message;
  alertDialog.showModal();
  alertDialog.classList.add("bounceIn");
};

closeDialog.onclick = () => {
  alertDialog.close();
};

let ingredients = [];
let instructions = [];

nameInput.oninput = () => {
  previewName.innerHTML = `<h3>${nameInput.value}</h3>`;
};

const makeIngredientObject = (name, unit, quantity) => {
  return { name, unit, quantity };
};

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

addIngredientButton.onclick = (event) => {
  if (event.target.classList.contains("removeIngredient")) {
    const li = event.target.closest("li");
    const index = Array.from(previewIngredientsList.children).indexOf(li);
    removeIngredient(index);
    return;
  }
  if (validation.isFieldEmpty(ingredientInput.value)) {
    showAlert("Ingredient name cannot be empty");
    ingredientInput.classList.remove("valid");
    ingredientInput.classList.add("invalid");
    return;
  } else if (!validation.isFieldEmpty(ingredientInput.value)) {
    ingredientInput.classList.remove("invalid");
    ingredientInput.classList.add("valid");
  }

  if (validation.isValueZero(quantityInput.value)) {
    showAlert("Quantity cannot be zero");
    quantityInput.classList.remove("valid");
    quantityInput.classList.add("invalid");
    return;
  }
  const ingredient = makeIngredientObject(
    ingredientInput.value,
    unitInput.value,
    quantityInput.value,
  );
  ingredients.push(ingredient);
  //get ingredient index in the list
  const index = ingredients.length - 1;

  const li = document.createElement("li");
  li.dataset.index = index;
  li.innerHTML = `${ingredient.quantity} ${ingredient.unit} of ${ingredient.name} <button data-index="${index}" class="btn delete-button [ removeIngredient ]">Remove</button>`;
  previewIngredientsList.appendChild(li);
  const removeButtons = li.querySelectorAll(".removeIngredient");
  removeButtons.forEach((button) => {
    button.onclick = (event) => {
      const li = event.target.closest("li");
      const index = Array.from(previewIngredientsList.children).indexOf(li);
      removeIngredient(index);
    };
  });
  ingredientInput.value = "";
  ingredientInput.classList.remove("invalid");
  ingredientInput.classList.add("valid");
  unitInput.value = "grams";
  quantityInput.value = "0";
  quantityInput.classList.remove("invalid");
  quantityInput.classList.add("valid");
};

addInstructions.onclick = () => {
  const instruction = instructionsInput.value;
  if (validation.isFieldEmpty(instruction)) {
    showAlert("Instruction cannot be empty");
    return;
  }
  instructions.push(instruction);
  const li = document.createElement("li");
  li.innerHTML = `${instruction} <button data-index="${instructions.length - 1}" class="btn delete-button [ removeInstruction ]">Remove</button>`;
  previewInstructionsList.appendChild(li);
  instructionsInput.value = "";
  const removeButtons = li.querySelectorAll(".removeInstruction");
  removeButtons.forEach((button) => {
    button.onclick = (event) => {
      const li = event.target.closest("li");
      const index = Array.from(previewInstructionsList.children).indexOf(li);
      if (index > -1) {
        instructions.splice(index, 1);
        li.remove();
      }
    };
  });
};

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
  console.log(createdRecipe);
  //navigate to home
  window.location.href = "/";
};

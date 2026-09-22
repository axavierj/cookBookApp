import API from "./db/api.js";

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

let ingredients = [];
let instructions = [];

const name = (nameInput.oninput = () => {
  previewName.innerHTML = `<h3>${nameInput.value}</h3>`;
});

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
  unitInput.value = "grams";
  quantityInput.value = "0";
};

addInstructions.onclick = () => {
  const instruction = instructionsInput.value;
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
  const recipe = makeRecipeObject(nameInput.value, ingredients, instructions);
  console.log(recipe);
  const createdRecipe = await createRecipe(recipe);
  console.log(createdRecipe);
  //navigate to home
  window.location.href = "/";
};

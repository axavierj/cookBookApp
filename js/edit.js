import API from "../js/db/api.js";
import validation from "../js/validation.js";

const nameInput = document.getElementById("name");
const ingredientInput = document.getElementById("ingredient");
const unitInput = document.getElementById("unit");
const quantityInput = document.getElementById("quantity");
const instructionsInput = document.getElementById("instructions");
const addIngredientButton = document.getElementById("addIngredient");
const addInstructionButton = document.getElementById("addInstruction");

const recipeNameContainer = document.getElementById("recipeName");
const recipeIngredientsList = document.getElementById("recipeIngredientsList");
const recipeInstructionsList = document.getElementById(
  "recipeInstructionsList",
);
const updateButton = document.getElementById("updateRecipe");

const editId = Number(sessionStorage.getItem("editRecipeId"));

const recipe = await API.getRecipeById(editId);
const alertDialog = document.getElementById("alertDialog");
const alertMessage = document.getElementById("alertMessage");
const closeDialogButton = document.getElementById("closeDialog");

const { name, ingredients, instructions } = recipe;
const workIngredients = [...ingredients];
const workInstructions = [...instructions];

const showAlert = (message) => {
  alertMessage.textContent = message;
  alertDialog.showModal();
  alertDialog.classList.add("bounceIn");
};

closeDialogButton.onclick = () => {
  alertDialog.close();
};

nameInput.value = name;
recipeNameContainer.querySelector("h2").textContent = name;
const renderIngredients = (array) => {
  recipeIngredientsList.innerHTML = "";
  array.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("grid", "grid-cols-2");
    li.innerHTML = `${item.quantity} ${item.unit} ${item.name} <button data-index="${array.indexOf(item)}" class="btn delete-button ml-lg [ removeIngredient ]">remove</button>`;
    recipeIngredientsList.appendChild(li);
  });
  recipeIngredientsList
    .querySelectorAll(".removeIngredient")
    .forEach((button) => {
      button.onclick = (e) => {
        const index = Number(e.target.dataset.index);
        workIngredients.splice(index, 1);
        renderIngredients(workIngredients);
      };
    });
};

const renderInstructions = (array) => {
  recipeInstructionsList.innerHTML = "";
  array.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("grid", "grid-cols-2");
    li.innerHTML = `${item} <button data-index="${index}" class="btn delete-button ml-lg [ removeInstruction ]">remove</button>`;
    recipeInstructionsList.appendChild(li);
  });
  recipeInstructionsList
    .querySelectorAll(".removeInstruction")
    .forEach((button) => {
      button.onclick = (e) => {
        const index = Number(e.target.dataset.index);
        workInstructions.splice(index, 1);
        renderInstructions(workInstructions);
      };
    });
};

const makeUpdatedRecipe = (name, ingredients, instructions) => {
  return {
    name: name,
    ingredients: ingredients,
    instructions: instructions,
  };
};

const makeIngredientObject = (name, unit, quantity) => {
  return {
    name: name,
    unit: unit,
    quantity: quantity,
  };
};

renderIngredients(workIngredients);
renderInstructions(workInstructions);

nameInput.oninput = (e) => {
  recipeNameContainer.querySelector("h2").textContent = e.target.value;
};

addIngredientButton.onclick = () => {
  if (validation.isFieldEmpty(ingredientInput.value)) {
    showAlert("Ingredient cannot be empty");
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
  } else if (!validation.isValueZero(quantityInput.value)) {
    quantityInput.classList.remove("invalid");
    quantityInput.classList.add("valid");
  }
  const newIngredient = makeIngredientObject(
    ingredientInput.value,
    unitInput.value,
    quantityInput.value,
  );
  workIngredients.push(newIngredient);
  ingredientInput.value = "";
  unitInput.value = "";
  quantityInput.value = "";
  renderIngredients(workIngredients);
};

addInstructionButton.onclick = () => {
  if (validation.isFieldEmpty(instructionsInput.value)) {
    showAlert("Instruction cannot be empty");
    instructionsInput.classList.remove("valid");
    instructionsInput.classList.add("invalid");
    return;
  } else if (!validation.isFieldEmpty(instructionsInput.value)) {
    instructionsInput.classList.remove("invalid");
    instructionsInput.classList.add("valid");
  }
  const newInstruction = instructionsInput.value;
  workInstructions.push(newInstruction);
  instructionsInput.value = "";
  renderInstructions(workInstructions);
};

updateButton.onclick = async () => {
  if (validation.isFieldEmpty(nameInput.value)) {
    showAlert("Recipe name cannot be empty");
    nameInput.classList.remove("valid");
    nameInput.classList.add("invalid");
    return;
  } else if (!validation.isFieldEmpty(nameInput.value)) {
    nameInput.classList.remove("invalid");
    nameInput.classList.add("valid");
  }
  const updatedRecipe = makeUpdatedRecipe(
    nameInput.value,
    workIngredients,
    workInstructions,
  );
  await API.updateRecipe(recipe.id, updatedRecipe);

  window.location.href = "/";
};

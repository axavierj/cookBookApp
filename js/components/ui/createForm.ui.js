const template = document.createElement("template");
template.innerHTML = `
<style>
input,
select {
  border: 1px solid #ccc;
  padding: var(--space-sm);
  border-radius: var(--space-xs);
}

textarea {
  border: 1px solid #ccc;
  padding: var(--space-sm);
  border-radius: var(--space-xs);
  resize: none;
  width: 100%;
  min-height: 100px;
}
  .form-container {
  margin-bottom: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  max-width: 600px;
  margin-inline: auto;
}

.form-grp {
  margin-bottom: var(--space-md);
  display: flex;
  flex-direction: column;
}

.divider {
  background-color: var(--secondary);
  height: 1px;
  width: 100%;
  margin: var(--space-md) 0;
}
  #instructions{
    max-width: 90vw;
  }
</style>

<div class="[ form-container ]" id="createRecipeForm">
        <section class="[ form-grp ]" id="recipeNameSection">
          <label for="name">Recipe Name:</label>
          <input class="valid" type="text" id="name" name="name" required />
        </section>
        <section id="ingredientsSection">
          <div class="[ form-grp ]" id="ingrediantName">
            <label for="ingredient">Ingredient:</label>
            <input
              class="valid"
              type="text"
              id="ingredient"
              name="ingredient"
              required
            />
          </div>
          <div class="[ form-grp ]" id="ingretiantUnit">
            <label for="unit">Unit:</label>
            <select id="unit" name="unit" required>
              <option value="grams">grams</option>
              <option value="teaspoons">teaspoons</option>
              <option value="tablespoons">tablespoons</option>
              <option value="ml">ml</option>
              <option value="liters">liters</option>
              <option value="cups">cups</option>
              <option value="pieces">pieces</option>
              <option value="pinches">pinches</option>
              <option value="each">each</option>
            </select>
          </div>
          <div class="[ form-grp ]" id="ingredientQuantity">
            <label for="quantity">Quantity:</label>
            <input
              class="valid"
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              value="0"
              required
            />
          </div>
          <app-button type="default" id="addIngredient">
            Add Ingredient
          </app-button>
        </section>
        <section class="[ form-grp ]" id="recipeInstuction">
          <label for="instructions">Instructions:</label>
          <textarea
            class="valid"
            id="instructions"
            name="instructions"
            required
          ></textarea>
        </section>
        <app-button  type="default" id="addInstruction">
          Add instructions
        </app-button>
      </div>
`;
class CreateFormUI extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.recipeNameInput = this.shadowRoot.querySelector("#name");
    this.addIngredientButton = this.shadowRoot.querySelector("#addIngredient");
    this.addInstructionButton =
      this.shadowRoot.querySelector("#addInstruction");
    this.ingredientNameInput = this.shadowRoot.querySelector("#ingredient");
    this.ingredientUnitSelect = this.shadowRoot.querySelector("#unit");
    this.ingredientQuantityInput = this.shadowRoot.querySelector("#quantity");
    this.instructionInput = this.shadowRoot.querySelector("#instructions");
  }
  connectedCallback() {
    this.recipeNameInput.addEventListener("input", () => {
      console.log(this.recipeNameInput.value);
      this.recipeNameInput.classList.remove("invalid");
      this.recipeNameInput.classList.add("valid");
      this.dispatchEvent(
        new CustomEvent("update-recipe-name", {
          bubbles: true,
          composed: true,
          detail: { name: this.recipeNameInput.value },
        }),
      );
    });
    this.addIngredientButton.addEventListener("click", () => {
      const ingredient = this.makeIngredientObject(
        this.ingredientNameInput.value,
        this.ingredientUnitSelect.value,
        this.ingredientQuantityInput.value,
      );
      this.dispatchEvent(
        new CustomEvent("add-ingredient", {
          bubbles: true,
          composed: true,
          detail: ingredient,
        }),
      );
      this.ingredientNameInput.value = "";
      this.ingredientUnitSelect.value = "";
      this.ingredientQuantityInput.value = "0";
    });
    this.addInstructionButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("add-instruction", {
          bubbles: true,
          composed: true,
          detail: { instruction: this.instructionInput.value },
        }),
      );
      this.instructionInput.value = "";
    });
  }
  makeIngredientObject = (name, unit, quantity) => {
    return { name, unit, quantity };
  };
}
customElements.define("create-form", CreateFormUI);

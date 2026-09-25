const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: block;
  width: 75vw;
}
*,*::before,*::after{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}

 .recipe-item{
 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;
 align-items: center;
 list-style: none;
 padding: var(--space-md);
 background-color: var(--primary);
 color: white;
 gap: var(--space-lg);
}
 .recipe-item-actions{
  display: flex;
  gap: var(--space-md);
}
 

</style>
<ul id="recipeListContainer">
  <li>
    <div class="recipe-item">
      <p>Recipe 1</p>
      <section>
        <button id="delete">Delete</button>
        <a href="/view/">view</a>
        <a href="/edit/">Edit</a>
      </section>
    </div>
  </li>
</ul>
`;

class RecipeList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.listContainer = this.shadowRoot.getElementById("recipeListContainer");
  }
  connectedCallback() {
    console.log("RecipeList connected");
  }

  get recipes() {
    return this.getAttribute("recipes");
  }
  set recipes(value) {
    this.setAttribute("recipes", value);
  }

  static get observedAttributes() {
    return ["recipes"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "recipes") {
      this.render();
    }
  }

  render() {
    const recipes = JSON.parse(this.recipes || "[]");
    this.listContainer.innerHTML = recipes
      .map(
        (recipe) => `
      <li>
        <div class="recipe-item">
          <p>${recipe.name}</p>
          <section class="recipe-item-actions">
            <app-button recipe-id="${recipe.id}" type="delete"><delete-icon></delete-icon></app-button>
            <app-button recipe-id="${recipe.id}" type="view"><view-icon></view-icon></app-button>
            <app-button recipe-id="${recipe.id}" type="edit"><edit-icon></edit-icon></app-button>
          </section>
        </div>
      </li>
    `,
      )
      .join("");
  }
}

customElements.define("recipe-list", RecipeList);

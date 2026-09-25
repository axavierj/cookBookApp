const template = document.createElement("template");
template.innerHTML = `
<style>
*,*::before,*::after{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 75%;
  margin: 0 auto;
}
li{
  width: 100%;
}
 .recipe-item{
 display: flex;
 justify-content: space-between;
 align-items: center;
 list-style: none;
 padding: var(--space-md);
 background-color: var(--primary);
 color: white;
 width: 100%;
 gap: var(--space-lg);
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
          <section>
            <button id="delete">Delete</button>
            <a href="/view/${recipe.id}">view</a>
            <a href="/edit/${recipe.id}">Edit</a>
          </section>
        </div>
      </li>
    `,
      )
      .join("");
  }
}

customElements.define("recipe-list", RecipeList);

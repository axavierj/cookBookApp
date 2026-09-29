const template = document.createElement("template");
template.innerHTML = `
<style>
button{
  padding: var(--space-sm) var(--space-md);
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.delete-button {
  background-color: var(--danger);
}

.edit-button {
  background-color: var(--warning);
}

.view-button {
  background-color: var(--info);
}

.close-button {
  background-color: transparent;
  border: none;
  color: var(--primary);
}
.btn {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
</style>
<button><slot></slot></button>
`;

class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector("button");
  }

  delete(id, type) {
    this.dispatchEvent(
      new CustomEvent("delete", {
        bubbles: true,
        composed: true,
        detail: { id, type },
      }),
    );
  }
  edit(id, type) {
    this.dispatchEvent(
      new CustomEvent("edit", {
        bubbles: true,
        composed: true,
        detail: { id, type },
      }),
    );
  }
  view(id) {
    this.dispatchEvent(
      new CustomEvent("view", {
        bubbles: true,
        composed: true,
        detail: { id },
      }),
    );
  }
  close() {
    this.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  get type() {
    return this.getAttribute("type");
  }
  set type(value) {
    this.setAttribute("type", value);
  }

  get recipeId() {
    return this.getAttribute("recipe-id");
  }
  set recipeId(value) {
    this.setAttribute("recipe-id", value);
  }

  get listType() {
    return this.getAttribute("list-type");
  }
  set listType(value) {
    this.setAttribute("list-type", value);
  }

  static get observedAttributes() {
    return ["type", "recipe-id", "list-type"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    this.button.classList.remove(
      "delete-button",
      "edit-button",
      "view-button",
      "close-button",
    );
    if (this.type === "delete") {
      this.button.classList.add("delete-button");
      this.button.addEventListener("click", () =>
        this.delete(this.recipeId, this.listType),
      );
    } else if (this.type === "edit") {
      this.button.classList.add("edit-button");
      this.button.addEventListener("click", () =>
        this.edit(this.recipeId, this.listType),
      );
    } else if (this.type === "view") {
      this.button.classList.add("view-button");
      this.button.addEventListener("click", () => this.view(this.recipeId));
    } else if (this.type === "close") {
      this.button.classList.add("close-button");
      this.button.addEventListener("click", () => this.close());
    } else if (this.type === "default") {
      this.button.classList.add("btn");
    }
  }
}

customElements.define("app-button", CustomButton);

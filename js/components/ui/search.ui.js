const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: block;
  width: 75vw;
  text-align: center;
}
input {
   border: 1px solid #ccc;
  padding: var(--space-sm);
  border-radius: var(--space-xs);
}
</style>
<input type="text" id="searchInput" placeholder="Search recipes...">
`;

class SearchComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.searchInput = this.shadowRoot.getElementById("searchInput");
  }
  connectedCallback() {
    this.searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      this.dispatchEvent(
        new CustomEvent("search", {
          bubbles: true,
          composed: true,
          detail: { query },
        }),
      );
    });
  }
}

customElements.define("app-search", SearchComponent);

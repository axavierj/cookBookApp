const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: block;
  width: 75vw;
  text-align: center;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
}
  #paginationContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<div id="paginationContainer">
  <button id="prevPage">Previous</button>
  <div id="pageContainer"></div>
  <button id="nextPage">Next</button>
</div>
`;

class PaginationComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.pageContainer = this.shadowRoot.getElementById("pageContainer");
    this.prevPageButton = this.shadowRoot.getElementById("prevPage");
    this.nextPageButton = this.shadowRoot.getElementById("nextPage");
  }
  connectedCallback() {
    this.sendPageData(
      this.currentPage || 1,
      parseInt(this.recipesPerPage || "5", 10),
    );
  }

  sendPageData(currentPage, itemsPerPage) {
    this.dispatchEvent(
      new CustomEvent("pagechange", {
        bubbles: true,
        composed: true,
        detail: { currentPage, itemsPerPage },
      }),
    );
  }
  get numberOfPages() {
    return this.getAttribute("numberofpages");
  }
  set numberOfPages(value) {
    this.setAttribute("numberofpages", value);
  }
  get recipesPerPage() {
    return this.getAttribute("recipesperpage");
  }
  set recipesPerPage(value) {
    this.setAttribute("recipesperpage", value);
  }
  get currentPage() {
    return this.getAttribute("currentpage");
  }
  set currentPage(value) {
    this.setAttribute("currentpage", value);
  }

  static get observedAttributes() {
    return ["numberofpages", "recipesperpage", "currentpage"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  render() {
    const numberOfPages = parseInt(this.numberOfPages || "1", 10);
    this.pageContainer.innerHTML = "";
    for (let i = 1; i <= numberOfPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        this.sendPageData(i, parseInt(this.recipesPerPage || "5", 10));
      });
      this.pageContainer.appendChild(pageButton);
    }
  }
}

customElements.define("app-pagination", PaginationComponent);

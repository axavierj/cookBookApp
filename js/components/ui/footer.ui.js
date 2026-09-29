const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: block;
  width: 100%;
}
  footer {
  background-color: var(--secondary);
  color: white;
  text-align: center;
  padding: var(--space-md);
  margin-top: var(--space-md);
  }
</style>
<footer>
  <p>&copy; <span id="year"></span> Cookbook. All rights reserved.</p>
</footer>
`;

class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById("year").textContent =
      new Date().getFullYear();
  }
}

customElements.define("app-footer", FooterComponent);

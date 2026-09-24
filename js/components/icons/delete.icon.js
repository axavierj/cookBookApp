const template = document.createElement("template");
template.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     width="24"
     height="24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round"
     aria-hidden="true">
  <path d="M4 7h16"/>
  <path d="M10 11v6"/>
  <path d="M14 11v6"/>
  <path d="M5 7l1 14h12l1-14"/>
  <path d="M9 7V4h6v3"/>
</svg>
`;

class DeleteIcon extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("delete-icon", DeleteIcon);

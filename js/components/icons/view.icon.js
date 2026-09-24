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
  <circle cx="12" cy="12" r="3"/>
  <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/>
</svg>
`;

class ViewIcon extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("view-icon", ViewIcon);

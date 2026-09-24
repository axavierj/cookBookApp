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
  <path d="M3 9l9-7 9 7"/>
  <path d="M9 22V12h6v10"/>
</svg>
`;

class HomeIcon extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("home-icon", HomeIcon);

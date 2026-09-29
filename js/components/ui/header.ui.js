const template = document.createElement("template");
template.innerHTML = `
<style>
h5 {
  font-size: 1em;
}
    
  .header {
    background-color: var(--secondary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: white;
    margin-bottom: 1rem;
  }
  .nav {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
  .links {
    text-decoration: none;
    color: inherit;
  }
</style>
<header class="[ header ]">
  <div><h5>Cookbook</h5></div>
  <nav>
    <ul class="[ nav ]" id="nav-links">
      <li >
        <a class="[ links ]" href="/"><home-icon></home-icon></a>
      </li>
      <li >
        <a class="[ links ]" href="/create/"><create-icon></create-icon></a>
      </li>
    </ul>
  </nav>
</header>
`;

class HeaderUI extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("app-header", HeaderUI);

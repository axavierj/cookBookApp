const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: block;
  width: 100%;
}
  dialog {
  background-color: var(--secondary);
  color: white;
  text-align: center;
  padding: var(--space-md);
  border: none;
  border-radius: var(--space-sm);
  max-width: 85vw;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
.bounceIn {
  animation: bounceIn 0.5s;
  -webkit-animation: bounceIn 0.5s;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.1);
    opacity: 1;
  }
  80% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

</style>
<dialog id="alertDialog">
  <div class="[ title ]">
    <h5>Alert</h5>
    <app-button type="close">Close</app-button>
  </div>
  <p id="alertMessage"></p>
</dialog>
`;

class AlertComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.alertDialog = this.shadowRoot.getElementById("alertDialog");
    this.alertMessage = this.shadowRoot.getElementById("alertMessage");
  }
  connectedCallback() {
    this.addEventListener("close", () => {
      this.open = "false";
      this.alertDialog.close();
    });
  }
  get open() {
    return this.getAttribute("open");
  }
  set open(value) {
    this.setAttribute("open", value);
  }
  get message() {
    return this.getAttribute("message");
  }
  set message(value) {
    this.setAttribute("message", value);
  }

  static get observedAttributes() {
    return ["open", "message"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      if (this.open) {
        this.alertDialog.showModal();
        this.alertDialog.classList.add("bounceIn");
      } else {
        this.alertDialog.classList.remove("bounceIn");
        this.alertDialog.close();
      }
    }
    if (name === "message") {
      this.alertMessage.textContent = this.message;
    }
  }
}

customElements.define("app-alert", AlertComponent);

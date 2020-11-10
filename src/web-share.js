export class ShareElement extends HTMLElement {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.button = document.createElement("button");
  }

  connectedCallback() {
    this.appendChild(this.button);
    this.button.innerText = this.getAttribute('text');
    if (navigator.share) {
      this.button.addEventListener("click", this.onClick);
    } else {
      this.button.setAttribute('disable')
    }
  }

  disconnectedCallback() {
    if (navigator.share) {
      this.button.removeEventListener("click", this.onClick);

      this.removeChild(this.button);
    }
  }

  onClick() {
    let url = document.location.href;
    let title = this.getAttribute("title");
    const canonicalElement = document.querySelector("link[rel=canonical]");
    const descriptionElement = document.head.querySelector(
      "meta[name=description]"
    );
    let text = this.getAttribute("description");

    if (canonicalElement) {
      url = canonicalElement.href;
    }
    if (document.title.count) {
      title = canonicalElement.href;
    }
    if (descriptionElement && descriptionElement.content.count) {
      text = descriptionElement.content;
    }

    navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  }
}

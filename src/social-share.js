import { params } from "./constants.js";

export class SocialShare extends HTMLElement {
  constructor() {
    super();

    this.renderLink = this.renderLink.bind(this);
    this.render = this.render.bind(this);
    this.detailsClick = this.detailsClick.bind(this);
    this.detailsCloseClick = this.detailsCloseClick.bind(this);


    this.url = window.location.href;
    this.pageTitle = this.getAttribute("title");
    this.description = this.getAttribute("description");
    this.image = this.getAttribute("image");
    const canonicalElement = document.querySelector('link[rel="canonical"]');
    const descriptionElement = document.head.querySelector(
      'meta[name="description"]'
    );
    const ogImageElement = document.head.querySelector(
      'meta[property="og:image"]'
    );

    if (canonicalElement) {
      this.url = canonicalElement.href;
    }
    if (!this.pageTitle) {
      this.pageTitle = document.title;
    }
    if (!this.description && descriptionElement && descriptionElement.content) {
      this.description = descriptionElement.content;
    }
    if (!this.image && ogImageElement && ogImageElement.content) {
      this.image = ogImageElement.content;
    }

    this.buttons = [];
    this.details = document.createElement("details");
    this.summary = document.createElement("summary");
    this.ul = document.createElement("ul");
  }

  /* Attributes to monitor */
  static get observedAttributes() {
    return ["text", "enabled"];
  }

  get text() {
    return this.getAttribute("text");
  }
  set text(value) {
    return this.setAttribute("text", value);
  }
  get enabled() {
    return this.getAttribute("enabled");
  }
  set enabled(value) {
    return this.setAttribute("enabled", value);
  }

  connectedCallback() {
    if (this.enabled) {
      this.buttons = this.enabled.split(",");
    }

    this.appendChild(this.details);
    this.summary.innerText = this.text;
    this.details.appendChild(this.summary);
    this.details.appendChild(this.ul);

    this.render();

    this.details.addEventListener("toggle", this.detailsClick);
  }

  disconnectedCallback() {
    this.cleanup();
    this.innerHTML = "";
  }

  cleanup() {
    if (this.details.open) {
      document.removeEventListener('click', this.detailsCloseClick)
    }

    this.ul.children.forEach((element) => {
      element.removeEventListener("click", this.onclick);
      this.ul.removeChild(element);
    });
  }

  render() {
    this.buttons.map((btn) => {
      const link = this.renderLink(btn);
      if (link) {
        const li = document.createElement("li");
        li.appendChild(link);
        this.ul.appendChild(li);
        link.addEventListener("click", this.onclick);
      }
    });
  }

  onclick(e) {
    const parent = e.target.closest("details");

    if (parent) {
      parent.removeAttribute("open");
    }
  }

  renderLink(provider) {
    const name = provider.toLowerCase();
    if (!params[name]) {
      return false;
    }
    // URL
    if ("u" in params[name].url.params) {
      params[name].url.params.u = this.url;
    }
    if ("url" in params[name].url.params) {
      params[name].url.params.url = this.url;
    }
    if ("source" in params[name].url.params) {
      params[name].url.params.source = this.url;
    }
    // Title
    if ("title" in params[name].url.params) {
      params[name].url.params.title = this.pageTitle;
    }
    if ("text" in params[name].url.params) {
      params[name].url.params.text = this.pageTitle;
    }
    // Description
    if ("description" in params[name].url.params) {
      params[name].url.params.description = this.description;
    }
    if ("summary" in params[name].url.params) {
      params[name].url.params.summary = this.description;
    }
    // Image
    if ("image" in params[name].url.params) {
      params[name].url.params.image = this.image;
    }
    if ("media" in params[name].url.params) {
      params[name].url.params.media = this.image;
    }

    const text = this.getAttribute(`${name}-text`);
    if (text) {
      params[name].text = text;
    }

    // Via @ twitter handler
    if (!this.getAttribute(`twitter-handler`)) {
      delete params.twitter.url.params.via;
    }

    const link = document.createElement("a");
    const searchParams = new URLSearchParams(params[name].url.params);
    link.href = `${params[name].url.base}${
      searchParams ? `?${searchParams}` : ""
    }`;
    link.innerText = params[name].text;
    link.target = "_blank";
    link.rel = "noopener";

    return link;
  }

  detailsClick(event) {
    if (this.details.open) {
      document.addEventListener('click', this.detailsCloseClick)
    } else {
      document.removeEventListener('click', this.detailsCloseClick)
    }
  }

  detailsCloseClick(event) {
    if (!event.target.closest(this.tagName)) {
      this.details.removeAttribute('open');
    }
  }
}

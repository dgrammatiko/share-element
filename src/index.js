import { ShareElement } from "./web-share.js";
import { SocialShare } from "./social-share.js";

if (!customElements.get("share-button")) {
  customElements.define("share-button", ShareElement);
}

if (!customElements.get("social-share")) {
  customElements.define("social-share", SocialShare);
}

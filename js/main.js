// Each renderer owns one page fragment; this module determines their final order.
import { renderContacts } from "./components/contacts.js";
import { renderFooter } from "./components/footer.js";
import { renderGallery } from "./components/gallery.js";
import { renderGiving } from "./components/giving.js";
import { renderHero } from "./components/hero.js";
import { renderMission } from "./components/mission.js";
import { renderSermons } from "./components/sermons.js";
import { renderServices } from "./components/services.js";
import { initializeCopyButtons } from "./features/copy-to-clipboard.js";
import { initializeLanguageSwitcher } from "./i18n/language-switcher.js";

// These HTML-tagged template literals make the page order easy to review and edit.
// Move a renderer here to reorder a whole section without coupling the components.
const page = /* html */ `
  ${renderHero()}
  ${renderServices()}
  ${renderMission()}
  ${renderGallery()}
  ${renderSermons()}
  ${renderGiving()}
  ${renderContacts()}
  ${renderFooter()}`;

// Render once before initializing behaviors that query buttons and text in the page.
// The component templates contain trusted, project-authored markup.
document.querySelector("#app").innerHTML = page;
initializeLanguageSwitcher();
initializeCopyButtons();

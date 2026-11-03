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

const page = /* html */ `
  ${renderHero()}
  ${renderServices()}
  ${renderMission()}
  ${renderGallery()}
  ${renderSermons()}
  ${renderGiving()}
  ${renderContacts()}
  ${renderFooter()}`;

document.querySelector("#app").innerHTML = page;
initializeLanguageSwitcher();
initializeCopyButtons();

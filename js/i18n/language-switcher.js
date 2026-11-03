import { englishAltText, englishTranslations } from "./translations.js";

const storageKey = "epg-lang";

export function initializeLanguageSwitcher() {
  const languageButtons = document.querySelectorAll(".lang button");
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  let node = walker.nextNode();
  while (node) {
    if (node.parentElement?.tagName !== "SCRIPT" && node.nodeValue?.trim()) {
      textNodes.push({ node, french: node.nodeValue });
    }
    node = walker.nextNode();
  }

  const images = Array.from(document.querySelectorAll("img[alt]"), (image) => ({
    image,
    french: image.getAttribute("alt") ?? ""
  }));
  let currentLanguage = "fr";

  function setLanguage(language) {
    currentLanguage = language;

    textNodes.forEach(({ node: textNode, french }) => {
      const match = french.match(/^(\s*)([\s\S]*?)(\s*)$/);
      if (!match) return;

      const translation = language === "en" ? englishTranslations[match[2]] : undefined;
      textNode.nodeValue = translation ? `${match[1]}${translation}${match[3]}` : french;
    });

    images.forEach(({ image, french }) => {
      image.setAttribute("alt", language === "en" ? englishAltText[french] ?? french : french);
    });

    document.documentElement.lang = language;
    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.l === language));
    });

    try {
      localStorage.setItem(storageKey, language);
    } catch (error) {
      console.warn("La préférence de langue ne peut pas être enregistrée.", error);
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.l === "en" ? "en" : "fr"));
  });

  let savedLanguage = "fr";
  try {
    savedLanguage = localStorage.getItem(storageKey) ?? "fr";
  } catch (error) {
    console.warn("La préférence de langue enregistrée ne peut pas être lue.", error);
  }

  setLanguage(savedLanguage === "en" ? "en" : "fr");
}

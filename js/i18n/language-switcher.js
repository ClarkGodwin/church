import {
  englishAltText,
  englishTranslations,
  kirundiAltText,
  kirundiTranslations,
  languageMetadata
} from "./translations.js";

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
  function setLanguage(language) {
    const translations = language === "kr"
      ? kirundiTranslations
      : language === "en"
        ? englishTranslations
        : undefined;

    textNodes.forEach(({ node: textNode, french }) => {
      const match = french.match(/^(\s*)([\s\S]*?)(\s*)$/);
      if (!match) return;

      const translation = translations?.[match[2]];
      textNode.nodeValue = translation ? `${match[1]}${translation}${match[3]}` : french;
    });

    images.forEach(({ image, french }) => {
      const altText = language === "kr"
        ? kirundiAltText[french]
        : language === "en"
          ? englishAltText[french]
          : undefined;
      image.setAttribute("alt", altText ?? french);
    });

    const metadata = languageMetadata[language];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector(".lang")?.setAttribute("aria-label", metadata.label);
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
    button.addEventListener("click", () => {
      const language = button.dataset.l;
      setLanguage(language === "en" || language === "kr" ? language : "fr");
    });
  });

  let savedLanguage = "kr";
  try {
    savedLanguage = localStorage.getItem(storageKey) ?? "kr";
  } catch (error) {
    console.warn("La préférence de langue enregistrée ne peut pas être lue.", error);
  }

  setLanguage(savedLanguage === "en" || savedLanguage === "fr" ? savedLanguage : "kr");
}

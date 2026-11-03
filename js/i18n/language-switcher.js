import {
  englishAltText,
  englishTranslations,
  kirundiAltText,
  kirundiTranslations,
  languageMetadata
} from "./translations.js";

const storageKey = "epg-lang";

/**
 * Wire the language buttons and translate the already-rendered page.
 *
 * French strings in the components are canonical source text. The initial text and
 * image alt values are captured once, so every switch starts from French rather than
 * trying to translate the currently displayed language.
 */
export function initializeLanguageSwitcher() {
  const languageButtons = document.querySelectorAll(".lang button");
  const textNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  // Capture the original French nodes once so changing languages never translates a translation.
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

  // All dictionaries use French source strings as keys; unknown strings remain in French.
  function setLanguage(language) {
    const translations = language === "kr"
      ? kirundiTranslations
      : language === "en"
        ? englishTranslations
        : undefined;

    textNodes.forEach(({ node: textNode, french }) => {
      const match = french.match(/^(\s*)([\s\S]*?)(\s*)$/);
      if (!match) return;

      // Whitespace around a text node belongs to the surrounding template formatting.
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

    // Keep browser metadata and assistive-technology labels in sync with visible content.
    const metadata = languageMetadata[language];
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector(".lang")?.setAttribute("aria-label", metadata.label);
    document.querySelector(".hero-actions")?.setAttribute("aria-label", metadata.navigationLabel);
    document.documentElement.lang = language;
    languageButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.l === language));
    });

    try {
      localStorage.setItem(storageKey, language);
    } catch (error) {
      // Language switching still works for this page view if storage is disabled.
      console.warn("La préférence de langue ne peut pas être enregistrée.", error);
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.l;
      setLanguage(language === "en" || language === "kr" ? language : "fr");
    });
  });

  // Kirundi is the first-visit default; a previously saved valid selection takes precedence.
  let savedLanguage = "kr";
  try {
    savedLanguage = localStorage.getItem(storageKey) ?? "kr";
  } catch (error) {
    // Keep Kirundi as the first-visit default if browser storage cannot be read.
    console.warn("La préférence de langue enregistrée ne peut pas être lue.", error);
  }

  setLanguage(savedLanguage === "en" || savedLanguage === "fr" ? savedLanguage : "kr");
}

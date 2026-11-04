/**
 * Build the footer language controls and church attribution.
 * Each data-l code must be supported by language-switcher.js and translations.js.
 * @returns {string} HTML markup for the controls and footer.
 */
export function renderFooter() {
  const markup = /* html */ `
    <div class="lang" role="group" aria-label="Langue / Language">
      <button type="button" data-l="kr" aria-pressed="false">Kirundi</button>
      <button type="button" data-l="fr" aria-pressed="true">Francais</button>
      <button type="button" data-l="en" aria-pressed="false">Anglais</button>
    </div>
    <footer>
      <b>NOM DE L'ÉGLISE</b>
      ADRESSE COMPLÈTE, RUE ...<br>
      Photos : PM Studio 001
    </footer>`;

  return markup;
}

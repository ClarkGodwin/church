export function renderFooter() {
  const markup = /* html */ `
    <div class="footer-controls">
      <div class="lang" role="group" aria-label="Langue / Language">
        <button type="button" data-l="kr" aria-pressed="false">KR</button>
        <button type="button" data-l="fr" aria-pressed="true">FR</button>
        <button type="button" data-l="en" aria-pressed="false">EN</button>
      </div>
    </div>
    <footer>
      <b>NOM DE L'ÉGLISE</b>
      ADRESSE COMPLÈTE, RUE ...<br>
      Photos : PM Studio 001
    </footer>`;

  return markup;
}

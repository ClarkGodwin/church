/**
 * Build the church mission callout.
 * The section is separate so main.js can move it without editing other components.
 * @returns {string} HTML markup for the mission section.
 */
export function renderMission() {
  const markup = /* html */ `
    <section class="mission">
      <div>
        <h2>Jésus vous appelle</h2>
        <p>Quelle que soit votre histoire, Jésus vous accueille. Il vous aime, il pardonne et il donne une vie nouvelle.</p>
        <p><b>Notre mission :</b> annoncer l'Évangile, former les enfants et les jeunes dans la foi, prendre soin des familles et soutenir ceux qui sont dans le besoin.</p>
      </div>
    </section>`;

  return markup;
}

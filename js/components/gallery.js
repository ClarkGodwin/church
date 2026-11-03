/**
 * Build the photo gallery.
 * When adding an image, provide both a visible caption and a descriptive alt attribute;
 * add that exact French alt text to both image-alt translation dictionaries.
 * @returns {string} HTML markup for the gallery section.
 */
export function renderGallery() {
  const markup = /* html */ `
    <section id="vie">
      <h2>La vie de l'église</h2>
      <p class="lead">Voici l'ambiance de nos cultes.</p>
      <div class="photos">
        <figure>
          <img src="./images/worship_1.jpeg" alt="L'assemblée réunie pour le culte, la chorale sur l'estrade">
          <figcaption>Toute la famille réunie pour le culte.</figcaption>
        </figure>
        <figure>
          <img src="./images/worship_2.jpeg" alt="Choristes souriants chantant ensemble">
          <figcaption>La chorale des jeunes chante avec joie.</figcaption>
        </figure>
      </div>
    </section>`;

  return markup;
}

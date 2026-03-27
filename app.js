(function () {
  const data = window.PORTFOLIO_DATA || {};
  const settings = data.settings || {};
  const app = document.getElementById("app");

  document.title = settings.siteTitle || "Portfolio";

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderMedia(media, altFallback) {
    if (!media || !media.url) {
      return '<div class="media-large"><div class="media-thumb">Media not available</div></div>';
    }

    const title = esc(media.title || altFallback || "Portfolio media");
    const caption = media.caption
      ? `<div class="media-overlay"><div class="media-caption">${esc(media.caption)}</div></div>`
      : "";

    if (media.type === "image") {
      return `
        <div class="media-large">
          <img src="${esc(media.url)}" alt="${title}" loading="lazy" />
          ${caption}
        </div>
      `;
    }

    if (media.type === "youtube") {
      return `
        <div class="media-large">
          <iframe
            src="${esc(media.url)}"
            title="${title}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>
      `;
    }

    if (media.type === "video") {
      return `
        <div class="media-large">
          <video controls playsinline preload="metadata">
            <source src="${esc(media.url)}" />
          </video>
          ${caption}
        </div>
      `;
    }

    return '<div class="media-large"><div class="media-thumb">Unsupported media</div></div>';
  }

  function renderThumbs(items, altFallback) {
    if (!items || !items.length) return "";

    return `
      <div class="thumb-grid">
        ${items.slice(0, 3).map((media) => {
          if (media.type === "image") {
            return `<div class="media-thumb"><img src="${esc(media.url)}" alt="${esc(media.title || altFallback || "Gallery image")}" loading="lazy" /></div>`;
          }
          const label = media.title || media.type || "Media";
          return `<div class="media-thumb"><span>${esc(label)}</span></div>`;
        }).join("")}
      </div>
    `;
  }


  function renderExperience() {
    if (!data.experience?.length) return "";
    return `
      <section id="experience">
        <div class="section-head">
          <div><h2>Experience</h2></div>
        </div>
        <div class="timeline">
          ${data.experience.map((item) => {
            const media = item.media || [];
            const primary = media.find((m) => m.isPrimary) || media[0] || null;
            const gallery = media.filter((m) => primary ? m.url !== primary.url : true);
            return `
              <article class="card timeline-item">
                <div class="timeline-content">
                  <div class="timeline-top">
                    <div class="time">${esc(item.start)} — ${esc(item.end)}</div>
                    <div>
                      <div class="role">${esc(item.role)}</div>
                      <div class="company">${esc(item.company)}${item.location ? ` · ${esc(item.location)}` : ""}</div>
                      <p>${esc(item.summary)}</p>
                      ${item.bullets?.length ? `
                        <ul class="bullet-list">
                          ${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}
                        </ul>
                      ` : ""}
                      ${item.tags?.length ? `
                        <div class="chip-list top-gap">
                          ${item.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join("")}
                        </div>
                      ` : ""}
                    </div>
                  </div>
                </div>
                <div class="media-stack">
                  ${renderMedia(primary, item.role)}
                  ${renderThumbs(gallery, item.role)}
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderHighlights() {
    if (!data.highlights?.length) return "";
    return `
      <section id="highlights">
        <div class="section-head">
          <div><h2>Highlights</h2></div>
        </div>
        <div class="feature-list">
          ${data.highlights.map((item) => {
            const media = item.media || [];
            const primary = media.find((m) => m.isPrimary) || media[0] || null;
            return `
              <article class="card project-highlight">
                <div>
                  <div class="eyebrow">Highlight</div>
                  <h3>${esc(item.title)}</h3>
                  ${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ""}
                  ${item.description ? `<p>${esc(item.description)}</p>` : ""}
                  ${item.tags?.length ? `
                    <div class="chip-list">
                      ${item.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join("")}
                    </div>
                  ` : ""}
                </div>
                ${primary ? renderMedia(primary, item.title) : ""}
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderSkills() {
    if (!data.skillGroups?.length) return "";
    return `
      <section id="skills">
        <div class="section-head">
          <div><h2>Skills</h2></div>
        </div>
        <div class="grid-2">
          ${data.skillGroups.map((group) => `
            <article class="card skill-card">
              <h3>${esc(group.name)}</h3>
              <div class="chip-list">
                ${group.items.map((item) => `<span class="chip">${esc(item)}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }


  app.innerHTML = `
    <nav class="nav">
      <div class="wrap nav-inner">
        <div class="brand">
          <div class="brand-badge">SR</div>
          <div>${esc(settings.siteTitle || "Portfolio")}</div>
        </div>
        <div class="nav-links">
          <a href="#experience">Experience</a>
          <a href="#highlights">Highlights</a>
          <a href="#skills">Skills</a>
        </div>
      </div>
    </nav>

    <header class="hero wrap" id="top">
      <div class="hero-grid">
        <div class="card hero-main">
          <div>
            <div class="eyebrow">${esc(settings.heroEyebrow || "")}</div>
            <h1>${esc(settings.heroTitle || settings.siteTitle || "Portfolio")}</h1>
            <p>${esc(settings.heroSubtitle || "")}</p>
            <div class="btn-row">
              ${settings.email ? `<a class="btn primary" href="mailto:${esc(settings.email)}">Email me</a>` : ""}
              ${settings.linkedinUrl ? `<a class="btn secondary" href="${esc(settings.linkedinUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ""}
              ${settings.githubUrl ? `<a class="btn secondary" href="${esc(settings.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
              ${settings.cvUrl ? `<a class="btn secondary" href="${esc(settings.cvUrl)}" target="_blank" rel="noopener noreferrer">View CV</a>` : ""}
            </div>
            <div class="hero-utility-list">
              ${settings.location ? `<div class="utility-row"><div class="utility-label">Location</div><div>${esc(settings.location)}</div></div>` : ""}
              ${settings.availability ? `<div class="utility-row"><div class="utility-label">Availability</div><div>${esc(settings.availability)}</div></div>` : ""}
            </div>
          </div>
        </div>

        <aside class="hero-profile">
          <article class="card portrait-card">
            <div class="portrait-frame">
              <img src="${esc(settings.portraitImageUrl || './assets/images/portrait-placeholder.svg')}" alt="Portrait" loading="eager" />
            </div>
            <div class="portrait-caption">
              ${settings.location ? `<strong>${esc(settings.location)}</strong><br />` : ""}
              ${esc(settings.availability || "")}
            </div>
          </article>
        </aside>
      </div>
    </header>

    <main class="wrap">
      ${renderExperience()}
      ${renderHighlights()}
      ${renderSkills()}
    </main>
  `;
})();

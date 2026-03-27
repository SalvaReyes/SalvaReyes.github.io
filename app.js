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

  function icon(name) {
    const icons = {
      copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9Zm-6 6V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.7 3.3 10.8 14.2M21.7 3.3 14.8 20.7a.7.7 0 0 1-1.3 0l-3.4-8.3-8.3-3.4a.7.7 0 0 1 0-1.3L20.7 2.3a.7.7 0 0 1 1 .9Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14 8.5 15.5a3.5 3.5 0 0 1-5-5L7 7a3.5 3.5 0 0 1 5 0M14 10l1.5-1.5a3.5 3.5 0 0 1 5 5L17 17a3.5 3.5 0 0 1-5 0M9 15l6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
    return icons[name] || '';
  }

  function renderHeroActionRow(label, buttons) {
    if (!buttons || !buttons.length) return '';
    return `
      <div class="action-row">
        <div class="action-label">${esc(label)}</div>
        <div class="action-buttons">
          ${buttons.join('')}
        </div>
      </div>
    `;
  }

  function actionButton({ href = '', iconName = 'link', title = '', extra = '', targetBlank = false, dataAction = '' }) {
    const target = targetBlank ? ' target="_blank" rel="noopener noreferrer"' : '';
    const actionAttr = dataAction ? ` data-action="${esc(dataAction)}"` : '';
    return `
      <a class="icon-btn" href="${esc(href)}" title="${esc(title)}" aria-label="${esc(title)}"${target}${actionAttr} ${extra}>
        ${icon(iconName)}
      </a>
    `;
  }

  function renderHeroActions() {
    const rows = [];

    if (settings.email) {
      rows.push(renderHeroActionRow('Email', [
        actionButton({ href: '#', iconName: 'copy', title: 'Copy email', dataAction: 'copy-email' }),
        actionButton({ href: `mailto:${settings.email}`, iconName: 'send', title: 'Send email' })
      ]));
    }

    if (settings.linkedinUrl) {
      rows.push(renderHeroActionRow('LinkedIn', [
        actionButton({ href: settings.linkedinUrl, iconName: 'send', title: 'Open LinkedIn', targetBlank: true })
      ]));
    }

    if (settings.cvUrl) {
      rows.push(renderHeroActionRow('Resume', [
        actionButton({ href: settings.cvUrl, iconName: 'eye', title: 'View resume online', targetBlank: true }),
        actionButton({ href: settings.cvUrl, iconName: 'download', title: 'Download resume', extra: 'download' })
      ]));
    }

    if (!rows.length) return '';
    return `<div class="hero-actions">${rows.join('')}</div>`;
  }

  function renderMedia(media, altFallback) {
    if (!media || !media.url) {
      return '<div class="media-large"><div class="media-thumb">Media not available</div></div>';
    }

    const title = esc(media.title || altFallback || 'Portfolio media');
    const caption = media.caption
      ? `<div class="media-overlay"><div class="media-caption">${esc(media.caption)}</div></div>`
      : '';

    if (media.type === 'image') {
      return `
        <div class="media-large">
          <img src="${esc(media.url)}" alt="${title}" loading="lazy" />
          ${caption}
        </div>
      `;
    }

    if (media.type === 'youtube') {
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

    if (media.type === 'video') {
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
    if (!items || !items.length) return '';

    return `
      <div class="thumb-grid">
        ${items.slice(0, 3).map((media) => {
          if (media.type === 'image') {
            return `<div class="media-thumb"><img src="${esc(media.url)}" alt="${esc(media.title || altFallback || 'Gallery image')}" loading="lazy" /></div>`;
          }
          const label = media.title || media.type || 'Media';
          return `<div class="media-thumb"><span>${esc(label)}</span></div>`;
        }).join('')}
      </div>
    `;
  }

  function renderExperience() {
    if (!data.experience?.length) return '';
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
                      <div class="company">${esc(item.company)}${item.location ? ` · ${esc(item.location)}` : ''}</div>
                      <p>${esc(item.summary)}</p>
                      ${item.bullets?.length ? `
                        <ul class="bullet-list">
                          ${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}
                        </ul>
                      ` : ''}
                      ${item.tags?.length ? `
                        <div class="chip-list top-gap">
                          ${item.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join('')}
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>
                <div class="media-stack">
                  ${renderMedia(primary, item.role)}
                  ${renderThumbs(gallery, item.role)}
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  function renderHighlights() {
    if (!data.highlights?.length) return '';
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
                  ${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ''}
                  ${item.description ? `<p>${esc(item.description)}</p>` : ''}
                  ${item.tags?.length ? `
                    <div class="chip-list">
                      ${item.tags.map((tag) => `<span class="chip">${esc(tag)}</span>`).join('')}
                    </div>
                  ` : ''}
                </div>
                ${primary ? renderMedia(primary, item.title) : ''}
              </article>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  function renderSkills() {
    if (!data.skillGroups?.length) return '';
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
                ${group.items.map((item) => `<span class="chip">${esc(item)}</span>`).join('')}
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  app.innerHTML = `
    <nav class="nav">
      <div class="wrap nav-inner">
        <div class="brand">
          <div class="brand-badge">SR</div>
          <div>${esc(settings.siteTitle || 'Portfolio')}</div>
        </div>
        <div class="nav-links">
          <a href="#top">Contact</a>
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
            <div class="eyebrow">${esc(settings.heroEyebrow || '')}</div>
            <h1>${esc(settings.heroTitle || settings.siteTitle || 'Portfolio')}</h1>
            <p>${esc(settings.heroSubtitle || '')}</p>
            ${renderHeroActions()}
          </div>
        </div>

        <aside class="hero-profile">
          <article class="card portrait-card">
            <div class="portrait-frame">
              <img src="${esc(settings.portraitImageUrl || './assets/images/portrait-placeholder.svg')}" alt="Portrait" loading="eager" />
            </div>
            <div class="portrait-caption">
              ${settings.location ? `<strong>${esc(settings.location)}</strong><br />` : ''}
              ${esc(settings.availability || '')}
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

  app.addEventListener('click', async (event) => {
    const link = event.target.closest('[data-action="copy-email"]');
    if (!link || !settings.email) return;
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(settings.email);
      const original = link.innerHTML;
      link.innerHTML = '<span class="icon-btn-feedback">Copied</span>';
      link.classList.add('copied');
      setTimeout(() => {
        link.innerHTML = original;
        link.classList.remove('copied');
      }, 1200);
    } catch (error) {
      window.prompt('Copy this email:', settings.email);
    }
  });
})();

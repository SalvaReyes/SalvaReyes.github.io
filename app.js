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
      const youtubeUrl = (() => {
        try {
          const parsed = new URL(media.url);
          parsed.searchParams.set('mute', '1');
          return parsed.toString();
        } catch (error) {
          const separator = String(media.url).includes('?') ? '&' : '?';
          return `${media.url}${separator}mute=1`;
        }
      })();

      return `
        <div class="media-large">
          <iframe
            src="${esc(youtubeUrl)}"
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
          <video controls playsinline preload="metadata" muted>
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

  function getSafeExternalUrl(url) {
    const value = String(url || '').trim();
    return /^https?:\/\//i.test(value) ? value : '';
  }

  function getSafeSpriteSheetUrl(url) {
    const value = String(url || '').trim();
    return /^(https?:\/\/|\.{0,2}\/|assets\/)/i.test(value) ? value : '';
  }

  function renderSpritePlayer(sprite, extraClass = '') {
    if (!sprite?.sheetUrl) return '';
    const className = String(extraClass || '').trim();
    const classSuffix = className ? ` ${className}` : '';
    const cols = Number(sprite.cols || sprite.columns || sprite.frames || 1) || 1;
    const rows = Number(sprite.rows || 1) || 1;
    const totalFrames = Number(sprite.frameCount || sprite.totalFrames || sprite.frames || cols * rows) || (cols * rows);
    const pingPong = !!sprite.pingPong;
    const scale = Number(sprite.scale ?? 1) || 1;
    const offsetX = Number(sprite.offsetX ?? sprite.offset?.x ?? 0) || 0;
    const offsetY = Number(sprite.offsetY ?? sprite.offset?.y ?? 0) || 0;
    return `
      <div
        class="sprite-player${classSuffix}"
        aria-hidden="true"
        data-sprite-sheet="${esc(getSafeSpriteSheetUrl(sprite.sheetUrl))}"
        data-sprite-cols="${esc(cols)}"
        data-sprite-rows="${esc(rows)}"
        data-sprite-total-frames="${esc(totalFrames)}"
        data-sprite-max-display="${esc(sprite.maxDisplay || 128)}"
        data-sprite-scale="${esc(scale)}"
        data-sprite-offset-x="${esc(offsetX)}"
        data-sprite-offset-y="${esc(offsetY)}"
        data-sprite-pingpong="${pingPong ? 'true' : 'false'}"
        data-sprite-fps="${esc(sprite.fps || 8)}"></div>
    `;
  }

  function renderExternalLinks(links, groupLabel = 'Store Links', showLabel = true) {
    if (!links?.length) return '';

    const validLinks = links
      .map((item) => ({
        label: item?.label || 'Open link',
        url: getSafeExternalUrl(item?.url)
      }))
      .filter((item) => item.url);

    if (!validLinks.length) return '';

    return `
      <div class="meta-group meta-group-links">
        ${showLabel ? `<div class="meta-label">${esc(groupLabel)}</div>` : ''}
        <div class="external-links">
          ${validLinks.map((item) => `
            <a class="external-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.label)}">
              <span class="external-link-icon">${icon('link')}</span>
              <span>${esc(item.label)}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderTagGroup(tags, groupLabel = 'Tech Stack', showLabel = true) {
    if (!tags?.length) return '';
    return `
      <div class="meta-group meta-group-tags">
        ${showLabel ? `<div class="meta-label">${esc(groupLabel)}</div>` : ''}
        <div class="chip-list">
          ${tags.map((tag) => `<span class="chip tag-chip">${esc(tag)}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function renderTimelineMetaRows(item) {
    const hasLinks = !!item?.links?.length;
    const hasTags = !!item?.tags?.length;
    if (!hasLinks && !hasTags) return '';

    const rows = [];

    if (hasLinks) {
      rows.push(`
        <div class="timeline-meta-row">
          <div class="timeline-meta-label-cell"><div class="meta-label">Store Links</div></div>
          <div class="timeline-meta-value-cell">${renderExternalLinks(item.links, 'Store Links', false)}</div>
        </div>
      `);
    }

    if (hasTags) {
      rows.push(`
        <div class="timeline-meta-row">
          <div class="timeline-meta-label-cell"><div class="meta-label">Tech Stack</div></div>
          <div class="timeline-meta-value-cell">${renderTagGroup(item.tags, 'Tech Stack', false)}</div>
        </div>
      `);
    }

    return `<div class="timeline-meta-rows">${rows.join('')}</div>`;
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
                    <div class="timeline-meta">
                      <div class="time">${esc(item.start)} — ${esc(item.end)}</div>
                    </div>
                    <div class="timeline-main">
                      <div class="role">${esc(item.role)}</div>
                      <div class="company">${esc(item.company)}${item.location ? ` · ${esc(item.location)}` : ''}</div>
                      <p>${esc(item.summary)}</p>
                      ${item.bullets?.length ? `
                        <ul class="bullet-list">
                          ${item.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join('')}
                        </ul>
                      ` : ''}
                    </div>
                  </div>
                  ${renderTimelineMetaRows(item)}
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

  function renderAbout() {
    if (!data.about?.length) return '';
    const items = [...data.about]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .slice(0, 3);

    return `
      <section id="about">
        <div class="section-head">
          <div><h2>About</h2></div>
        </div>
        <div class="about-grid">
          ${items.map((item) => `
            <article class="card about-card">
              <h3>${esc(item.title)}</h3>
              <p>${esc(item.description || '')}</p>
              ${item.sprite?.sheetUrl ? `<div class="about-sprite-zone">${renderSpritePlayer(item.sprite, 'about-sprite')}</div>` : ''}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderThanks() {
    if (!data.thanks) return '';
    return `
      <section id="thanks">
        <article class="card thanks-card">
          <div class="thanks-copy">
            <div class="eyebrow">${esc(data.thanks.eyebrow || 'Thanks')}</div>
            <h2>${esc(data.thanks.title || 'Thanks for reading until the end.')}</h2>
            <p>${esc(data.thanks.message || '')}</p>
          </div>
          ${data.thanks.sprite?.sheetUrl ? `
            <div class="thanks-sprite-zone">
              ${renderSpritePlayer(data.thanks.sprite, 'thanks-sprite')}
            </div>
          ` : ''}
        </article>
      </section>
    `;
  }

  function initSpritePlayers() {
    const sprites = app.querySelectorAll('.sprite-player[data-sprite-sheet]');
    if (!sprites.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sprites.forEach((spriteEl) => {
      const sheetUrl = spriteEl.getAttribute('data-sprite-sheet') || '';
      const cols = Math.max(1, Number(spriteEl.getAttribute('data-sprite-cols')) || 1);
      const rows = Math.max(1, Number(spriteEl.getAttribute('data-sprite-rows')) || 1);
      const maxDisplay = Math.max(24, Number(spriteEl.getAttribute('data-sprite-max-display')) || 128);
      const scaleMultiplier = Math.max(0.1, Number(spriteEl.getAttribute('data-sprite-scale')) || 1);
      const offsetX = Number(spriteEl.getAttribute('data-sprite-offset-x')) || 0;
      const offsetY = Number(spriteEl.getAttribute('data-sprite-offset-y')) || 0;
      const fps = Math.max(1, Number(spriteEl.getAttribute('data-sprite-fps')) || 8);
      const requestedFrames = Math.max(1, Number(spriteEl.getAttribute('data-sprite-total-frames')) || (cols * rows));
      const pingPongAttr = (spriteEl.getAttribute('data-sprite-pingpong') || '').toLowerCase();
      const usePingPong = pingPongAttr === 'true' || pingPongAttr === '1';

      if (!sheetUrl) return;

      const image = new Image();
      image.onload = () => {
        const frameWidth = Math.max(1, Math.floor(image.naturalWidth / cols));
        const frameHeight = Math.max(1, Math.floor(image.naturalHeight / rows));
        const maxFrames = cols * rows;
        const totalFrames = Math.max(1, Math.min(requestedFrames, maxFrames));
        const fitScale = Math.min(1, maxDisplay / Math.max(frameWidth, frameHeight));
        const finalScale = fitScale * scaleMultiplier;
        const displayWidth = Math.max(24, Math.round(frameWidth * finalScale));
        const displayHeight = Math.max(24, Math.round(frameHeight * finalScale));

        spriteEl.style.width = `${displayWidth}px`;
        spriteEl.style.height = `${displayHeight}px`;
        spriteEl.style.backgroundImage = `url("${sheetUrl}")`;
        spriteEl.style.backgroundSize = `${displayWidth * cols}px ${displayHeight * rows}px`;
        spriteEl.style.backgroundPosition = '0 0';

        const setFrame = (index) => {
          const normalized = index % totalFrames;
          const col = normalized % cols;
          const row = Math.floor(normalized / cols);
          spriteEl.style.backgroundPosition = `${-col * displayWidth + offsetX}px ${-row * displayHeight + offsetY}px`;
        };

        setFrame(0);
        if (reduceMotion) return;

        let frame = 0;
        let direction = 1;
        let lastTimestamp = 0;
        const frameDuration = 1000 / fps;

        const tick = (timestamp) => {
          if (!spriteEl.isConnected) return;

          if (!lastTimestamp) {
            lastTimestamp = timestamp;
          }

          if (timestamp - lastTimestamp >= frameDuration) {
            if (usePingPong && totalFrames > 1) {
              frame += direction;
              if (frame >= totalFrames - 1 || frame <= 0) {
                direction *= -1;
              }
            } else {
              frame = (frame + 1) % totalFrames;
            }
            setFrame(frame);
            lastTimestamp = timestamp;
          }

          window.requestAnimationFrame(tick);
        };

        window.requestAnimationFrame(tick);
      };
      image.src = sheetUrl;
    });
  }

  function renderHighlights() {
    if (!data.highlights?.length) return '';
    return `
      <section id="highlights">
        <div class="section-head">
          <div><h2>Highlights</h2></div>
        </div>
        <div class="feature-list">
          ${data.highlights.map((item, index) => {
            const media = item.media || [];
            const primary = media.find((m) => m.isPrimary) || media[0] || null;
            return `
              <article class="card project-highlight">
                <div class="highlight-copy">
                  <div class="highlight-kicker">
                    <span class="highlight-number">${String(index + 1).padStart(2, '0')}</span>
                    <span class="eyebrow">Highlight</span>
                  </div>
                  <h3>${esc(item.title)}</h3>
                  ${item.subtitle ? `<p>${esc(item.subtitle)}</p>` : ''}
                  ${item.description ? `<p>${esc(item.description)}</p>` : ''}
                  ${renderExternalLinks(item.links)}
                  ${renderTagGroup(item.tags)}
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
          <a href="#about">About</a>
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
      ${renderAbout()}
      ${renderExperience()}
      ${renderHighlights()}
      ${renderSkills()}
      ${renderThanks()}
    </main>
  `;

  initSpritePlayers();

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

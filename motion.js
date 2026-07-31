(() => {
  const allowed = new Set(['static', 'subtle', 'cinematic']);
  const query = new URLSearchParams(location.search);
  const requestedByUrl = query.get('motion');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const body = document.body;

  function addSource(video, src, media) {
    const source = document.createElement('source');
    if (media) source.media = media;
    source.src = src;
    source.type = 'video/mp4';
    video.append(source);
  }

  function activateVideo(video, onFailure) {
    video.addEventListener('canplay', () => {
      video.dataset.ready = 'true';
      video.play().catch(onFailure);
    }, { once: true });
    video.addEventListener('error', onFailure, { once: true });
    video.load();
  }

  function mountHero(hero) {
    if (!hero || !hero.available) return false;
    const video = document.querySelector('.hero-video');
    if (!video) return false;
    video.poster = innerWidth <= 760 ? hero.mobilePoster : hero.poster;
    addSource(video, hero.mobileSrc, '(max-width: 760px)');
    addSource(video, hero.desktopSrc);
    video.addEventListener('canplay', () => { body.dataset.motionStatus = 'ready'; }, { once: true });
    activateVideo(video, () => {
      video.removeAttribute('data-ready');
      body.dataset.motionStatus = 'fallback';
    });
    return true;
  }

  function mountSections(sections) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const video = entry.target;
      const slot = sections.find(item => item.slot === video.dataset.motionSlot);
      if (slot && slot.available && !video.dataset.mounted) {
        video.dataset.mounted = 'true';
        video.poster = slot.poster;
        addSource(video, slot.src);
        activateVideo(video, () => video.removeAttribute('data-ready'));
      }
      io.unobserve(video);
    }), { rootMargin: '300px' });
    document.querySelectorAll('video[data-motion-slot]').forEach(video => io.observe(video));
  }

  function applySubtleMotion() {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        document.documentElement.style.setProperty('--motion-scroll', Math.min(y, 900));
        ticking = false;
      });
    }, { passive: true });
  }

  fetch('motion-manifest.json').then(r => {
    if (!r.ok) throw new Error('motion manifest unavailable');
    return r.json();
  }).then(manifest => {
    const requested = allowed.has(requestedByUrl) ? requestedByUrl : manifest.defaultMode;
    const effective = reduced || saveData ? 'static' : requested;
    body.dataset.motionRequested = requested;
    body.dataset.motionLevel = effective;
    body.dataset.motionStatus = effective === 'cinematic' ? 'fallback' : 'ready';

    if (effective === 'subtle') applySubtleMotion();
    if (effective === 'cinematic') {
      const ready = mountHero(manifest.modes.cinematic.hero);
      mountSections(manifest.modes.cinematic.sections);
      body.dataset.motionStatus = ready ? 'loading' : 'fallback';
    }

    if (query.get('motionDemo') === '1') {
      const demo = document.querySelector('.motion-demo');
      if (demo) {
        demo.hidden = false;
        demo.querySelectorAll('button').forEach(button => {
          button.toggleAttribute('aria-current', button.dataset.mode === requested);
          button.addEventListener('click', () => {
            const next = new URL(location.href);
            next.searchParams.set('motion', button.dataset.mode);
            next.searchParams.set('motionDemo', '1');
            location.href = next;
          });
        });
      }
    }
    dispatchEvent(new CustomEvent('suiro:motion-ready', { detail: { requested, effective, reduced, saveData } }));
  }).catch(() => {
    body.dataset.motionLevel = 'static';
    body.dataset.motionStatus = 'fallback';
  });
})();

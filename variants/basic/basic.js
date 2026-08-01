(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const videos = [...document.querySelectorAll('video')];

  async function playVideo(video) {
    const button = video.parentElement.querySelector('.motion-play');
    video.muted = true;
    video.defaultMuted = true;
    try {
      await video.play();
      if (button) button.hidden = true;
    } catch (_error) {
      if (button) button.hidden = false;
    }
  }

  videos.forEach((video) => {
    const button = video.parentElement.querySelector('.motion-play');
    if (button) {
      button.addEventListener('click', () => playVideo(video));
    }
  });

  if (!reduceMotion && !saveData) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) playVideo(video);
          else video.pause();
        });
      }, { rootMargin: '55% 0px', threshold: 0.01 });
      videos.forEach((video) => observer.observe(video));
    }
  }

  const form = document.querySelector('#demo-form');
  const dialog = document.querySelector('#demo-dialog');
  const closeButton = dialog.querySelector('.dialog-close');
  const okButton = dialog.querySelector('.dialog-ok');
  let dialogTrigger = null;

  function closeDialog() {
    dialog.close();
    dialogTrigger?.focus();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    dialogTrigger = event.submitter;
    dialog.showModal();
  });
  closeButton.addEventListener('click', closeDialog);
  okButton.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) closeDialog();
  });
})();

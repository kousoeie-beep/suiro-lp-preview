(() => {
  'use strict';

  const videos = [...document.querySelectorAll('video')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const motionDisabled = reduceMotion || saveData;

  const setPosterBackground = (video) => {
    const frame = video.closest('.media-frame');
    if (frame && video.poster) frame.style.backgroundImage = `url("${video.poster}")`;
  };

  videos.forEach((video) => {
    video.autoplay = false;
    video.controls = false;
    setPosterBackground(video);
    const button = video.parentElement.querySelector('.play');
    if (!button) return;

    if (motionDisabled) {
      video.removeAttribute('src');
      video.querySelectorAll('source').forEach((source) => source.removeAttribute('src'));
      video.load();
      button.hidden = true;
      return;
    }

    button.addEventListener('click', async () => {
      if (video.paused) {
        try {
          await video.play();
          button.textContent = '動画を一時停止';
          button.classList.add('is-playing');
        } catch (_) {
          button.textContent = '再生できませんでした';
          button.classList.remove('is-playing');
        }
      } else {
        video.pause();
        button.textContent = '動画を再生';
        button.classList.remove('is-playing');
      }
    });

    video.addEventListener('pause', () => {
      button.textContent = '動画を再生';
      button.classList.remove('is-playing');
    });
  });

  if (!motionDisabled && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        const video = entry.target;
        const button = video.parentElement.querySelector('.play');
        if (entry.isIntersecting) {
          try {
            await video.play();
            if (button) {
              button.textContent = '動画を一時停止';
              button.classList.add('is-playing');
            }
          } catch (_) {
            if (button) {
              button.textContent = '動画を再生';
              button.classList.remove('is-playing');
            }
          }
        } else if (!video.paused) {
          video.pause();
        }
      });
    }, { rootMargin: '320px 0px', threshold: 0.08 });
    videos.forEach((video) => observer.observe(video));
  }

  const dialog = document.querySelector('#demo-dialog');
  const dialogMessage = document.querySelector('#dialog-message');
  const openDialog = (message) => {
    if (message) dialogMessage.textContent = message;
    if (typeof dialog.showModal === 'function') dialog.showModal();
  };

  document.querySelectorAll('[data-demo-open]').forEach((button) => {
    button.addEventListener('click', () => openDialog('SUIROは架空商品で、実際には購入できません。販売先・決済先は設定されていません。'));
  });
  document.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll('[data-form-link]').forEach((button) => {
    button.addEventListener('click', () => document.querySelector('#demo-form').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));
  });

  const form = document.querySelector('#demo-form form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    openDialog('入力内容は送信・保存されません。デザイン確認用フォームの動作を確認しました。');
  });
})();

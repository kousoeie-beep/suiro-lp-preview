(()=>{
  const video=document.querySelector('.motion-frame video');
  const playButton=document.querySelector('.motion-play');
  if(playButton) playButton.textContent='動画を再生';
  const play=()=>{
    video.muted=true;
    video.defaultMuted=true;
    const attempt=video.play();
    if(attempt) attempt.then(()=>{playButton.hidden=true}).catch(()=>{playButton.hidden=false});
  };
  if(video&&'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting) play();
        else video.pause();
      }
    },{rootMargin:'70% 0px',threshold:.01});
    observer.observe(video);
  }
  playButton?.addEventListener('click',play);

  const dialog=document.querySelector('.info-dialog');
  const open=()=>dialog?.showModal();
  const close=()=>dialog?.close();
  document.querySelectorAll('[data-info]').forEach(button=>button.addEventListener('click',open));
  dialog?.querySelector('.dialog-close')?.addEventListener('click',close);
  dialog?.querySelector('.dialog-ok')?.addEventListener('click',close);
  dialog?.addEventListener('click',event=>{if(event.target===dialog)close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog?.open)close()});
})();

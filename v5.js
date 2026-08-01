(()=>{
  const modal=document.querySelector('.modal');
  const buyButtons=[...document.querySelectorAll('.js-buy')];
  const closeButton=modal?.querySelector('.close');
  const okButton=modal?.querySelector('.modal-ok');
  let trigger=null;
  const open=(event)=>{
    trigger=event.currentTarget;
    if(typeof modal?.showModal==='function') modal.showModal();
  };
  const close=()=>{
    if(modal?.open) modal.close();
    trigger?.focus();
  };
  buyButtons.forEach(button=>button.addEventListener('click',open));
  closeButton?.addEventListener('click',close);
  okButton?.addEventListener('click',close);
  modal?.addEventListener('click',event=>{
    const rect=modal.getBoundingClientRect();
    const inside=event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom;
    if(!inside) close();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&modal?.open) close();
  });

  const motionVideos=[...document.querySelectorAll('.motion-block video')];
  const startVideo=async video=>{
    const block=video.closest('.motion-block');
    const playButton=block?.querySelector('.motion-play');
    video.muted=true;
    video.defaultMuted=true;
    try{
      await video.play();
      if(playButton) playButton.hidden=true;
    }catch{
      if(playButton) playButton.hidden=false;
    }
  };
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const video=entry.target;
      if(entry.isIntersecting) startVideo(video);
      else video.pause();
    });
  },{rootMargin:'80% 0px',threshold:.01}):null;
  motionVideos.forEach(video=>{
    const block=video.closest('.motion-block');
    const playButton=document.createElement('button');
    playButton.type='button';
    playButton.className='motion-play';
    playButton.textContent='動画を再生';
    playButton.hidden=true;
    playButton.addEventListener('click',()=>startVideo(video));
    block?.append(playButton);
    if(observer) observer.observe(video);
    else startVideo(video);
  });
})();

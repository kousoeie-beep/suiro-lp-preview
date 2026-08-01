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
})();

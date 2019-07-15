export default (element, updateImageIndex, closeLightBox) => {
  element.addEventListener('touchstart', handleTouchStart, false);
  
  let initialX = null;
  let lastX;
  
  function handleTouchStart(event) {
    element.addEventListener('touchmove', handleTouchMove, false);
    element.addEventListener('touchend', handleTouchEnd, false);

    initialX = event.touches[0].clientX;
  }
  
  function handleTouchMove(event) {
    if (initialX === null) return;
  
    lastX = event.touches[0].clientX;
  }
  
  function handleTouchEnd(event) {
    if (lastX === undefined) {
      // ! there is a bug here where clicking closes the lightbox but then triggers a click on the thumbnail previously behind the lightbox
      closeLightBox();
      
      return;
    }

    const diffX = initialX - lastX;
  
    if (diffX > 0) {
      updateImageIndex('next');
    } else {
      updateImageIndex('previous');
    }

    initialX = null;
    event.preventDefault();
  }

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
};

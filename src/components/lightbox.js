import React, { useState, useCallback, useEffect } from 'react';
import { number, object, func, arrayOf } from 'prop-types';
import Img from 'gatsby-image';

const light = {
  backgroundColor: '#fff',
  color: '#000'
};

const dark = {
  backgroundColor: '#000',
  color: '#fff'
};

const LightBox = ({ images, imageIndex: initialImageIndex, closeLightBox }) => {
  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  const [lightTheme, toggleLightTheme] = useState(true);

  const updateImageIndex = (operation) => {
    let index = imageIndex || initialImageIndex;

    operation === 'next' ? index++ : index--;
    
    if (index === images.length) {
      index = 0;
    } else if (index === -1) {
      index = images.length - 1;
    } 

    setImageIndex(index);
  };

  const handleKeyDown = useCallback(
    ({ key }) => {
      if (key === 'ArrowRight') {        
        updateImageIndex('next');
      } else if (key === 'ArrowLeft') {
        updateImageIndex('previous');
      }
    },
    [imageIndex],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  if (initialImageIndex === null) return null;

  return (
    <div className="relative">
      <article 
        className="lightbox"
        onClick={() => {
          setImageIndex(null);
          closeLightBox();
        }} 
        style={lightTheme ? light : dark}
      >
        <span className="lightbox-close">x</span>
        <Img fluid={images[imageIndex || initialImageIndex].node.childImageSharp.fluid} />
      </article>
      <span 
        className="lightbox-theme-toggle"
        onClick={() => toggleLightTheme(!lightTheme)}
        style={{ color: lightTheme ? light.color : dark.color }}
      >
        {lightTheme ? '☾' : '🌞'}
      </span>
      <span 
        className="lightbox-left-arrow"
        onClick={() => updateImageIndex('previous')}
        role="img"
        aria-label="previous image"
      >
        ⬅️
      </span>
      <span 
        className="lightbox-right-arrow"
        onClick={() => updateImageIndex('next')}
        role="img"
        aria-label="next image"
      >
        ➡️
      </span>
    </div>
  );
};

LightBox.propTypes = {
  images: arrayOf(object).isRequired,
  imageIndex: number,
  closeLightBox: func.isRequired
};

export default LightBox;

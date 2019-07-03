import React, { useState } from 'react';
import { number, object, func, arrayOf } from 'prop-types';
import Img from 'gatsby-image';

// active link class

const LightBox = ({ images, imageIndex: initialImageIndex, closeLightBox }) => {
  const [lightTheme, toggleLightTheme] = useState(true);
  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  
  const updateImageIndex = (operation) => {
    let index = imageIndex || initialImageIndex;

    operation === 'increment' ? index++ : index--;
    
    if (index === images.length) {
      index = 0;
    } else if (index === -1) {
      index = images.length - 1;
    } 

    setImageIndex(index);
  };

  const light = {
    backgroundColor: '#fff',
    color: '#000'
  };
  
  const dark = {
    backgroundColor: '#000',
    color: '#fff'
  };
  
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
        onClick={() => updateImageIndex('decrement')}
      >
        Left
      </span>
      <span 
        className="lightbox-right-arrow"
        onClick={() => updateImageIndex('increment')}
      >
        Right
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

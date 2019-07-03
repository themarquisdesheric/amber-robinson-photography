import React, { useState } from 'react';
import { number, object, func, arrayOf } from 'prop-types';
import Img from 'gatsby-image';

const LightBox = ({ images, imageIndex, closeLightBox }) => {
  const [lightTheme, toggleLightTheme] = useState(true);

  const light = {
    backgroundColor: '#fff',
    color: '#000'
  };

  const dark = {
    backgroundColor: '#000',
    color: '#fff'
  };
  
  if (imageIndex === null) return null;

  return (
    <div className="relative">
      <article 
        className="lightbox"
        onClick={closeLightBox} 
        style={lightTheme ? light : dark}
      >
        <span className="lightbox-close">x</span>
        <Img fluid={images[imageIndex].node.childImageSharp.fluid} />
      </article>
      <span 
        className="lightbox-theme-toggle"
        onClick={() => toggleLightTheme(!lightTheme)}
        style={{ color: lightTheme ? light.color : dark.color }}
      >
        {lightTheme ? '☾' : '🌞'}
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

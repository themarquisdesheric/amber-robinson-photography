import React, { useState } from 'react';
import { oneOfType, object, bool, func } from 'prop-types';
import Img from 'gatsby-image';

const LightBox = ({ image, closeLightBox }) => {
  const [lightTheme, toggleLightTheme] = useState(true);

  const light = {
    backgroundColor: '#fff',
    color: '#000'
  };

  const dark = {
    backgroundColor: '#000',
    color: '#fff'
  };
  
  return (
    <div className="relative">
      <article 
        className="lightbox"
        onClick={closeLightBox} 
        style={lightTheme ? light : dark}
      >
        <span className="lightbox-close">x</span>
        <Img fluid={image} />
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
  image: oneOfType([object, bool]).isRequired,
  closeLightBox: func.isRequired
};

export default LightBox;

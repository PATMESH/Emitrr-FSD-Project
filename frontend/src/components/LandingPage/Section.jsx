import React from 'react';

const Section = ({ name, title, description, svg, alignLeft }) => {
  return (
    <section className={`custom-section ${name} ${alignLeft ? 'align-left' : 'align-right'}`}>
      <div className="content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="side-svg">
        <img src={svg} alt="SVG" />
      </div>
    </section>
  );
};

export default Section;

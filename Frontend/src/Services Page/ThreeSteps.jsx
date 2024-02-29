import React from 'react';
import './StylesServices/ThreeSteps.css';

const ThreeSteps = () => {
  return (
    <section className='Container-father-ThreeSteps'>
        <div className="ThreeStepsSection">
      <h1>Titulo de la Sección</h1>
      <p>Descripción de la sección.</p>

      <div className="CircleContainer">
        <div className="Circle">
          <h2>Paso 1</h2>
          <p>Descripción del paso 1.</p>
        </div>

        <div className="Circle">
          <h2>Paso 2</h2>
          <p>Descripción del paso 2.</p>
        </div>

        <div className="Circle">
          <h2>Paso 3</h2>
          <p>Descripción del paso 3.</p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default ThreeSteps;

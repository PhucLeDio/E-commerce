import React from "react";
import { Fireworks } from "@fireworks-js/react";

const HappyNewYear = () => {
  const options = {
    hue: {
      min: 0,
      max: 345,
    },
    delay: {
      min: 15,
      max: 15,
    },
    // rocketsPoint: 50,
    speed: 10,
    // acceleration: 1.2,
    friction: 0.96,
    gravity: 1,
    particles: 90,
    trace: 3,
    explosion: 6,
    autoresize: true,
    brightness: {
      min: 50,
      max: 80,
      decay: {
        min: 0.015,
        max: 0.03,
      },
    },
    boundaries: {
      visible: false,
    },
    mouse: {
      click: true,
      move: false,
      max: 1,
    },
  };

  return (
    <div>
      <Fireworks options={options} />
    </div>
  );
};

export default HappyNewYear;

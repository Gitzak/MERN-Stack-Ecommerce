import React from "react";

const Renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="timer timer-style">
      <div>
        <span className="cdown day">
          {days} <p>Days</p>
        </span>
        <span className="cdown hour">
          {hours} <p>Hours</p>
        </span>
        <span className="cdown minutes">
          {minutes} <p>Minutes</p>
        </span>
        <span>
          {seconds} <p>Secs</p>
        </span>
      </div>
    </div>
  );
};

export default Renderer;

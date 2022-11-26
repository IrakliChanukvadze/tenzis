import React from "react";
import "./Die.css";

function Die({ value, isHeld, id, toggle }) {
  return (
    <div className={`die ${isHeld && "green"}`} onClick={() => toggle(id)}>
      {value}
    </div>
  );
}

export default Die;

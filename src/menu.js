import React from "react";
const Menu = ({ setw, setc, seto }) => {
  return (
    <div className="menu">
      <label>Set Brush Color</label>&nbsp;
      <input type="color" onChange={(e) => setc(e.target.value)}></input>&nbsp;
      <label>Set Line Width</label>&nbsp;
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => setw(e.target.value)}
      ></input>
      <label>Set Line Opacity</label>&nbsp;&nbsp;
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => seto(e.target.value/100)}
      ></input>
    </div>
  );
};
export default Menu;

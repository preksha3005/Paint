import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Menu from "./menu";

const Page = () => {
  const canvasRef = React.useRef(null);
  const ctxref = React.useRef(null);
  const [isDrawing, setD] = React.useState(false);
  const [lineW, setw] = React.useState(5);
  const [lineC, setc] = React.useState("black");
  const [lineO, seto] = React.useState(0.5);
  console.log(lineC);
  console.log(lineW);
  console.log(lineO);

  // React.useEffect(
  //   () => {
  //     const canvas = canvasRef.current;
  //     if (!canvas) {
  //       return;
  //     }
  //     const ctx = canvas.getContext("2d");
  //     ctx.lineCap = "round";
  //     ctx.lineJoin = "round";
  //     ctx.globalAlpha = lineO;
  //     ctx.lineWidth = lineW;
  //     ctx.strokeStyle = lineC;
  //     ctxref.current = ctx;
  //   },
  //   [lineC],
  //   [lineO],
  //   [lineW]
  // );

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineO;
    ctx.lineWidth = lineW;
    ctx.strokeStyle = lineC;
    ctxref.current = ctx;
  }, [lineC, lineO, lineW]);

  function start(e) {
    ctxref.current.beginPath();
    ctxref.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setD(true);
  }

  function draw(e) {
    if (!isDrawing) {
      return;
    }
    ctxref.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxref.current.stroke();
  }

  function end(e) {
    ctxref.current.closePath();
    setD(false);
  }

  return (
    <div className="container">
      <div className="box">
        <h2>Paint App</h2>
        <div className="draw-area">
          <Menu setw={setw} setc={setc} seto={seto} />
          <canvas
            ref={canvasRef}
            onMouseDown={start}
            onMouseMove={draw}
            onMouseUp={end}
            width={`1150px`}
            height={`460px`}
          ></canvas>
        </div>
      </div>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);

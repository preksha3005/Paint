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

  // function start(e) {
  //   ctxref.current.beginPath();
  //   ctxref.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //   setD(true);
  // }

  // function draw(e) {
  //   if (!isDrawing) {
  //     return;
  //   }
  //   ctxref.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //   ctxref.current.stroke();
  // }

  // function end(e) {
  //   ctxref.current.closePath();
  //   setD(false);
  // }
  let requestId = null;
  function start(e) {
    if (e.type === 'mousedown' || e.type === 'touchstart') {
      ctxref.current.beginPath();
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.type === 'mousedown' ? e.nativeEvent.offsetX : e.touches[0].clientX - rect.left;
      const y = e.type === 'mousedown' ? e.nativeEvent.offsetY : e.touches[0].clientY - rect.top;
      ctxref.current.moveTo(x, y);
      setD(true);
      requestId = requestAnimationFrame(draw);
    }
  }
  
  function draw(e) {
    if (e.type === 'mousemove' || e.type === 'touchmove') {
      if (!isDrawing) {
        return;
      }
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.type === 'mousemove' ? e.nativeEvent.offsetX : e.touches[0].clientX - rect.left;
      const y = e.type === 'mousemove' ? e.nativeEvent.offsetY : e.touches[0].clientY - rect.top;
      ctxref.current.lineTo(x, y);
      ctxref.current.stroke();
    }
  }
  
  function end(e) {
    if (e.type === 'mouseup' || e.type === 'touchend') {
      ctxref.current.closePath();
      setD(false);
      cancelAnimationFrame(requestId);
    }
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
            onTouchStart={start}
            onTouchMove={draw}
            onTouchEnd={end}
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

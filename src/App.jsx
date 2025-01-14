
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const App = () => {
  const canvasRef = useRef();
  const [eraserMode, seteraserMode] = useState(false);
  const [strokeWidth, setstrokeWidth] = useState(6);
  const [strokeColor, setstrokeColor] = useState("#6556cd");
  const [canvasColor, setCanvasColor] = useState("#DEDEDE");

  function handleUndo() {
    canvasRef?.current?.undo();
  }
  function handleRedo() {
    canvasRef?.current?.redo();
  }

  function clearCanvas() {
    canvasRef?.current.clearCanvas();
  }

  function resetCanvas() {
    canvasRef?.current.resetCanvas();
  }

const handleExport = async (format) => {
  const data = await canvasRef?.current.exportImage(format);
  console.log(data);

  // Create a download link
  const link = document.createElement("a");
  link.href = data;
  link.download = `canvas.${format}`; // Set the filename
  document.body.appendChild(link);
  link.click(); // Trigger the download
  document.body.removeChild(link); // Clean up
};
  function toggleEraserButon() {
    seteraserMode(!eraserMode);
  }

  const handleStrokeColor = (e) => {
    setstrokeColor(e.target.value);
  };
  const handleStrokeWidth = (e) => {
    setstrokeWidth(e.target.value, 6);

    // setstrokeWidth(e.target.value)
  };
  const handleCanvasColor = (e) => {
    setCanvasColor(e.target.value);
     resetCanvas();
  };

  // stroke color, stroke width, canvas color change

  return (
    <div className=" flex relative flex-col justify-center items-center py-20 ">
      <ReactSketchCanvas
        style={{
          border: "2px solid gray",
          borderRadius: "0.2rem",
        }}
        ref={canvasRef}
        width="80vw"
        height="70vh"
        strokeColor={eraserMode ? canvasColor : strokeColor}
        strokeWidth={strokeWidth}
        canvasColor={canvasColor}
        eraserWidth={6}
        withErase={eraserMode}
      />
      <div className="flex absolute left-40 bottom-10 gap-5 ">
        <button
          className=" border border-zinc-700 px-3 py-1 rounded-md text-zinc-600 text-[17px]"
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className=" border border-zinc-700 px-3 py-1 rounded-md text-zinc-600 text-[17px]"
          onClick={handleRedo}
        >
          Redo
        </button>
        <button
          className=" border border-zinc-700 px-3 py-1 rounded-md text-zinc-600 text-[17px]"
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button
          className=" border border-zinc-700 px-3 py-1 rounded-md text-zinc-600 text-[17px]"
          onClick={resetCanvas}
        >
          Reset
        </button>
        <button
          className=" border border-zinc-700 px-3 py-1 rounded-md text-zinc-600 text-[17px]"
          onClick={() => handleExport("png")}
        >
          Export
        </button>
        <button
          className=" border border-zinc-700 px-3 py-1 rounded-md text-zinc-600 text-[17px]"
          onClick={() => handleExport("jpeg")}
        >
          Export
        </button>

        <input
          type="color"
          value={strokeColor}
          onChange={handleStrokeColor}
          className="border border-zinc-700 rounded-md"
        />

        <input
          type="number"
          min="1"
          max="50"
          value={strokeWidth}
          onChange={handleStrokeWidth}
          className="border border-zinc-700 rounded-md"
        />

        <input
          type="color"
          value={canvasColor}
          onChange={handleCanvasColor}
          className="border border-zinc-700 rounded-md"
        />
        {/* stroke color, stroke width, canvas color */}

        <button
          className=" border border-zinc-700 px-3 py-1 rounded-md text-zinc-600 text-[17px]"
          onClick={toggleEraserButon}
        >
          {eraserMode ? "Draw" : "Eraser"}
        </button>
      </div>
    </div>
  );
};

export default App;





// import React, { useRef, useState, useEffect } from "react";

// const DrawingApp = () => {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [ctx, setCtx] = useState(null);
//   const [color, setColor] = useState("black");
//   const [brushSize, setBrushSize] = useState(2);
//   const [paths, setPaths] = useState([]);
//   const [currentPath, setCurrentPath] = useState([]);
//   const [redoStack, setRedoStack] = useState([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.lineCap = "round";
//     setCtx(context);
//   }, []);

//   const startDrawing = (e) => {
//     setIsDrawing(true);
//     const { offsetX, offsetY } = e.nativeEvent;
//     const newPath = [{ x: offsetX, y: offsetY, color, size: brushSize }];
//     setCurrentPath(newPath);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;

//     const { offsetX, offsetY } = e.nativeEvent;
//     const point = { x: offsetX, y: offsetY, color, size: brushSize };

//     // Add point to current path
//     setCurrentPath((prev) => [...prev, point]);

//     // Draw on canvas
//     ctx.strokeStyle = color;
//     ctx.lineWidth = brushSize;
//     ctx.lineTo(offsetX, offsetY);
//     ctx.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     ctx.closePath();
//     if (currentPath.length > 0) {
//       setPaths((prevPaths) => [...prevPaths, currentPath]);
//       setCurrentPath([]);
//       setRedoStack([]);
//     }
//   };

//   const clearCanvas = () => {
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     setPaths([]);
//     setRedoStack([]);
//   };

//   const undo = () => {
//     if (paths.length === 0) return;
//     const newPaths = [...paths];
//     const lastPath = newPaths.pop();
//     setPaths(newPaths);
//     setRedoStack((prev) => [lastPath, ...prev]);
//     redrawCanvas(newPaths);
//   };

//   const redo = () => {
//     if (redoStack.length === 0) return;
//     const newRedoStack = [...redoStack];
//     const pathToRestore = newRedoStack.shift();
//     setRedoStack(newRedoStack);
//     setPaths((prevPaths) => [...prevPaths, pathToRestore]);
//     redrawCanvas([...paths, pathToRestore]);
//   };

//   const redrawCanvas = (pathsToDraw) => {
//     ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     pathsToDraw.forEach((path) => {
//       ctx.beginPath();
//       path.forEach((point, index) => {
//         ctx.strokeStyle = point.color;
//         ctx.lineWidth = point.size;
//         if (index === 0) {
//           ctx.moveTo(point.x, point.y);
//         } else {
//           ctx.lineTo(point.x, point.y);
//           ctx.stroke();
//         }
//       });
//       ctx.closePath();
//     });
//   };

//   const saveCanvas = () => {
//     const canvas = canvasRef.current;
//     const dataURL = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = dataURL;
//     link.download = "drawing.png";
//     link.click();
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h1>React Drawing App</h1>
//       <canvas
//         ref={canvasRef}
//         width={500}
//         height={400}
//         style={{
//           border: "2px solid black",
//           cursor: "crosshair",
//         }}
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//       />
//       <div style={{ marginTop: "10px" }}>
//         <label>
//           Brush Color:
//           <input
//             type="color"
//             value={color}
//             onChange={(e) => setColor(e.target.value)}
//             style={{ marginLeft: "10px" }}
//           />
//         </label>
//         <label style={{ marginLeft: "20px" }}>
//           Brush Size:
//           <input
//             type="number"
//             value={brushSize}
//             onChange={(e) => setBrushSize(e.target.value)}
//             min="1"
//             max="20"
//             style={{ width: "50px", marginLeft: "10px" }}
//           />
//         </label>
//       </div>
//       <div style={{ marginTop: "10px" }}>
//         <button onClick={clearCanvas}>Clear</button>
//         <button onClick={saveCanvas}>Save</button>
//         <button onClick={undo}>Undo</button>
//         <button onClick={redo}>Redo</button>
//       </div>
//     </div>
//   );
// };

// export default DrawingApp;

import React, { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const App = () => {
  const canvasRef = useRef();
  const [eraserMode, setEraserMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [strokeColor, setStrokeColor] = useState("#6556cd");
  const [canvasColor, setCanvasColor] = useState("#DEDEDE");
  const [eraserWidth, setEraserWidth] = useState(6);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUndo = () => {
    canvasRef?.current?.undo();
  };

  const handleRedo = () => {
    canvasRef?.current?.redo();
  };

  const clearCanvas = () => {
    canvasRef?.current.clearCanvas();
  };

  const resetCanvas = () => {
    canvasRef?.current.resetCanvas();
  };

  //sign image download garni
  const handleExport = async (format) => {
    try {
      const data = await canvasRef?.current.exportImage(format);
      const link = document.createElement("a");
      link.href = data;
      link.download = `canvas.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting image:", error);
    }
  };

  const toggleEraserButton = () => {
    setEraserMode(!eraserMode);
  };

  const handleStrokeColor = (e) => {
    setStrokeColor(e.target.value);
  };

  const handleStrokeWidth = (e) => {
    setStrokeWidth(Number(e.target.value));
  };

  const handleCanvasColor = (e) => {
    setCanvasColor(e.target.value);
    resetCanvas();
  };

  const handleEraserWidth = (e) => {
    setEraserWidth(Number(e.target.value));
  };

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 px-4 min-h-screen bg-gray-100 relative">
      <ReactSketchCanvas
        style={{
          border: "2px solid gray",
          borderRadius: "0.2rem",
          width: "100%",
          maxWidth: "800px", //large
          height: "70vh",
          marginBottom: "2rem",
        }}
        ref={canvasRef}
        strokeColor={eraserMode ? canvasColor : strokeColor}
        strokeWidth={strokeWidth}
        canvasColor={canvasColor}
        eraserWidth={eraserWidth}
        withErase={eraserMode}
      />

      <button
        onClick={toggleMenu}
        className="lg:hidden absolute top-4 right-4 text-3xl p-2 z-10 bg-white rounded-full shadow-md"
      >
        {menuOpen ? "×" : "☰"}
      </button>

      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center gap-4 absolute bottom-10 left-0 w-full px-6 bg-white shadow-md rounded-md lg:flex lg:flex-row lg:static lg:bg-transparent lg:shadow-none lg:justify-center`}
      >
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 w-full sm:w-auto"
          onClick={handleUndo}
        >
          Undo
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 w-full sm:w-auto"
          onClick={handleRedo}
        >
          Redo
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 w-full sm:w-auto"
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 w-full sm:w-auto"
          onClick={resetCanvas}
        >
          Reset
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 w-full sm:w-auto"
          onClick={() => handleExport("png")}
        >
          Export PNG
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 w-full sm:w-auto"
          onClick={() => handleExport("jpeg")}
        >
          Export JPG
        </button>

        <div className="flex gap-3 items-center w-full sm:w-auto">
          <label className="text-gray-700">Stroke Color:</label>
          <input
            type="color"
            value={strokeColor}
            onChange={handleStrokeColor}
            className="border rounded-md cursor-pointer"
          />
        </div>
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <label className="text-gray-700">Stroke Width:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={strokeWidth}
            onChange={handleStrokeWidth}
            className="border rounded-md w-16 text-center"
          />
        </div>

        <div className="flex gap-3 items-center w-full sm:w-auto">
          <label className="text-gray-700">Canvas Color:</label>
          <input
            type="color"
            value={canvasColor}
            onChange={handleCanvasColor}
            className="border rounded-md cursor-pointer"
          />
        </div>
        <div className="flex gap-3 items-center w-full sm:w-auto">
          <label className="text-gray-700">Eraser Width:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={eraserWidth}
            onChange={handleEraserWidth}
            className="border rounded-md w-16 text-center"
          />
        </div>

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400 w-full sm:w-auto"
          onClick={toggleEraserButton}
        >
          {eraserMode ? "Draw" : "Eraser"}
        </button>
      </div>
    </div>
  );
};

export default App;

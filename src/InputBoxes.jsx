import React, { useRef, useState } from "react";

const TextAreas = () => {
  const [caretLine, setCaretLine] = useState({ line: 1, index: 0 });
  const inputsRef = useRef([]);

  const handleInputOrClick = (index) => {
    setCaretLine({ line: index + 1, index });
  };

  const handleKeyDown = (event, currentIndex) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (inputsRef.current[nextIndex]) {
        inputsRef.current[nextIndex].focus();
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100vw",
        marginTop: "20px",
        top: 0,
      }}
    >
      {[0, 1, 2].map((colIndex) => (
        <div
          key={colIndex}
          style={{
            flex: 1,
            border: "1px solid lightgray",
            position: "relative",
          }}
        >
          {Array.from({ length: 20 }).map((_, lineIndex) => (
            <input
              key={lineIndex}
              ref={(el) => (inputsRef.current[colIndex * 20 + lineIndex] = el)}
              style={{
                width: `${colIndex === 1 ? "100%" : "25px"}`,
                padding: "0px 5px",
                outline: "none",
                resize: "none",
                border: "none",
                fontSize: "15px",
                fontFamily: "monospace",
                height: "15px",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                borderRight: "1px dashed #d3d3d3",
                display: "block",
              }}
              onFocus={() => handleInputOrClick(lineIndex)}
              onClick={() => handleInputOrClick(lineIndex)}
              onChange={() => handleInputOrClick(lineIndex)}
              onKeyDown={(event) =>
                handleKeyDown(event, colIndex * 20 + lineIndex)
              }
              maxLength={colIndex === 1 ? "" : 3}
            />
          ))}
          {colIndex === 1 && (
            <div
              style={{
                position: "absolute",
                width: "1px",
                height: "300px",
                marginLeft:'35px',
                borderRight: "1px dashed #d3d3d3",
                top: "0px",
              }}
            ></div>
          )}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: `${300 - caretLine.line * 15}px`,
          left: 0,
          width: "100%",
          borderBottom: "2px solid red",
          transition: "bottom 0.3s",
        }}
      />
    </div>
  );
};

export default TextAreas;

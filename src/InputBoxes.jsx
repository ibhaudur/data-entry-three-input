import React, { useRef, useState } from "react";

const TextAreas = () => {
  const [caretLine, setCaretLine] = useState({ line: 1, index: 0 });
  const [inputLines, setInputLines] = useState([{ id: 0 }]);
  const inputsRef = useRef([]);
  const inputHeight = 19; // Height of each input in pixels

  const handleInputOrClick = (colIndex, lineIndex) => {
    setCaretLine({ line: lineIndex + 1, index: colIndex * 1000 + lineIndex });
  };

  const handleKeyDown = (event, colIndex, currentIndex) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;

      // Add a new line if at the last input, otherwise move to the next input
      if (nextIndex === inputLines.length) {
        setInputLines((prevLines) => [...prevLines, { id: prevLines.length }]);
        setTimeout(() => {
          inputsRef.current[colIndex * 1000 + nextIndex].focus();
        }, 0); // Ensure the focus happens after the new line is added
      } else {
        inputsRef.current[colIndex * 1000 + nextIndex].focus();
      }

      setCaretLine({ line: nextIndex + 1, index: colIndex * 1000 + nextIndex });
    }
  };

  return (
    <div
      style={{
        height: "300px",
        overflowY: "auto",
        border: "1px solid lightgray",
        overflowX: "hidden",
      }}
    >
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
              position: "relative",
              border: "1px solid lightgray",
            }}
          >
            {inputLines.map((line, lineIndex) => (
              <input
                key={line.id}
                ref={(el) =>
                  (inputsRef.current[colIndex * 1000 + lineIndex] = el)
                }
                style={{
                  width: "100%",
                  padding: "0px 5px",
                  outline: "none",
                  resize: "none",
                  border: "none",
                  fontSize: "15px",
                  fontFamily: "monospace",
                  height: `${inputHeight}px`,
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                  borderRight: "1px dashed #d3d3d3",
                  display: "block",
                }}
                onFocus={() => handleInputOrClick(colIndex, lineIndex)}
                onClick={() => handleInputOrClick(colIndex, lineIndex)}
                onChange={() => handleInputOrClick(colIndex, lineIndex)}
                onKeyDown={(event) =>
                  handleKeyDown(event, colIndex, lineIndex)
                }
              />
            ))}
            <div
              style={{
                position: "absolute",
                width: "1px",
                height: `${inputLines.length * inputHeight}px`,
                marginLeft: "35px",
                borderRight: "1px dashed #d3d3d3",
                top: "0px",
              }}
            ></div>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            bottom: `${
              inputLines.length * inputHeight - caretLine.line * inputHeight
            }px`,
            left: 0,
            width: "100%",
            borderBottom: "2px solid red",
            transition: "bottom 0.3s",
          }}
        />
      </div>
    </div>
  );
};

export default TextAreas;

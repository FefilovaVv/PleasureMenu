import React, { useState } from "react";
import TestChild from "./TestChild";

const TestParent = (props) => {
  const [points, setPoints] = useState([
    {
      id: "ID1",
      text: "text a",
      scores: [
        { id: 1, score: "score1" },
        { id: 2, score: "score2" },
      ],
    },
    {
      id: "ID2",
      text: "text b",
      scores: [
        { id: 1, score: "score3" },
        { id: 2, score: "score4" },
      ]
    },
    {
      id: "ID3",
      text: "text c",
      scores: [
        { id: 1, score: "score5" },
        { id: 2, score: "score6" },
      ],
    },
  ]);
  const [point, setPoint] = useState({
    id: 1,
    text: "",
    scores: [
      { id: 1, score: 0 },
      { id: 2, score: 0 },
    ],
  });

  const addPoint = () => {
    setPoints([...points, point]);
  };

  const handleKeyDown = (event) => {
    event.key === "Enter" && addPoint();
    setPoint((currentPoint) => {
      return { ...currentPoint, id: Date.now() };
    });
  };

  return (
    <>
      <input
        type="text"
        value={point.text}
        onKeyDown={handleKeyDown}
        onChange={(event) =>
          setPoint((currentPoint) => {
            return {
              ...currentPoint,
              id: Date.now(),
              text: event.target.value,
            };
          })
        }
      />
      <input
        type="range"
        min="0"
        max="10"
        value={point.scores[0].score}
        onKeyDown={handleKeyDown}
        onChange={(event) =>
          setPoint((currentPoint) => {
            return {
              ...currentPoint,
              scores: [
                { ...currentPoint.scores[0], score: event.target.value },
                { ...currentPoint.scores[1] },
              ],
            };
          })
        }
      />
      <input
        type="range"
        min="50"
        max="100"
        value={point.scores[1].score}
        onKeyDown={handleKeyDown}
        onChange={(event) =>
          setPoint((currentPoint) => {
            return {
              ...currentPoint,
              scores: [
                { ...currentPoint.scores[0]},
                { ...currentPoint.scores[1], score: event.target.value },
              ],
            };
          })
        }
      />
      {points.map((point) => (
        <TestChild point={point} key={point.id} />
      ))}
    </>
  );
};

export default TestParent;

import React, { useState } from "react";

const Point = (props) => {
  const [ishidden, setHide] = useState("hide");

  return (
    <li
      className="point-container"
      onDoubleClick={() => setHide(ishidden === "hide" ? "show" : "hide")}
      onBlur={() =>
        ishidden === "show" && setHide(ishidden === "hide" ? "show" : "hide")
      }
    >
      <input
        type="text"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setHide(ishidden === "hide" ? "show" : "hide");
          }
        }}
        value={props.point.pointText}
        className={`point-text title-reseiver edit-text ${ishidden}`}
        onChange={(event) => {
          props.changeText(props.point.id, event.target.value);
        }}
      ></input>
      <span className={`point-text  ${ishidden === "hide" ? "show" : "hide"}`}>
        {props.point.pointText}
      </span>

      <input
        type="range"
        name="score"
        min="0"
        max="10"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setHide(ishidden === "hide" ? "show" : "hide");
          }
        }}
        value={props.point.pointScore}
        className={`score-reseiver edit-score ${ishidden}`}
        onChange={(event) => {
          props.changeScore(props.point.id, event.target.value);
        }}
      ></input>
      <span className="point-score">{props.point.pointScore}</span>
      <button className="point-delete" onClick={props.onDelete}>
        ×
      </button>
    </li>
  );
};

export default Point;

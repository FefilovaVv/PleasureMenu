import React, { useState } from "react";

const TestChild = (props) => {
  return (
    <>
      <div
        className="a-title-container"
        style={{ justifyContent: "space-between" }}
      >
        <span>{props.point.id}</span>
        <span>{props.point.text}</span>
        {props.point.scores.map((obj) => (
          <span key={obj.id+Date.now()}>{obj.score}</span>
        ))}
      </div>
    </>
  );
};

export default TestChild;

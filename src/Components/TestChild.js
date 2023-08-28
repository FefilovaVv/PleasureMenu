import React, { useState } from "react";

const TestChild = (props) => {
  const [ishidden, setHide] = useState("hide");
  return (
    <>
      <div onDoubleClick={() => setHide(ishidden === "hide" ? "show" : "hide")}>
        <input
          type="text"
          value={props.menu.title}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setHide(ishidden === "hide" ? "show" : "hide");
            }
          }}
          className={ishidden}
          onChange={(event) =>
            props.changeTitle(props.menu.id, event.target.value)
          }
        ></input>
        <h3
          className={`menu-title first ${
            ishidden === "hide" ? "show" : "hide"
          }`}
        >
          {props.menu.title}
        </h3>
      </div>
    </>
  );
};

export default TestChild;

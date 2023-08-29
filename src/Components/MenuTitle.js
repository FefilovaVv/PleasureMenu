import React, { useState } from "react";

const MenuTitle = (props) => {
  const [ishidden, setHide] = useState("hide");

  const handleDoubleClick = () => {
    setHide(ishidden === "hide" ? "show" : "hide");
  };

  

  return (
    <>
      <div className="a-title-container" onDoubleClick={handleDoubleClick}>
        <input
          type="text"
          value={props.menu.title}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleDoubleClick(); 
            }
          }}
          className={`title-reseiver ${ishidden}`}
          onChange={(event) =>
            props.changeTitle(props.menu.id, event.target.value)
          }
          onBlur={()=>ishidden === "show" && setHide(ishidden === "hide" ? "show" : "hide")}
        />
        <h3
          onClick={props.onActivate}
          className={`menu-title first ${
            ishidden === "hide" ? "show" : "hide"
          }`}
        >
          {props.menu.title}
        </h3>
        <button className="point-delete" onClick={props.onDelete}>
          ×
        </button>
      </div>
    </>
  );
};

export default MenuTitle;

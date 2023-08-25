import React, {
useState
} from 'react';


const MenuTitle = (props) => {
return (
<>
<div className="a-title-container">
      <h3 className="menu-title first" contentEditable="true" onClick={props.onActivate}>{props.menu.title}</h3>
      <button className="point-delete" onClick={props.onDelete} >×</button>
  </div>
</>
);
}


export default MenuTitle;
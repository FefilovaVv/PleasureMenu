import React, {
  useState
} from 'react';


const Point=(props) => {
  return (
    <li className="point-container" >
     <span className="point-text">{props.point.pointText}</span>
     <span className="point-score">{props.point.pointScore}</span>
     <button className="point-delete" onClick={props.onDelete} >×</button></li>
  );
}

export default Point;
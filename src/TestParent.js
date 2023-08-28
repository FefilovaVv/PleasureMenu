import React, { useState } from "react";
import TestChild from "./Components/TestChild";

const TestParent = (props) => {
    
  const [menus, setMenus] = useState([
    { id: 1, title: "cev" },
    { id: 2, title: "ghev" },
  ]);
  const handleChangeTitle = (key, newTitle) => {
    setMenus((currentMenus) => {
      return currentMenus.map((menu) => 
       menu.id === key? {...menu, title: newTitle}: menu
      );
    });
  };
  return (
    <>
      {menus.map((menu) => (
        <TestChild menu={menu} key={menu.id} changeTitle={handleChangeTitle} />
      ))}
    </>
  );
};

export default TestParent;

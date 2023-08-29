import React, { useState, useEffect } from "react";
import Point from "./Components/Point";
import MenuTitle from "./Components/MenuTitle";
import "./Styles/Style.css";
import TestParent from "./tests and drafts/TestParentImmer";
import { produce } from "immer";

function App() {
  const menusStored = JSON.parse(localStorage.getItem("menusStored")) || [
    { id: 1, title: "Menu", points: [] },
  ];

  const [point, setPoint] = useState({ id: "", pointText: "", pointScore: 0 });
  const [menus, setMenus] = useState(menusStored);
  const [activeMenuId, setActiveMenuId] = useState(1);
  const [sortState, setSortState] = useState(1);

  const activeSortedPoints = [
    ...menus.find((menu) => menu.id === activeMenuId)?.points,
  ].sort(() => sortState);

  function deletePoint(deleteId) {
    setMenus(function (currentMenus) {
      return produce(currentMenus, (draft) => {
        const activeMenu = draft.find((menu) => activeMenuId === menu.id);
        activeMenu.points = activeMenu.points.filter(
          (point) => point.id !== deleteId
        );
      });
    });
  }

  function addMenu() {
    const newId = Date.now();

    setMenus((currentMenus) => [
      ...currentMenus,
      { id: newId, title: "Title", points: [] },
    ]);
    setActiveMenuId(newId);
  }

  function deleteMenu(deleteId) {
    if (menus.length <= 1) return;

    setMenus((currentMenus) =>
      currentMenus.filter((menu) => menu.id !== deleteId)
    );

    setActiveMenuId(menus.find((menu) => menu.id !== deleteId).id);
  }

  function addPoint() {
    setMenus((currentMenus) => {
      return produce(currentMenus, (draft) => {
        draft
          .find((menu) => activeMenuId === menu.id)
          .points.push({
            id: Date.now(),
            pointText: point.pointText,
            pointScore: point.pointScore,
          });
      });
    });
    setPoint({ id: "", pointText: "", pointScore: 0 });
  }

  function activateMenu(menuId) {
    setActiveMenuId(menuId);
  }

  function changeSortState() {
    setSortState((state) => (state === 1 ? -1 : 1));
  }

  useEffect(() => {
    localStorage.setItem("menusStored", JSON.stringify(menus));
  });

  const handleChangeTitle = (menuId, newTitle) => {
    setMenus((currentMenus) => {
      return produce(currentMenus, (draft) => {
        draft.find((menu) => menu.id === menuId).title = newTitle;
      });
    });
  };
  const handleChangePointText = (pointId, newText) => {
    setMenus((currentMenus) => {
      return produce(currentMenus, (draft) => {
        draft
          .find((menu) => menu.id === activeMenuId)
          .points.find((point) => point.id === pointId).pointText = newText;
      });
    });
  };
  const handleChangePointScore = (pointId, newScore) => {
    setMenus((currentMenus) => {
      return produce(currentMenus, (draft) => {
        draft
          .find((menu) => menu.id === activeMenuId)
          .points.find((point) => point.id === pointId).pointScore = newScore;
      });
    });
  };

  return (
    <>
      <section className="menu-section">
        <div className="menu-container">
          <h2 className="title">Меню удовольствия</h2>
          <div className="tip-container">
            <div className="manage-tip-drop">
              <span className="button-tip-what-to-do">Что делать?</span>
              <p className="text-tip-what-to-do">
                Напиши название пункта и сколько по шкале от 0 до 10
                удовольствия он тебе приносит. После добавления всех пунктов -
                отсортируй.
                <br />
                <br /> <b>Например:</b>
                <br /> Посмотреть фильм 5
                <br /> Погулять с друзьями 9
                <br />
                <br /> P.s. Чтобы что-либо отредактировать - щелкни дважды
              </p>
            </div>
          </div>
          <div className="titles-container">
            <h3 className="btn-add-title" onClick={addMenu}>
              +
            </h3>
            {menus.map((menu) => (
              <MenuTitle
                menu={menu}
                menuId={activeMenuId}
                key={menu.id}
                onDelete={() => deleteMenu(menu.id)}
                onActivate={() => activateMenu(menu.id)}
                changeTitle={handleChangeTitle}
              />
            ))}
          </div>
          <div className="receiver-container">
            <input
              className="text-reseiver"
              type="text"
              placeholder="Название пункта..."
              name="text"
              value={point.pointText}
              onChange={(event) =>
                setPoint({ ...point, pointText: event.target.value })
              }
              onKeyDown={(event) => (event.key === "Enter" ? addPoint() : null)}
            />
            <span className="range-result">{point.pointScore}</span>
            <input
              className="score-reseiver"
              type="range"
              name="score"
              min="0"
              max="10"
              value={point.pointScore}
              onChange={(event) =>
                setPoint({ ...point, pointScore: event.target.value })
              }
              onKeyDown={(event) => (event.key === "Enter" ? addPoint() : null)}
            />
            <button onClick={addPoint} className="add-btn" type="submit">
              Add
            </button>
            <button
              className="sort-btn"
              type="submit"
              onClick={changeSortState}
            >
              ↑↓
            </button>
          </div>
          <div className="lists-container">
            <ul className="points-list">
              {activeSortedPoints?.map((point) => (
                <Point
                  point={point}
                  key={point.id}
                  onDelete={() => deletePoint(point.id)}
                  changeText={handleChangePointText}
                  changeScore={handleChangePointScore}
                />
              ))}
            </ul>
          </div>
          {/* <TestParent/> */}
        </div>
      </section>
    </>
  );
}

export default App;

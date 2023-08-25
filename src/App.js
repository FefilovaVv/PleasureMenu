import React, { useState, useEffect } from 'react';
import Point from './Components/Point';
import MenuTitle from './Components/MenuTitle';
import './Styles/Style.css'

function App() {

        const [points, setPoints] = useState([
        ]);

        const [point, setPoint] = useState({ id: '', pointText: '', pointScore: 0 });

        function deletePoint(deleteId) {
                setPoints(points.filter(point => point.id !== deleteId));
        }
        const [menus, setMenus] = useState([
                { id: 1, title: 'Menu', points: [] }
        ]);
        let activeMenuId = menus[menus.length - 1]===undefined?null:menus[menus.length - 1].id;
        function addMenu() {
                setMenus([...menus, { id: Date.now(), title: 'Title', points: [] }])
                activeMenuId = menus[menus.length - 1].id;
        };
        function deleteMenu(deleteId) {
                if(menus.length>1)
               { setMenus(menus.filter(menu => menu.id !== deleteId));
                updateMenu(); }        
        };
        function sortPoints() {
                setPoints([...points].sort(function (a, b) { return a.pointScore - b.pointScore }));
                updateMenu();

        };

        function addPoint(event) {
                setPoints([...points, { id: Date.now(), pointText: point.pointText, pointScore: point.pointScore }]);
                updateMenu();
        };
        function activateMenu(menuId) {
                activeMenuId = menuId;
                let activeMenu = menus.find(menu => menu.id === activeMenuId);
                setPoints(activeMenu.points);

        };

        useEffect(() => {
                localStorage.setItem('menusStored', JSON.stringify(menus));
        },);
        function updateMenu() {
                setMenus(menus => menus.map(menu => {
                         if (menu.id === activeMenuId) {
                                return { ...menu, points: [...points] };
                        }
                        return menu;
                }));
        };
        return (
                <>

                        <section className="menu-section">
                                <div className="menu-container">
                                        <h2 className="title">Меню удовольствия</h2>
                                        <div className="tip-container">
                                                <div className="manage-tip-drop">
                                                        <span className="button-tip-what-to-do">Что делать?</span>
                                                        <p className="text-tip-what-to-do">Напиши название пункта и сколько по шкале от 0 до 10 удовольствия он тебе
                                                                приносит. После добавления всех пунктов
                                                                - отсортируй.
                                                                <br />
                                                                <br /> <b>Например:</b>
                                                                <br /> Посмотреть фильм 5
                                                                <br /> Погулять с друзьями 9
                                                        </p>
                                                </div>
                                        </div>
                                        <div className="titles-container">
                                                <h3 className="btn-add-title"
                                                        onClick={addMenu}>+</h3>
                                                {menus.map(menu => <MenuTitle menu={menu} key={menu.id} onDelete={() => deleteMenu(menu.id)} onActivate={() => activateMenu(menu.id)} />)}
                                        </div>
                                        <div className="receiver-container">
                                                <input
                                                        className="text-reseiver"
                                                        type="text"
                                                        placeholder="Название пункта..."
                                                        name="text"
                                                        value={point.pointText}
                                                        onChange={event => setPoint({ ...point, pointText: event.target.value })}
                                                />
                                                <span className="range-result">0</span>
                                                <input
                                                        className="score-reseiver"
                                                        type="range"
                                                        name="score"
                                                        min="0"
                                                        max="10"
                                                        value={point.pointScore}
                                                        onChange={event => setPoint({ ...point, pointScore: event.target.value })}
                                                />
                                                <button
                                                        onClick={addPoint}
                                                        className="add-btn"
                                                        type="submit">Add</button>
                                                <button className="sort-btn" type="submit"
                                                        onClick={sortPoints}>↑↓</button>
                                        </div>
                                        <div className="lists-container">
                                                <ul className="points-list">
                                                        {points.map(point => <Point
                                                                point={point} key={point.id}
                                                                onDelete={() => deletePoint(point.id)} />)}
                                                </ul>
                                        </div>
                                </div>
                        </section>
                </>
        );
}

export default App;
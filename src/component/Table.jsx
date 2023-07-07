import React, { useState } from 'react';



const Table = function () {
    const [isReadonly, handleEnter] = useState(false);
    function changeReadonly(event) {
        handleEnter(event.key === 'Enter' ? true : isReadonly === true)
        // console.log(isReadonly)
    }
    const [score, setScore] = useState(0)
    function scoring(event) {
        setScore(event.target.value)
    }

    // этот цикл с for делала не я, нашла генератор красивых range
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
    return (
        <div className='table__container_for_lines'>
            <div className='table__container_for_a_line'>
                <input className='table__line' type="text" placeholder='Ввод' onKeyDown={changeReadonly} readOnly={isReadonly} />
                <label htmlFor="scoreInput">{score}</label>
                <input id='scoreInput' className=' styled-slider slider-progress' type="range" min="1" max="10" value={score} onChange={scoring} />
            </div>
        </div>
    );
}

export default Table;





 // const [newLine, setNewLine] = useState('');
    // function makingNewLine(){
    //     setNewLine()
    // }
    // if(isReadonly===true)
        // {setNewLine('eehrreh')};
/* {newLine && <div>{newLine}</div>} */
import { useState, useEffect, useRef } from 'react';
import styles from './CustomSelect.module.scss';
import ArrowDown from '../assets/expand_more.svg';
import ArrowUp from '../assets/expand_less.svg';

/* 
I need some help with the last two requirements:
- Should be able to navigate with keyboard (to focus select, open it and navigate list items with arrows)
- should save chosen element in app state outside the component
*/

// 'options' is missing in props validation
// why do I get this problem with the prop and how to fix it?
function CustomSelect({ options }) {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  // it is my first time using this hook and I will be grateful if we can talk more about it during the meeting :)
  const selectRef = useRef(null);

  function selectOption(option) {
    setSelected(option);
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectRef]);

  return (
    <>
      <span className={styles.label}>Choose an option:</span>
      <div className={styles.container} ref={selectRef}>
        <button className={styles.selectButton} onClick={() => setIsOpen(!isOpen)}>
          <span>{selected}</span>
          <img src={!isOpen ? ArrowDown : ArrowUp}></img>
          <></>
        </button>
        {isOpen && (
          <ul className={styles.optionList}>
          {options.map(option => (
            <li 
              key={option} 
              // the selected class is not working - how to combine two classes names in one className?
              className={`${styles.option} ${selected === option ? 'styles.selected' : ''}`} 
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>        
        )}
      </div>
    </>

  )
}

export default CustomSelect;
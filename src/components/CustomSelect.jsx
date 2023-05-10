import { useState, useEffect, useRef } from 'react';
import styles from './CustomSelect.module.scss';
import ArrowDown from '../assets/expand_more.svg';
import ArrowUp from '../assets/expand_less.svg';

function CustomSelect({ options }) {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
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
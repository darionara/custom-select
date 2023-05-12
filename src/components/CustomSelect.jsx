import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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
  });

  return (
    <div>
      <span className={styles.label}>Choose an option:</span>
      <div className={styles.container} ref={selectRef}>
        <button className={styles.selectButton} onClick={() => setIsOpen(!isOpen)}>
          <span>{selected}</span>
          <img src={!isOpen ? ArrowDown : ArrowUp}></img>
        </button>
        {isOpen && (
          <ul className={styles.optionList}>
          {options.map(option => (
            <li 
              key={option}
              className={`${styles.option} ${selected === option ? styles['option--selected'] : ''}`} 
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>        
        )}
      </div>
    </div>

  )
}

CustomSelect.propTypes = {
  options: PropTypes.array
}

export default CustomSelect;
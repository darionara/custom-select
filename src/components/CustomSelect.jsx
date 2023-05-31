import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomSelect.module.scss';
import arrowDown from '../assets/expand_more.svg';

function CustomSelect({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef(null);

  function selectOption(option) {
    onSelect(option);
    // after choosing the option the list is closing
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

  function handleKeyDown(event) {
    if (!isOpen) return;
    switch (event.key) {
      case 'ArrowUp': 
        event.preventDefault();
        setFocusedIndex((prevIndex) => prevIndex <= 0 ? options.length - 1 : prevIndex - 1);
        break;
      case 'ArrowDown': 
        event.preventDefault();
        setFocusedIndex((prevIndex) => prevIndex >= options.length - 1 ? 0 : prevIndex + 1);
        break;
      case 'Enter':
        // Idk what is wrong here but to choose an option I need to press enter twice.
        // + after choosing the option the list is not closing itself...
        //event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          selectOption(options[focusedIndex]);
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
/*  I got a message from eslint:
    React Hook useEffect has a missing dependency: 'handleKeyDown'. 
    Either include it or remove the dependency array. eslintreact-hooks/exhaustive-deps */
  }, [isOpen])

  console.log(selected)
  console.log(focusedIndex)

  return (
    <div>
      <span className={styles.label}>Choose an option:</span>
      <div className={styles.container} ref={selectRef}>
        <button className={styles.selectButton} onClick={() => setIsOpen(!isOpen)}>
          <span>{selected}</span>
          <img src={arrowDown} className={isOpen && styles.arrowUp}></img>
        </button>
        {isOpen && (
          <ul className={styles.optionList} onKeyDown={handleKeyDown}>
          {options.map(option => (
            <li 
              key={option}
              className={`${styles.option} 
                          ${selected === option ? styles['option--selected'] : ''} 
                          ${focusedIndex === options.indexOf(option) ? styles['option--focused'] : ''}`} 
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
  options: PropTypes.array,
  selected: PropTypes.string,
  onSelect: PropTypes.func
}

export default CustomSelect;
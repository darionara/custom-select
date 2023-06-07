import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './CustomSelect.module.scss';
import arrowDown from '../assets/expand_more.svg';

function CustomSelect({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const selectRef = useRef(null);
  const ulRef = useRef(null);
  const liRefs = useRef([]);

  function selectOption(option) {
    onSelect(option);
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

  useEffect(() => {
    const liHeight = liRefs.current[focusedIndex]?.offsetHeight;  //total height of li element
    const scrollTop = ulRef.current?.scrollTop;                   //shows the scroll position of ul element
    const viewport = scrollTop + ulRef.current?.offsetHeight;     //sum of scroll position of ul and it's total height
    const liOffset = liHeight * focusedIndex;                     //total height of li element depending on the index
    
    console.log('focusedIndex', focusedIndex, ' viewport', viewport, ' liOffset', liOffset);

    if (ulRef.current && (liOffset < scrollTop || liOffset + liHeight > viewport)) {
      ulRef.current.scrollTop = liOffset;
    }
  }, [focusedIndex]);

  function handleKeyDown(event) {
    if (!isOpen) return;
    event.preventDefault();
    switch (event.key) {
      case 'ArrowUp':
        setFocusedIndex((prevIndex) => (prevIndex <= 0 ? options.length - 1 : prevIndex - 1));
        break;
      case 'ArrowDown':
        setFocusedIndex((prevIndex) => (prevIndex >= options.length - 1 ? 0 : prevIndex + 1));
        break;
      case 'Enter':
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          selectOption(options[focusedIndex]);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <span className={styles.label}>Choose an option:</span>
      <div className={styles.container} ref={selectRef}>
        <button className={styles.selectButton} onClick={() => setIsOpen(!isOpen)} onKeyDown={handleKeyDown}>
          <span>{selected}</span>
          <img src={arrowDown} className={isOpen ? styles.arrowUp : ''} alt="Arrow" />
        </button>
        {isOpen && (
          <ul className={styles.optionList} ref={ulRef}>
            {options.map((option, index) => (
              <li
                key={index}
                className={`${styles.option} 
                            ${selected === option ? styles['option--selected'] : ''}
                            ${focusedIndex === index ? styles['option--focused'] : ''}`}
                onClick={() => selectOption(option)}
                ref={(li) => (liRefs.current[index] = li)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string,
  onSelect: PropTypes.func
};

export default CustomSelect;

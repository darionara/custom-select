import CustomSelect from './components/CustomSelect';
import { useState } from 'react';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8'];

function App() {
  const [selected, setSelected] = useState(options[0]);

  function handleSelect(option) {
    setSelected(option)
  }

  return (
    <>
      <CustomSelect options={options} selected={selected} onSelect={handleSelect} />
    </>
  )
}

export default App

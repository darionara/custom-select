import './App.scss'
import CustomSelect from './components/CustomSelect';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8'];

function App() {
  return (
    <>
      <CustomSelect options={options} />
    </>
  )
}

export default App

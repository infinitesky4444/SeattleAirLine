import { Provider } from 'react-redux';
import './App.css';
import InputBox from './components/InputBox';
import ResultBox from './components/ResultBox';
import store from './redux/store';


function App() {
  return (
    <>
      <Provider store={store}>
        <div className='text-center text-4xl font-black text-teal-500 dark:text-white mt-14 mb-6'>SEATTLE DIRECT FLIGHT</div>
        <InputBox />
        <ResultBox />
      </Provider>
    </>
  );
}

export default App;

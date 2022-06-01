
import './App.css';
import BaiTapGameBauCua from './BaiTapGameBauCua/BaiTapGameBauCua';
import LoadingComponent from './Components/GlobalSetting/LoadingComponent';
import ToDoListSaga from './ToDoListSaga/ToDoListSaga';

function App() {
  return (
    <div className="App">
      <LoadingComponent />
      <ToDoListSaga />
    </div>
  );
}

export default App;

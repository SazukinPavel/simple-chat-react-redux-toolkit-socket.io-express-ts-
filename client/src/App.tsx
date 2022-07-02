import Login from './components/Login';
import Messages from './store/reducers';
import './App.scss'
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {

  const {isConnected}=useTypedSelector(s=>s.chat)

  return (
    <div className='chat'>
      <h1 className={isConnected?'connect':'disconnect'}>{isConnected ? 'Подключено' : 'Не подключено'}</h1>
      {
        !isConnected ?
          <div>
            <Login/>
          </div>
          : <div>
            <Messages/>
          </div>
      }
    </div>
  );
}

export default App;

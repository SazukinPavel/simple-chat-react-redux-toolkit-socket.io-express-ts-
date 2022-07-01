import Login from './components/Login';
import Messages from './components/Messages';
import './App.scss'
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {

  const {isConnected}=useTypedSelector(s=>s.chat)

  return (
    <div className='chat'>
      <h1>{isConnected ? 'Подключено' : 'Не подключено'}</h1>
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

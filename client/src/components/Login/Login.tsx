import React from "react";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setIsConnected, setUserName } from "../../store/reducers/chatReducer";
import styles from './Login.module.scss'


function Login() {

    const [name, setName] = React.useState<string>('');
    const dispatch=useTypedDispatch()

    const connect=()=>{
        dispatch(setUserName(name))
        dispatch(setIsConnected(true))
    }

    return ( 
        <div>
            <label>
                Ваше имя:
                <input value={name} onChange={e=>setName(e.target.value)}></input>
            </label>
            <button onClick={connect}>Подключится</button>
        </div>
     );
}

export default Login;
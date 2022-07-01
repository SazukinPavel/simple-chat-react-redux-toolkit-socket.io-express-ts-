import React from "react";
import styles from './Login.module.scss'

interface LoginProps{
    connect:()=>void
}

function Login({connect}:LoginProps) {

    const [name, setName] = React.useState<string>('');

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
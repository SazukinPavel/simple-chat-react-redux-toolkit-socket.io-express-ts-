import { useForm } from "react-hook-form";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setIsConnected, setUser } from "../../store/reducers/chatReducer";
import { LoginDto } from "../../types/dto/Login.dto";
import styles from './Login.module.scss'
import ValidateBlock from "./ValidateBlock";


function Login() {

    const {register,formState:{errors,isValid},handleSubmit}=useForm<LoginDto>({mode:'onTouched'})
    const dispatch=useTypedDispatch()

    const connect=({room,username}:LoginDto)=>{
        dispatch(setUser({room,username}))
        dispatch(setIsConnected(true))
    }

    return ( 
        <form className={styles.Login} onSubmit={handleSubmit(connect)}>
            <label>
                Ваше имя:
                <input {...register('username',{
                    required:'Введите имя пользователя.'
                })}></input>
            </label>
            <ValidateBlock message={errors.username?.message}/>
            <label>
                Номер комнаты:
                <input type={'number'} {...register('room',{
                    min:{value:100,message:'Номер комнаты должен состоять из 3 чисел.'},
                    max:{value:999,message:'Номер комнаты должен состоять из 3 чисел.'},
                    valueAsNumber:true,
                    required:'Введите номер комнаты.'
                })}></input>
            </label>
            <ValidateBlock message={errors.room?.message}/>
            <div className={styles.buttons}>
                <button type='submit' disabled={!isValid}>Подключится</button>
            </div>
        </form>
     );
}

export default Login;
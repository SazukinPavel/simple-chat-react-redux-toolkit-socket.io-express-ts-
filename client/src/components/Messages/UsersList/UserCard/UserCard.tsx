import { User } from "../../../../types/User";
import styles from './UserCard.module.scss'

function UserCard({username,id}:User) {
    return ( 
        <div className={styles.UserCard}>
            <p>{username.length>10?username.slice(0,9)+'...':username}</p>
        </div>
     );
}

export default UserCard;
import { Message } from "../../../types/Message";
import styles from './MessageCard.module.scss'

function MessageCard({username,message}:Message) {
    
    return ( 
        <div className={styles.Message}>
            <p className={styles.message}>{message}</p>
            <p className={styles.username}>{username}</p>
        </div>
     );
}

export default MessageCard;
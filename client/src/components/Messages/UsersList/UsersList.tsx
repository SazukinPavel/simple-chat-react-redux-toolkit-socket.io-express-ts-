import { useTypedSelector } from '../../../hooks/useTypedSelector';
import UserCard from './UserCard';
import styles from './UsersList.module.scss'


function UsersList() {

    const { chatUsers } = useTypedSelector(s => s.chat)

    return (
        <div className={styles.UsersList}>
            <h3>Пользователи</h3>
            <div >
                {chatUsers.map((c, i) => <UserCard {...c} key={i} />)}
            </div>
        </div>
    );
}

export default UsersList;
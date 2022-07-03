import styles from './ValidateBlock.module.scss'

interface ValidateBlockProps{
    message?:string
}

function ValidateBlock({message}:ValidateBlockProps) {
    return ( 
        <div className={styles.ValidateBlock.concat(' ',message ? styles.active: '')}>
            <p>
                {message}
            </p>
        </div>
     );
}

export default ValidateBlock;
import styles from "../styles/TitleBar.module.css"
const TitleBar = ({Accent}) => (
    <div className={styles.TitleBar}>
        <a className={styles.PageTitle} href="/home">Tenjin</a>
        {Accent && <p className={styles.TitleAccent}>A place where words paint the picture ...</p>}
    </div>
)
export default TitleBar;
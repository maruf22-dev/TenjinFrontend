import styles from "../styles/TitleBar.module.css"
import Link from "next/link";
const TitleBar = ({Accent}) => (
    <div className={styles.TitleBar}>
        <Link className={styles.PageTitle} href="/home">Tenjin</Link>
        {Accent && <p className={styles.TitleAccent}>A place where words paint the picture ...</p>}
    </div>
)
export default TitleBar;
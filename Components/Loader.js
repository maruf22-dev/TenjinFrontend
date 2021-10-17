import styles from "../styles/Loader.module.css"
import ReactLoading from 'react-loading';
export const Loader = () => {
    return (
        <div className={styles.Container}>
            <div className={styles.Main}>
                <div className={styles.LoadBox}>
                    <ReactLoading type={"spin"} color={'rgb(10,210,110)'} height={'10%'} width={'10%'} />
                    <p>Loading</p>
                </div>
                <div className={styles.LoadBox}>
                    <ReactLoading type={"spin"} color={'rgb(10,210,110)'} height={'10%'} width={'10%'} />
                    <p>Loading</p>
                </div>
                <div className={styles.LoadBox}>
                    <ReactLoading type={"spin"} color={'rgb(10,210,110)'} height={'10%'} width={'10%'} />
                    <p>Loading</p>
                </div>
                <div className={styles.LoadBox}>
                    <ReactLoading type={"spin"} color={'rgb(10,210,110)'} height={'10%'} width={'10%'} />
                    <p>Loading</p>
                </div>
            </div>
        </div>
    )
}
export default Loader;
import styles from "../styles/Footer.module.css"
const Footer = (props) => (
    <footer className={styles.Footer}>
        <div className={styles.FooterContainer}>
            <div className={styles.FooterRow}>
                <div className={styles.FooterColumn}>
                    <a className={styles.FooterItem} href="/home">Home</a>
                    <p className={styles.FooterItem}></p>
                    <p className={styles.FooterItem}></p>

                </div>
                <div className={styles.FooterColumn}>
                    <a className={styles.FooterItem}  href="mailto: marufbinsalim22@gmail.com" target="_blank">Email Us</a>
                    <p className={styles.FooterItem}></p>
                    <p className={styles.FooterItem}></p>
                </div>
                <div className={styles.FooterColumn}>
                    <a className={styles.FooterItem} href="https://marufbinsalim.netlify.app/" target="_blank">Developer</a>
                    <p className={styles.FooterItem}></p>
                    <p className={styles.FooterItem}></p>
                </div>
            </div>
        </div>
        <p style={{
            color: "rgb(10, 210, 110)",
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "16px"
        }}>
           © tejinbyte. All Rights Reserved. 2021
        </p>
    </footer>
)
export default Footer;
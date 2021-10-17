import styles from "../styles/Footer.module.css"
import Link from "next/link"
const Footer = (props) => (
    <footer className={styles.Footer}>
        <div className={styles.FooterContainer}>
            <div className={styles.FooterRow}>
                <div className={styles.FooterColumn}>
                    <Link className={styles.FooterItem} href="/home">Home</Link>
                    <p className={styles.FooterItem}></p>
                    <p className={styles.FooterItem}></p>

                </div>
                <div className={styles.FooterColumn}>
                    <Link className={styles.FooterItem}  href="mailto: marufbinsalim22@gmail.com"  rel="noreferrer" target="_blank">Email Us</Link>
                    <p className={styles.FooterItem}></p>
                    <p className={styles.FooterItem}></p>
                </div>
                <div className={styles.FooterColumn}>
                    <Link className={styles.FooterItem} href="https://marufbinsalim.netlify.app/"  rel="noreferrer" target="_blank">Developer</Link>
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
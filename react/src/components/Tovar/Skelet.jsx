import styles from "./skelet.module.css";
export const TovarSkelet = () => {
    return (
        <>
            <div className={styles.tovarCard}>
                <div className={styles.pcImg}> </div>
                <div className={styles.tovarCardContent}>
                    <div className={styles.title}></div>
                    <div className={styles.cost}></div>
                    <div className="more">
                        <div className={styles.moreButton}></div>
                        <div className={styles.buyButton}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
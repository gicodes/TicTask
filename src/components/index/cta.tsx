"use client";

import styles from "@/app/page.module.css";

const CTA = () => {
  return (
    <div className={styles.readyToStart}>
      <h2 className="my-5 custom-dull"> Ready to <span className="custom-bright">Start</span>?</h2>
      <div className={`${styles.btnGroup} mt-2 mx-auto justify-center`}>
        <button className={styles.btnPrimary}> Start TicTask </button>
        <button className={styles.btnSecondary}> Schedule Payment</button>
      </div>
    </div>
  );
};

export default CTA;

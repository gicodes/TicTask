"use client";

import styles from "@/app/page.module.css";

// BtnPrimary should redirect users to '/subscribe/pro' 
// BtnSecondary should redirect users to 'subscribe/later' -> calendly

const whiteDot = <span className="custom-white">.</span>;

const CTA = () => {
  return (
    <div className={styles.readyToStart}>
      <p className="font-sm max-width-500 mx-auto">Unlock advanced features and enhanced productivity by starting the paid version of TicTask Pro</p>
      <h2 className="my-3 custom-dull">Set{whiteDot} Ready{whiteDot} <span className="custom-warm">Go{whiteDot}</span></h2>
      <div className={`${styles.btnGroup} mt-2 mx-auto justify-center`}>
        <button className={styles.btnPrimary}> Get TicTask Pro</button>
        <button className={styles.btnSecondary}> <span className="custom-white">Schedule Payment</span></button>
      </div>
    </div>
  );
};

export default CTA;

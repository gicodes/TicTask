"use client";

import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useGetPro } from "@/hooks/useGetPro";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";


const whiteDot = <span className="custom-bw">.</span>;

const CTA = () => {
  const router = useRouter()
  const { user } = useAuth();
  const { getPro } = useGetPro();
  const { showAlert } = useAlert();

  const GetPro = () => {
    if (!user) {
      showAlert("Sign in to continue", "warning");
      setTimeout(() => router.push('/auth/login'), 3000);

      return
    };

    const subscriptionStatus = getPro(user.id);
    if (subscriptionStatus===null) showAlert("Something went wrong. Please try again or contact admin", "warning");
    if (!subscriptionStatus===null && !subscriptionStatus===undefined) showAlert("You have an active Pro Subscription running!");
      else showAlert("Unauthorized! Kindly contact admin", "warning");
  }
  
  return (
    <div className={styles.readyToStart}>
      <p className="font-sm max-width-500 mx-auto">Unlock advanced features and enhanced productivity by starting the paid version of TicTask Pro</p>
      <h2 className="my-3 custom-dull">Set{whiteDot} Ready{whiteDot} <span className="custom-warm">Go{whiteDot}</span></h2>
      <div className={`${styles.btnGroup} mt-1 mx-auto justify-center`}>
        <button 
          className={styles.btnPrimary} 
          onClick={GetPro}
        >
          Get TicTask Pro
        </button>
        <button 
          className={styles.btnSecondary}
          onClick={() => router.push('https://calendly.com/your-tictask-schedule')}
        >
          Schedule Payment
        </button>
      </div>
    </div>
  );
};

export default CTA;

"use client";

import { Button } from "@/assets/buttons";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { useSubscription } from "@/providers/subscription";

const whiteDot = <span className="custom-bw">.</span>;

const CTA = () => {
  const router = useRouter()
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { subscription } = useSubscription();

  const GetPro = async () => {
    if (!user) {
      showAlert("Sign in to continue", "warning");
      setTimeout(() => router.push('/auth/login?returnUrl=/product/pricing'), 3000);
      return
    };

    if (!subscription || !subscription.active) {
      showAlert("You are being redirected to pricing to complete your product/ plan purchase", "info");
      setInterval(() => router.push('/product/pricing'), 3000)
    }

    if (subscription && subscription.active){
      showAlert("You have an active Pro Subscription running!");
      return;
    }
    else showAlert("Unauthorized! Kindly contact admin", "warning");
  }
  
  return (
    <div className={styles.readyToStart}>
      <p className="font-sm max-width-500 mx-auto">Unlock advanced features and enhanced productivity by starting the paid version of TicTask Pro</p>
      <h2 className="my-3 custom-dull">Set{whiteDot} Ready{whiteDot} <span className="custom-warm">Go{whiteDot}</span></h2>
      
      <div className={`${styles.btnGroup} mt-1 mx-auto justify-center`}>
        <Button onClick={GetPro}>
          Get TicTask Pro
        </Button>
        <Button tone="secondary" onClick={() => router.push('https://calendly.com/your-tictask-schedule')}>
          Schedule Payment
        </Button>
      </div>
    </div>
  );
};

export default CTA;

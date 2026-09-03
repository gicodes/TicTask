'use client';

import { Button } from "@/assets/buttons";
import styles from "@/app/page.module.css";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { useSubscription } from "@/providers/subscription";
import { Typography } from "@mui/material";

const Hero = () => {
  const { startFreeTrial } = useSubscription();
  const { showAlert } = useAlert();
  const router = useRouter();
  const { user } = useAuth();

  const handleStartTrial = async () => {
    if (!user) {
      showAlert("Sign in to start your free trial", "warning");

      setTimeout(() => {
        const returnUrl = encodeURIComponent("/#get-started"); 
        router.push(`/auth/login?returnUrl=${returnUrl}`);
      }, 1500);

      return;
    }

    const trial = await startFreeTrial(14);

    if (!trial) {
      showAlert( "Something went wrong. Please try again or contact admin", "warning");
      return;
    }
    if (trial.active) {
      showAlert("You already have an active trial subscription!", "info");
      return;
    }

    showAlert("Unauthorized! Kindly contact admin", "warning");
  };

  return (
    <section id="get-started">
      <div className="max-width-1k mx-auto">
        <div className={styles.heroTitle}>
          <h2> Ticket <span className="font-xl">&</span> Task Management System </h2>
          <h2> <span className="custom-warm">Driven by Org.</span> Designed for Everyone </h2>
        </div>

        <Typography  
          px={1} 
          py={3} 
          mx={'auto'}
          textAlign={'center'}
          fontSize={{ xs: 16, md: 18, xl: 20 }}
          sx={{ opacity: 0.75}}
        >
          TicTask is a lightweight multi-faceted task management platform built for fast, friendly, agile teamwork. 
          Whether you&apos;re a small team or a large enterprise, TicTask is designed to meet your organizational needs with very simple, yet robust features.
        </Typography>

        <div className={styles.heroActions}>
          <div className={styles.btnGroup}>
            <Button onClick={handleStartTrial}> 
              Start free trial 
            </Button>
            <Button tone='secondary'>
              <a 
                href="https://youtu.be/7t4e0wtqsvY?si=mTiyxjxR1LHAckHt" 
                target="_blank" 
                rel="noopener noreferrer"
              > 
                Watch demo video
              </a>
            </Button>
          </div>
          <p className={styles.trialText}> 14-day free trial. No credit card required.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
